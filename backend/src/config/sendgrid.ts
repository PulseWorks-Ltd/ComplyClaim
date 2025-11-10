import sgMail from '@sendgrid/mail';
import { env } from './env.js';

let initialized = false;

export const initSendGrid = () => {
  if (!initialized && env.SENDGRID_API_KEY) {
    sgMail.setApiKey(env.SENDGRID_API_KEY);
    initialized = true;
  }
};

export const sendEmail = async (to: string, subject: string, html: string) => {
  if (!env.SENDGRID_API_KEY) {
    console.log('SendGrid not configured, email not sent:', { to, subject });
    return;
  }

  initSendGrid();
  
  const msg = {
    to,
    from: env.SENDGRID_FROM_EMAIL,
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully to:', to);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
