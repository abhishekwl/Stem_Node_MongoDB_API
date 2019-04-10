const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        user: { type: String, required: true },
        hospital: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        tests: { type: [String], required: true },
        status: { type: String, enum: ['AWAIT','ENROUTE','ACTIVE','COMPLETE'] },
        package: { type: String, required: false, default: null }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('order', orderSchema);