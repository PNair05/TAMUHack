from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import json

import pandas as pd

app = Flask(__name__)
cors = CORS(app, origins='*')

car_list = pd.read_csv('../Toyota_Models.csv')  # Moved to a global variable



users_list = [' ']  # Moved to a global variable

@app.route('/api/users', methods=['GET'])
def users():
    return jsonify({'users': users_list})





# @app.route('/api/customPrompt', methods=['POST'])
# def customPrompt():
#     try:
#         data = request.get_json()  # Extract JSON data
#         custom_prompt = data.get('customPrompt', '').strip()  # Get and sanitize input
        
#         if custom_prompt:  # Ensure it's not empty
#             users_list.append(custom_prompt)  # Add to the users list
#             print(f"Added '{custom_prompt}' to users list.")

#         return jsonify({'message': 'Prompt added successfully', 'updated_users': users_list})
#     except Exception as e:
#         print("Error processing request:", str(e))
#         return jsonify({'error': 'Invalid request'}), 400
    


@app.route('/api/filterCars', methods=['POST'])
def filterCars():
    try:
        data = request.get_json()  # Extract JSON data
        filters = data.get('filters', {})  # Get filters
        sort_by = data.get('sort_by', None)  # Get sorting preference

        if not isinstance(filters, dict):
            return jsonify({'error': 'Filters must be a dictionary'}), 400

        # Filter and sort the car list
        filtered_json = filter_and_sort_cars(car_list, filters, sort_by)
        print("Successfully filtered and sorted cars.")
        return jsonify({'filtered_cars': filtered_json})
    except Exception as e:
        print("Error processing request:", str(e))
        return jsonify({'error': 'Invalid request'}), 400

def filter_and_sort_cars(car_list, filters, sort_by=None):
    """
    Filters and sorts a pandas DataFrame based on input filters and sorting preferences.

    Parameters:
        car_list (pd.DataFrame): The car list DataFrame.
        filters (dict): Dictionary of filter criteria, e.g., {'model': 'Sienna', 'type': 'SUV', 'price': '<30000'}.
        sort_by (str or list): Column(s) to sort by (default is None).

    Returns:
        str: JSON string of the filtered and sorted DataFrame.
    """
    # Apply filters
    for column, value in filters.items():
        if column in car_list.columns:
            # if isinstance(value, str) and value.startswith('<'):
            #     threshold = float(value[1:])
            #     car_list = car_list[car_list[column] < threshold]
            # elif isinstance(value, str) and value.startswith('>'):
            #     threshold = float(value[1:])
            #     car_list = car_list[car_list[column] > threshold]
            # else:
            car_list = car_list[car_list[column] == value]
            print(car_list)

    # Sort the DataFrame if sorting preferences are provided
    if sort_by:
        car_list = car_list.sort_values(by=sort_by)

    # Convert to JSON
    return car_list.to_json(orient='records')


##########################################

# AI Model

def openai(query):
    load_dotenv()
    client = OpenAI()

    # Load car data
    with open("sampledata.json", "r") as file:  # Replace with the correct file path if needed
        models = json.load(file)

    car_table = "\n".join([f"[ID: {r['ID']}] {r['Model']}" for r in models])

    prompt = f"""
    You are a car recommendation assistant. The user has asked the following query:
    "{query}"

    Based on the query, analyze the user's needs and suggest a couple of Toyota car models from the list below:
    {car_table}

    Only output the car models that best match the query, separated by commas. Do not include any additional text or explanation.
    """

    completion = client.chat_completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ]
    )

    # Extract and return the plain string of car models
    output = completion.choices[0].message.content.strip()
    return output


@app.route('/api/customPrompt', methods=['POST'])
def recommend_cars():
    try:
        data = request.get_json()
        query = data.get('query', '').strip()

        if not query:
            return jsonify({'error': 'Query is required'}), 400

        recommended_cars = openai(query)
        present_cars = recommended_cars.split(',')
        print(recommended_cars)
        return jsonify({'recommended_cars': recommended_cars})
    except Exception as e:
        print("Error processing request:", str(e))
        return jsonify({'error': 'Something went wrong'}), 500


#customPrompt = "I need a car for my kids. What is the best car for a family with kids?" # example customPrompt, should be passed in

# @app.route('/api/customPrompt', methods=['POST'])
# def customPrompt():
#     try:
#         data = request.get_json()  # Extract JSON data
#         custom_prompt = data.get('customPrompt', '').strip()  # Get and sanitize input
        
#         if custom_prompt:  # Ensure it's not empty
#             users_list.append(custom_prompt)  # Add to the users list
#             print(f"Added '{custom_prompt}' to users list.")

#         return jsonify({'message': 'Prompt added successfully', 'updated_users': users_list})
#     except Exception as e:
#         print("Error processing request:", str(e))
#         return jsonify({'error': 'Invalid request'}), 400

##############################################################

# from openai import OpenAI
# from dotenv import load_dotenv
# import json
# import os


# def openai(query):
#     load_dotenv()
#     client = OpenAI()

#     # car list, IDs, query are passed in
#     with open("sampledata.json", "r") as file:
#         models = json.load(file)

#     car_table = "\n".join([f"[ID: {r['ID']}] {r['Model']}" for r in models])

#     prompt = f"""
#     You are a helpful assistant. Look at this query: 
#     {query}

#     Here is a table of car models:
#     {car_table}

#     First, output a list of car IDs by most to least relevant to the query. Output this exact format: [ID, ID, ID, ... ID]. EX: [4, 6, 9, 1, ... 3]. 
#     Then, output a SINGULAR list with the recommended values/ranges for each of these categories that you recommend based on the query (with the [] holding the only valid values/range you can give each category). If no category can be specified from the prompt (ex: a query like "I like bananas" doesnt give any info on how to choose drivetrain), fill in that category with NaN:
#     Category [Sedan, Hatchback, SUV, Sports Car, Minivan]
#     Seats [2-5]
#     Price [20000 - 65000]
#     Drivetrain [FWD, RWD, AWD] # CHECK THAT THESE ARE ALL THE RELEVANT CATEGORIES AND HAVE REAL/RELEVANT VALUES
#     The second list outputted should be in the format: [Category, Seats, Price, Drivetrain]. EX: [Sedan, 5, 30000, AWD] EX2: [SUV, 4, NaN, AWD]. Do not output any text or any explanation. The only 2 outputs should be the 2 lists, separated by a newline. Absolutely no text.
#     """ 


#     function_descriptions = [
#         {
#             "name": "models_by_relevance",
#             "description": "Will not output any text. Ranks model IDs from most to least relevant to a given query based on the content of the corresponding review, with a rationale as well. Also outputs a list of recommended values/ranges for each of the categories: Category, Seats, Price, Drivetrain. Outputs ONLY two arrays and nothing else, absolutely no text",
#             "parameters": {
#                 "type": "object",
#                 "properties": {
#                     "query": {
#                         "type": "string",
#                         "description": "The user-provided query to which the models and attributes should be ranked for relevance."
#                     },
#                     "car_table": {
#                         "type": "array",
#                         "description": "A table of models to analyze and rank based on the query. Each model is represented as an object with an 'ID' and 'Model'.",
#                         "items": {
#                             "type": "object",
#                             "properties": {
#                                 "ID": {
#                                     "type": "string",
#                                     "description": "The unique identifier of the model."
#                                 },
#                                 "Model": {
#                                     "type": "string",
#                                     "description": "The model of the car."
#                                 }
#                             },
#                             "required": ["ID", "Model"]
#                         }
#                     }
#                 },
#                 "required": ["query", "car_table"]
#             },
#             "response": {
#                 "type": "array",
#                 "description": """First, output a list of car IDs by most to least relevant to the query. Output this exact format: [ID, ID, ID, ... ID]. EX: [4, 6, 9, 1, ... 3]. 
#     Then, output a list with the recommended values/ranges for each of these categories (with the [] holding the only valid values/range you can give each category). If no category can be specified from the prompt (ex: a query like "I like bananas" doesnt give any info on how to choose drivetrain), just dont fill in that category:
#     Category [Sedan, Hatchback, SUV, Sports Car, Minivan]
#     Seats [2-5]
#     Price [20000 - 65000]
#     Drivetrain [FWD, RWD, AWD] 
#     The second list outputted should be in the format: [Category, Seats, Price, Drivetrain]. EX: [Sedan, 5, 30000, AWD]. Do not output any text or any explanation. The only 2 outputs should be the 2 lists, separated by a newline. Absolutely no text.
#     """,
#             }
#         }
#     ]

#     print('t')

#     completion = client.chat.completions.create(
#         messages = [
#             {
#                 "role":"user",
#                 "content": prompt
#             }
#         ],
#         model="gpt-4o-mini",
#         #functions = function_descriptions,
#         #function_call="auto"
#     )

#     output = completion.choices[0].message.content

#     print(output)


# # @app.route('/api/customPrompt', methods=['POST'])
# # def rank_models():
# #     client = OpenAI()

# #     try:
# #         data = request.get_json()  # Extract JSON data
# #         custom_prompt = data.get('customPrompt', '').strip()  # Get and sanitize input
# #         print(custom_prompt)
# #         if custom_prompt:  # Ensure it's not empty
# #             # Add to the users list
# #             # print(f"Added '{custom_prompt}' to users list.")

        
# #             # car list, IDs, customPrompt are passed in
# #             with open("sampledata.json", "r") as file:
#                 models = json.load(file)

#             car_table = "\n".join([f"[ID: {r['ID']}] {r['Model']}" for r in models])

#             print()
#             prompt = f"""
#             You are a helpful assistant. Look at this query: 
#             {custom_prompt}

#             Here is a table of car models:
#             {car_table}

#             First, output a list of car IDs by most to least relevant to the customPrompt. Output this exact format: [ID, ID, ID, ... ID]. EX: [4, 6, 9, 1, ... 3].  
#             Then, output a SINGULAR list with the recommended values/ranges for each of these categories that you recommend based on the customPrompt (with the [] holding the only valid values/range you can give each category). If no category can be specified from the prompt (ex: a customPrompt like "I like bananas" doesnt give any info on how to choose drivetrain), fill in that category with NaN:
#             Category [Sedan, Hatchback, SUV, Sports Car, Minivan]
#             Seats [2-5]
#             Price [20000 - 65000]
#             Drivetrain [FWD, RWD, AWD] # CHECK THAT THESE ARE ALL THE RELEVANT CATEGORIES AND HAVE REAL/RELEVANT VALUES
#             The second list outputted should be in the format: [Category, Seats, Price, Drivetrain]. EX: [Sedan, 5, 30000, AWD] EX2: [SUV, 4, NaN, AWD]. Do not output any text or any explanation. The only 2 outputs should be the 2 lists, separated by a newline. Absolutely no text.
#             """ 

#             function_descriptions = [
#                 {
#                     "name": "models_by_relevance",
#                     "description": "Will not output any text. Ranks model IDs from most to least relevant to a given customPrompt based on the content of the corresponding review, with a rationale as well. Also outputs a list of recommended values/ranges for each of the categories: Category, Seats, Price, Drivetrain. Outputs ONLY two arrays and nothing else, absolutely no text",
#                     "parameters": {
#                         "type": "object",
#                         "properties": {
#                             "customPrompt": {
#                                 "type": "string",
#                                 "description": "The user-provided customPrompt to which the models and attributes should be ranked for relevance."
#                             },
#                             "car_table": {
#                                 "type": "array",
#                                 "description": "A table of models to analyze and rank based on the customPrompt. Each model is represented as an object with an 'ID' and 'Model'.",
#                                 "items": {
#                                     "type": "object",
#                                     "properties": {
#                                         "ID": {
#                                             "type": "string",
#                                             "description": "The unique identifier of the model."
#                                         },
#                                         "Model": {
#                                             "type": "string",
#                                             "description": "The model of the car."
#                                         }
#                                     },
#                                     "required": ["ID", "Model"]
#                                 }
#                             }
#                         },
#                         "required": ["customPrompt", "car_table"]
#                     },
#                     "response": {
#                         "type": "array",
#                         "description": """First, output a list of car IDs by most to least relevant to the customPrompt. Output this exact format: [ID, ID, ID, ... ID]. EX: [4, 6, 9, 1, ... 3]. . 
#                         Then, output a list with the recommended values/ranges for each of these categories (with the [] holding the only valid values/range you can give each category). If no category can be specified from the prompt (ex: a customPrompt like "I like bananas" doesnt give any info on how to choose drivetrain), just dont fill in that category:
#             Category [Sedan, Hatchback, SUV, Sports Car, Minivan]
#             Seats [2-5]
#             Price [20000 - 65000]
#             Drivetrain [FWD, RWD, AWD] 
#             The second list outputted should be in the format: [Category, Seats, Price, Drivetrain]. EX: [Sedan, 5, 30000, AWD]. Do not output any text or any explanation. The only 2 outputs should be the 2 lists, separated by a newline. Absolutely no text.
#             """,
#                     }
#                 }
#             ]

#             completion = client.chat.completions.create(
#                 messages = [
#                     {
#                         "role":"user",
#                         "content": prompt
#                     }
#                 ],
#                 model="gpt-4o-mini",
#                 #functions = function_descriptions,
#                 #function_call="auto"
#             )

#             output = completion.choices[0].message.content
#             users_list.append(output)  
#             return jsonify({output})
#     # except Exception as e:
#     #     print("Error processing request:", str(e))
#     #     return jsonify({'error': 'Invalid request'}), 400

#     #     return jsonify({'message': output)
        
#     except Exception as e:
#         print("Error processing request:", str(e))
#         # return jsonify({'error': 'Invalid request'}), 400

   



# Example usage
if __name__ == "__main__":
        load_dotenv()
        app.run(debug=True, port=6969)
        query = "I need a car for my kids. What is the best car for a family with kids?" # example query, should be passed in
        print('t')
        print(openai(query)) 

