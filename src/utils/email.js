const nodemailer = require("nodemailer");
const { html } = require("../template/html");

module.exports = class Email {
  constructor(user, data) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.data = data;
    this.from = `Stanley Kelechi <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GOOGLE_USERNAME,
          pass: process.env.GOOGLE_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      service: "gmail",
      // host: process.env.EMAIL_HOST,
      // port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.GOOGLE_USERNAME,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = template;

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      //   text: htmlToText.fromString(html)
    };

    const info = await this.newTransport().sendMail(mailOptions);
  }

  // async sendWelcome() {
  //   await this.send('welcome', 'Welcome to the Natours Family!');
  // }

  async sendVerifyEmail() {
    await this.send(
      html.verifyEmailTemplate(this.data, this.firstName),
      "Verify email Token"
    );
    return;
  }

  async sendPasswordReset() {
    await this.send(
      html.forgotPasswordEmail(this.data, this.firstName),
      "Your password reset token (valid for only 10 minutes)"
    );
  }

  async sendReminderEmail() {
    await this.send(
      html.bookingReminderEmail(
        this.firstName,
        this.data.location,
        this.data.startDate,
        `http://localhost:2024/api/v1/booking/${this.data.bookingId}`
      ),
      "Booking reminder"
    );
  }
};
// (name, location, date, bookingUrl
//  reminder email : Good day mr {name}, you have a booking to deliver in {location} on the {date}. please
// check the app to see full details about the booking
