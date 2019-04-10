const mongoose = require('mongoose');

const packageSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: false, default: null },
        tests: { type: [String], required: true },
        hospital: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('package', packageSchema);