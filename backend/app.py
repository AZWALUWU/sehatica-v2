from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///blog.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Blog post model
class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'category': self.category,
            'author': self.author,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

# Admin user model
class AdminUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Create tables
with app.app_context():
    db.create_all()
    
    # Create admin user if it doesn't exist
    admin = AdminUser.query.filter_by(email='admin@example.com').first()
    if not admin:
        admin = AdminUser(email='admin@example.com')
        admin.set_password('admin123')
        db.session.add(admin)
        db.session.commit()

# API routes
@app.route('/api/blog', methods=['GET'])
def get_blog_posts():
    category = request.args.get('category')
    search = request.args.get('search')
    
    query = BlogPost.query
    
    if category and category != 'all':
        query = query.filter_by(category=category)
        
    if search:
        query = query.filter(
            (BlogPost.title.ilike(f'%{search}%')) | 
            (BlogPost.content.ilike(f'%{search}%'))
        )
    
    posts = query.order_by(BlogPost.created_at.desc()).all()
    return jsonify([post.to_dict() for post in posts])

@app.route('/api/blog/<int:post_id>', methods=['GET'])
def get_blog_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    return jsonify(post.to_dict())

@app.route('/api/blog', methods=['POST'])
def create_blog_post():
    data = request.json
    
    if not all(k in data for k in ('title', 'content', 'category', 'author')):
        return jsonify({'error': 'Missing required fields'}), 400
    
    post = BlogPost(
        title=data['title'],
        content=data['content'],
        category=data['category'],
        author=data['author']
    )
    
    db.session.add(post)
    db.session.commit()
    
    return jsonify(post.to_dict()), 201

@app.route('/api/blog/<int:post_id>', methods=['PUT'])
def update_blog_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    data = request.json
    
    if 'title' in data:
        post.title = data['title']
    if 'content' in data:
        post.content = data['content']
    if 'category' in data:
        post.category = data['category']
    
    db.session.commit()
    
    return jsonify(post.to_dict())

@app.route('/api/blog/<int:post_id>', methods=['DELETE'])
def delete_blog_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    
    db.session.delete(post)
    db.session.commit()
    
    return jsonify({'message': 'Post deleted successfully'})

@app.route('/api/categories', methods=['GET'])
def get_categories():
    categories = db.session.query(BlogPost.category).distinct().all()
    return jsonify([category[0] for category in categories])

if __name__ == '__main__':
    app.run(debug=True)

