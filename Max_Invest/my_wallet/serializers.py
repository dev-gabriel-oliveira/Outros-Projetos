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