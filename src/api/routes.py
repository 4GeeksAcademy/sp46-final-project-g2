"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)


@api.route('/users', methods=['GET', 'POST']) 
def handle_users():
    if request.method == 'GET':
        users = Users.query.all()  # Select.all. Mirar Flask documentación
        users_list = [user.serialize() for user in users]
        response_body = users_list
        return jsonify(response_body), 200 
    if request.method == 'POST':
        data = request.get_json()
        user = Users(email=data['email'], password=data['password'], is_active=data['is_active'])
        db.session.add(user)
        db.session.commit()
        response_body = user.serialize()
        return jsonify(response_body), 201


@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user_id(user_id):
    user = Users.query.get(user_id)
    if user is None:
        response_body = {'message': 'User not found'}
        return jsonify(response_body), 404
    
    if request.method == 'GET':
        response_body = user.serialize()
        return jsonify(response_body), 200
    elif request.method == 'PUT':
        data = request.get_json()
        user.email = data['email']
        user.password = data['password']
        user.is_active = data['is_active']
        db.session.commit()
        response_body = user.serialize()
        return jsonify(response_body), 200
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        response_body = {'message': 'User deleted'}
        return jsonify(response_body), 200
       

@api.route('/authors-and-members', methods=['GET'])  # Solo GET porque para crearlos es en Users 
def get_authors_and_members():
    if request.method == 'GET':
        authors = Authors.query.all()  # Select.all. Mirar Flask documentación
        members = Members.query.all()
        authors_list = [author.serialize() for author in authors]
        members_list = [member.serialize() for member in members]
        response_body = (author_list, member_list)
        return jsonify(response_body), 200 
    

@api.route('/authors/<int:author_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_author_id(author_id):
    author = Authors.query.get(author_id)
    if author is None:
        response_body = {'message': 'Author not found'}
        return jsonify(response_body), 404
    
    if request.method == 'GET':
        response_body = author.serialize()
        return jsonify(response_body), 200
    elif request.method == 'PUT':
        data = request.get_json()
        author.alias = data['alias']
        author.birth_date = data['birth_date']
        author.city = data['city']
        author.country = data ['country']
        author.quote = data ['quote']
        author.about_me = data ['about_me']
        db.session.commit()
        response_body = author.serialize()
        return jsonify(response_body), 200
    elif request.method == 'DELETE':
        db.session.delete(author)
        db.session.commit()
        response_body = {'message': 'Author deleted'}
        return jsonify(response_body), 200
    

@api.route('/members/<int:member_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_member_id(member_id):
    member = Members.query.get(member_id)
    if member is None:
        response_body = {'message': 'Member not found'}
        return jsonify(response_body), 404
    
    if request.method == 'GET':
        response_body = member.serialize()
        return jsonify(response_body), 200
    elif request.method == 'PUT':
        data = request.get_json()
        member.name = data['name']
        member.nif = data['nif']
        member.address = data['address']
        member.starting_date = data ['starting_date']
        member.current_date = data ['current_date']
        member.final_date = data ['final_date']
        member.current_discount = data ['current_discount']
        member.remaining_reviews = data ['remaining_reviews']
        member.reviews_expiring_date = data ['reviews_expiring_date']
        member.status = data ['status']
        member.awards = data ['awards']
        db.session.commit()
        response_body = member.serialize()
        return jsonify(response_body), 200
    elif request.method == 'DELETE':
        db.session.delete(member)
        db.session.commit()
        response_body = {'message': 'Member deleted'}
        return jsonify(response_body), 200


@api.route('/advisors', methods=['GET'])  # Solo GET porque para crearlos es en Users 
def get_advisors():
    if request.method == 'GET':
        advisors = Advisors.query.all()  # Select.all. Mirar Flask documentación
        advisors_list = [advisor.serialize() for advisor in advisors]
        response_body = (advisors_list)
        return jsonify(response_body), 200 


@api.route('/advisors/<int:member_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_advisor_id(advisor_id):
    advisor = Advisor.query.get(advisor_id)
    if advisor is None:
        response_body = {'message': 'Advisor not found'}
        return jsonify(response_body), 404
    
    if request.method == 'GET':
        response_body = advisor.serialize()
        return jsonify(response_body), 200
    elif request.method == 'PUT':
        data = request.get_json()
        advisor.name = data['name']
        advisor.nif = data['nif']
        advisor.category = data ['category']
        advisor.address = data['address']
        advisor.city = data ['city']
        advisor.country = data ['country']
        advisor.about_me = data ['about_me']
        db.session.commit()
        response_body = advisor.serialize()
        return jsonify(response_body), 200
    elif request.method == 'DELETE':
        db.session.delete(advisor)
        db.session.commit()
        response_body = {'message': 'Advisor deleted'}
        return jsonify(response_body), 200


 # Followers??


# Creamos Followers??

@api.route('/services', methods=['GET', 'POST']) 
def handle_services():
    if request.method == 'GET':
        service = Services.query.all()  # Select.all. Mirar Flask documentación
        services_list = [service.serialize() for service in services]
        response_body = services_list
        return jsonify(response_body), 200 
    if request.method == 'POST':
        data = request.get_json()
        service = Services(name=data['name'], starting_date=data['starting_date'], 
                           final_date=data['final_date'], is_available=data['is_available'], price=data['price'])
        db.session.add(service)
        db.session.commit()
        response_body = service.serialize()
        return jsonify(response_body), 201


    