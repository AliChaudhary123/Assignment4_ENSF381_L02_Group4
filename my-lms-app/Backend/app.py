#STUDENTS:
#Ali Chaudhary(30204228) 
#Simar Kandola(30205681) 

from flask import Flask, jsonify, request;

app = Flask(__name__)

students = [
    {
        "id": 1,
        "username": "alice",
        "password": "password123",
        "email": "alicej2@gmail.com",
        "enrolled_courses": ["Web Development", "Machine Learning"]


    },
    {
        "id": 2,
        "username": "bob",
        "password": "tiger123",
        "email": "bobr123@gmail.com",
        "enrolled_courses": ["Data Science", "Software Testing"]
    }
]

@app.route('/register', methods = ['POST'])
def register():
    data = request.get_json()
    student_username = data.get('username')
    student_password = data.get('password')
    student_email = data.get('email')
    for student in students:
        if student['username'] == student_username:
            return jsonify({'message': 'Username is already taken'}), 409
        
    new_student = {
        'id': len(students) + 1,
        'username': student_username,
        'password': student_password,
        'email': student_email,
        'enrolled_courses': []
    }

    students.append(new_student)
    return jsonify({'message': 'Registration successful'}), 201


