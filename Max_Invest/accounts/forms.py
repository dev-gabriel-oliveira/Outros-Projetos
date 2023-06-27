from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Investor

class UserRegistrationForm(UserCreationForm):
    email = forms.EmailField()
    risk_profile = forms.ChoiceField(choices=Investor.RISK_CHOICES)

    class Meta:
        model = Investor
        fields = ('username', 'email', 'password1', 'password2', 'risk_profile')
