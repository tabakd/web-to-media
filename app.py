from flask import Flask, request, render_template, url_for
import json
from react import jsx
import youtube_dl

with open('static/js/main.js', "w") as jsx_file:
    jsx_file.write(jsx.transform('static/js/main.jsx'))

app = Flask(__name__)
ydl = youtube_dl.YoutubeDL({'outtmpl': '%(id)s%(ext)s'})



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/url')
def get_url():
    with ydl:
        result = ydl.extract_info(request.args.get('q'), download=False)
    print result['url']
    return json.dumps({
        'url': result['url'],
        'thumbnail': result['thumbnail']
    })

app.run(debug=True)

