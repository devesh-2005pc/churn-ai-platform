const nodemailer = require('nodemailer');

const sendChurnAlert = async (customer) => {
    // Configure transporter (using basic SMTP for demo)
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"ChurnAI Alerts" <${process.env.EMAIL_USER}>`,
        to: 'admin@company.com', // In real app, this would be dynamic or company setting
        subject: `🚨 High Risk Customer Detected: ${customer.name}`,
        text: `High risk customer detected: ${customer.name} – ${Math.round(customer.churnProbability * 100)}% churn probability.`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 12px;">
                <h2 style="color: #ef4444;">High Risk Alert</h2>
                <p>A customer has exceeded the churn risk threshold.</p>
                <hr />
                <p><strong>Customer:</strong> ${customer.name}</p>
                <p><strong>Email:</strong> ${customer.email}</p>
                <p><strong>Churn Probability:</strong> ${Math.round(customer.churnProbability * 100)}%</p>
                <p><strong>Risk Level:</strong> ${customer.churnRiskLevel}</p>
                <br />
                <a href="${process.env.FRONTEND_URL}/customers" style="background: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">View Dashboard</a>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Churn alert email sent for:', customer.name);
    } catch (err) {
        console.error('Failed to send churn alert email:', err.message);
    }
};

module.exports = sendChurnAlert;
