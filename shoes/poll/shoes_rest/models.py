from django.db import models

# Create your models here.
class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    picture_url = models.URLField(null=True)
    bin = models.ForeignKey('BinVO', related_name="shoes", on_delete=models.PROTECT, null=True, blank=True)

class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()
