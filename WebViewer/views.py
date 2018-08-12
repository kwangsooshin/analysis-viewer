from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .forms import UploadFileForm, ImageFileUploadForm
from .models import ImageModel
from django.db.models import F
from Module_Manager.models import Modules
from utils import get_names, image_process
from utils.convert import cvtReqbody2Json, string2json
import json
import ast

# names = get_names.read_modules()
names = get_names.read_modules_model()

@csrf_protect
@csrf_exempt
def home_view(request):
	global names
	form = ImageFileUploadForm(request.POST, request.FILES)
	module_str = ""

	if request.method == 'POST':
		try:
			# json_str = (request.body).decode('utf-8')
			# json_data = cvtReqbody2Json(json_str)
			# if json_data['id'] == "init":
			# 	model_names = []
			# 	for name in names:
			# 		mname = name.replace(".", "_")
			# 		model_names.append(mname)
			# 	return HttpResponse(json.dumps({'names': model_names}), 'application/json')
			model_names = []
			for n, k in names.items():
				model_names.append(k)
			return HttpResponse(json.dumps({'names': model_names}), 'application/json')

		except:
			if form.is_valid():
				input = ImageModel()
				input.image = form.cleaned_data["photo"]
				# width = input.image_width
				# height = input.image_height
				checkbox = string2json(form.cleaned_data["checkbox"])

				for key, value in checkbox.items():
					if value == True:
						module_str = module_str+str(key)+','
				module_str = module_str[0:-1]
				module_str = module_str.replace("_",".")
				input.chosen_module = module_str
				print(module_str)
				input.save()

				json_data = ast.literal_eval(input.test)
				boxed_img_url = image_process.object_boxing("D:/ImageUploader_practice/" + input.get_absolute_image_url, json_data, input.id)
				saved = True
				return JsonResponse({
					'error': False,
					'message': 'Uploaded Successfully',
					'image': str(input.image),
					# 'width' : width,
					# 'height' : height,
					'json_data' : json_data,
					'img_id' : input.token
				})
			else:
				return JsonResponse({'error': True, 'errors': form.errors})

	else :
		return render(request, 'app/home.html', locals())
