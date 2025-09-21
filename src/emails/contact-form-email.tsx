
import * as React from 'react';

interface ContactFormEmailProps {
  senderName: string;
  senderEmail: string;
  message: string;
}

const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  senderName,
  senderEmail,
  message,
}) => (
  <div>
    <h1>New Message from your Website Contact Form</h1>
    <p>
      You have received a new message from <strong>{senderName}</strong> (
      <a href={`mailto:${senderEmail}`}>{senderEmail}</a>).
    </p>
    <hr />
    <h2>Message:</h2>
    <p>{message}</p>
    <hr />
    <p>This email was sent from the contact form on your artist website.</p>
  </div>
);

export default ContactFormEmail;
