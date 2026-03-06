const express = require('express');
const axios = require('axios');
const Customer = require('../models/Customer');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to protect routes and inject companyId
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

router.use(authMiddleware);

// Get all customers for the company
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find({ companyId: req.user.companyId });
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new customer
router.post('/', async (req, res) => {
    try {
        const customerData = { ...req.body, companyId: req.user.companyId };

        // Initial ML Prediction
        try {
            const mlResponse = await axios.post(`${process.env.ML_SERVICE_URL}/predict`, req.body);
            customerData.churnProbability = mlResponse.data.probability;
            customerData.churnRiskLevel = mlResponse.data.risk_level;
            customerData.CLV = req.body.monthlySpend * req.body.subscriptionLength * (1 - customerData.churnProbability);

            // Trigger alert if churn > 70%
            if (customerData.churnProbability > 0.7) {
                const sendChurnAlert = require('../utils/mailer');
                sendChurnAlert(customerData);
            }
        } catch (mlErr) {
            console.error('ML Prediction failed on creation:', mlErr.message);
        }

        const customer = new Customer(customerData);
        await customer.save();
        res.status(201).json(customer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update customer
router.put('/:id', async (req, res) => {
    try {
        const customer = await Customer.findOneAndUpdate(
            { _id: req.params.id, companyId: req.user.companyId },
            req.body,
            { new: true }
        );
        if (!customer) return res.status(404).json({ error: 'Customer not found' });
        res.json(customer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete customer
router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findOneAndDelete({ _id: req.params.id, companyId: req.user.companyId });
        if (!customer) return res.status(404).json({ error: 'Customer not found' });
        res.json({ message: 'Customer deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
