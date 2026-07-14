import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Create the nodemailer transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.APP_PASSWORD
  }
});

// Verify connection configuration on startup
transporter.verify(function (error, success) {
  if (error) {
    console.warn("⚠️ Mail Server setup error (Did you set ADMIN_EMAIL and APP_PASSWORD in .env?):", error.message);
  } else {
    console.log("✅ Mail Server is ready to take our messages");
  }
});

app.post('/api/send-email', async (req, res) => {
  const { to_email, to_name, action } = req.body;

  if (!process.env.ADMIN_EMAIL || !process.env.APP_PASSWORD || process.env.ADMIN_EMAIL === "YOUR_ADMIN_EMAIL") {
    console.warn(`[Mock Email Sent] To: ${to_email} (App Password not configured)`);
    return res.status(200).json({ success: true, message: 'Mock email sent successfully' });
  }

  try {
    const isSignup = action === 'signup';
    const subject = isSignup ? 'Welcome to ApnaGhar!' : 'Welcome back to ApnaGhar!';
    const heading = isSignup ? 'Welcome to ApnaGhar!' : 'Welcome Back!';
    const message = isSignup 
      ? 'We are absolutely thrilled to have you on board! You can now start searching for your perfect PG, Hostel, or Apartment with zero brokerage.'
      : 'It is great to see you again! Dive right back in to explore the best stays near you.';

    const mailOptions = {
      from: `"ApnaGhar Team" <${process.env.ADMIN_EMAIL}>`,
      to: to_email,
      subject: subject,
      text: `Hi ${to_name || 'there'},\n\n${message}\n\nOpen ApnaGhar: http://localhost:5173\n\nBest,\nThe ApnaGhar Team`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px 20px; background-color: #f4f7f6;">
          <div style="background-color: white; padding: 40px; border-radius: 12px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: center;">
            <div style="margin-bottom: 24px;">
              <h1 style="color: #00A699; margin: 0; font-size: 28px; font-weight: 800;">ApnaGhar</h1>
            </div>
            <h2 style="color: #1a1a1a; margin-top: 0;">${heading}</h2>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; text-align: left;">Hi ${to_name || 'there'},</p>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; text-align: left; margin-bottom: 32px;">${message}</p>
            
            <a href="http://localhost:5173" style="display: inline-block; background-color: #00A699; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Open Application
            </a>
            
            <p style="margin-top: 40px; color: #999; font-size: 14px; text-align: left;">
              Happy hunting!<br>
              - The ApnaGhar Team
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent: ' + info.response);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
