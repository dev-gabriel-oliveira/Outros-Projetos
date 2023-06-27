from django.contrib.auth.views import LoginView
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
from .forms import UserRegistrationForm

class RegistrationView(CreateView):
    form_class = UserRegistrationForm
    template_name = 'accounts/registration.html'
    success_url = reverse_lazy('my-wallet:transactions')  # Redireciona para my-wallet/transactions

class CustomLoginView(LoginView):
    template_name = 'accounts/login.html'

    def get_success_url(self):
        return reverse_lazy('my-wallet:transactions')  # Redireciona para my-wallet/transactions
