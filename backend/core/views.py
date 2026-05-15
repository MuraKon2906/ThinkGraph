from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["POST"])
def query_view(request):
    print(request.data)

    return Response({
        "message": "Data received"
    })
