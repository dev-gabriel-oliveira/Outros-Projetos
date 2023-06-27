from django.db import models
from mysite.settings import AUTH_USER_MODEL
import re
from django.db.models import Sum
from decimal import Decimal


class Stock(models.Model):
    code = models.CharField(max_length=6, unique=True)
    name = models.CharField(max_length=35)
    cnpj = models.CharField(max_length=18)

    def __str__(self):
        return self.code

    def clean_fields(self, exclude=None):
        super().clean_fields(exclude=exclude)
        self.clean_cnpj()

    def clean_cnpj(self):
        pattern = re.compile(r'^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$')
        if not pattern.match(self.cnpj):
            raise models.ValidationError('O CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX')

class Transaction(models.Model):
    type_options = (
        ("C", "Compra"),
        ("V", "Venda")
    )

    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE, null=False)
    date = models.DateField(verbose_name='Data de Investimento')
    value = models.DecimalField(verbose_name='Valor Unitário',max_digits=15,decimal_places=2,default=0)
    amount = models.IntegerField(verbose_name='Quantidade',default=0)
    brokerage = models.DecimalField(verbose_name='Corretagem',max_digits=5,decimal_places=2,default=0)
    type = models.CharField(verbose_name='Tipo', max_length=1, choices=type_options, null=False, blank=True)

    def __str__(self):
        return self.stock
    
    # taxa = 0,0325%
    def taxab3(self):
        return round(((self.value * self.amount) * Decimal(0.0325)), 2)
    
    def total_value(self):
        return self.value * self.amount
    
    def total_taxas(self):
        return round((self.brokerage + ((self.value * self.amount) * Decimal(0.0325))), 2)
    
    def total_final(self):
        if self.type == 'C':
            return round(((self.value * self.amount) + (self.brokerage + ((self.value * self.amount) * Decimal(0.0325)))), 2)
        if self.type == 'V':
            return round(((self.value * self.amount) - (self.brokerage + ((self.value * self.amount) * Decimal(0.0325)))), 2)
        
  
    def preco_medio(self):
            cont = Transaction.objects.filter(stock=self.stock, type='C').count()  
            pm = Transaction.objects.filter(stock=self.stock, type='C').aggregate
            (Sum(round(((self.value * self.amount) + (self.brokerage + ((self.value * self.amount) * Decimal(0.0325)))), 2)))['total_final__sum']  
            pm = pm / cont if cont != 0 else 0 
            return round(pm, 2)


    def lucro_prejuizo(self):
            if self.type == 'V':
                cont = Transaction.objects.filter(stock=self.stock, type='C').count()  
                pm = Transaction.objects.filter(stock=self.stock, type='C').aggregate(Sum(round(((self.value * self.amount) + (self.brokerage + ((self.value * self.amount) * Decimal(0.0325)))), 2)))['total_final__sum']  
                pm = pm / cont if cont != 0 else 0

                return round(round(((self.value * self.amount) - (self.brokerage + ((self.value * self.amount) * Decimal(0.0325)))), 2) - (self.amount * round(pm, 2)), 2)

    class Meta:
        ordering = ['date']