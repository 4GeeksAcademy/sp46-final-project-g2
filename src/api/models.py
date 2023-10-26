from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,}
      

class Member(db.Model):
    __tablename__ = 'member'
    id = db.Column(db.Integer, primary_key=True)
    starting_date = db.Column(db.Date, nullable=False)
    current_date = db.Column(db.Date)
    final_date = db.Column(db.Date, nullable=False)
    current_discount = db.Column(db.Integer) # Up to 10%
    remaining_reviews = db.Column(db.Integer)
    reviews_expiring_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('author_id'), nullable = False)


class Author(db.Model):
    __tablename__ = 'author'
    id = db.Column(db.Integer, primary_key=True)
    alias = db.Column(db.String(120), unique=True, nullable=False)
    birth_date = db.Column(db.Date, nullable=False)
    city = db.Column(db.String(120))
    country = db.Column(db.String(120))
    quote = db.Column(db.String(120))
    about_me = db.Column(db.String(1500))
    user_id = db.Column(db.Integer, db.ForeignKey('user_id'), nullable = False)


class Advisor(db.Model):
    __tablename__ = 'advisor'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False) 
    category = db.Column(db.String(120), nullable=False)
    city = db.Column(db.String(120))
    country = db.Column(db.String(120))
    about_me = db.Column(db.String(1500))
    user_id = db.Column(db.Integer, db.ForeignKey('user_id'), nullable = False)


class CategoryService(db.Model):
    __tablename__= 'category_service'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.enum, nullable=False)
    description = db.Column(db.String(3000), unique=False, nullable=False)

class Service(db.Model):
    __tablename__= 'service'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    starting_date = db.Column(db.date, nullable=False)
    final_date = db.Column(db.date, nullable=False)
    is_available = db.Column(db.Boolean(), unique = False, nullable = False)
    price = db.Column (db.float, nullable = False)
    category_id = db.Column(db.Integer, db.ForeignKey(CategoryService.id))
    advisor_id = db.Column(db.ForeignKey(Advisor.id))  
    
class ShoppingCart(db.Model):
    __tablename__= 'shopping_cart'
    id = db.Column(db.Integer, primary_key = True)
    price = db.Column (db.float)
    date = db.Column(db.date)
    status = db.Column(db.enum, nullable = False)
    author_id = db.Column(db.ForeignKey(Author.id)) 


class ShoppingCartItem(db.Model):
    __tablename__= 'shopping_cart_item'
    id = db.Column(db.Integer, primary_key = True)    
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    shopping_cart_id = db.Column(db.ForeignKey(ShoppingCart.id)) 
    service_id = db.Column(db.ForeignKey(Service.id)) 

class Bill(db.Model):
    __tablename__= 'shopping_cart_item'
    id = db.Column(db.Integer, primary_key = True)
    billing_name = db.Column(db.String)
    billing_id_number = db.Column(db.String)
    billing_address = db.Column(db.String)
    paying_method = db.Column( db.Enum)
    total_amount = db.Float(db.Float)
    date = db.Column(db.Date)
    status = db.Column(db.Enum())


class BillItem(db.Model):
    __tablename__= 'bill_item'   
    quantity = db.Column(db.Integer)
    price = db.Column (db.Float) 
    bill_id = db.Column(db.ForeignKey(Bill.id)) 
    service_id = db.Column(db.ForeignKey(Service.id)) 


class Report(db.Model):
    __tablename__= 'report'
    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String(3000), unique=False, nullable=False)
    status = db.Column(db.Enum())
    author_id = db.Column(db.ForeignKey(Author.id))
    bill_id = db.Column(db.ForeignKey(Bill.id))

