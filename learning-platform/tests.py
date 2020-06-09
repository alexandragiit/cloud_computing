from google.cloud import storage
client = storage.Client()

bucket = client.get_bucket('lessons_1996')

blob = storage.Blob('lesson1.json', bucket)
print(blob)