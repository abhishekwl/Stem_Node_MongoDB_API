const mongoose = require('mongoose');

const testSchema = mongoose.Schema(
    {
        name: { type: String, required: true, text: true, lowercase: true },
        price: { type: Number, required: true },
        discount: { type: Number, required: false, default: 0 },
        popularity: { type: Number, required: false, default: 0 },
        hospital: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('test', testSchema);