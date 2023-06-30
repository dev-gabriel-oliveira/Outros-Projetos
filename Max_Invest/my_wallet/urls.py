from django.urls import path
from .views import InvestorList, InvestorDetail, StockList, StockDetail, TransactionList, TransactionDetail
from .views import get_transactions_by_user, get_transactions_by_month_year, add_transaction, update_transaction, transaction_details, delete_transaction, PriceAverageAPIView


app_name = 'my-wallet'

urlpatterns = [
    path('api/investors/', InvestorList.as_view(), name='investor-list'),
    path('api/investors/<int:pk>/', InvestorDetail.as_view(), name='investor-detail'),
    path('api/stocks/', StockList.as_view(), name='stock-list'),
    path('api/stocks/<int:pk>/', StockDetail.as_view(), name='stock-detail'),
    path('api/transactions/', TransactionList.as_view(), name='transaction-list'),
     path('api/transactions/<int:pk>/', TransactionDetail.as_view(), name='transaction-detail'),
    

    path('transactions/', get_transactions_by_user, name='transactions'),
    path('api/transactions/<int:year>/<int:month>/', get_transactions_by_month_year, name='transactions-by-month-year'),
    path('transactions/add/', add_transaction, name='add_transaction'),
    path('transactions/<int:pk>/update/', update_transaction, name='update_transaction'),
    path('transactions/<int:pk>/', transaction_details, name='transaction_details'),
    path('transactions/<int:pk>/delete', delete_transaction, name='delete_transaction'),
    path('api/price-average/', PriceAverageAPIView.as_view(), name='price_average'),
]
