import json
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import LocationVO, Hat

# Create your views here.
class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = [ "closet_name", "import_href"]

class HatsDetailsEncoder(ModelEncoder):
    model = Hat
    properties = [ "style", "id", "fabric", "color", "picture_url"]
    encoders = {
        "location": LocationVOEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_hats_list(request):
    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse(
            hats,
            encoder=HatsDetailsEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            location = LocationVO.objects.get(import_href=content["location"])
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatsDetailsEncoder,
            safe=False,
        )



@require_http_methods(["DELETE"])
def api_hat_details(request, pk):
    if request.method == "DELETE":
        try:
            count, _ = Hat.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})   
        except Hat.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location"},
                status=400,
            )