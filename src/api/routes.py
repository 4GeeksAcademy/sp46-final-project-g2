"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Authors, Members, Advisors, Followers, CategoryServices, Services, ShoppingCarts, ShoppingCartItems, Bills, BillItems, BillingIssues, Posts, Media, Likes, Comments, ReportPosts
from api.utils import generate_sitemap, APIException
from datetime import datetime
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)


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
    response_body = {'message': 'Advisor validated',
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


@api.route('/advisors/<int:advisor_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_advisor_id(advisor_id):
    advisor = db.one_or_404(db.select(Advisors).filter_by(advisor_id=advisor_id), 
                            description=f"Advisor not found , 404.")
    if request.method == 'GET':
        response_body = {'message': 'Advisor', 
                         'results': advisor.serialize()}
        return response_body, 200
    if request.method == 'PUT':
        data = request.get_json()
        advisor.name = data['name']
        advisor.nif = data['nif']
        advisor.category = data['category']
        advisor.address = data['address']
        advisor.city = data['city']
        advisor.country = data['country']
        advisor.about_me = data['about_me']
        advisor.is_active = data['is_active']
        db.session.commit()
        response_body = {'message': 'Advisor updated', 
                         'results': advisor.serialize()}
        return response_body, 200
    if request.method == 'DELETE':
        advisor.is_active = False
        db.session.commit()
        response_body = {'message': 'Advisor inactived'}
        return response_body, 200


@api.route('/followers', methods=['GET', 'POST']) 
def handle_followers():
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


@api.route('/followers/<int:follower_id>', methods=['GET', 'DELETE'])  
def handle_follower_id(follower_id):
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


@api.route('/followings/<int:following_id>', methods=['GET'])  
def handle_following_id(following_id):
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


@api.route('/services', methods=['GET', 'POST']) 
def handle_services():
    if request.method == 'GET':
        services = db.session.execute(db.select(Services)).scalars()
        services_list = [service.serialize() for service in services]
        response_body = {'message': 'Services', 
                         'results': services_list}
        return response_body, 200 
    if request.method == 'POST':
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


@api.route('/services/<int:service_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_service_id(service_id):
    service = db.one_or_404(db.select(Services).filter_by(service_id=service_id), 
                            description=f"service not found , 404.")
    if request.method == 'GET':
        response_body = {'message': 'Service', 
                         'results': service.serialize()}
        return response_body, 200
    if request.method == 'PUT':
        data = request.get_json()
        service.name = data['name']
        service.starting_date = data['starting_date']
        service.final_date = data['final_date']
        service.is_available = data['is_available']
        service.price = data['price']
        service.category_id = data['category_id']
        service.advisor_id = data['advisor_id']
        db.session.commit()
        response_body = {'message': 'Service updated', 
                         'results': service.serialize()}
        return response_body, 200
    if request.method == 'DELETE':
        # Si el taller aún no inició se borra. Y si ya se dió, lo deshabilitamos. 
        current_date = datetime.now()
        if service.starting_date <= current_date:
            service.is_available = False  
            db.session.commit()
            response_body = {'message': 'Service is now unavailable'}
            return response_body, 200
        db.session.delete(service)
        db.session.commit()
        # FIX: NO lo haremos en esta versión. Deberíamos avisar a los que han contratado el servicio 
        response_body = {'message': 'Service deleted'}
        return response_body, 200


@api.route('/category-services', methods=['GET', 'POST']) # Nombre compuesto
def handle_category_services():
    if request.method == 'GET':
        category_services = db.session.execute(db.select(CategoryServices)).scalars()
        category_services_list = [category_service.serialize() for category_service in category_services]
        response_body = {'message': 'Category Services', 
                         'results': category_services_list}
        return response_body, 200 
    if request.method == 'POST':
        data = request.get_json()
        category_service = CategoryServices(name=data['name'], 
                                            description=data['description'],
                                            is_active=data['is_active'])  
        db.session.add(category_service)
        db.session.commit()
        response_body = {'message': 'Category Service created', 
                         'results': category_service.serialize()}
        return response_body, 201


@api.route('/category-services/<int:category_services_id>', methods=['GET', 'PUT', 'DELETE'])  # Nombre compuesto
def handle_category_service_id(category_service_id):
    category_service = db.one_or_404(db.select(CategoryServices).filter_by(category_service_id=category_service_id), 
                                     description=f"Category Service not found , 404.")
    if request.method == 'GET':
        response_body = {'message': 'Category Service', 
                         'results': category_service.serialize()}
        return response_body, 200
    if request.method == 'PUT':  
        data = request.get_json()
        category_service.name=data['name'], 
        category_service.description=data['description']
        category_service.is_active=data['is_active']
        db.session.commit()
        response_body = {'message': 'Category Service updated', 
                         'results': category_service.serialize()}
        return response_body, 200
    if request.method == 'DELETE':
        # FIX: Marcar como inactiva una categoría si se va a dejar de impartir todos los servicios de esa categoría. 
        services = db.session.execute(db.select(Services).filter_by(category_services_id=category_services_id)).scalars()
        if services is None:
            response_body = {'message': 'There are no services'}
        for service in services:
            service.is_available = False
            db.session.commit()  # Revisar si funciona bien!
        category_service.is_active = False 
        db.session.commit()
        response_body = {'message': 'Category Service inactive'}
        return response_body, 200


@api.route('/shopping-carts', methods=['GET', 'POST'])  # Nombre compuesto
def handle_shopping_carts():
    if request.method == 'GET':
        shopping_carts = db.session.execute(db.select(ShoppingCarts)).scalars()
        shopping_cart_list = [shopping_cart.serialize() for shopping_cart in shopping_carts]
        response_body = {'message': 'Shopping Carts', 
                         'results': shopping_cart_list}
        return response_body, 200 
    if request.method == 'POST':  
        data = request.get_json()
        shopping_cart = ShoppingCart(total_amount=data['total_amount'], 
                                     discount=data['discount'], 
                                     date=data['date'], 
                                     status=data['status'],
                                     member_id=data['member_id']
                                     )
        db.session.add(shopping_cart)
        db.session.commit()
        response_body = {'message': 'Shopping Cart created', 
                         'results': shopping_cart.serialize()}
        return response_body, 201


@api.route('/members/<int:member_id>/shopping-carts', methods=['GET', 'DELETE'])
def handle_shopping_cart_id(shopping_cart_id):
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
   

@api.route('/posts', methods=['GET', 'POST']) 
def handle_posts():
    if request.method == 'GET':
        posts = db.session.execute(db.select(Posts).order_by(Posts.id)).scalars()
        posts_list = [post.serialize() for post in posts]
        response_body = {'message': 'Posts List', 
                         'results': posts_list}
        return response_body, 200 
    if request.method == 'POST':
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


@api.route('/posts/<int:post_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_post_id(post_id):
    post = db.one_or_404(db.select(Posts).filter_by(post_id=member_id), 
                           description=f"Post not found , 404.")
    if request.method == 'GET':
        response_body = {'message': 'Post', 
                         'results': post.serialize()}
        return response_body, 200
    if request.method == 'PUT':  
        data = request.get_json()
        post.abstract=data['abstract']
        post.tag=data['tag']
        post.text=data['text']
        post.created_date=data['created_date']
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


@api.route('/users/<int:user_id>/posts', methods=['GET', 'DELETE'])
def handle_post_by_user_id(user_id):   
    if request.method == 'GET':
        posts = db.session.execute(db.select(Posts).filter_by(user_id=user_id)).scalars()
        posts_list = [post.serialize() for post in posts]
        response_body = {'message': 'Posts List', 
                         'results': posts_list}
        return response_body, 200 
    if request.method == 'DELETE':
        response_body = {'message': 'This Method is not available yet. Please send a report requesting this issue'} 
        return response_body, 200


@api.route('/media', methods=['GET', 'POST']) 
def handle_media():
    if request.method == 'GET':
        media = db.session.execute(db.select(Media).order_by(Media.id)).scalars()
        media_list = [medium.serialize() for medium in media]
        response_body = {'message': 'Media List', 
                         'results': media_list}
        return response_body, 200 
    if request.method == 'POST':
        data = request.get_json()
        medium = Media(source=data['source'], 
                       is_active=True,
                       url=data['url'])
        db.session.add(medium)
        db.session.commit()
        response_body = {'message': 'Media created', 
                         'results': medium.serialize()}
        return response_body, 201


@api.route('/media/<int:media_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_media_id(media_id):
    medium = db.one_or_404(db.select(Media).filter_by(media_id=media_id), 
                         description=f"Media not found , 404.")
    if request.method == 'GET':
        response_body = {'message': 'Media', 
                         'results': medium.serialize()}
        return response_body, 200
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


@api.route('/posts/<int:post_id>/media', methods=['GET', 'DELETE'])
def handle_media_by_post_id(post_id):   
    if request.method == 'GET':
        media = db.session.execute(db.select(Media).filter_by(post_id=post_id)).scalars()
        media_list = [medium.serialize() for medium in media]
        response_body = {'message': 'Media List sorted by post id', 
                         'results': media_list}
        return response_body, 200 
    if request.method == 'DELETE':
        response_body = {'message': 'This Method is not available yet. Please send a report requesting this issue'} 
        return response_body, 200


@api.route('/likes', methods=['GET', 'POST']) 
def handle_likes():
    if request.method == 'GET':
        likes = db.session.execute(db.select(Likes).order_by(Likes.id)).scalars()
        likes_list = [like.serialize() for like in likes]
        response_body = {'message': 'Likes List', 
                         'results': likes_list}
        return response_body, 200 
    if request.method == 'POST':
        data = request.get_json()
        like = Likes(is_active=True, 
                     value=['value'])
        db.session.add(like)
        db.session.commit()
        response_body = {'message': 'Like created', 
                         'results': like.serialize()}
        return response_body, 201


@api.route('/likes/<int:like_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_likes_id(like_id):
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


@api.route('/posts/<int:post_id>/likes', methods=['GET', 'DELETE'])
def handle_like_by_post_id(post_id):   
    if request.method == 'GET':
        likes = db.session.execute(db.select(Likes).filter_by(post_id=post_id)).scalars()
        likes_list = [like.serialize() for like in likes]
        response_body = {'message': 'Likes List sorted by post id', 
                         'results': likes_list}
        return response_body, 200 
    if request.method == 'DELETE':
        response_body = {'message': 'This Method is not available yet. Please send a report requesting this issue'} 
        return response_body, 200


@api.route('/users/<int:user_id>/likes', methods=['GET', 'DELETE'])
def handle_like_by_user_id(user_id):   
    if request.method == 'GET':
        likes = db.session.execute(db.select(Likes).filter_by(user_id=user_id)).scalars()
        likes_list = [like.serialize() for like in likes]
        response_body = {'message': 'Likes list sorted by user id', 
                         'results': likes_list}
        return response_body, 200 
    if request.method == 'DELETE':
        response_body = {'message': 'This Method is not available yet. Please send a report requesting this issue'} 
        return response_body, 200


@api.route('/comments', methods=['GET', 'POST'])
def handle_comments():
    if request.method == 'GET':
        comments = db.session.execute(db.select(Comments).order_by(Comments.id)).scalars()
        comment_list = [comment.serialize() for comment in comments]
        response_body = {'message': 'Comment List',
                         'results': comment_list}
        return response_body, 200 
    if request.method == 'POST':
        data = request.get_json()
        comment = Comments(date=data['date'],
                           text=data['text'],
                           is_active=True)
        db.session.add(comment)
        db.session.commit()
        response_body = {'message': 'Comment created', 
                         'results': comment.serialize()}
        return response_body, 200 


@api.route('/comments/<int:comment_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_comment_id(media_id):
    comment = db.one_or_404(db.select(Comments).filter_by(coment_id=comment_id), 
                         description=f"Comment not found , 404.")
    if request.method == 'GET':
        response_body = {'message': 'Comment', 
                         'results': comment.serialize()}
        return response_body, 200
    if request.method == 'PUT':
        data = request.get_json()
        comment.date = data['date']
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


@api.route('/post/<int:post_id>/comments', methods=['GET', 'DELETE'])
def handle_comments_by_post_id(post_id):   
    if request.method == 'GET':
        comments = db.session.execute(db.select(Comments).filter_by(post_id=post_id)).scalars()
        comments_list = [post.serialize() for post in posts]
        response_body = {'message': 'Comments list sorted by post id', 
                         'results': comments_list}
        return response_body, 200 
    if request.method == 'DELETE':
        response_body = {'message': 'This Method is not available yet. Please send a report requesting this issue'} 
        return response_body, 200


@api.route('/report-posts', methods=['GET', 'POST'])
def handle_report_posts():
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

