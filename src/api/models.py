from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)


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


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,}
