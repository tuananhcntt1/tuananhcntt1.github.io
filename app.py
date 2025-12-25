"""
Personal Blog Application - Ngô Tuấn Anh
Framework: Flask
Author: Ngô Tuấn Anh
Description: A minimalist, professional personal blog website
"""

from flask import Flask, render_template, request, jsonify
from datetime import datetime
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Sample blog posts data
BLOG_POSTS = [
    {
        'id': 1,
        'title': 'Hướng dẫn Học Lập trình Java Cơ bản - Phần 1',
        'description': 'Tìm hiểu các khái niệm nền tảng của Java: biến, kiểu dữ liệu, và các toán tử cơ bản.',
        'image': '/static/assets/images/blog_thumbnails/java_basic_1.jpg',
        'date': '2024-12-15',
        'category': 'Java',
        'content': 'Bài viết này sẽ giới thiệu...'
    },
    {
        'id': 2,
        'title': 'JavaScript ES6+: Arrow Functions & Destructuring',
        'description': 'Khám phá những tính năng mạnh mẽ của JavaScript ES6+ để viết code sạch và hiệu quả hơn.',
        'image': '/static/assets/images/blog_thumbnails/js_es6.jpg',
        'date': '2024-12-10',
        'category': 'JavaScript',
        'content': 'Arrow Functions làm giảm...'
    },
    {
        'id': 3,
        'title': 'Java OOP: Kế Thừa và Đa Hình trong Thực Tiễn',
        'description': 'Hiểu rõ hơn về kế thừa, đa hình và cách áp dụng chúng vào các dự án thực tế.',
        'image': '/static/assets/images/blog_thumbnails/java_oop.jpg',
        'date': '2024-12-05',
        'category': 'Java',
        'content': 'Kế thừa (Inheritance) là...'
    },
    {
        'id': 4,
        'title': 'React Hooks: useState & useEffect Tập 1',
        'description': 'Nắm vững cách sử dụng Hooks trong React để quản lý state và side effects một cách hiệu quả.',
        'image': '/static/assets/images/blog_thumbnails/react_hooks.jpg',
        'date': '2024-11-28',
        'category': 'JavaScript',
        'content': 'React Hooks đã thay đổi...'
    },
    {
        'id': 5,
        'title': 'Java Collections Framework - ArrayList, HashMap',
        'description': 'Tìm hiểu về các cấu trúc dữ liệu quan trọng nhất trong Java Collections.',
        'image': '/static/assets/images/blog_thumbnails/java_collections.jpg',
        'date': '2024-11-22',
        'category': 'Java',
        'content': 'Java Collections Framework...'
    },
    {
        'id': 6,
        'title': 'Async/Await trong JavaScript: Làm chủ Bất Đồng Bộ',
        'description': 'Học cách sử dụng async/await để xử lý các tác vụ bất đồng bộ một cách sạch sẽ và dễ đọc.',
        'image': '/static/assets/images/blog_thumbnails/js_async.jpg',
        'date': '2024-11-18',
        'category': 'JavaScript',
        'content': 'Async/await là cách...'
    },
    {
        'id': 7,
        'title': 'Java Stream API: Xử Lý Dữ Liệu Hàm Số',
        'description': 'Khám phá sức mạnh của Stream API trong Java để viết code hàm số và xử lý tập hợp dữ liệu.',
        'image': '/static/assets/images/blog_thumbnails/java_stream.jpg',
        'date': '2024-11-10',
        'category': 'Java',
        'content': 'Stream API là một...'
    },
    {
        'id': 8,
        'title': 'DOM Manipulation với Vanilla JavaScript',
        'description': 'Làm chủ việc thao tác với DOM mà không cần framework, giúp code nhẹ và nhanh hơn.',
        'image': '/static/assets/images/blog_thumbnails/js_dom.jpg',
        'date': '2024-11-05',
        'category': 'JavaScript',
        'content': 'DOM (Document Object Model)...'
    },
    {
        'id': 9,
        'title': 'Thiết Kế Pattern: Singleton & Factory trong Java',
        'description': 'Hiểu rõ những Design Pattern phổ biến nhất giúp code dễ bảo trì và mở rộng hơn.',
        'image': '/static/assets/images/blog_thumbnails/java_patterns.jpg',
        'date': '2024-10-28',
        'category': 'Java',
        'content': 'Design Pattern là...'
    },
    {
        'id': 10,
        'title': 'CSS Grid vs Flexbox: Chọn Cái Nào Cho Bố Cục Web?',
        'description': 'So sánh chi tiết giữa Grid và Flexbox, khi nào dùng cái nào để tạo bố cục responsive tuyệt vời.',
        'image': '/static/assets/images/blog_thumbnails/css_layout.jpg',
        'date': '2024-10-20',
        'category': 'CSS',
        'content': 'Cả CSS Grid và...'
    }
]

# Certificate/Achievement data
CERTIFICATIONS = [
    {
        'year': '2024',
        'title': 'Networking Basics',
        'issuer': 'Cisco Networking Academy',
        'description': 'Foundational networking concepts, architecture, and protocols'
    },
    {
        'year': '2024',
        'title': 'JavaScript Essentials 1',
        'issuer': 'Cisco Networking Academy',
        'description': 'Core JavaScript syntax, variables, and control structures'
    },
    {
        'year': '2024',
        'title': 'JavaScript Essentials 2',
        'issuer': 'Cisco Networking Academy',
        'description': 'Advanced JavaScript, objects, functions, and DOM manipulation'
    },
    {
        'year': '2024',
        'title': 'Complete Java Developer',
        'issuer': 'Udemy',
        'description': 'Hoàn thành khóa học lập trình Java toàn diện'
    },
    {
        'year': '2024',
        'title': 'JavaScript Advanced',
        'issuer': 'Coursera',
        'description': 'Mastered ES6+, Async Programming, DOM APIs'
    },
    {
        'year': '2023',
        'title': 'React & Redux',
        'issuer': 'Udemy',
        'description': 'Chuyên sâu về React Hooks và State Management'
    },
    {
        'year': '2023',
        'title': 'Web Design Fundamentals',
        'issuer': 'Codecademy',
        'description': 'HTML5, CSS3, Responsive Design'
    },
    {
        'year': '2023',
        'title': 'Python for Data Science',
        'issuer': 'DataCamp',
        'description': 'Numpy, Pandas, Matplotlib Basics'
    }
]


@app.route('/')
def index():
    """Home page route"""
    return render_template('index.html')


@app.route('/blog')
def blog():
    """Blog page with list of articles"""
    return render_template('blog.html', posts=BLOG_POSTS)


@app.route('/blog/<int:post_id>')
def blog_detail(post_id):
    """Detailed view of a blog post"""
    # Find the post by ID
    post = next((p for p in BLOG_POSTS if p['id'] == post_id), None)
    
    if not post:
        return render_template('404.html'), 404
    
    # Get related posts (same category, different post)
    related_posts = [p for p in BLOG_POSTS if p['category'] == post['category'] and p['id'] != post_id][:3]
    
    return render_template('post-detail.html', post=post, related_posts=related_posts)


@app.route('/about')
def about():
    """About page with CV and certifications"""
    return render_template('about.html', certifications=CERTIFICATIONS)


@app.route('/contact')
def contact():
    """Contact page with form"""
    return render_template('contact.html')


@app.route('/api/send-message', methods=['POST'])
def send_message():
    """API endpoint to handle contact form submission"""
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')
        
        # Validate data
        if not all([name, email, subject, message]):
            return jsonify({'success': False, 'error': 'Vui lòng điền đầy đủ thông tin'}), 400
        
        # In a real application, you would save this to a database or send an email
        # For now, we'll just return success
        print(f"New message from {name} ({email}): {message}")
        
        return jsonify({
            'success': True,
            'message': 'Tin nhắn đã được gửi thành công! Cảm ơn bạn đã liên hệ.'
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/blog/<int:post_id>')
def get_blog_post(post_id):
    """API endpoint to get a specific blog post"""
    post = next((p for p in BLOG_POSTS if p['id'] == post_id), None)
    if post:
        return jsonify(post)
    return jsonify({'error': 'Post not found'}), 404


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
