from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Authors, Members, Advisors, Followers, CategoryServices, Services, ShoppingCarts, ShoppingCartItems, Bills, BillItems, BillingIssues, Posts, Media, Likes, Comments, ReportPosts
from api.utils import generate_sitemap, APIException
from datetime import datetime
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

api.config["JWT_SECRET_KEY"] = "secret-key" 
jwt = JWTManager(api)


@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    """user = db.one_or_404(db.select(Users).filter_by(email=email, password=password), 
                           description=f"Bad username or password , 404.")"""
    if email != "test" or email != "test":
        response_body = {'message': "Bad username or password"}
        return response_body, 401
    # crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=user.id)
    response_body = {'message': 'Token created',
                     'results': {'token': access_token, 
                                 'user_id': user.id}}
    return response_body, 200


@api.route('/users', methods=['GET', 'POST']) 
def handle_users():
    if request.method == 'GET':
        users = db.session.execute(db.select(Users)).scalars()
        users_list = [user.serialize() for user in users]
        response_body = {'message': 'User List', 
                         'results': users_list}
        return response_body, 200 
    if request.method == 'POST':
        data = request.get_json()
        user = Users(email=data['email'], 
                     password=data['password'], 
                     is_active=True, 
                     is_admin=True)
        # Aca se debe crear Advisor o Author asociado según los datos que vienen en el JSON
        db.session.add(user)
        db.session.commit()
        response_body = {'message': 'User created', 
                         'results': user.serialize()}
        return response_body, 201


@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user_id(user_id):
    # User = db.session.execute(db.select(Users).filter_by(user_id=user_id)).scalar_one() 
    # if user is None:
    #    response_body = {'message': 'User not found'}
    #    return response_body, 404
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
        # si el is_active es false, no lo dejo modificar y le aviso ue tiene que hacerlo a través del método DELETE. Caso contrario, lo activo. A resolver en AUTENTICACION
        user.is_active = data['is_active']
        # esto sólo lo puede hacer otro usuario que sea admin. A resolver en AUTENTICACION
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
       

@api.route('/authors', methods=['GET', 'POST']) 
def handle_authors():
    if request.method == 'GET':
        authors = db.session.execute(db.select(Authors)).scalars()
        authors_list = [author.serialize() for author in authors]
        response_body = {'message': 'Author list', 
                         'results': author_list}
        return response_body, 200 
    if request.method == 'POST':
        data = request.get_json()
        author = Authors(alias=data['alias'], 
                         birth_date=data['birth_date'], 
                         city=data['city'], 
                         country=data['country'], 
                         quote=data['quote'], 
                         about_me=data['about_me'], 
                         is_active=True,
                         user_id=data['user_id'])
        db.session.add(author)
        db.session.commit()
        response_body = {'message': 'Author created', 
                         'results': author.serialize()}
        return response_body, 201


@api.route('/authors/<int:author_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_author_id(author_id):
    author = db.one_or_404(db.select(Authors).filter_by(id=author_id), 
                           description=f"Author not found , 404.")
    if request.method == 'GET':
        response_body = {'message': 'Author', 
                         'results': author.serialize()}
        return response_body, 200
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
    
    
@api.route('/members', methods=['GET', 'POST']) 
def handle_members():
    if request.method == 'GET':
        members = db.session.execute(db.select(Members)).scalars()
        members_list = [member.serialize() for member in members]
        response_body = {'message': 'Members', 
                         'results': members_list}
        return response_body, 200 
    if request.method == 'POST':
        data = request.get_json()
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
        db.session.add(member)
        db.session.commit()
        response_body = {'message': 'Member created', 
                         'results': member.serialize()}
        return response_body, 201


@api.route('/members/<int:member_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_member_id(member_id):
    member = db.one_or_404(db.select(Members).filter_by(id=member_id), 
                           description=f"Member not found , 404.")
    if request.method == 'GET':
        response_body = {'message': 'Member', 
                         'results': member.serialize()}
        return response_body, 200
    if request.method == 'PUT':  # Revisar cuando tengamos la Autenticación
        data = request.get_json()
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
    if request.method == 'DELETE':
        member.is_active = False
        db.session.commit()
        response_body = {'message': 'Member inactived'}
        return response_body, 200


@api.route('/advisors', methods=['GET', 'POST']) 
@jwt_required() 
def handle_advisors():
    current_user_id = get_jwt_identity()
    user = Users.filter.get(current_user_id)
    response_body = {'message': 'Author validated',
                     'results': {"id": user.id, 
                                 "email": user.email}}
    if request.method == 'GET':
        advisors = db.session.execute(db.select(Advisors)).scalars()
        advisors_list = [advisor.serialize() for advisor in advisors]
        response_body = {'message': 'Advisors List', 
                         'results': advisors_list}
        return response_body, 200 
    if request.method == 'POST':
        data = request.get_json()
        advisor = Advisor(name=data['name'], 
                          nif=data['nif'], 
                          category=data['category'], 
                          address=data['address'], 
                          city=data['city'], 
                          country=data['country'], 
                          about_me=data['about_me'], 
                          is_active=True,
                          user_id=data['user_id'])
        db.session.add(advisor)
        db.session.commit()
        response_body = {'message': 'Advisor created', 
                         'results': advisor.serialize()}
        return response_body, 201