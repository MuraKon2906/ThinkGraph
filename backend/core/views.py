from django.http import JsonResponse


def TestView(request):

    data = {"name": "Shaan", "sex": "male", "age": 23}

    return JsonResponse(data=data)
