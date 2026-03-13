import requests
import json

try:
    response = requests.get("http://localhost:5000/api/products")
    products = response.json()
    for p in products:
        if "ringer" in p['name'].lower():
            print(f"ID: {p['_id']}")
except Exception as e:
    print(f"Error: {e}")
