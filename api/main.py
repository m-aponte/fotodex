import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from mongo_client import mongo_client

gallery = mongo_client.gallery
images_collection = gallery.images

load_dotenv(dotenv_path=".env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random/"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
    raise EnvironmentError("Please create .env.local file and insert UNSPLASH_KEY")

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG


@app.route("/new-image")
def new_image():
    word = request.args.get("query")
    headers = {"Accept-Version": "v1", "Authorization": f"Client-ID {UNSPLASH_KEY}"}
    params = {"query": word}
    response = requests.get(UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    return data


@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        my_images = images_collection.find({})
        return jsonify([img for img in my_images])
        # read images from db
    if request.method == "POST":
        # save image in db
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}


@app.route("/images/<image_id>", methods=["DELETE"])
def images_single(image_id):
    delete_result = images_collection.delete_one({"_id": image_id})
    if delete_result.deleted_count == 1:
        return {"deleted_id": image_id}
    else:
        return {"error": "Image not found"}, 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
