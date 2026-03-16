import ssl
import smtplib
from django.core.mail.backends.smtp import EmailBackend as SMTPEmailBackend

class UnverifiedEmailBackend(SMTPEmailBackend):
    def open(self):
        if self.connection:
            return False
        try:
            # Create the SMTP connection
            self.connection = smtplib.SMTP(self.host, self.port, timeout=self.timeout)
            
            # Start TLS with an unverified SSL context
            if self.use_tls:
                context = ssl._create_unverified_context()
                self.connection.starttls(context=context)
            
            # Login if credentials are provided
            if self.username and self.password:
                self.connection.login(self.username, self.password)
            
            return True
        except Exception:
            if not self.fail_silently:
                raise
            return False
