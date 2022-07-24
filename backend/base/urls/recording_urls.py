from django.urls import path
from base.views import recording_views as views

urlpatterns = [
    path('', views.getRecordings, name="recordings"),
    path('create/', views.createRecording, name="recording-create"),
    path('uploadfile/', views.uploadFile, name="upload-file"),
    path('<str:pk>/', views.getRecording, name="recording"),
    path('update/<str:pk>/', views.updateRecording, name="recording-update"),
    path('delete/<str:pk>/', views.deleteRecording, name="recording-delete"),          
]