from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

# User-related functions
def read_users_from_file(filename='users.txt'):
    users = {}
    if os.path.exists(filename):
        with open(filename, 'r') as file:
            for line in file:
                name, email, password = line.strip().split(';')
                users[name] = (email, password)
    return users

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    with open('users.txt', 'a') as f:
        f.write(f"{name};{email};{password}\n")
    return {"message": "User saved successfully"}, 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    name = data.get('name')
    password = data.get('password')

    users = read_users_from_file()
    
    if name in users and users[name][1] == password:
        return jsonify(success=True), 200
    else:
        return jsonify(success=False, message='Invalid name or password.'), 401

# Party-related functions
@app.route('/create_party', methods=['POST'])
def create_party():
    data = request.get_json()
    organizer = data.get('organizer')
    party_name = data.get('partyName')
    date = data.get('date')
    location = data.get('location')
    dressing_code = data.get('dressingCode')
    max_people = data.get('maxPeople')
    price = data.get('price')
    roles = data.get('roles')
    party_type = data.get('partyType')
    code = data.get('code')

    party_info = f"{organizer};{party_name};{date};{location};{dressing_code};{max_people};{price};{roles};{party_type};{code}\n"

    with open('partyuri.txt', 'a') as f:
        f.write(party_info)

    return jsonify(message='Party created successfully!'), 200

@app.route('/get_parties', methods=['GET'])
def get_parties():
    parties = []
    if os.path.exists('partyuri.txt'):
        with open('partyuri.txt', 'r') as file:
            for line in file:
                data = line.strip().split(';')
                if len(data) == 10:
                    parties.append({
                        'organizer': data[0],
                        'party_name': data[1],
                        'date': data[2],
                        'location': data[3],
                        'dressing_code': data[4],
                        'max_people': data[5],
                        'price': data[6],
                        'roles': data[7],
                        'party_type': data[8],
                        'code': data[9]
                    })

    # Filter public parties
    public_parties = [party for party in parties if party['party_type'].lower() == 'public']
    return jsonify(public_parties), 200

@app.route('/get_party_details', methods=['GET'])
def get_party_details():
    party_name = request.args.get('partyName')
    if not party_name:
        return jsonify({"error": "Party name is required."}), 400

    if os.path.exists('partyuri.txt'):
        with open('partyuri.txt', 'r') as file:
            for line in file:
                data = line.strip().split(';')
                if len(data) == 10 and data[1] == party_name:
                    return jsonify({
                        'organizer': data[0],
                        'party_name': data[1],
                        'date': data[2],
                        'location': data[3],
                        'dressing_code': data[4],
                        'max_people': data[5],
                        'price': data[6],
                        'roles': data[7],
                        'party_type': data[8],
                        'code': data[9]
                    }), 200
    return jsonify({"error": "Party not found."}), 404

if __name__ == '__main__':
    app.run(debug=True)
