from django import forms
from .models import Transaction

class TransactionForm(forms.ModelForm):
    class Meta:
        model = Transaction
        fields = ['stock', 'date', 'value', 'amount', 'brokerage', 'type']
        widgets = {
            'date': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['stock'].label_from_instance = self.label_from_stock_instance

    def label_from_stock_instance(self, obj):
        return obj.code
    
class UpdateTransactionForm(forms.ModelForm):
    class Meta:
        model = Transaction
        fields = ['date', 'value', 'amount', 'brokerage', 'type']
        widgets = {
            'date': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
        }