import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // App Password
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error('Email transporter error:', err);
  } else {
    console.log('Email transporter ready ✅');
  }
});

export const sendEmail = async (to, subject, html) => {
  const info = await transporter.sendMail({
    from: ` Authtion  <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
  console.log('Email sent:', info.messageId);
  return info;
};
