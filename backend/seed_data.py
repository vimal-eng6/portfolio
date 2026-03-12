import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User
from users.models import UserProfile
from skills.models import Skill
from projects.models import Project

# 1. Update or Create Admin
admin_user, created = User.objects.get_or_create(username='admin')
admin_user.set_password('admin123')
admin_user.is_staff = True
admin_user.is_superuser = True
admin_user.save()
print("Admin user 'admin' updated with password 'admin123'")

# 2. Create Sample Profile
if not UserProfile.objects.exists():
    UserProfile.objects.create(
        name="Vimal",
        role="Full Stack Developer",
        bio="Passionate developer building modern web applications with React and Django.",
        email="arumugamvimal1@gmail.com",
        github_link="https://github.com/vimal-eng6/portfolio.git",
        linkedin_link="https://www.linkedin.com/in/vimal-a-b5b358320.com"
    )
    print("Sample profile created.")

# 3. Create Sample Skills
Skill.objects.all().delete()
skills_to_create = [
    {'name': 'HTML/CSS', 'category': 'frontend', 'proficiency_level': 95, 'icon': 'Code'},
    {'name': 'JavaScript', 'category': 'frontend', 'proficiency_level': 90, 'icon': 'Code'},
    {'name': 'React', 'category': 'frontend Framework', 'proficiency_level': 50, 'icon': 'Code'},
    {'name': 'Tailwind CSS', 'category': 'frontend Framework', 'proficiency_level': 60, 'icon': 'Code'},
    {'name': 'Python', 'category': 'backend', 'proficiency_level': 70, 'icon': 'Code'},
    {'name': 'SQL[DB]', 'category': 'backend', 'proficiency_level': 50, 'icon': 'Database'},
    {'name': 'Django', 'category': 'backend Framework', 'proficiency_level': 85, 'icon': 'Code'},
    {'name': 'Manual Testing', 'category': 'testing', 'proficiency_level': 70, 'icon': 'Check'},
    {'name': 'Git', 'category': 'tools', 'proficiency_level': 50, 'icon': 'GitBranch'},
]
for skill_data in skills_to_create:
    Skill.objects.create(**skill_data)
print("Sample skills created (refreshed).")

# 4. Create Sample Projects
for item in [
    {
        'title': "Portfolio Project",
        'defaults': {
            'description': "A full-stack portfolio built with React and Django.",
            'case_study': """The Challenge...""", # (Keeping existing text)
            'technologies_used': "React, Django, Tailwind CSS, Framer Motion",
            'github_url': "https://github.com/vimal-eng6/portfolio.git",
        }
    }
]:
    Project.objects.update_or_create(title=item['title'], defaults=item['defaults'])
print("Sample projects updated/created.")

# 5. Create Sample Experience
from users.models import Experience
for item in [
    {
        'company': "CALDIM",
        'role': "Full Stack Developer",
        'defaults': {
            'location': "Hosur, TN",
            'start_date': "2026-03-12",
            'is_current': True,
            'description': "Built a scalable full-stack web application using React and Django, implementing RESTful APIs, user authentication, and database integration."
        }
    }
]:
    Experience.objects.update_or_create(company=item['company'], role=item['role'], defaults=item['defaults'])
print("Sample experiences updated/created.")
