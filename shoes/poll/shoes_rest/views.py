from django.shortcuts import render
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import Shoe, BinVO
import json
from .acls import get_photo
# Create your views here.
class BinListEncoder(ModelEncoder):
    model = BinVO
    properties = ["bin_number"]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["model_name"]

    def get_extra_data(self, o):
        return {"bin": o.bin.bin_number}

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "model_name",
        "manufacturer",
        "picture_url",
        "color",
        "bin",
    ]


@require_http_methods(["GET", "POST"])
def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            bin_number = content["bin"]
            bin = BinVO.objects.get(bin_number=bin_number)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )
        photo = get_photo(content["color"], content["manufacturer"], content["model"])
        content.update(photo)
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_show_shoe(request, pk):
    shoe = Shoe.objects.get(id=pk)
    if request.method == "GET":
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET"])
def api_list_bins(request):
    bins = BinVO.objects.all()
    return JsonResponse(
            {"bins": bins},
            encoder=BinListEncoder,
        )
