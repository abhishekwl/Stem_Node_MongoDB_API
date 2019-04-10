const mongoose = require('mongoose');

const packageSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: false, default: null },
        tests: { type: [String], required: true },
        hospital: { type: String, required: true },
        image: { type: String, required: false, default: null },
        discount: { type: Number, required: false, default: 0 }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('package', packageSchema);