#STUDENTS:
#Ali Chaudhary(30204228) 
#Simar Kandola(30205681) 

import random
from flask import Flask, jsonify, request, json
from flask_cors import CORS

with open('courses.json', 'r') as file:
    courses = json.load(file)

with open('testimonials.json', 'r') as file:
    testimonials = json.load(file)


app = Flask(__name__)
CORS(app)

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


@app.route('/login', methods = ['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    valid = False

    for student in students:
        if student['username'] == username and student['password'] == password:
            valid = True
    if valid:
        return jsonify({'message': 'Valid username and password'}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/enroll/<int:student_id>', methods=['POST'])
def enroll_course(student_id):
    course_data = request.get_json()
    student = None
    for s in students:
        if s == student_id:
            student = s
    if student == None:
        return jsonify({"error": "Student not found"}), 404

    student['enrolled_courses'].append(course_data)

    return jsonify({"message": f"Enrolled in {course_data['name']} successfully!"}), 200

@app.route('/drop/<int:student_id>', methods=['DELETE'])
def drop_course(student_id):
    course_data = request.get_json()
    course_name = course_data.get('name')

    student = None
    for s in students:
        if s == student_id:
            student = s
    if student == None:
        return jsonify({"error": "Student not found"}), 404

    enrolled_courses = student['enrolled_courses']
    course_to_remove = None
    for c in enrolled_courses:
        if c == course_name:
            course_to_remove = c

    if course_to_remove == None:
        return jsonify({"error": f"{course_name} not found in enrolled courses"}), 400

    enrolled_courses.remove(course_to_remove)

    return jsonify({"message": f"Dropped {course_name} successfully!"}), 200


@app.route('/testimonials', methods = ['GET'])
def testimonials_route(): 
    random_testimonials = random.sample(testimonials, 2)
    return jsonify(random_testimonials), 200

@app.route('/courses', methods = ['GET'])
def courses_route(): 
    return jsonify(courses), 200

@app.route('/student_courses/<int:student_id>', methods = ['GET'])
def student_courses_route(student_id):
    student_courses = None
    for student in students: 
        if student["id"] == student_id:
            student_courses = student["enrolled_courses"]
            break
    if student_courses is None:
        return jsonify({"error": "Student not found"}), 404
    return jsonify(student_courses)



if __name__ == '__main__':
    app.run(debug=True)
