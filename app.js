const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req,res) => {
    res.render("index.ejs")
})
// Handle form submission
app.post('/submit-form', (req, res) => {
  // Extract form data
  const { firstName, lastName, email, phoneNumber, address, typeOfService, description, emergencyService } = req.body;

  // Create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dhanuchandu1232@gmail.com',  // Replace with your email address
      pass: 'ZOROftw-123'          // Replace with your email password
    }
  });

  // Setup email data
  let mailOptions = {
    from: email, // Replace with your email address
    to: 'dhanuchandu1232@gmail.com',  // Replace with recipient email address
    subject: 'New Contact Form Submission',
    html: `
      <h3>Contact Details:</h3>
      <ul>
        <li>First Name: ${firstName}</li>
        <li>Last Name: ${lastName}</li>
        <li>Email: ${email}</li>
        <li>Phone Number: ${phoneNumber}</li>
        <li>Address: ${address}</li>
        <li>Type of Service: ${typeOfService}</li>
        <li>Description: ${description}</li>
        <li>Emergency Service Needed: ${emergencyService ? 'Yes' : 'No'}</li>
      </ul>
    `
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    res.send('Form submitted successfully!');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
