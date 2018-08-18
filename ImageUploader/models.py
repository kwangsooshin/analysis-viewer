from django.db import models
from ImageUploader import tasks
from django.conf import settings
import ast


class Input(models.Model):
	photo = models.ImageField(upload_to='pictures', width_field='image_width', height_field='image_height')
	image_width = models.IntegerField(default=0)
	image_height = models.IntegerField(default=0)
	image_module = models.TextField(blank=True)
	test = models.TextField(blank=True)
	id = models.AutoField(primary_key=True)
	checkbox = models.CharField(default="", max_length=500)
	threshold = models.FloatField(null=True, unique=False)

	class Meta:
		db_table = "Input"

	def save(self, *args, **kwargs):
		super(Input, self).save(*args, **kwargs)

		self.test = str(tasks.communicatior("http://mlcoconut.sogang.ac.kr:8000/analyzer/", self.photo.path, modules=str(self.image_module)))
		json_data = ast.literal_eval(self.test)
		for modules_results in json_data:
			self.result.create(result_model=self, values = str(modules_results), threshold=self.threshold)
		super(Input, self).save()

	@property
	def get_absolute_image_url(self):
		return "{}".format(self.photo.url)


class ResultModel(models.Model):
	result_model = models.ForeignKey(Input, related_name='result', on_delete=models.CASCADE)
	module_name = models.TextField()
	values = models.TextField()
	threshold = models.FloatField(null=True, unique=False)

	def save(self, *args, **kwargs):
		super(ResultModel, self).save(*args, **kwargs)
		print(self.values)
		json_data = ast.literal_eval(self.values)
		self.module_name = json_data['module_name']
		for module_results in json_data['module_result']:
			y = module_results['position']['y']
			h = module_results['position']['h']
			w = module_results['position']['w']
			x = module_results['position']['x']
			self.position.create(values=str(module_results['label']), x=x, y=y, w=w, h=h, threshold=self.threshold)
		super(ResultModel, self).save()


class ResultPositionModel(models.Model):
	result_detail_model = models.ForeignKey(ResultModel, related_name='position', on_delete=models.CASCADE)
	values = models.TextField()
	x = models.FloatField(null=True, unique=False)
	y = models.FloatField(null=True, unique=False)
	w = models.FloatField(null=True, unique=False)
	h = models.FloatField(null=True, unique=False)
	threshold = models.FloatField(null=True, unique=False)

	class Meta:
		ordering = ['x', 'y', 'w', 'h']

	def save(self, *args, **kwargs):
		super(ResultPositionModel, self).save(*args, **kwargs)
		json_data = ast.literal_eval(self.values)
		for labels in json_data:
			temp_int = round(float(labels['score']), 2)
			if (temp_int >= self.threshold):
				self.label.create(description=labels['description'], score=temp_int)


class ResultLabelModel(models.Model):
	result_detail_model = models.ForeignKey(ResultPositionModel, related_name='label', on_delete=models.CASCADE)
	description = models.TextField(null=True, unique=False)
	score = models.FloatField(null=True, unique=False)

	# class Meta:
	# 	ordering = ['-score']