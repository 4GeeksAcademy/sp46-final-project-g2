"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Authors, Members, Advisors, Followers, CategoryServices, Services, ShoppingCarts, ShoppingCartItems, Bills, BillItems, BillingIssues, Posts, Media, Likes, Comments, ReportPosts
from api.utils import generate_sitemap, APIException
from datetime import datetime
from sqlalchemy import func
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies, set_access_cookies


api = Blueprint('api', __name__)


""" 
    identity[0] es user.id
    identity[1] es user.is_admin
    identity[2] es author.id
    identity[3] es member.id 
    identity[4] es advisor.id
"""


@api.route('/test', methods=["POST"])  # Mensajes en JSON?
def handle_test():
    data = request.get_json()
    response_body = {}
    alias = data['author']['alias'].lower()
    is_alias = db.session.execute(db.select(Authors).where(func.lower(Authors.alias) == alias)).scalar()
    print(is_alias)
    response_body['results'] = data
    return response_body, 200


@api.route("/login", methods=["POST"])
def handle_login():
    data = request.get_json()
    email = data.get("email", None)
    email = email.lower() if email else None
    password = data.get("password", None)
    # remember_me = request.json.get("remember_me", False)
    user = db.one_or_404(db.select(Users).filter_by(email=email, password=password, is_active=True),
                         description=f"Bad email or password.")
    results = {'user': user.serialize(),
               'author': None,
               'member': None,
               'advisor': None}
    author = db.session.execute(db.select(Authors).where(Authors.user_id == user.id)).scalar()
    if author:
        results['author'] = author.serialize()
        member = db.session.execute(db.select(Members).where(Members.author_id == author.id)).scalar()
        results['member'] = member.serialize() if member else None
    advisor = db.session.execute(db.select(Advisors).where(Advisors.user_id == user.id)).scalar()
    results['advisor'] = advisor.serialize() if advisor else None
    access_token = create_access_token(identity=[user.id,
                                                 user.is_admin,
                                                 author.id if results['author'] else None,
                                                 member.id if results['member'] else None,
                                                 advisor.id if results['advisor'] else None])
                                                 # , fresh=remember_me
    response_body = {'message': 'Token created',
                     'token': access_token,
                     'results': results}
    """ if remember_me:
        set_access_cookies(response_body, access_token) """
    return response_body, 201


@api.route('/signup', methods=["POST"])  # Mensajes en JSON?
def handle_signup():
    data = request.get_json()
    response_body = {}
    try: 
        email = data['user']['email'].lower()
    except:
        response_body['message'] = 'user.email is empty or wrong'
        return response_body, 400
    # Verificamos si el usuario ya existe
    is_user = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
    if is_user:
        response_body['message'] = 'The email is registered'
        return response_body, 403
    # Almacenamos en momoria los datos de user, author, y advisor (member, se debe crear desde POST /member)
    data_user = data['user']
    data_author = data.get('author', None)
    data_advisor = data.get('advisor', None)
    # Validamos que el user sea author o advisor o ambos.
    if not data_author and not data_advisor:
        response_body['message'] = 'The user must to be author or advisor'
        return response_body, 420
    # Si es author, verificamos si enviaron el alias y si alias ya existe.
    if data_author:
        try:
            alias = data['author']['alias'].lower()
        except:
            response_body['message'] = ' author.alias is empty or wrong'
            return response_body, 400
        is_alias = db.session.execute(db.select(Authors).where(func.lower(Authors.alias) == alias)).scalar()
        if is_alias:
            response_body['message'] = 'The alias is registered'
            return response_body, 403
    # Si es advisor, verificamos que no exista
    if data_advisor:
        try:
            name = data['advisor']['name'].lower()
            nif = data['advisor']['nif']
        except:
            response_body['message'] = ' advisor.name o advisor.nif is empty or wrong'
            return response_body, 400
        is_name = db.session.execute(db.select(Advisors).where(func.lower(Advisors.name) == name)).scalar()
        is_nif = db.session.execute(db.select(Advisors).where(func.lower(Advisors.nif) == nif)).scalar()
        if is_name or is_nif:
            response_body['message'] = 'The name or nif is registered'
            return response_body, 403
    # Si la estructura del JSON es incorrecta, no se podrán cargar los datos
    try:
        user = Users(email=data_user['email'], 
                     password=data_user['password'], 
                     is_active=True, 
                     is_admin=False)
        db.session.add(user)
        db.session.commit()
        results = {'user': user.serialize(),
                   'author': None,
                   'member': None,
                   'advisor': None}
        if data_author:
            author = Authors(alias=data_author['alias'], 
                             birth_date=data_author.get('birth_date', None),
                             city=data_author.get('city', None), 
                             country=data_author.get('country', None), 
                             quote=data_author.get('quote', None), 
                             about_me=data_author.get('about_me', None), 
                             is_active=True,
                             user_id=user.id)
            db.session.add(author)
            db.session.commit()
            results['author'] = author.serialize()
        if data_advisor:
            advisor = Advisors(name=data_advisor['name'], 
                               nif=data_advisor['nif'], 
                               category=data_advisor.get('category'), 
                               address=data_advisor.get('address'), 
                               city=data_advisor.get('city'), 
                               country=data_advisor.get('country'), 
                               about_me=data_advisor.get('about_me'), 
                               is_active=True,
                               user_id=user.id)
            db.session.add(advisor)
            db.session.commit()
            results['advisor'] = advisor.serialize()
        access_token = create_access_token(identity=[user.id,
                                                     user.is_admin,
                                                     author.id if data_author else None,
                                                     None,
                                                     advisor.id if data_advisor else None])
        response_body = {'message': 'User created',
                         'token': access_token,
                         'results': results}
    except:
        response_body = {'message': "Bad JSON structure"}
        return response_body, 400
    return response_body, 201


@api.route('/logout', methods=["POST"])
@jwt_required()
def handle_logout():
    user_id = get_jwt_identity()[0]  # Obtén el ID del usuario a partir del token
    unset_jwt_cookies()  # Revoca el token actual para deshabilitarlo
    response_body = {'message': 'Logout successful'}
    return response_body, 200
                     

""" 
# TODO: validar email, generar un token, enviar un correo electrónico (biblioteca Flask-Mail)
@api.route('/forgot-password', methods=["POST"])
def handle_forgot_password():
    email = request.json.get('email')  
    response_body = {'message': 'Password reset instructions sent to your email'}
    return jsonify(response_body), 200
"""

@api.route('/users', methods=['GET'])  # El POST se realiza en /signup
@jwt_required() 
def handle_users():
    identity = get_jwt_identity()
    # Valido si es admin
    if identity[1]:
        users = db.session.execute(db.select(Users)).scalars()
        users_list = [user.serialize() for user in users]
        response_body = {'message': 'User List', 
                         'results': users_list}
        return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required() 
def handle_user_id(user_id):
    identity = get_jwt_identity()
    # Valido si es admin
    if identity[1]:
        user = db.one_or_404(db.select(Users).filter_by(id=user_id), 
                             description=f"User not found , 404.")
        if request.method == 'GET':
            response_body = {'message': 'User', 
                             'results': user.serialize()}
            return response_body, 200
        if request.method == 'PUT':
            data = request.get_json()
            user.email = data['email']
            user.password = data['password']
            user.is_active = data['is_active']
            user.is_admin = data['is_admin']
            db.session.commit()
            response_body = {'message': 'User updated', 
                             'results': user.serialize()}
            return response_body, 200
        if request.method == 'DELETE':
            user.is_active = False
            db.session.commit()
            response_body = {'message': 'User inactived'}
            return response_body, 200
    response_body = {'message': "Restricted access"}
    return response_body, 401
       
    
@api.route('/authors', methods=['GET'])  # El POST se realiza en /signup
def handle_authors():
    authors = db.session.execute(db.select(Authors).where(Authors.is_active)).scalars()
    authors_list = [author.serialize() for author in authors]
    response_body = {'message': 'Author list', 
                     'results': authors_list}
    return response_body, 200 
   

@api.route('/authors/<int:author_id>', methods=['GET'])
def handle_get_author_id(author_id):
    author = db.one_or_404(db.select(Authors).filter_by(id=author_id), 
                           description=f"Author not found , 404.")
    response_body = {'message': 'Author', 
                     'results': author.serialize()}
    return response_body, 200
  

@api.route('/authors/<int:author_id>', methods=['PUT', 'DELETE'])
@jwt_required() 
def handle_author_id(author_id):
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author:
    if identity[1] or identity[2] == author_id:
        author = db.one_or_404(db.select(Authors).filter_by(id=author_id), 
                               description=f"Author not found , 404.")
        if request.method == 'PUT':
            data = request.get_json()
            author.alias = data['alias']
            author.birth_date = data['birth_date']
            author.city = data['city']
            author.country = data['country']
            author.quote = data['quote']
            author.about_me = data['about_me']
            author.is_active = data['is_active']
            db.session.commit()
            response_body = {'message': 'Author updated', 
                             'results': author.serialize()}
            return response_body, 200
        if request.method == 'DELETE':
            author.is_active = False
            db.session.commit()
            response_body = {'message': 'Author inactived'}
            return response_body, 200
    response_body = {'message': "Restricted access"}
    return response_body, 401
    
    
@api.route('/members', methods=['GET']) 
def handle_get_members():
        members = db.session.execute(db.select(Members).where(Members.is_active)).scalars()
        members_list = [member.serialize() for member in members]
        response_body = {'message': 'Members', 
                         'results': members_list}
        return response_body, 200 
    

@api.route('/members', methods=['POST']) 
@jwt_required() 
def handle_members():
    identity = get_jwt_identity()  # Aquí llega el token
    data = request.get_json()
    if not identity[2]:
        response_body = {'message': "Restricted access"}
        return response_body, 401
    # Valido si es admin o author:
    """ Un admin no debe crear members 
    if identity[1]:
        member = Members(name=data['name'], 
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
                         author_id=data['author_id'],
                         is_active=True)
    """
    if identity[2] and not identity[3]:  # Es usuario, pero no es member, entonces puede crearlo
        member = Members(name=data['name'],
                         nif=data['nif'],
                         address=data['address'],
                         starting_date=data['starting_date'],
                         current_date=data['current_date'],
                         final_date=None,
                         current_discount=data['current_discount'],
                         remaining_reviews=data['remaining_reviews'],
                         reviews_expiring_date=data['reviews_expiring_date'],
                         status='Active',
                         awards=data['awards'],
                         author_id=identity[2],
                         is_active=True)
    db.session.add(member)
    db.session.commit()
    access_token = create_access_token(identity=[identity[0],
                                                 identity[1],
                                                 identity[2],
                                                 member.id,
                                                 identity[4]])
    response_body = {'message': 'Member created',
                     'token': access_token,
                     'results': member.serialize()}
    return response_body, 201


@api.route('/members/<int:member_id>', methods=['GET'])
def handle_get_member_id(member_id):
    member = db.one_or_404(db.select(Members).filter_by(id=member_id), 
                           description=f"Member not found , 404.")
    response_body = {'message': 'Member', 
                     'results': member.serialize()}
    return response_body, 200


@api.route('/members/<int:member_id>', methods=['PUT', 'DELETE'])
@jwt_required() 
def handle_member_id(member_id):
    identity = get_jwt_identity()
    if not identity[1] and not identity[3]:
        response_body = {'message': "Restricted access"}
        return response_body, 401
    member = db.one_or_404(db.select(Members).filter_by(id=member_id), 
                           description=f"Member not found , 404.")
    # Valido si es admin o author:
    data = request.get_json()
    if request.method == 'PUT' and identity[1]:  
        member.name = data['name']
        member.nif = data['nif']
        member.address = data['address']
        member.starting_date = data['starting_date']
        member.current_date = data['current_date']
        member.final_date = data['final_date']
        member.current_discount = data['current_discount']
        member.remaining_reviews = data['remaining_reviews']
        member.reviews_expiring_date = data['reviews_expiring_date']
        member.status = data['status']
        member.awards = data['awards']
        member.is_active = data['is_active']
        db.session.commit()
        response_body = {'message': 'Member updated', 
                         'results': member.serialize()}
        return response_body, 200
    if request.method == 'PUT' and identity[3] == member.id:
        member.name = data['name']
        member.nif = data['nif']
        member.address = data['address']
        member.awards = data['awards']
        db.session.commit()
        response_body = {'message': 'Member updated', 
                         'results': member.serialize()}
        return response_body, 200
    if request.method == 'DELETE':
        member.is_active = False
        db.session.commit()
        response_body = {'message': 'Member inactived'}
        return response_body, 200


@api.route('/advisors', methods=['GET'])
def handle_advisors():
    advisors = db.session.execute(db.select(Advisors)).scalars()
    advisors_list = [advisor.serialize() for advisor in advisors]
    response_body = {'message': 'Advisors List', 
                         'results': advisors_list}
    return response_body, 200 
                         

@api.route('/advisors/<int:advisor_id>', methods=['GET'])
def handle_get_advisor_id(advisor_id):
    advisor = db.one_or_404(db.select(Advisors).filter_by(advisor_id=advisor_id), 
                            description=f"Advisor not found , 404.")
    response_body = {'message': 'Advisor', 
                     'results': advisor.serialize()}
    return response_body, 200


@api.route('/advisors/<int:advisor_id>', methods=['PUT', 'DELETE'])
@jwt_required() 
def handle_advisor_id(advisor_id):
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o advisor:
    if identity[1] or identity[4] == advisor_id:
        advisor = db.one_or_404(db.select(Advisors).filter_by(advisor_id=advisor_id), 
                                description=f"Advisor not found , 404.")
        if request.method == 'PUT':
            data = request.get_json()
            advisor.name = data['name']
            advisor.nif = data['nif']
            advisor.category = data['category']
            advisor.address = data['address']
            advisor.city = data['city']
            advisor.country = data['country']
            advisor.about_me = data['about_me']
            db.session.commit()
            response_body = {'message': 'Advisor updated', 
                             'results': advisor.serialize()}
            return response_body, 200
        if request.method == 'DELETE':
            advisor.is_active = False
            db.session.commit()
            response_body = {'message': 'Advisor inactived'}
            return response_body, 200
    response_body = {'message': "Restricted access"}
    return response_body, 401


""" TODO: Si hay tiempo
@api.route('/followers', methods=['GET', 'POST']) 
@jwt_required() 
def handle_followers():
    identity = get_jwt_identity()
    # Valido si es admin:
    if identity[1]:
        if request.method == 'GET':
            followers = db.session.execute(db.select(Followers)).scalars()
            followers_list = [follower.serialize() for follower in followers]
            response_body = {'message': 'Followers List', 
                            'results': followers_list}
            return response_body, 200 
        if request.method == 'POST':
            data = request.get_json()
            follower = Followers(follower_id=data['follower_id'], 
                                 following_id=data['following_id'])
            db.session.add(follower)
            db.session.commit()
            response_body = {'message': 'Follower created', 
                             'results': follower.serialize()}
            return response_body, 201
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/followers/<int:follower_id>', methods=['GET', 'DELETE'])  
@jwt_required() 
def handle_follower_id(follower_id): 
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author:
    if identity[1] or identity[2]:
        follower = db.session.execute(db.select(Follower).filter_by(follower_id=follower_id)).scalars()
        if follower is None:
            response_body = {'message': 'You do not have any followers yet'}
            return response_body, 404
        if request.method == 'GET':
            response_body = {'message': 'Follower', 
                             'results': follower.serialize()}
            return response_body, 200
        if request.method == 'DELETE':
            # Delete: quiero eliminar a alguien que me sigue
            # JSON: recibo el id del que me sigue (following)
            # Busco en la base de datos (modelo) el registro que tiene el follower (del endpoint) y el following (del json)
            # si lo encuentro, borro ese registro. Sino lo encuentro es porque no me sigue ese usuario.  
            data = request.get_json()
            concret_follower = db.session.execute(db.select(Follower).filter_by(follower_id=follower_id, following_id=data['following_id'])).scalars()
            if concret_follower is None:
                response_body = {'message': 'There is no follower to delete'}
                return response_body, 400
            db.session.delete(concret_follower)
            db.session.commit()
            response_body = {'message': 'Follower deleted'}
            return response_body, 200
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/followings/<int:following_id>', methods=['GET', 'DELETE'])  
@jwt_required() 
def handle_following_id(following_id): 
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author:
    if identity[1] or identity[2]:
        followings = db.session.execute(db.select(Follower).filter_by(following_id=following_id)).scalars()
        if followings is None:
            response_body = {'message': 'You are not following to anyone yet'}
            return response_body, 404
        if request.method == 'GET':
            response_body = {'message': 'Following', 
                             'results': follower.serialize()} 
            return response_body, 200
        if request.method == 'DELETE':
        # Delete: un seguidor quiere dejar de seguir a alguien 
        # JSON: recibe el follower, 
        # busco en la base de datos el registro que tiene el follower ( del json) y el following (del endpoint)
        # si lo encuentro, borro ese registro. Sino lo encuentro es porque no se sigue a ese usuario.  
            data = request.get_json()
            concret_following = db.session.execute(db.select(Follower).filter_by(following_id=following_id, follower_id=data['follower_id'])).scalars()
            if concret_following is None:
                response_body = {'message': 'There is no following to delete'}
                return response_body, 400
            db.session.delete(concret_following)
            db.session.commit()
            response_body = {'message': 'Following deleted'}
            return response_body, 200
    response_body = {'message': "Restricted access"}
    return response_body, 401
"""


@api.route('/services', methods=['GET']) 
def handle_get_services():
    services = db.session.execute(db.select(Services)).scalars()
    services_list = [service.serialize() for service in services]
    response_body = {'message': 'Services', 
                     'results': services_list}
    return response_body, 200 


@api.route('/services', methods=['POST']) 
@jwt_required()
def handle_services():
    identity = get_jwt_identity()
    if identity[1]:
        data = request.get_json()
        service = Services(name=data['name'], 
                           starting_date=data['starting_date'], 
                           final_date=data['final_date'], 
                           is_available=data['is_available'],  
                           price=data['price'],
                           category_id=data['category_id'],
                           advisor_id=data['advisor_id'])
        db.session.add(service)
        db.session.commit()
        response_body = {'message': 'Service created', 
                         'results': service.serialize()}
        return response_body, 201 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/services/<int:service_id>', methods=['GET'])
def handle_get_service_id(service_id):
    service = db.one_or_404(db.select(Services).filter_by(service_id=service_id), 
                            description=f"service not found , 404.")
    response_body = {'message': 'Service', 
                     'results': service.serialize()}
    return response_body, 200


@api.route('/services/<int:service_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def handle_service_id(service_id):
    identity = get_jwt_identity()
    if identity[1]:
        service = db.one_or_404(db.select(Services).filter_by(service_id=service_id), 
                                description=f"service not found , 404.")
        if request.method == 'PUT':
            data = request.get_json()
            service.name = data['name']
            service.starting_date = data['starting_date']
            service.final_date = data['final_date']
            service.price = data['price']
            service.category_id = data['category_id']
            service.advisor_id = data['advisor_id']
            # Si el taller se carga con fecha de inicio anterior, lo deshabilitamos. 
            service.is_available = False if data['starting_date'] <= datetime.now() else True
            db.session.commit()
            response_body = {'message': 'Service updated', 
                             'results': service.serialize()}
            return response_body, 200
        if request.method == 'DELETE':
            service.is_available = False 
            db.session.commit()
            response_body = {'message': 'Service is now unavailable'}
            return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/category-services', methods=['GET']) 
def handle_get_category_services():
        category_services = db.session.execute(db.select(CategoryServices)).scalars()
        category_services_list = [category_service.serialize() for category_service in category_services]
        response_body = {'message': 'Category Services', 
                         'results': category_services_list}
        return response_body, 200 

    
@api.route('/category-services', methods=['POST'])
@jwt_required()
def handle_category_services():
    identity = get_jwt_identity()
    if identity[1]:
        data = request.get_json()
        category_service = CategoryServices(name=data['name'],
                                            description=data['description'],
                                            is_active=True)
        db.session.add(category_service)
        db.session.commit()
        response_body = {'message': 'Category Service created',
                         'results': category_service.serialize()}
        return response_body, 201
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/category-services/<int:category_services_id>', methods=['GET'])  
def handle_get_category_service_id(category_service_id):
    category_service = db.one_or_404(db.select(CategoryServices).filter_by(category_service_id=category_service_id), 
                                     description=f"Category Service not found , 404.")
    response_body = {'message': 'Category Service', 
                     'results': category_service.serialize()}
    return response_body, 200


@api.route('/category-services/<int:category_services_id>', methods=['PUT', 'DELETE'])  
@jwt_required()
def handle_category_service_id(category_service_id):
    identity = get_jwt_identity()
    if identity[1]:
        category_service = db.one_or_404(db.select(CategoryServices).filter_by(category_service_id=category_service_id), 
                                         description=f"Category Service not found , 404.")
        if request.method == 'PUT':  
            data = request.get_json()
            category_service.name=data['name'], 
            category_service.description=data['description']
            db.session.commit()
            response_body = {'message': 'Category Service updated', 
                             'results': category_service.serialize()}
            return response_body, 200
        if request.method == 'DELETE':
            category_service.is_active = False 
            db.session.commit()
            services = db.session.execute(db.select(Services).filter_by(category_services_id=category_services_id)).scalars()
            if services:
                count_services = len(services)
                for service in services:
                    service.is_available = False
                    db.session.commit()
            response_body = {'message': 'Category service and {} services inactive'.format(count_services)}
            return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/shopping-carts', methods=['GET', 'POST']) 
@jwt_required()
def handle_shopping_carts():
    identity = get_jwt_identity()
    if request.method == 'GET' and identity[1]:
        shopping_carts = db.session.execute(db.select(ShoppingCarts)).scalars()
        shopping_cart_list = [shopping_cart.serialize() for shopping_cart in shopping_carts]
        response_body = {'message': 'Shopping Carts',
                         'results': shopping_cart_list}
        return response_body, 200


@api.route('/shopping-cart-items', methods=['GET', 'POST']) 
@jwt_required()
def handle_shopping_cart_items():
    identity = get_jwt_identity()
    if request.method == 'POST' and identity[3]:
        shopping_cart = db.session.execute(db.select(ShoppingCarts).where(ShoppingCarts.member_id == identity[3])).scalar()
        results = {}
        if not shopping_cart:
            # Verificamos si ya tiene un carrito
            shopping_cart = ShoppingCarts(total_amount=0, 
                                          discount=0, 
                                          date=datetime.utcnow(),
                                          is_active=True,
                                          member_id=identity[3])
            db.session.add(shopping_cart)
            db.session.commit()
        data = request.get_json()
        shopping_cart_item = ShoppingCartItems(price=data['price'], 
                                               service_id=data['service_id'],
                                               quantity=data['quantity'],
                                               shopping_cart_id=shopping_cart.id)
        db.session.add(shopping_cart_item)
        db.session.commit()
        results['shopping_cart'] = shopping_cart.serialize()
        shopping_cart_items = db.session.execute(db.select(ShoppingCartItems).where(ShoppingCartItems.shopping_cart_id == shopping_cart.id)).scalars()
        list_items = []
        for item in shopping_cart_items:
            list_items.append(item.serialize())
        results['shopping_cart_item'] = list_items
        response_body = {'message': 'Shopping Cart created', 
                         'results': results}
        return response_body, 201 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/members/<int:member_id>/shopping-carts', methods=['GET', 'DELETE'])
@jwt_required()
def handle_shopping_cart_id(shopping_cart_id):
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author:
    if identity[1] or identity[3]:
        shopping_cart = db.one_or_404(db.select(ShoppingCart).filter_by(member_id=member_id), 
                                      description=f"Shopping Cart not found , 404.")
        if request.method == 'GET':
            current_date = datetime.now()
            expired_items = []
            shopping_cart_items = db.session.execute(db.select(ShoppingCartItems).filter_by(shopping_cart_id=shopping_cart.id)).scalars()
            for item in shopping_cart_items:
                if item.starting_date <= current_date:
                    expired_items.append(item)
            if expired_items:
                for item in expired_items:
                    db.session.delete(item)
                db.session.commit()
            shopping_cart_items = db.session.execute(db.select(ShoppingCartItems).filter_by(shopping_cart_id=shopping_cart.id)).scalars()  # Lista actualizada
            shopping_cart_items_list = [item.serialize() for item in shopping_cart_items]
            response_body = {'message': 'Shopping Cart',
                             'results': {'cart': shopping_cart.serialize(),
                                         'items': shopping_cart_items_list}}
            return response_body, 200
        if request.method == 'DELETE':
            #  Borrar items y luego el shopping Cart
            db.session.delete(shopping_cart_items)
            db.session.delete(shopping_cart)
            db.session.commit()
            response_body = {'message': 'Shopping Cart deleted'}
            return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401
   

@api.route('/bills', methods=['GET', 'POST'])
@jwt_required()
def handle_bills():
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author o advisor:
    if identity[1] or identity[2] or identity[3]:
        if request.method == 'GET':
            bills = db.session.execute(db.select(Bills)).scalars()
            bills_list = [bill.serialize() for bill in bills]
            response_body = {'message': 'Bills List', 
                             'results': bills_list}
            return response_body, 200 
        if request.method == 'POST':  
            data = request.get_json()
            bill = Bills(paying_method=data['paying_method'], 
                         total_amount=data['total_amount'], 
                         date=data['date'], 
                         status=data['status'],
                         member_id=data['member_id'],
                         shopping_cart_id=data['shopping_cart_id'])
            db.session.add(bill)
            db.session.commit()
            response_body = {'message': 'Bill created', 
                             'results': bill.serialize()}
            return response_body, 201 
    response_body = {'message': "Restricted access"}
    return response_body, 401
    

@api.route('/members/<int:member_id>/bills', methods=['GET'])
@jwt_required()
def handle_bill_by_member_id(member_id):   
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author o advisor:
    if identity[1] or identity[2] or identity[3]:
        if request.method == 'GET':
            bills = db.session.execute(db.select(Bills).filter_by(member_id=member_id)).scalars()
            bills_list = [bill.serialize() for bill in bills]
            response_body = {'message': 'Bills List', 
                             'results': bills_list}
            return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/bills/<int:bill_id>', methods=['GET'])
@jwt_required()
def handle_bill_by_id(bill_id):   
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author o advisor:
    if identity[1] or identity[2] or identity[3]:
        if request.method == 'GET':
            bills = db.one_or_404(db.select(Bills).filter_by(id=bill_id),
                                  description=f"Post not found , 404.")
            bill_items = db.session.execute(db.select(BillItems).filter_by(bill_id=bill_id)).scalars()
            bill_items_list = [item.serialize() for item in bill_items]
            response_body = {'message': 'Bills List', 
                             'results': {'bill': bills.serialize(),
                                         'items': bill_items_list}}
            return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/billing-issues', methods=['GET', 'POST'])
@jwt_required()
def handle_billing_issues():
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author o advisor:
    if identity[1] or identity[2] or identity[3]:
        if request.method == 'GET':
            issues = db.session.execute(db.select(BillingIssues)).scalars()
            issues_list = [issue.serialize() for issue in issues]
            response_body = {'message': 'Billing Issues List',
                             'results': issues_list}
            return response_body, 200 
        if request.method == 'POST':
            data = request.get_json()
            issue = BillingIssues(description=data['description'],
                                  status=data['status'],
                                  log=data['log'],
                                  bill_id=data['bill_id'])
            db.session.add(issue)
            db.session.commit()
            response_body = {'message': 'Billing Issue created', 
                             'results': issue.serialize()}
            return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401


"""  TODO: Si ya tiempo
@api.route('/posts', methods=['GET']) 
def handle_get_posts():
    posts = db.session.execute(db.select(Posts).order_by(Posts.id)).scalars()
    posts_list = [post.serialize() for post in posts]
    response_body = {'message': 'Posts List', 
                     'results': posts_list}
    return response_body, 200 


@api.route('/posts', methods=['POST']) 
@jwt_required()
def handle_posts():
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author:
    if identity[1] or identity[2]:
        data = request.get_json()
        post = Posts(title=data['title'], 
                     abstract=data['abstract'],
                     tag=data['tag'],
                     text=data['text'],
                     created_date=data['created_date'],
                     update_date=data['update_date'],
                     is_active=True,
                     is_published=True)  
        db.session.add(post)
        db.session.commit()
        response_body = {'message': 'Post created', 
                         'results': post.serialize()}
        return response_body, 201 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/posts/<int:post_id>', methods=['GET'])
def handle_get_post_id(post_id):
    post = db.one_or_404(db.select(Posts).filter_by(post_id=member_id), 
                         description=f"Post not found , 404.")
    response_body = {'message': 'Post', 
                     'results': post.serialize()}
    return response_body, 200
   

@api.route('/posts/<int:post_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def handle_post_id(post_id):
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author:
    if identity[1] or identity[2]:
        post = db.one_or_404(db.select(Posts).filter_by(post_id=member_id), 
                             description=f"Post not found , 404.")
        if request.method == 'PUT':  
            data = request.get_json()
            post.abstract=data['abstract']
            post.tag=data['tag']
            post.text=data['text']
            post.created_date=post.created_date
            post.update_date=data['update_date']
            post.is_published=data['is_published']
            db.session.commit()
            response_body = {'message': 'Post updated', 
                             'results': post.serialize()}
            return response_body, 200
        if request.method == 'DELETE':
            post.is_active = False
            db.session.commit()
            response_body = {'message': 'Post inactived'}
            return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/users/<int:user_id>/posts', methods=['GET'])
def handle_get_post_by_user_id(user_id):   
        posts = db.session.execute(db.select(Posts).filter_by(user_id=user_id)).scalars()
        posts_list = [post.serialize() for post in posts]
        response_body = {'message': 'Posts List', 
                         'results': posts_list}
        return response_body, 200 


@api.route('/users/<int:user_id>/posts', methods=['DELETE'])  # ¿Por qué in not available??
@jwt_required()
def handle_post_by_user_id(user_id):   
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author:
    if identity[1] or identity[2]:
        response_body = {'message': 'This Method is not available yet. Please send a report requesting this issue'} 
        return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/media', methods=['GET']) 
def handle_get_media():
        media = db.session.execute(db.select(Media).order_by(Media.id)).scalars()
        media_list = [medium.serialize() for medium in media]
        response_body = {'message': 'Media List', 
                         'results': media_list}
        return response_body, 200 


@api.route('/media', methods=['POST']) 
@jwt_required()
def handle_media():
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author:
    if identity[1] or identity[2]:
        data = request.get_json()
        medium = Media(source=data['source'], 
                       is_active=True,
                       url=data['url'])
        db.session.add(medium)
        db.session.commit()
        response_body = {'message': 'Media created', 
                         'results': medium.serialize()}
        return response_body, 201 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/media/<int:media_id>', methods=['GET'])
def handle_get_media_id(media_id):
    medium = db.one_or_404(db.select(Media).filter_by(media_id=media_id), 
                         description=f"Media not found , 404.")
    if request.method == 'GET':
        response_body = {'message': 'Media', 
                         'results': medium.serialize()}
        return response_body, 200


@api.route('/media/<int:media_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def handle_media_id(media_id): 
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author:
    if identity[1] or identity[2]:
        medium = db.one_or_404(db.select(Media).filter_by(media_id=media_id), 
                             description=f"Media not found , 404.")
        if request.method == 'PUT':
            data = request.get_json()
            medium.source = data['source']        
            medium.is_active = data['is_active']
            medium.url = data['url']
            db.session.commit()
            response_body = {'message': 'Media updated', 
                             'results': medium.serialize()}
            return response_body, 200
        if request.method == 'DELETE':
            medium.is_active = False
            db.session.commit()
            response_body = {'message': 'Media inactived'}
            return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/posts/<int:post_id>/media', methods=['GET'])
def handle_get_media_by_post_id(post_id):   
        media = db.session.execute(db.select(Media).filter_by(post_id=post_id)).scalars()
        media_list = [medium.serialize() for medium in media]
        response_body = {'message': 'Media List sorted by post id', 
                         'results': media_list}
        return response_body, 200 


@api.route('/posts/<int:post_id>/media', methods=['DELETE'])
@jwt_required()
def handle_media_by_post_id(post_id):       
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author:
    if identity[1] or identity[2]:
        if request.method == 'DELETE':
            response_body = {'message': 'This Method is not available yet. Please send a report requesting this issue'} 
            return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/likes', methods=['GET']) 
def handle_get_likes():
        likes = db.session.execute(db.select(Likes).order_by(Likes.id)).scalars()
        likes_list = [like.serialize() for like in likes]
        response_body = {'message': 'Likes List', 
                         'results': likes_list}
        return response_body, 200 


@api.route('/likes', methods=['POST'])  # Pueden los tres 
@jwt_required()
def handle_likes(): 
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author o advisor:
    if identity[1] or identity[2] or identity[3]:
        data = request.get_json()
        like = Likes(is_active=True, 
                     value=['value'])
        db.session.add(like)
        db.session.commit()
        response_body = {'message': 'Like created', 
                         'results': like.serialize()}
        return response_body, 201 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/likes/<int:like_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def handle_likes_id(like_id):
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin:
    if identity[1]:
        like = db.one_or_404(db.select(Likes).filter_by(like_id=like_id), 
                             description=f"Like not found , 404.")
        if request.method == 'GET':
            response_body = {'message': 'Like', 
                             'results': like.serialize()}
            return response_body, 200
        if request.method == 'PUT':
            data = request.get_json()
            like.value = data['value']
            db.session.commit()
            response_body = {'message': 'Like updated', 
                             'results': like.serialize()}
            return response_body, 200
        if request.method == 'DELETE':
            like.is_active = False
            db.session.commit()
            response_body = {'message': 'Like inactived'}
            return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/posts/<int:post_id>/likes', methods=['GET'])
def handle_get_like_by_post_id(post_id):   
        likes = db.session.execute(db.select(Likes).filter_by(post_id=post_id)).scalars()
        likes_list = [like.serialize() for like in likes]
        response_body = {'message': 'Likes List sorted by post id', 
                         'results': likes_list}
        return response_body, 200 


@api.route('/posts/<int:post_id>/likes', methods=['DELETE'])
@jwt_required()
def handle_like_by_post_id(post_id): 
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author o advisor:
    if identity[1] or identity[2] or identity[3]:
        response_body = {'message': 'This Method is not available yet. Please send a report requesting this issue'} 
        return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/users/<int:user_id>/likes', methods=['GET', 'DELETE'])
@jwt_required()
def handle_like_by_user_id(user_id):   
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin:
    if identity[1]:
        if request.method == 'GET':
            likes = db.session.execute(db.select(Likes).filter_by(user_id=user_id)).scalars()
            likes_list = [like.serialize() for like in likes]
            response_body = {'message': 'Likes list sorted by user id', 
                             'results': likes_list}
            return response_body, 200 
        if request.method == 'DELETE':
            response_body = {'message': 'This Method is not available yet. Please send a report requesting this issue'} 
            return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/comments', methods=['GET'])
def handle_get_comments():
    if request.method == 'GET':
        comments = db.session.execute(db.select(Comments).order_by(Comments.id)).scalars()
        comment_list = [comment.serialize() for comment in comments]
        response_body = {'message': 'Comment List',
                         'results': comment_list}
        return response_body, 200 


@api.route('/comments', methods=['POST'])
@jwt_required()
def handle_comments(): 
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author o advisor:
    if identity[1] or identity[2] or identity[3]:   
        data = request.get_json()
        comment = Comments(date=data['date'],
                           text=data['text'],
                           is_active=True)
        db.session.add(comment)
        db.session.commit()
        response_body = {'message': 'Comment created', 
                         'results': comment.serialize()}
        return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/comments/<int:comment_id>', methods=['GET'])
def handle_get_comment_id(media_id):
    comment = db.one_or_404(db.select(Comments).filter_by(coment_id=comment_id), 
                         description=f"Comment not found , 404.")
    response_body = {'message': 'Comment', 
                     'results': comment.serialize()}
    return response_body, 200


@api.route('/comments/<int:comment_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def handle_comment_id(media_id):    
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author o advisor:
    if identity[1] or identity[2] or identity[3]:   
        comment = db.one_or_404(db.select(Comments).filter_by(coment_id=comment_id), 
                             description=f"Comment not found , 404.")
        if request.method == 'PUT':
            data = request.get_json()
            comment.date = comment.date
            comment.text = data['text']
            comment.is_active = data['is_active']
            db.session.commit()
            response_body = {'message': 'Comment updated', 
                             'results': comment.serialize()}
            return response_body, 200
        if request.method == 'DELETE':
            comment.is_active = False
            db.session.commit()
            response_body = {'message': 'Comment inactived'}
            return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/post/<int:post_id>/comments', methods=['GET', 'DELETE'])
@jwt_required()
def handle_comments_by_post_id(post_id): 
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin:
    if identity[1]:     
        if request.method == 'GET':
            comments = db.session.execute(db.select(Comments).filter_by(post_id=post_id)).scalars()
            comments_list = [post.serialize() for post in posts]
            response_body = {'message': 'Comments list sorted by post id', 
                             'results': comments_list}
            return response_body, 200 
        if request.method == 'DELETE':
            response_body = {'message': 'This Method is not available yet. Please send a report requesting this issue'} 
            return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401


@api.route('/report-posts', methods=['GET', 'POST'])
@jwt_required()
def handle_report_posts():
    identity = get_jwt_identity()  # Aquí llega el token
    # Valido si es admin o author:
    if identity[1] or identity[2]:   
        if request.method == 'GET':
            reports = db.session.execute(db.select(ReportPosts).order_by(ReportPosts.id)).scalars()
            reports_list = [report.serialize() for report in reports]
            response_body = {'message': 'Report Posts List',
                             'results': reports_list}
            return response_body, 200 
        if request.method == 'POST':
            data = request.get_json()
            report = Comments(description=data['description'],
                               status=data['status'],
                               is_active=True)
            db.session.add(report)
            db.session.commit()
            response_body = {'message': 'Report Post created', 
                             'results': report.serialize()}
            return response_body, 200 
    response_body = {'message': "Restricted access"}
    return response_body, 401

"""
