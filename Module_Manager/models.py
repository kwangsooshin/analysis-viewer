from django.db import models


class Modules (models.Model):
	module_name = models.TextField(blank=True)
	module_korname = models.TextField(blank=True)  # 한글
	csv_file = models.URLField()


class EngtoKor_list (models.Model):
	Modules_model = models.OneToOneField(Modules, related_name='name_list', on_delete=models.CASCADE)
	Eng_name = models.TextField(blank=True)
	Kor_name = models.TextField(blank=True)