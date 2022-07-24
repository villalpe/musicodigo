from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
#from .grupos import grupos
from base.models import Recording
from base.serializer import RecordingSerializer

# Create your views here.
from rest_framework import status

@api_view(['GET'])
def getRecordings(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    recordings = Recording.objects.filter(name__icontains=query)
    serializer = RecordingSerializer(recordings, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getRecording(request, pk):
    recording = Recording.objects.get(_id=pk)
    serializer = RecordingSerializer(recording, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRecording(request):
    user = request.user
    recording = Recording.objects.create(
        user = user,
        name = 'Sample Name',
        author = 'Sample Author',
        comment = '',
        time_rec = 0,
    )
    serializer = RecordingSerializer(recording, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateRecording(request, pk):
    data = request.data
    recording = Recording.objects.get(_id=pk)

    recording.name = data['name']
    recording.author = data['author']
    recording.comment = data['comment']
    recording.time_rec = data['time_rec']

    recording.save()            

    serializer = RecordingSerializer(recording, many=False)
    return Response(serializer.data)   

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteRecording(request, pk):
    recording = Recording.objects.get(_id=pk)
    recording.delete()
    return Response('Recording was deleted')

@api_view(['POST'])
def uploadFile(request):
    data = request.data

    recording_id = data['recording_id']
    recording = Recording.objects.get(_id=recording_id)

    recording.audio_file = request.FILES.get('audio_file')
    recording.save()

    return Response('File was uploaded')        