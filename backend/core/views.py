import os 
from dotenv import load_dotenv 
from google import genai 

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

@api_view(["POST"])
def query_view(request):
    print(request.data)
    prompt = request.data.get("prompt")
    material = request.FILES.get("material")
    print(f"User said : {prompt}")
    
    if not material : 
        print("Material not recieved")
    if material : 

        print(f"File name : {material.name}")
        print(f"File size : {material.size}")
    return Response( data="Prompt Recieved ")

def api_test(request) : 
    try : 
        load_dotenv()
        api_key = os.getenv("API_KEY")
        client = genai.Client(api_key=api_key)

        response = client.models.generate_content(model="gemini-2.5-flash" , contents="Explain me quantum computing in easy terms")
        return JsonResponse({
            "response" : response.text
        })


       
    except Exception as e  : 
        print(e)
