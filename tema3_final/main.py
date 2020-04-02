from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/courses/<name>')
def course(name):
    return render_template('course_template.html')


if __name__ == "__main__":
    app.run(debug=True, port = 3000, host='127.0.0.1')