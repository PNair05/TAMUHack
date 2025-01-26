from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

users_list = [66/22, 'Pranav', 'Lolo']  # Moved to a global variable

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

if __name__ == '__main__':
    app.run(debug=True, port=6969)
