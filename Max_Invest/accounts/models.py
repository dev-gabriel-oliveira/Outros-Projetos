from django.db import models
from django.contrib.auth.models import AbstractUser


class Investor(AbstractUser):
    RISK_CHOICES = (
        ('conservador', 'Conservador'),
        ('moderado', 'Moderado'),
        ('arrojado', 'Arrojado'),
    )

    risk_profile = models.CharField(
        max_length=20,
        choices=RISK_CHOICES,
        default='conservador'
    )
