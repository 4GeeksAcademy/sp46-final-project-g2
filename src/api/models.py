from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base


db = SQLAlchemy()
base = declarative_base()

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(10), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)

    author = db.relationship('Authors', uselist=False, backref='user')
    advisor = db.relationship('Advisors', uselist=False, backref='user')

    def __repr__(self):
        return f'<Users {self.email}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,}
      

class Members(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    nif = db.Column(db.String(9), unique=True, nullable=False)
    address = db.Column(db.String(150), nullable=False)
    starting_date = db.Column(db.Date, nullable=False)
    current_date = db.Column(db.Date)
    final_date = db.Column(db.Date, nullable=False)
    current_discount = db.Column(db.Integer) # Up to 10%
    remaining_reviews = db.Column(db.Integer)
    reviews_expiring_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.Enum, nullable=False)
    awards = db.Column(db.String(1000), nullable=False)
      # author_id = db.Column(db.Integer, db.ForeignKey('author.id'), nullable = False) se comenta sólo para generar gráfico

    def __repr__(self):
        return f'<Members {self.id}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "status": self.status,
                "name": self.name,
                "awards": self.awards,}


class Authors(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    alias = db.Column(db.String(120), unique=True, nullable=False)
    birth_date = db.Column(db.Date, nullable=False)
    city = db.Column(db.String(120), nullable=False)
    country = db.Column(db.String(120), nullable=False)
    quote = db.Column(db.String(120), nullable=False)
    about_me = db.Column(db.String(1500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)

    followers = db.relationship('Followers', foreign_keys=[Followers.following_id], backref='following_author')
    following = db.relationship('Followers', foreign_keys=[Followers.follower_id], backref='follower_author')

    def __repr__(self):
        return f'<Authors {self.alias}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "quote": self.quote,
                "alias": self.alias,
                "quote": self.quote,}

class Advisors(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    nif = db.Column(db.String(9), unique=True) 
    category = db.Column(db.Enum, nullable=False)
    address = db.Column(db.String(150))
    city = db.Column(db.String(120))
    country = db.Column(db.String(120))
    about_me = db.Column(db.String(1500))
    is_active = db.Column(db.Boolean(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
      # Se comenta sólo para generar gráfico
    
    def __repr__(self):
        return f'<Advisors {self.name}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "category": self.category,}

class Followers(db.Model):
    follower_id = db.Column(db.Integer, db.ForeignKey('author.id'), nullable = False)
    following_id = db.Column(db.Integer, db.ForeignKey('author.id'), nullable = False)

    def __repr__(self):
        return f'<Followers {self.name}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"follower_id": self.follower_id,
                "following_id": self.following_id,}

class CategorysServices(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)  # Mentorship, Review
    description = db.Column(db.String(3000), unique=False, nullable=False)

    def __repr__(self):
        return f'<CategorysServices {self.name}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "description": self.description,}

class Services(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    starting_date = db.Column(db.date, nullable=False)
    final_date = db.Column(db.date, nullable=False)
    is_available = db.Column(db.Boolean(), unique = False, nullable = False)
    price = db.Column (db.float, nullable = False)
    category_id = db.Column(db.Integer, db.ForeignKey(CategoryService.id))
    advisor_id = db.Column(db.ForeignKey(Advisor.id))  

    services = db.relationship('Services', backref='category_service')

    def __repr__(self):
        return f'<Services {self.name}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "price": self.price,}
    
class ShoppingCart(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    total_amount = db.Column(db.Integer)
    discount = db.Column(db.Integer)
    date = db.Column(db.date)
    status = db.Column(db.Enum, nullable = False)
    member_id = db.Column(db.ForeignKey(Members.id), nullable=False) 

    def __repr__(self):
        return f'<ShoppingCart {self.id}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "date": self.date,}


class ShoppingCartItems(db.Model):
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    service_id = db.Column(db.ForeignKey(Service.id)) 
    
    def __repr__(self):
        return f'<ShoppingCartItems {self.quantity}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"price": self.price,
                "quantity": self.quantity,}

class Bills(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    member_name = db.Column(db.ForeignKey(Member.name)) 
    member_nif = db.Column(db.ForeignKey(Member.nif)) 
    member_address = db.Column(db.ForeignKey(Member.address)) 
    discount = db.Column(db.ForeignKey(Member.current_discount)) 
    paying_method = db.Column( db.Enum)  # Dependiendo de Stripe
    total_amount = db.Float(db.Float)
    date = db.Column(db.Date)
    status = db.Column(db.Enum())
    member_id = db.Column(db.ForeignKey(Members.id)) 

    def __repr__(self):
        return f'<Bills {self.billing_id_number}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "total_amount": self.total_amount,
                "paying_method": self.paying_method,
                "member_name": self.member_name,
                "member_nif": self.member_nif,}


class BillsItems(db.Model):
    quantity = db.Column(db.Integer)
    price = db.Column (db.Float)  # por unidad
    service_id = db.Column(db.ForeignKey(Service.id))

    def __repr__(self):
        return f'<BillsItems {self.quantity}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"price": self.price,
                                    }

class BillingIssues(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String(300))
    satatus = db.Column(db.Enum())
    bill_id = db.Column(db.ForeignKey(Bills.id))

    def __repr__(self):
        return f'<BillingIssues {self.id}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "description": self.description,
                "status": self.status,} 


class Reports(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String(3000), unique=False, nullable=False)
    status = db.Column(db.Enum())
    author_id = db.Column(db.ForeignKey(Author.id))
    bill_id = db.Column(db.ForeignKey(Bill.id))

    def __repr__(self):
        return f'<Reports {self.id}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "description": self.description,}


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    abstract = db.Column(db.String(80), nullable=False)
    tag = db.Column(db.String(50), nullable=False)
    text = db.Column(db.String(50), nullable=False)
    created_date = db.Column(db.Date)
    update_date = db.Column(db.Date)
    is_published = db.Column(db.Boolean(), unique=False, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('Users', backref=db.backref('posts', lazy=True))

    def __repr__(self):
        return f'<Posts {self.title}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "text": self.text,}

class Media(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum, nullable=False)
    url = db.Column(db.String(250), unique=True, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    # Posibilidad de usar cloudinary

    def __repr__(self):
        return f'<Media {self.type}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "url": self.url,}

class Likes(db.Model):
    user_id = db.Column(db.ForeignKey('user.id'), nullable = False)
    post_id = db.Column(db.ForeignKey('post.id'), nullable = False)
    value = db.Column(db.Enum, nullable=False)

    def __repr__(self):
        return f'<Likes {self.user_id}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"user_id": self.user_id,
                "post_id": self.post_id,}

class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    text = db.Column(db.String(255))
    post_id = db.Column(db.ForeignKey('post.id'), nullable = False)
    author_id = db.Column(db.ForeignKey('user.id'), nullable = False)

    def __repr__(self):
        return f'<Comments {self.id}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "text": self.text,
                "date": self.date,}

class ReportsPosts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255))
    status = db.Column(db.Enum, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    user_id = db.Column(db.ForeignKey('author.id'), nullable = False)
    post_id = db.Column(db.ForeignKey('post.id'), nullable = False)

    def __repr__(self):
        return f'<ReportsPosts {self.id}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "description": self.description,
                "status": self.status,}