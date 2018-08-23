from django import forms
from .models import Input


class UploadFileForm(forms.Form):
    photo = forms.ImageField()


class UploadModulesForm(forms.Form):
    Module = forms.CharField(max_length=100)


class UserlistForm(forms.Form):
    users = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple, label="modules")


class ImageFileUploadForm(forms.ModelForm):
    class Meta:
        model = Input
        fields = ('photo', 'checkbox', 'threshold',)