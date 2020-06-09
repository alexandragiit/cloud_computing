import datetime, json
from flask import Flask, render_template
from google.auth.transport import requests
import google.oauth2.id_token
from flask import request, make_response, url_for, redirect

from google.cloud import datastore
from google.cloud import storage

app = Flask(__name__)




# firebase_request_adapter = requests.Request()
# def verify_auth():
#   # Verify Firebase auth.
#     id_token = request.cookies.get("token")
#     error_message = None
#     claims = None
#     times = None
#     if id_token:
#         try:
#             # Verify the token against the Firebase Auth API. This example
#             # verifies the token on each page load.
#             claims = google.oauth2.id_token.verify_firebase_token(id_token, firebase_request_adapter)
#         except ValueError as exc:
#             # This will be raised if the token is expired or any other
#             # verification checks fail.
#             error_message = str(exc)
#     return (claims, error_message)



@app.route('/courses', methods = ['GET'])
def view_courses():
   
    client = datastore.Client()
    query = client.query(kind='Course')
    query_iter = query.fetch()
    ret = []
    for entity in query_iter:
        # for k in entity:
        #     print(entity[k])
        ret.append(json.dumps(entity))
    return json.dumps(ret)


@app.route('/add', methods = ['POST'])
def add_to_datastore():
   
    # datastore_client = datastore.Client()
    # kind = 'Course'
    # # The name/ID for the new entity
    # name = 'samplecourse1'
    # # The Cloud Datastore key for the new entity
    # task_key = datastore_client.key(kind, name)

    # # Prepares the new entity
    # task = datastore.Entity(key=task_key)
    # task['description'] = 'Test course add to datastore'
    # datastore_client.put(task)
    succes = "Succes"

    
    return succes

@app.route('/lesson/file', methods = ["GET", "POST"])
def lesson_file():

    print(request.data)

    client = storage.Client()

    bucket = client.get_bucket('lessons_1996')
    print('lessons/' + str(request.data)[2:-1])
    blob = storage.Blob('lessons/' + str(request.data)[2:-1], bucket)

    blob = blob.download_as_string()
    return blob

@app.route('/translate', methods= ["GET", "POST"])
def translate():

    from google.cloud import translate_v2 as translate
    translate_client = translate.Client()

    # request_json = request.get_json(force =True)
    # text = request_json['text']
    language = 'de'
    text = request.data
    text = json.loads(text)
    print(text)
    # if isinstance(text, six.binary_type):
    # text = text.decode('utf-8')

    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.
    result = translate_client.translate(text, target_language=language)
    return result
    
@app.route('/lesson')
def lesson():



    # claims, error_message = verify_auth()

    # trebuie toate lectiile care apartin unui anumit curs
    client = storage.Client()
    bucket = client.get_bucket('lessons_1996')
    cnt = 0
    filenames = []
    for blob in client.list_blobs('lessons_1996'):
        name = blob.name.split('/')
        folder = name[0]
        file = name[1]
        if(folder == "lessons"  and file != ""):
            filenames.append(file)
            cnt += 1


    result = {"cnt" : cnt, "filenames" : filenames}
    return render_template('lessons.html', result = result)
    # if(claims):
    #     return render_template('lessons.html', user_data=claims, error_message=error_message, result = result)
    # else:
    #     return redirect(url_for('login'))


@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/')
def root():

    # claims, error_message = verify_auth()


    
    # if(claims):
    #     return render_template('index.html', user_data=claims, error_message=error_message, result = result)
    # else:
    #     return redirect(url_for('login'))

    result = 'placeholder'
    return render_template('index.html', result = result)
    


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host='localhost', port=8080, debug=True)



