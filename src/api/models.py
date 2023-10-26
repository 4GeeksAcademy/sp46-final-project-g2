from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    abstract = db.Column(db.String(80), nullable=False)
    tag = db.Column(db.String(50), nullable=False)
    text = db.Column(db.String(50), nullable=False)
    created_date = db.Column(db.Date)
    update_date = db.Column(db.Date)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    user = db.relationship('User', backref=db.backref('posts', lazy=True))

class Media(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50))
    url = db.Column(db.String(50), unique=True, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    post_id = db.Column(db.Integer, nullable=False)
    value = db.Column(db.Integer)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    text = db.Column(db.String(255))
    post_id = db.Column(db.Integer)
    author_id = db.Column(db.Integer)

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255))
    status = db.Column(db.String(50))
    user_id = db.Column(db.Integer)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,}
