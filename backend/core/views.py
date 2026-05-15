from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["POST"])
def query_view(request):
    print(request.data)
    prompt = request.data.get("prompt")
    print(f"User said : {prompt}")
    return Response( data="Prompt Recieved ")
