"""
Generate placeholder images for blog posts
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Tạo thư mục nếu chưa tồn tại
os.makedirs('static/assets/images/blog_thumbnails', exist_ok=True)

# Màu sắc cho các loại bài viết
colors = {
    'java_basic_1': '#F39C12',
    'java_oop': '#E74C3C',
    'java_collections': '#C0392B',
    'java_stream': '#D35400',
    'java_patterns': '#A93226',
    'js_es6': '#9B59B6',
    'js_async': '#8E44AD',
    'js_dom': '#6C3483',
    'react_hooks': '#3498DB',
    'css_layout': '#1ABC9C'
}

# Tiêu đề cho mỗi ảnh
titles = {
    'java_basic_1': 'Java\nCơ Bản',
    'java_oop': 'Java\nOOP',
    'java_collections': 'Java\nCollections',
    'java_stream': 'Java\nStream API',
    'java_patterns': 'Design\nPatterns',
    'js_es6': 'JavaScript\nES6+',
    'js_async': 'Async/\nAwait',
    'js_dom': 'DOM\nManipulation',
    'react_hooks': 'React\nHooks',
    'css_layout': 'CSS\nLayout'
}

def create_placeholder_image(filename, color, title):
    """Tạo ảnh placeholder với màu và text"""
    # Kích thước ảnh
    width, height = 600, 400
    
    # Tạo ảnh
    image = Image.new('RGB', (width, height), color)
    draw = ImageDraw.Draw(image)
    
    # Thêm text (sử dụng font mặc định)
    text = title
    text_color = 'white'
    
    # Vẽ text ở giữa ảnh
    bbox = draw.textbbox((0, 0), text)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    draw.text((x, y), text, fill=text_color)
    
    # Lưu ảnh
    image.save(f'static/assets/images/blog_thumbnails/{filename}.jpg', 'JPEG', quality=85)
    print(f'Created: {filename}.jpg')

# Tạo tất cả các ảnh placeholder
for filename, color in colors.items():
    title = titles.get(filename, filename)
    create_placeholder_image(filename, color, title)

print('✅ Tất cả ảnh placeholder đã được tạo!')
