from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')


@app.route('/api/users', methods=['GET'])
def users():
    return jsonify({'users': [66/22, 'Pranav', 'Lolo']})


if __name__ == '__main__':
    app.run(debug=True, port=6969)