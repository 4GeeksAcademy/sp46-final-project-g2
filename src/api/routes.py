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
        users = db.session.execute(db.select(Users))
        users_list = [user.serialize() for user in users]
        response_body = {users_list}
        return response_body, 200 
    if request.method == 'POST':
        data = request.get_json()
        user = Users(
                    email=data['email'], 
                    password=data['password'], 
                    is_active=True
                    )
        db.session.add(user)
        db.session.commit()
        response_body = {user.serialize()}
        return response_body, 201


@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user_id(user_id):
    """User = db.session.execute(db.select(Users).filter_by(user_id=user_id)).scalar_one() 
    if user is None:
        response_body = {'message': 'User not found'}
        return response_body, 404"""
    user = db.one_or_404(
    db.select(Users).filter_by(user_id=user_id), description=f"User not found , 404."
    )
    if request.method == 'GET':
        response_body = {user.serialize()}
        return response_body, 200
    elif request.method == 'PUT':
        data = request.get_json()
        user.email = data['email']
        user.password = data['password']
        user.is_active = data['is_active']
        user.is_admin = data['is_admin']
        db.session.commit()
        response_body = {user.serialize()}
        return response_body, 200
    elif request.method == 'DELETE':
        user.is_active = False
        db.session.commit()
        response_body = {'message': 'User inactived'}
        return response_body, 200
       

@api.route('/authors', methods=['GET', 'POST']) 
def handle_authors():
    if request.method == 'GET':
        authors = db.session.execute(db.select(Authors)) 
        authors_list = [author.serialize() for author in authors]
        response_body = {author_list}
        return response_body, 200 
    if request.method == 'POST':
        data = request.get_json()
        author = Authors(
                        alias=data['alias'], 
                        birth_date=data['birth_date'], 
                        city=data['city'], 
                        country=data['country'], 
                        quote=data['quote'], 
                        about_me=data['about_me'], 
                        is_active=True
                        )
        db.session.add(author)
        db.session.commit()
        response_body = {author.serialize()}
        return response_body, 201


@api.route('/authors/<int:author_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_author_id(author_id):
    author = db.one_or_404(
    db.select(Authors).filter_by(author_id=author_id), description=f"Author not found , 404."
    )
    if request.method == 'GET':
        response_body = {author.serialize()}
        return jsonifyresponse_body, 200
    elif request.method == 'PUT':
        data = request.get_json()
        author.alias = data['alias']
        author.birth_date = data['birth_date']
        author.city = data['city']
        author.country = data ['country']
        author.quote = data ['quote']
        author.about_me = data ['about_me']
        db.session.commit()
        response_body = {author.serialize()}
        return response_body, 200
    elif request.method == 'DELETE':
        author.is_active = False
        db.session.commit()
        response_body = {'message': 'Author inactived'}
        return response_body, 200
    
    
@api.route('/members', methods=['GET', 'POST']) 
def handle_members():
    if request.method == 'GET':
        members = db.session.execute(db.select(Members))
        members_list = [member.serialize() for member in members]
        response_body = {members_list}
        return response_body, 200 
    if request.method == 'POST':
        data = request.get_json()
        member = Members(
                        name=data['name'], 
                        nif=data['nif'], 
                        address=data['address'], 
                        starting_date=data['starting_date'], 
                        current_date=data['current_date'], 
                        final_date=data['final_date'], 
                        current_discount=data['current_discount'], 
                        remaining_reviews=data['remaining_reviews'], 
                        reviews_expiring_date=data['reviews_expiring_date'], 
                        status=data['status'], 
                        awards=data['awards'], 
                        is_active=True
                        )
        db.session.add(member)
        db.session.commit()
        response_body = {member.serialize()}
        return response_body, 201


@api.route('/members/<int:member_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_member_id(member_id):
    member = db.one_or_404(
    db.select(Members).filter_by(member_id=member_id), description=f"Member not found , 404."
    )
    if request.method == 'GET':
        response_body = {member.serialize()}
        return response_body, 200
    elif request.method == 'PUT':  # ¿¿Esto permite que lo cambie el Member o el Admin??
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
        response_body = {member.serialize()}
        return response_body, 200
    elif request.method == 'DELETE':
        member.is_active = False
        db.session.commit()
        response_body = {'message': 'Member inactived'}
        return response_body, 200


@api.route('/advisors', methods=['GET', 'POST'])  
def handle_advisors():
    if request.method == 'GET':
        advisors = db.session.execute(db.select(Advisors))
        advisors_list = [advisor.serialize() for advisor in advisors]
        response_body = {advisors_list}
        return response_body, 200 
    if request.method == 'POST':
        data = request.get_json()
        advisor = Advisor(
                        name=data['name'], 
                        nif=data['nif'], 
                        category=data['category'], 
                        address=data['address'], 
                        city=data['city'], 
                        country=data['country'], 
                        about_me=data['about_me'], 
                        is_active=True
                        )
        db.session.add(advisor)
        db.session.commit()
        response_body = {advisor.serialize()}
        return response_body, 201


@api.route('/advisors/<int:advisor_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_advisor_id(advisor_id):
    advisor = db.one_or_404(
    db.select(Advisors).filter_by(advisor_id=advisor_id), description=f"Advisor not found , 404."
    )
    if request.method == 'GET':
        response_body = {advisor.serialize()}
        return response_body, 200
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
        response_body = {advisor.serialize()}
        return response_body, 200
    elif request.method == 'DELETE':
        advisor.is_active = False
        db.session.commit()
        response_body = {'message': 'Advisor inactived'}
        return response_body, 200


@api.route('/followers', methods=['GET', 'POST']) 
def handle_followers():
    if request.method == 'GET':
        follower = db.session.execute(db.select(Followers))
        followers_list = [follower.serialize() for follower in followers]
        response_body = {followers_list}
        return response_body, 200 
    if request.method == 'POST':
        data = request.get_json()
        follower = Followers(
                    follower_id=data['follower_id'], 
                    following_id=data['following_id'], 
                    is_active=True  # Hay que crearlo en models.py
                    )
        db.session.add(follower)
        db.session.commit()
        response_body = {user.serialize()}
        return response_body, 201


@api.route('/followers/<int:author_id>', methods=['GET', 'DELETE'])  
# No tiene PUT / AUTHOR_ID?? / Dos funciones en un endpoint?
def handle_follower_id(follower_id):
    follower = db.one_or_404(
    db.select(Follower).filter_by(follower_id=follower_id), description=f"Follower not found , 404."
    )
    if request.method == 'GET':
        response_body = {follower.serialize()}
        return response_body, 200
    elif request.method == 'DELETE':
        follower.is_active = False
        db.session.commit()
        response_body = {'message': 'Follower inactived'}
        return response_body, 200
def handle_following_id(following_id):
    following = db.one_or_404(
    db.select(Follower).filter_by(following_id=following_id), description=f"Following not found , 404."
    )
    if request.method == 'GET':
        response_body = {follower.serialize()}  # Follower está correcto?
        return response_body, 200
    elif request.method == 'DELETE':
        following.is_active = False
        db.session.commit()
        response_body = {'message': 'Following inactived'}
        return response_body, 200
       

@api.route('/services', methods=['GET', 'POST']) 
def handle_services():
    if request.method == 'GET':
        service = db.session.execute(db.select(Services))
        services_list = [service.serialize() for service in services]
        response_body = {services_list}
        return response_body, 200 
    if request.method == 'POST':
        data = request.get_json()
        service = Services(
                           name=data['name'], 
                           starting_date=data['starting_date'], 
                           final_date=data['final_date'], 
                           is_available=data['is_available'],  #  Es lo mismo que is_active??
                           price=data['price'])
        db.session.add(service)
        db.session.commit()
        response_body = {service.serialize()}
        return response_body, 201


@api.route('/services/<int:service_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_service_id(service_id):
    service = db.one_or_404(
    db.select(Services).filter_by(service_id=service_id), description=f"service not found , 404."
    )
    if request.method == 'GET':
        response_body = {service.serialize()}
        return response_body, 200
    elif request.method == 'PUT':
        data = request.get_json()
        service.name = data['name']
        service.starting_date = data['starting_date']
        service.catfinal_dateegory = data ['final_date']
        service.is_available = data['is_available']
        service.price = data ['price']
        db.session.commit()
        response_body = {service.serialize()}
        return response_body, 200
    elif request.method == 'DELETE':
        service.is_available = False  #  Debería ser is_active??
        db.session.commit()
        response_body = {'message': 'Service unavailable'}
        return response_body, 200


@api.route('/category-services', methods=['GET', 'POST']) # Nombre compuesto
def handle_category_services():
    if request.method == 'GET':
        category_service = db.session.execute(db.select(CategoryServices))
        category_services_list = [category_service.serialize() for category_service in category_services]
        response_body = {category_services_list}
        return response_body, 200 
    if request.method == 'POST':
        data = request.get_json()
        category_service = CategoryServices(
                                           name=data['name'], 
                                           description=data['description']
                                           )  # Añadir is_active
        db.session.add(category_service)
        db.session.commit()
        response_body = {category_service.serialize()}
        return response_body, 201


@api.route('/category-services/<int:category_services_id>', methods=['GET', 'PUT', 'DELETE'])  # Nombre compuesto
def handle_category_service_id(category_service_id):
    category_service = db.one_or_404(
    db.select(CategoryServices).filter_by(category_service_id=category_service_id), 
    description=f"Category Service not found , 404."
    )
    if request.method == 'GET':
        response_body = {category_service.serialize()}
        return response_body, 200
    elif request.method == 'PUT':  # Añadir is_active
        data = request.get_json()
        category_service.name=data['name'], 
        category_service.description=data['description']
        db.session.commit()
        response_body = {category_service.serialize()}
        return response_body, 200
    elif request.method == 'DELETE':
        category_service.is_active = False  #  Añadir is_active a models.py
        db.session.commit()
        response_body = {'message': 'Category Service inactive'}
        return response_body, 200


@api.route('/shopping-cart', methods=['GET', 'POST'])  # Nombre compuesto
def handle_shopping_cart():
    if request.method == 'GET':
        shopping_cart = db.session.execute(db.select(ShoppingCart))
        shopping_cart_list = [shopping_cart.serialize() for shopping_cart in shopping_cart]
        response_body = {shopping_cart_list}
        return response_body, 200 
    if request.method == 'POST':  # Borra carrito??
        data = request.get_json()
        shopping_cart = ShoppingCart(
                                    total_amount=data['total_amount'], 
                                    discount=data['discount'], 
                                    date=data['date'], 
                                    status=data['status'])
        db.session.add(shopping_cart)
        db.session.commit()
        response_body = {shopping_cart.serialize()}
        return response_body, 201


@api.route('/shopping-cart/<int:member_id>', methods=['GET', 'PUT', 'DELETE'])  # ¿Dónde añadimos usuario e items?
def handle_shopping_cart_id(shopping_cart_id):
    shopping_cart = db.one_or_404(
    db.select(ShoppingCart).filter_by(shopping_cart_id=shopping_cart_id), description=f"Shopping Cart not found , 404."
    )
    if request.method == 'GET':
        response_body = {shopping_cart.serialize()}
        return jsonifyresponse_body, 200
    elif request.method == 'PUT':
        data = request.get_json()
        #  Shopping_cart.total_amount = data['total_amount']
        shopping_cart.discount = data['discount']
        #  Shopping_cart.date = data ['date']
        shopping_cart.status = data['status']
        db.session.commit()
        response_body = {shopping_cart.serialize()}
        return response_body, 200
    elif request.method == 'DELETE':
        #  Borrar items y luego el shopping Cart
        db.session.delete(shopping_cart_items) 
        db.session.delete(shopping_cart)
        db.session.commit()
        response_body = {'message': 'Shopping Cart deleted'}
        return response_body, 200
   

"""    Ejemplos   """


@api.route('/reviews', methods=['GET', 'POST'])
def handle_reviews():
    if request.method == 'GET':
        reviews = db.session.execute(db.select(Reviews).order_by(Reviews.id)).scalars()
        review_list = [review.serialize() for review in reviews]
        response_body = {'message': 'Listado de reviews',
                         'results': review_list}
        return response_body, 200 
    if request.method == 'POST':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200 


@api.route('/reviews/<int:reviews_id>', methods=['GET', 'PUT', 'DELETE'])
def reviews(reviews_id):
    if request.method == 'GET':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200  
    if request.method == 'PUT':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200 
    if request.method == 'DELETE':
        response_body = {'message': 'endpoint todavia no realizado'}
        return respons