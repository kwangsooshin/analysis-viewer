# -*- coding: utf-8 -*-
from django.db import models
import csv
import ast


class Modules (models.Model):
	module_name = models.TextField(blank=True)
	module_korname = models.TextField(blank=True)  # 한글
	# csv_file = models.FileField(upload_to='/modules/csv')
	csv_file = models.TextField(blank=True, default="None") # 파일 path 저장
	url = models.URLField(default='')

	def save(self, *args, **kwargs):
		super(Modules, self).save(*args, **kwargs)
		if (self.csv_file != "None"):
			# read csv file
			fp = open(self.csv_file, 'r')
			fr = csv.reader(fp)

			# save
			for line in fr:
				print("("+line[1]+", "+line[2]+")")
				self.name_list.create(Eng_name=line[1], Kor_name=line[2])
				print("save 완료")
			fp.close()

			super(Modules, self).save()


class EngtoKor_list (models.Model):
	Modules_model = models.ForeignKey(Modules, related_name='name_list', on_delete=models.CASCADE)
	Eng_name = models.TextField(blank=True)
	Kor_name = models.TextField(blank=True)

