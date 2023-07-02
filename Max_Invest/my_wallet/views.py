from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import Http404

from django.db.models import Count, Sum, F, DecimalField
from django.db.models.functions import Cast, Round
from datetime import datetime
from decimal import Decimal

from .forms import TransactionForm, UpdateTransactionForm
from .models import Stock, Transaction
from .serializers import StockSerializer, TransactionSerializer, InvestorSerializer, StockSummarySerializer
from accounts.models import Investor


class InvestorList(APIView):
    def get(self, request):
        user = request.user
        investors = Investor.objects.filter(user=user).all()
        serializer = InvestorSerializer(investors, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = InvestorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InvestorDetail(APIView):
    def get_object(self, request, pk):
        try:
            user = request.user
            return Investor.objects.filter(user=user).get(pk=pk)
        except Investor.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        investor = self.get_object(pk)
        serializer = InvestorSerializer(investor)
        return Response(serializer.data)

    def put(self, request, pk):
        investor = self.get_object(pk)
        serializer = InvestorSerializer(investor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        investor = self.get_object(pk)
        investor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class StockList(APIView):
    def get(self, request):
        user = request.user
        stocks = Stock.objects.filter(user=user).all()
        serializer = StockSerializer(stocks, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = StockSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StockDetail(APIView):
    def get_object(self, request, pk):
        try:
            user = request.user
            return Stock.objects.filter(user=user).get(pk=pk)
        except Stock.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        stock = self.get_object(pk)
        serializer = StockSerializer(stock)
        return Response(serializer.data)

    def put(self, request, pk):
        stock = self.get_object(pk)
        serializer = StockSerializer(stock, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        stock = self.get_object(pk)
        stock.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class TransactionList(APIView):
    def get(self, request):
        user = request.user
        transactions = Transaction.objects.filter(user=user).all()
        serializer = TransactionSerializer(transactions, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TransactionDetail(APIView):
    def get_object(self, request, pk):
        try:
            user = request.user
            return Transaction.objects.filter(user=user).get(pk=pk)
        except Transaction.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        transaction = self.get_object(pk)
        serializer = TransactionSerializer(transaction)
        return Response(serializer.data)

    def put(self, request, pk):
        transaction = self.get_object(pk)
        serializer = TransactionSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        transaction = self.get_object(pk)
        transaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@login_required(login_url='accounts:login')
@api_view(['GET'])
def get_transactions_by_user(request):
    user = request.user
    transactions = Transaction.objects.filter(user=user).select_related('stock')
    serializer = TransactionSerializer(transactions, many=True)
    context = {'transactions': serializer.data}
    return render(request, 'transactions/user_transactions.html', context)

@login_required(login_url='accounts:login')
@api_view(['GET'])
def get_transactions_by_month_year(request, month, year):
    try:
        user = request.user
        month = int(month)
        year = int(year)
        start_date = datetime(year, month, 1)
        end_date = datetime(year, month+1, 1)
        transactions = Transaction.objects.filter(date__gte=start_date, date__lt=end_date, user=user).order_by('date')
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
    except ValueError:
        return Response({'message': 'Invalid month or year format.'}, status=status.HTTP_400_BAD_REQUEST)

@login_required(login_url='accounts:login')
@api_view(['GET'])
def stock_summary(request):
    user = request.user
    tax_b3 = Decimal(0.0325)
    stock_summary = Transaction.objects.filter(user=user, type='C').values('stock', 'stock__code', 'stock__name').annotate(
        total_transactions=Count('id'),
        total_quantity=Sum('amount'),
        total_final=Round(Cast(Sum((F('value') * F('amount')) + F('brokerage') + (F('value') * F('amount') * 0.0325)), output_field=DecimalField(decimal_places=2))),
        preco_medio=Round(Cast(Sum((F('value') * F('amount')) + F('brokerage') + (F('value') * F('amount') * 0.0325)) / (Sum('amount') * Count('id')), output_field=DecimalField(decimal_places=2)))
    )

    serializer = StockSummarySerializer(stock_summary, many=True)
    context = {'stock_summary': serializer.data}
    #return Response(serializer.data)
    return render(request, 'transactions/stock_summary.html', context)


@login_required(login_url='accounts:login')
def transaction_details(request, pk):
    transaction = get_object_or_404(Transaction, pk=pk)
    context = {'transaction': transaction}
    return render(request, 'transactions/transaction_details.html', context)

@login_required(login_url='accounts:login')
@api_view(['GET', 'POST'])
def add_transaction(request):
    if request.method == 'GET':
        # Lógica para lidar com solicitações GET
        # Por exemplo, renderizar o formulário de adição de transação
        form = TransactionForm()
        return render(request, 'transactions/add_transaction.html', {'form': form})

    elif request.method == 'POST':
        # Lógica para lidar com solicitações POST
        form = TransactionForm(request.POST)
        if form.is_valid():
            transaction = form.save(commit=False)
            transaction.user = request.user  # Associa o usuário logado à transação
            transaction.save()
            return redirect('my-wallet:transactions')
        else:
            return Response(form.errors, status=400)

@login_required(login_url='accounts:login')
def update_transaction(request, pk):
    transaction = get_object_or_404(Transaction, pk=pk)
    if request.method == 'POST':
        form = UpdateTransactionForm(request.POST, instance=transaction)
        if form.is_valid():
            form.save()
            return redirect('my-wallet:transactions')
    else:
        form = UpdateTransactionForm(instance=transaction)
    
    context = {'form': form}
    return render(request, 'transactions/update_transaction.html', context)

@login_required(login_url='accounts:login')
def delete_transaction(request, pk):
    # Recupera a transação pelo ID
    transaction = Transaction.objects.get(pk=pk)

    if request.method == 'POST':
        # Confirmação de exclusão
        transaction.delete()
        messages.success(request, 'Transação excluída com sucesso.')
        return redirect('my-wallet:transactions')

    # Renderiza a página de confirmação de exclusão
    context = {'transaction': transaction}
    return render(request, 'transactions/delete_transaction.html', context)