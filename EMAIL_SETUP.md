# Email Configuration Guide

## Setting up Gmail for Contact Form Emails

To enable email functionality for the contact form, follow these steps:

### 1. Enable 2-Factor Authentication on Gmail
1. Go to myaccount.google.com
2. Click "Security" on the left sidebar
3. Scroll to "How you sign in to Google"
4. Enable "2-Step Verification"

### 2. Generate App Password
1. Go to myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or your OS)
3. Click "Generate"
4. Copy the 16-character password provided

### 3. Update .env File
In `/server/.env`, update these values:

```
EMAIL_USER=your_gmail_account@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx (16-character app password)
ADMIN_EMAIL=krishnagudipudi6485@gmail.com
```

### 4. How It Works
- When a user submits the contact form, an email is sent to the admin email (krishnagudipudi6485@gmail.com)
- A confirmation email is also sent to the user's email
- Admin receives full message details
- User gets an automated response confirming receipt

### 5. Testing
1. Fill out the contact form
2. Submit the message
3. Check krishnagudipudi6485@gmail.com for the message
4. Check the user's email for the confirmation

### Troubleshooting
- **"Invalid login credentials"**: Ensure you're using the 16-character app password, not your regular password
- **"Less secure app"**: Gmail requires App Password when 2-FA is enabled
- **Email not received**: Check spam/junk folder
