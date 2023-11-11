import os
from flask_admin import Admin
from .models import db, Users, Authors, Members, Advisors, Followers, CategoryServices, Services, ShoppingCarts
from .models import ShoppingCartItems, Bills, BillItems, BillingIssues, Posts, Media, Likes, Comments, ReportPosts
from flask_admin.contrib.sqla import ModelView


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Users, db.session))
    admin.add_view(ModelView(Authors, db.session))
    admin.add_view(ModelView(Members, db.session))
    admin.add_view(ModelView(Advisors, db.session))
    admin.add_view(ModelView(Followers, db.session))
    admin.add_view(ModelView(CategoryServices, db.session))
    admin.add_view(ModelView(Services, db.session))
    admin.add_view(ModelView(ShoppingCarts, db.session))
    admin.add_view(ModelView(ShoppingCartItems, db.session))
    admin.add_view(ModelView(Bills, db.session))
    admin.add_view(ModelView(BillItems, db.session))
    admin.add_view(ModelView(BillingIssues, db.session))
    admin.add_view(ModelView(Posts, db.session))
    admin.add_view(ModelView(Media, db.session))
    admin.add_view(ModelView(Likes, db.session))
    admin.add_view(ModelView(Comments, db.session))
    admin.add_view(ModelView(ReportPosts, db.session))
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
