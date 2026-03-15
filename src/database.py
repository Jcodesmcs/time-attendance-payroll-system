from dotenv import load_dotenv
import os
import firebase_admin
from firebase_admin import credentials, db

load_dotenv()

cred = credentials.Certificate("credentials.json")

firebase_admin.initialize_app(cred, {
    "databaseURL": os.getenv("FIREBASE_DATABASE_URL")
})

ref = db.reference()

data = {
    "name": "John",
    "age": "20",
    "address": ["new york", "los angeles"]
}

ref.push(data)
