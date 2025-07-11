from django.urls import path
from .views import ResumeReview

urlpatterns = [
    path('review/', ResumeReview.as_view(), name='resume-review'),

]
