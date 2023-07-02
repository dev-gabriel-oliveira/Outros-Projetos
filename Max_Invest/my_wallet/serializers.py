from rest_framework import serializers
from .models import  Stock, Transaction
from accounts.models import Investor


class InvestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investor
        fields = '__all__'

class StockSerializer(serializers.ModelSerializer):
    transactions = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='transaction-detail'
    )
    
    class Meta:
        model = Stock
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    stock_code = serializers.CharField(source='stock.code', read_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'date', 'value', 'amount', 'brokerage', 'type', 'user', 'stock', 'stock_code']

class StockSummarySerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='stock')
    code = serializers.CharField(source='stock__code')
    name = serializers.CharField(source='stock__name')
    total_transactions = serializers.IntegerField()
    total_quantity = serializers.IntegerField()
    total_final = serializers.DecimalField(max_digits=15, decimal_places=2)
    preco_medio = serializers.DecimalField(max_digits=15, decimal_places=2)

    class Meta:
        model = Stock
        fields = ['id', 'code', 'name', 'total_transactions', 'total_quantity', 'total_final', 'preco_medio']