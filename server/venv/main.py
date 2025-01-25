from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/users', methods=['GET'])
def users():
    return jsonify({'users': ['Arkad', 'Pranav', 'Lolo']})


if __name__ == '__main__':
    app.run(debug=True, port=6969)