from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            contact_instance = serializer.save()
            
            # Send Email Trigger
            try:
                subject = f"New Portfolio Inquiry: {contact_instance.subject}"
                email_body = f"""
                You have received a new message from your portfolio website.
                
                Name: {contact_instance.name}
                Email: {contact_instance.email}
                Subject: {contact_instance.subject}
                
                Message:
                {contact_instance.message}
                
                Sent at: {contact_instance.created_at}
                """
                
                send_mail(
                    subject,
                    email_body,
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.ADMIN_EMAIL],
                    fail_silently=False,
                )
            except Exception as e:
                print(f"Failed to send email: {e}")
                # We still return success because the message was saved to the DB
            
            return Response({"message": "Your message has been sent successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
