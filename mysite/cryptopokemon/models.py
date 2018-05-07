from django.db import models

# Create your models here.
class Description(models.Model):
    name = models.CharField(max_length = 50)
    description = models.CharField(max_length = 200)