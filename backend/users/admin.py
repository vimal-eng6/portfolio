from django.contrib import admin
from .models import UserProfile, Experience

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'email')

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('company', 'role', 'start_date', 'is_current')
    list_filter = ('company', 'is_current')
