from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd

app = Flask(__name__)
cors = CORS(app, origins='*')

users_list = [66/22, 'Pranav', 'Lolo']  # Moved to a global variable
car_list = pd.read_csv('../Toyota_Models.csv')  # Moved to a global variable

@app.route('/api/users', methods=['GET'])
def users():
    return jsonify({'users': users_list})

@app.route('/api/customPrompt', methods=['POST'])
def customPrompt():
    try:
        data = request.get_json()  # Extract JSON data
        custom_prompt = data.get('customPrompt', '').strip()  # Get and sanitize input
        
        if custom_prompt:  # Ensure it's not empty
            users_list.append(custom_prompt)  # Add to the users list
            print(f"Added '{custom_prompt}' to users list.")

        return jsonify({'message': 'Prompt added successfully', 'updated_users': users_list})
    except Exception as e:
        print("Error processing request:", str(e))
        return jsonify({'error': 'Invalid request'}), 400

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

# Example usage
if __name__ == "__main__":
    app.run(debug=True, port=6969)
