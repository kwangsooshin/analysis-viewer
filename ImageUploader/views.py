from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .forms import UploadFileForm, ImageFileUploadForm
from .models import Input
from utils import get_names, image_process
from utils.convert import cvtReqbody2Json, string2json, json2format
import json
import ast

names = get_names.read_modules()
DB_names = get_names.read_modules_model()


@csrf_protect
@csrf_exempt
def home_view(request):
	global names
	global DB_names
	form = ImageFileUploadForm(request.POST, request.FILES)
	module_str = ""

	if request.method == 'POST' :
		try:
			# 모듈이름을 DB에서 가져옴
			module_kornames = []
			module_changedname = []
			for n, k in DB_names.items():
				module_kornames.append(k)
				n = n.replace(".", "_")
				module_changedname.append(n)
			# print("언더바로 바꾼 이름들: " + str(module_changedname))
			# print("읽어온 모듈 이름들: " + str(module_kor
			# names))

			# 모듈이름을 서버에서 가져옴
			json_str = (request.body).decode('utf-8')
			json_data = cvtReqbody2Json(json_str)
			if json_data['id'] == "init" :
				model_names = []
				for name in names :
					mname = name.replace(".", "_")
					model_names.append(mname)
				return HttpResponse(json.dumps({'names': module_kornames, 'changed_names': module_changedname}), 'application/json')
				# return HttpResponse(json.dumps({'names': model_names}), 'application/json')

		except:
			if form.is_valid():
				input = Input()
				input.photo = form.cleaned_data["photo"]
				width = input.image_width
				height = input.image_height
				checkbox = string2json(form.cleaned_data["checkbox"])
				threshold = form.cleaned_data["threshold"]

				for key, value in checkbox.items():
					if value == True:
						module_str = module_str+str(key)+','
				module_str = module_str[0:-1]
				module_str = module_str.replace("_",".")
				input.image_module = module_str
				input.threshold = threshold
				input.save()
				Results = json2format(input.test, input.threshold) # threshold로 거른 결과값 저장
				json_data = ast.literal_eval(input.test)
				# boxed_img_url = image_process.object_boxing("D:/AnalysisViewer/" + input.get_absolute_image_url, Results, input.id) # 수정필요 (상대주소로)
				# print(boxed_img_url)
				return JsonResponse({
					'error': False,
					'message': 'Uploaded Successfully',
					'image': str(input.photo),
					'width': width,
					'height': height,
					'json_data' : json_data,
					'img_id' : input.id,
					'results' : Results,
				})
			else:
				print(form.errors)
				return JsonResponse({'error': True, 'errors': form.errors})

	else :
		return render(request, 'ImageUploader/home.html', locals())


