from flask_sqlalchemy import SQLAlchemy
""" from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base """


db = SQLAlchemy()
# base = declarative_base()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(10), unique = False, nullable = False)
    is_active = db.Column(db.Boolean, unique = False, nullable = False)
    is_admin = db.Column(db.Boolean, unique = False, nullable = False)

    
    def __repr__(self):
        return f'<Users {self.email}>'
    
    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,
                "is_active": self.is_active,
                "is_admin": self.is_active}


class Authors(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    alias = db.Column(db.String(120), unique = True, nullable = False)
    birth_date = db.Column(db.DateTime)
    city = db.Column(db.String(120))
    country = db.Column(db.String(120))
    quote = db.Column(db.String(120))
    about_me = db.Column(db.String(1500))
    is_active = db.Column(db.Boolean, unique = False, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    users = db.relationship('Users')
    # followers = db.relationship('Followers', foreign_keys = [Followers.following_id], backref = 'following_author')
    # following = db.relationship('Followers', foreign_keys = [Followers.follower_id], backref = 'follower_author')
    
    def __repr__(self):
        return f'<Authors {self.alias}>'
    
    def serialize(self):
        return {"id": self.id,
                "alias": self.alias,
                "birth_date": self.birth_date,
                "city": self.city,
                "country": self.country,
                "quote": self.quote,
                "about_me": self.about_me,
                "is_active": self.is_active,
                "user_id": self.user_id}


class Members(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(20), nullable = False)
    nif = db.Column(db.String(9), unique = True, nullable = False)
    address = db.Column(db.String(150), nullable = False)
    starting_date = db.Column(db.DateTime)
    current_date = db.Column(db.DateTime)
    final_date = db.Column(db.DateTime)
    current_discount = db.Column(db.Integer)
    remaining_reviews = db.Column(db.Integer)
    reviews_expiring_date = db.Column(db.DateTime)
    status = db.Column(db.Enum('Active', 'Inactive', 'Pending', name='status'), nullable = False)
    awards = db.Column(db.String(1000))
    is_active = db.Column(db.Boolean, unique = False, nullable = False)
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'), nullable = False)
    autors = db.relationship('Authors')
    
    def __repr__(self):
        return f'<Members {self.id}>'
    
    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "nif": self.nif,
                "address": self.address,
                "starting_date": self.starting_date,
                "current_date": self.current_date,
                "final_date": self.final_date,
                "current_discount": self.current_discount,
                "remaining_reviews": self.remaining_reviews,
                "reviews_expiring_date": self.reviews_expiring_date,
                "status": self.status,
                "awards": self.awards,
                "is_active": self.is_active,
                "author_id": self.author_id}


class Advisors(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), unique = True, nullable = False)
    nif = db.Column(db.String(9), unique = True, nullable = False) 
    category = db.Column(db.Enum('Reviewer', 'Mentor', name='category'), nullable = False)
    address = db.Column(db.String(150), nullable = False)
    city = db.Column(db.String(120), nullable = False)
    country = db.Column(db.String(120), nullable = False)
    about_me = db.Column(db.String(1500))
    is_active = db.Column(db.Boolean(), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    users = db.relationship('Users')
    
    def __repr__(self):
        return f'<Advisors {self.name}>'
    
    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "nif": self.nif,
                "category": self.category,
                "address": self.address,
                "city": self.city,
                "country": self.country,
                "about_me": self.about_me,
                "is_active": self.is_active,
                "user_id": self.user_id}


class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('authors.id'), nullable = False)
    following_id = db.Column(db.Integer, db.ForeignKey('authors.id'), nullable = False)
    followers = db.relationship('Authors', foreign_keys=[follower_id])
    followings = db.relationship('Authors', foreign_keys=[following_id])
    
    def __repr__(self):
        return f'<Followers {self.id}>'
    
    def serialize(self):
        return {"id": self.id,
                "follower_id": self.follower_id,
                "following_id": self.following_id,}


class CategoryServices(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)  # Mentorship, Review
    is_active = db.Column(db.Boolean,  nullable = False)
    description = db.Column(db.String(1500), unique = False)
        
    def __repr__(self):
        return f'<CategorysServices {self.name}>'
    
    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "is_active": self.is_active,
                "description": self.description}


class Services(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), unique = False, nullable = False)
    starting_date = db.Column(db.DateTime)
    final_date = db.Column(db.DateTime)
    is_available = db.Column(db.Boolean(), unique = False, nullable = False)
    price = db.Column(db.Float)
    is_active = db.Column(db.Boolean, unique = False, nullable = False)
    category_id = db.Column(db.Integer, db.ForeignKey(CategoryServices.id))
    advisor_id = db.Column(db.ForeignKey(Advisors.id))
    categories = db.relationship('CategoryServices', foreign_keys=[category_id])
    advisors = db.relationship('Advisors', foreign_keys=[advisor_id]) 
    # services = db.relationship('Services', backref = 'category_service')
    
    def __repr__(self):
        return f'<Services {self.name}>'
    
    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "starting_date": self.starting_date,
                "final_date": self.final_date,
                "is_available": self.is_available,
                "price": self.price,
                "is_active": self.is_active,
                "category_id": self.category_id,
                "advisor_id": self.advisor_id}


class ShoppingCarts(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    total_amount = db.Column(db.Float)
    discount = db.Column(db.Float)
    date = db.Column(db.DateTime)
    # status = db.Column(db.Enum('Paid', 'Droped', 'Pending', name='status'), nullable = False)
    is_active = db.Column(db.Boolean, unique = False, nullable = False)
    member_id = db.Column(db.ForeignKey(Members.id), nullable = False, unique=False)
    members = db.relationship('Members')
    
    def __repr__(self):
        return f'<ShoppingCart {self.id}>'
    
    def serialize(self):
        return {"id": self.id,
                "total_amount": self.total_amount,
                "discount": self.discount,
                "date": self.date,
                "is_active": self.is_active,
                "member_id": self.member_id}


class ShoppingCartItems(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    quantity = db.Column(db.Integer)
    price = db.Column(db.Float, nullable = False)
    service_id = db.Column(db.ForeignKey(Services.id), nullable = False)
    services = db.relationship('Services')
    # Definimos la relación con ShoppingCarts
    shopping_cart_id = db.Column(db.ForeignKey(ShoppingCarts.id), nullable = False)
    shopping_carts = db.relationship('ShoppingCarts')
    
    def __repr__(self):
        return f'<ShoppingCartItems {self.quantity}>'
    
    def serialize(self):
        return {"id": self.id,
                "quantity": self.quantity,
                "price": self.price,
                "service_id": self.service_id,
                "shopping_cart_id": self.shopping_cart_id}


class Bills(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    paying_method = db.Column(db.String(100), nullable = False)  # Dependiendo de Stripe
    total_amount = db.Float(db.Float)
    date = db.Column(db.DateTime)
    status = db.Column(db.Enum('Paid', 'Declined', 'Pending', name='status'), nullable=False)
    member_id = db.Column(db.ForeignKey(Members.id), nullable=False)
    shopping_cart_id = db.Column(db.ForeignKey(ShoppingCarts.id), nullable=False)
    members = db.relationship('Members', foreign_keys=[member_id])
    shopping_carts = db.relationship('ShoppingCarts', foreign_keys=[shopping_cart_id]) 
    
    def __repr__(self):
        return f'<Bills {self.billing_id_number}>'
    
    def serialize(self):
        return {"id": self.id,
                "paying_method": self.paying_method,
                "total_amount": self.total_amount,
                "date": self.date,
                "status": self.status,
                "member_id": self.member_id,
                "shopping_cart_id": self.shopping_cart_id}


class BillItems(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    quantity = db.Column(db.Integer)
    price = db.Column (db.Float)  # por unidad
    service_id = db.Column(db.ForeignKey(Services.id), nullable = False)
    services = db.relationship('Services')
    
    def __repr__(self):
        return f'<BillItems {self.quantity}>'
    
    def serialize(self):
        return {"id": self.id,
                "quantity": self.quantity,
                "price": self.price,
                "service_id": self.service_id}


class BillingIssues(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String(300), nullable = False)
    status = db.Column(db.Enum('Resolved', 'Rejected', 'Pending', name='status'), nullable = False)
    log = db.Column(db.String(1500))
    bill_id = db.Column(db.ForeignKey(Bills.id), nullable = False)
    bills = db.relationship('Bills')
    
    def __repr__(self):
        return f'<BillingIssues {self.id}>'
    
    def serialize(self):
        return {"id": self.id,
                "description": self.description,
                "status": self.status,
                "log": self.log,
                "bill_id": self.bill_id} 


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50), nullable = False)
    abstract = db.Column(db.String(80))
    tag = db.Column(db.String(50))
    text = db.Column(db.String(50), nullable = False)
    created_date = db.Column(db.DateTime)
    update_date = db.Column(db.DateTime)
    is_published = db.Column(db.Boolean(), unique = False, nullable = False)
    is_active = db.Column(db.Boolean, unique = False, nullable = False)
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'), nullable = False)
    authors = db.relationship('Authors')
    
    def __repr__(self):
        return f'<Posts {self.title}>'
    
    def serialize(self):
        return {"id": self.id,
                "title": self.title,
                "abstract": self.abstract,
                "tag": self.tag,
                "text": self.text,
                "created_date": self.created.date,
                "update_date": self.update_date,
                "is_published": self.is_published,
                "is_active": self.is_active,
                "author_id": self.author_id}


class Media(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    source = db.Column(db.String(100), nullable = False)
    url = db.Column(db.String(250), unique = True, nullable = False)
    is_active = db.Column(db.Boolean, unique = False, nullable = False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable = False)
    posts = db.relationship('Posts')
    
    def __repr__(self):
        return f'<Media {self.type}>'
    
    def serialize(self):
        return {"id": self.id,
                "type": self.type,
                "url": self.url,
                "is_active": self.url,
                "post_id": self.post_id}


class Likes(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    author_id = db.Column(db.ForeignKey('authors.id'), nullable = False)
    post_id = db.Column(db.ForeignKey('posts.id'), nullable = False)
    value = db.Column(db.Integer, nullable = False)
    is_active = db.Column(db.Boolean, unique = False, nullable = False)
    authors = db.relationship('Authors', foreign_keys=[author_id])
    posts = db.relationship('Posts', foreign_keys=[post_id])
    
    def __repr__(self):
        return f'<Likes {self.user_id}>'
    
    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "author_id": self.author_id,
                "post_id": self.post_id,
                "value": self.value,
                "is_active": self.is_active}


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.DateTime)
    text = db.Column(db.String(255), nullable = False)
    is_active = db.Column(db.Boolean, unique = False, nullable = False)
    post_id = db.Column(db.ForeignKey('posts.id'), nullable = False)
    author_id = db.Column(db.ForeignKey('authors.id'), nullable = False)
    posts = db.relationship('Posts', foreign_keys=[post_id])
    authors = db.relationship('Authors', foreign_keys=[author_id])
    
    def __repr__(self):
        return f'<Comments {self.id}>'
    
    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "date": self.date,
                "text": self.text,
                "is_active": self.is_active,
                "post_id": self.post_id,
                "author_id": self.author_id}


class ReportPosts(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String(255), nullable = False)
    status = db.Column(db.Enum('Resolved', 'Rejected', 'Pending', name='status'), nullable = False)
    log = db.Column(db.String(1500))
    is_active = db.Column(db.Boolean(), unique=False, nullable = False)
    author_id = db.Column(db.ForeignKey('authors.id'), nullable = False)
    post_id = db.Column(db.ForeignKey('posts.id'), nullable = False)
    authors = db.relationship('Authors', foreign_keys=[author_id])
    posts = db.relationship('Posts', foreign_keys=[post_id])
    
    def __repr__(self):
        return f'<ReportPosts {self.id}>'
    
    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "description": self.description,
                "status": self.status,
                "log": self.log,
                "is_active": self.is_active,
                "author_id": self.author_id,
                "post_id": self.post_id}

