from rest_framework.decorators import api_view
from rest_framework.response import Response

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
