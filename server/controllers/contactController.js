import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Function to save message to file (fallback)
const saveMessageToFile = (messageData) => {
    const messagesDir = path.join(__dirname, '../messages');
    
    // Create messages directory if it doesn't exist
    if (!fs.existsSync(messagesDir)) {
        fs.mkdirSync(messagesDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = path.join(messagesDir, `message-${timestamp}.json`);
    
    fs.writeFileSync(filename, JSON.stringify(messageData, null, 2));
    console.log(`Message saved to file: ${filename}`);
};

export const sendContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                status: 'fail', 
                message: 'Please provide all required fields' 
            });
        }

        const messageData = {
            name,
            email,
            subject,
            message,
            receivedAt: new Date().toISOString(),
            adminEmail: process.env.ADMIN_EMAIL || 'krishnagudipudi6485@gmail.com'
        };

        // Try to send email if credentials are configured
        if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD && 
            process.env.EMAIL_USER !== 'your_gmail@gmail.com') {
            
            try {
                // Email content for admin
                const adminEmailContent = `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                    <hr>
                    <p><em>Received on: ${new Date().toLocaleString()}</em></p>
                `;

                // Email content for customer
                const customerEmailContent = `
                    <h2>Thank you for contacting CAFFIXA!</h2>
                    <p>Hi ${name},</p>
                    <p>We have received your message and will respond within 24 hours.</p>
                    <hr>
                    <h3>Your Message Details:</h3>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                    <hr>
                    <p>Best regards,<br>CAFFIXA Team</p>
                `;

                // Send email to admin
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: process.env.ADMIN_EMAIL || 'krishnagudipudi6485@gmail.com',
                    subject: `New Contact: ${subject}`,
                    html: adminEmailContent
                });

                // Send confirmation email to customer
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'We received your message - CAFFIXA',
                    html: customerEmailContent
                });

                console.log('Email sent successfully');
            } catch (emailErr) {
                console.warn('Email sending failed, saving to file instead:', emailErr.message);
                saveMessageToFile(messageData);
            }
        } else {
            // Email credentials not configured, save to file
            console.log('Email credentials not configured, saving message to file');
            saveMessageToFile(messageData);
        }

        res.status(200).json({ 
            status: 'success', 
            message: 'Thank you! Your message has been received. We will get back to you within 24 hours.' 
        });

    } catch (err) {
        console.error('Contact message error:', err.message);
        res.status(400).json({ 
            status: 'fail', 
            message: 'Failed to process message. Please try again later.' 
        });
    }
};
