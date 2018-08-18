from django.contrib import admin
from .models import Input, ResultModel, ResultLabelModel, ResultPositionModel


admin.site.register(Input)
admin.site.register(ResultModel)
admin.site.register(ResultLabelModel)
admin.site.register(ResultPositionModel)