from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

from users.views import UserProfileViewSet, ExperienceViewSet
from skills.views import SkillViewSet
from projects.views import ProjectViewSet
from blog.views import BlogPostViewSet
from contact.views import ContactMessageViewSet

router = DefaultRouter()
router.register(r'profile', UserProfileViewSet, basename='profile')
router.register(r'experience', ExperienceViewSet)
router.register(r'skills', SkillViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'blog', BlogPostViewSet)
router.register(r'contact', ContactMessageViewSet)

from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('login/', RedirectView.as_view(url='/admin/login/', permanent=True)),
    path('', RedirectView.as_view(url='/api/', permanent=True)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
