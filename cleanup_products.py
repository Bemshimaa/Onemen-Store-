import requests
import json

try:
    # Use local backend to delete from local DB first
    # Then user will need to do same for live or I can try if I have the URL
    response = requests.get("http://localhost:5000/api/products")
    products = response.json()
    
    for p in products:
        if "ringer" not in p['name'].lower():
            print(f"Deleting product: {p['name']} (ID: {p['_id']})")
            # Note: Deletion endpoint usually requires admin token.
            # I might need to use Mongoose directly if I can or the API if I have a token.
            # Actually, I'll just write a small script that uses the Model directly to be sure.
except Exception as e:
    print(f"Error: {e}")
