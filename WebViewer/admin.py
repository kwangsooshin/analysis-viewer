from django.contrib import admin
from .models import ImageModel, ResultModel, ResultPositionModel, ResultLabelModel


admin.site.register(ImageModel)
admin.site.register(ResultModel)
admin.site.register(ResultPositionModel)
admin.site.register(ResultLabelModel)