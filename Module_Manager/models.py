from django.db import models
import csv


class Modules (models.Model):
	module_name = models.TextField(blank=True)
	module_korname = models.TextField(blank=True)  # 한글
	# csv_file = models.FileField(upload_to='/modules/csv')
	csv_file = models.TextField(blank=True)
	url = models.URLField(default='')

	def save(self, *args, **kwargs):
		# read csv file
		fp = open(self.csv_file, 'r', encoding='utf-8')
		fpr = csv.reader(fp)
		for line in fpr:
			N_eng = line[1]
			N_kor = line[2]

			# EngtoKor_list.objects.create(Modules_model=self, Eng_name=N_eng, Kor_name=N_kor)
			self.name_list.create(Eng_name=N_eng, Kor_name=N_kor)
		fp.close()



class EngtoKor_list (models.Model):
	Modules_model = models.ForeignKey(Modules, related_name='name_list', on_delete=models.CASCADE)
	Eng_name = models.TextField(blank=True)
	Kor_name = models.TextField(blank=True)
