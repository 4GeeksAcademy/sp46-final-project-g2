from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base


db = SQLAlchemy()
base = declarative_base()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(10), unique = False, nullable = False)
    is_active = db.Column(db.Boolean, unique = False, nullable = False)
    is_admin = db.Column(db.Boolean, unique = False, nullable = False)
    author = db.relationship('Authors', uselist = False, backref = 'user')
    advisor = db.relationship('Advisors', uselist = False, backref = 'user')
    
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
    birth_date = db.Column(db.Date)
    city = db.Column(db.String(120))
    country = db.Column(db.String(120))
    quote = db.Column(db.String(120))
    about_me = db.Column(db.String(1500))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    followers = db.relationship('Followers', foreign_keys = [Followers.following_id], backref = 'following_author')
    following = db.relationship('Followers', foreign_keys = [Followers.follower_id], backref = 'follower_author')
    
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
                "user_id": self.user_id}


class Members(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(20), nullable = False)
    nif = db.Column(db.String(9), unique = True, nullable = False)
    address = db.Column(db.String(150), nullable = False)
    starting_date = db.Column(db.Date)
    current_date = db.Column(db.Date)
    final_date = db.Column(db.Date)
    current_discount = db.Column(db.Integer)
    remaining_reviews = db.Column(db.Integer)
    reviews_expiring_date = db.Column(db.Date)
    status = db.Column(db.Enum, nullable = False)
    awards = db.Column(db.String(1000))
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'), nullable = False)
    
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
                "author_id". self.author_id}


class Advisors(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), unique = True, nullable = False)
    nif = db.Column(db.String(9), unique = True, nullable = False) 
    category = db.Column(db.Enum, nullable = False)
    address = db.Column(db.String(150), nullable = False)
    city = db.Column(db.String(120), nullable = False)
    country = db.Column(db.String(120), nullable = False)
    about_me = db.Column(db.String(1500))
    is_active = db.Column(db.Boolean(), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    
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
    follower_id = db.Column(db.Integer, db.ForeignKey('author.id'), nullable = False)
    following_id = db.Column(db.Integer, db.ForeignKey('author.id'), nullable = False)
    
    def __repr__(self):
        return f'<Followers {self.name}>'
    
    def serialize(self):
        return {"follower_id": self.follower_id,
                "following_id": self.following_id,}


class CategorysServices(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)  # Mentorship, Review
    description = db.Column(db.String(1500), unique = False)
    
    def __repr__(self):
        return f'<CategorysServices {self.name}>'
    
    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "description": self.description}


class Services(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), unique = False, nullable = False)
    starting_date = db.Column(db.Date)
    final_date = db.Column(db.Date)
    is_available = db.Column(db.Boolean(), unique = False, nullable = False)
    price = db.Column(db.Float)
    category_id = db.Column(db.Integer, db.ForeignKey(CategoryService.id), nullable = False)
    advisor_id = db.Column(db.ForeignKey(Advisor.id), nullable = False)
    services = db.relationship('Services', backref = 'category_service')
    
    def __repr__(self):
        return f'<Services {self.name}>'
    
    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "starting_date": self.starting_date,
                "final_date": self.final_date,
                "is_available": self.is_available,
                "price": self.price,
                "category_id": self.category_id,
                "advisor_id": self.advisor_id}


class ShoppingCart(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    total_amount = db.Column(db.Float)
    discount = db.Column(db.Float)
    date = db.Column(db.Date)
    status = db.Column(db.Enum, nullable = False)
    member_id = db.Column(db.ForeignKey(Members.id), nullable = False) 
    
    def __repr__(self):
        return f'<ShoppingCart {self.id}>'
    
    def serialize(self):
        return {"id": self.id,
                "total_amount": self.total_amount,
                "discount": self.discount,
                "date": self.date,
                "status": self.status,
                "member_id": self.member_id}


class ShoppingCartItems(db.Model):
    quantity = db.Column(db.Integer)
    price = db.Column(db.Float, nullable = False)
    service_id = db.Column(db.ForeignKey(Service.id), nullable = False) 
    
    def __repr__(self):
        return f'<ShoppingCartItems {self.quantity}>'
    
    def serialize(self):
        return {"quantity": self.quantity,
                "price": self.price,
                "service_id": self.service_id}


class Bills(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    member_name = db.Column(db.ForeignKey(Member.name), nullable = False) 
    member_nif = db.Column(db.ForeignKey(Member.nif), nullable = False) 
    member_address = db.Column(db.ForeignKey(Member.address), nullable = False) 
    discount = db.Column(db.ForeignKey(Member.current_discount)) 
    paying_method = db.Column(db.Enum, nullable = False)  # Dependiendo de Stripe
    total_amount = db.Float(db.Float)
    date = db.Column(db.Date)
    status = db.Column(db.Enum, nullable = False)
    member_id = db.Column(db.ForeignKey(Members.id), nullable = False) 
    
    def __repr__(self):
        return f'<Bills {self.billing_id_number}>'
    
    def serialize(self):
        return {"id": self.id,
                "member_name": self.member_name,
                "member_nif": self.member_nif,
                "member_address": self.member_address,
                "discount": self.discount,
                "paying_method": self.paying_method,
                "total_amount": self.total_amount,
                "date": self.date,
                "status": self.status,
                "member_id": self.member_id}


class BillsItems(db.Model):
    quantity = db.Column(db.Integer)
    price = db.Column (db.Float)  # por unidad
    service_id = db.Column(db.ForeignKey(Service.id), nullable = False)
    
    def __repr__(self):
        return f'<BillsItems {self.quantity}>'
    
    def serialize(self):
        return {"quantity": self.quantity,
                "price": self.price,
                "service_id": self.service_id}


class BillingIssues(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String(300), nullable = False)
    status = db.Column(db.Enum, nullable = False)
    bill_id = db.Column(db.ForeignKey(Bills.id), nullable = False)
    
    def __repr__(self):
        return f'<BillingIssues {self.id}>'
    
    def serialize(self):
        return {"id": self.id,
                "description": self.description,
                "status": self.status,
                "bill_id": self.bill_id} 


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50), nullable = False)
    abstract = db.Column(db.String(80))
    tag = db.Column(db.String(50))
    text = db.Column(db.String(50), nullable = False)
    created_date = db.Column(db.Date)
    update_date = db.Column(db.Date)
    is_published = db.Column(db.Boolean(), unique = False, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    user = db.relationship('Users', backref = db.backref('posts', lazy = True))
    
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
                "is_published: self.is_published,
                "user_id": self.user_id}


class Media(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    type = db.Column(db.Enum, nullable = False)
    url = db.Column(db.String(250), unique = True, nullable = False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable = False)
    
    def __repr__(self):
        return f'<Media {self.type}>'
    
    def serialize(self):
        return {"id": self.id,
                "type": self.type,
                "url": self.url,
                "post_id": self.post_id}


class Likes(db.Model):
    user_id = db.Column(db.ForeignKey('user.id'), nullable = False)
    post_id = db.Column(db.ForeignKey('post.id'), nullable = False)
    value = db.Column(db.Enum, nullable = False)
    
    def __repr__(self):
        return f'<Likes {self.user_id}>'
    
    def serialize(self):
        # do not serialize the password, its a security breach
        return {"user_id": self.user_id,
                "post_id": self.post_id,
                "value": self.value}


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.Date)
    text = db.Column(db.String(255), nullable = False)
    post_id = db.Column(db.ForeignKey('post.id'), nullable = False)
    author_id = db.Column(db.ForeignKey('user.id'), nullable = False)
    
    def __repr__(self):
        return f'<Comments {self.id}>'
    
    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "date": self.date,
                "text": self.text,
                "post_id": self.post_id,
                "author_id": self.author_id}


class ReportsPosts(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String(255), nullable = False)
    status = db.Column(db.Enum, nullable = False)
    is_active = db.Column(db.Boolean(), unique=False, nullable = False)
    user_id = db.Column(db.ForeignKey('author.id'), nullable = False)
    post_id = db.Column(db.ForeignKey('post.id'), nullable = False)
    
    def __repr__(self):
        return f'<ReportsPosts {self.id}>'
    
    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "description": self.description,
                "status": self.status,
                "is_active": self.is_active,
                "user_id": self.user_id
                "post_id": self.post_id}

