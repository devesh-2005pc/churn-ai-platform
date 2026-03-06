const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subscriptionPlan: { type: String, required: true },
    monthlySpend: { type: Number, required: true },
    usageFrequency: { type: Number, required: true },
    supportTickets: { type: Number, required: true },
    lastLoginDays: { type: Number, required: true },
    subscriptionLength: { type: Number, required: true },
    engagementScore: { type: Number, required: true },
    companyId: { type: String, required: true }, // Multi-tenant isolation

    // ML Prediction Results
    churnProbability: { type: Number, default: 0 },
    churnRiskLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    CLV: { type: Number, default: 0 },

    // Activity History (Timeline)
    activityHistory: [{
        event: String,
        date: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

// Compound index for uniqueness within a company if needed
CustomerSchema.index({ email: 1, companyId: 1 }, { unique: true });

module.exports = mongoose.model('Customer', CustomerSchema);
