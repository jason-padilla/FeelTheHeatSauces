from django.db import models

class HotSauce(models.Model):
    name = models.CharField(max_length=50)
    spice = models.CharField(max_length=50)
    price = models.FloatField()
    description = models.TextField()
    ingredients = models.TextField()
    image_name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)