# Generated by Django 4.0.4 on 2022-04-26 22:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('rating', models.IntegerField(blank=True, default=0, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('grupo', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.grupo')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('page', models.CharField(blank=True, max_length=200, null=True)),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('author', models.CharField(blank=True, max_length=200, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('rating', models.IntegerField(blank=True, default=0, null=True)),
                ('image', models.CharField(blank=True, max_length=200, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('grupo', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.grupo')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Forum',
            fields=[
                ('forum', models.CharField(blank=True, max_length=200, null=True)),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('author', models.CharField(blank=True, max_length=200, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('rating', models.IntegerField(blank=True, default=0, null=True)),
                ('image', models.CharField(blank=True, max_length=200, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('grupo', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.grupo')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='File',
            fields=[
                ('file', models.CharField(blank=True, max_length=200, null=True)),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('author', models.CharField(blank=True, max_length=200, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('rating', models.IntegerField(blank=True, default=0, null=True)),
                ('image', models.CharField(blank=True, max_length=200, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('grupo', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.grupo')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Bookmark',
            fields=[
                ('bookmark', models.CharField(blank=True, max_length=200, null=True)),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('author', models.CharField(blank=True, max_length=200, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('rating', models.IntegerField(blank=True, default=0, null=True)),
                ('image', models.CharField(blank=True, max_length=200, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('grupo', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.grupo')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('blog', models.CharField(blank=True, max_length=200, null=True)),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('author', models.CharField(blank=True, max_length=200, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('rating', models.IntegerField(blank=True, default=0, null=True)),
                ('image', models.CharField(blank=True, max_length=200, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('grupo', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.grupo')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('activity', models.CharField(blank=True, max_length=200, null=True)),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('rating', models.IntegerField(blank=True, default=0, null=True)),
                ('image', models.CharField(blank=True, max_length=200, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('blog', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.blog')),
                ('bookmark', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.bookmark')),
                ('file', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.file')),
                ('forum', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.forum')),
                ('grupo', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.grupo')),
                ('page', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.page')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
