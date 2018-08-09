from rest_framework import exceptions
from django.db import models
from WebViewer import tasks
from django.conf import settings


class ImageModel(models.Model):
    image = models.ImageField(upload_to='pictures')
    token = models.AutoField(primary_key=True)
    chosen_module = models.TextField(blank=True)
    test = models.TextField(blank=True)
    # uploaded_date = models.DateTimeField(auto_now_add=True)
    # updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "ImageModel"

    def save(self, *args, **kwargs):
        super(ImageModel, self).save(*args, **kwargs)
        self.test = str(tasks.communicatior("http://210.217.95.183:8000/analyzer/", self.image.path,
                                            modules=str(self.chosen_module))) # 수정하기
        super(ImageModel, self).save()

    @property
    def get_absolute_image_url(self):
        return "{}".format(self.image.url)


class ResultModel(models.Model):
    result_model = models.ForeignKey(ImageModel, related_name='result', on_delete=models.CASCADE)
    values = models.TextField()

    def save(self, *args, **kwargs):
        if not (isinstance(self.values[0], list) and isinstance(self.values[1], dict)):
            # raise exceptions.ValidationError("Module return value Error. Please contact the administrator")
            pass
        super(ResultModel, self).save(*args, **kwargs)
        x, y, w, h = self.values[0]
        ResultPositionModel.objects.create(result_detail_model=self, x=x, y=y, w=w, h=h)
        for item in self.values[1].items():
            self.label.create(description=item[0], score=float(item[1]))
        super(ResultModel, self).save()


class ResultPositionModel(models.Model):
    result_detail_model = models.OneToOneField(ResultModel, related_name='position', on_delete=models.CASCADE)
    x = models.FloatField(null=True, unique=False)
    y = models.FloatField(null=True, unique=False)
    w = models.FloatField(null=True, unique=False)
    h = models.FloatField(null=True, unique=False)

    class Meta:
        ordering = ['x', 'y', 'w', 'h']


class ResultLabelModel(models.Model):
    result_detail_model = models.ForeignKey(ResultModel, related_name='label', on_delete=models.CASCADE)
    description = models.TextField(null=True, unique=False)
    score = models.FloatField(null=True, unique=False)

    class Meta:
        ordering = ['-score']