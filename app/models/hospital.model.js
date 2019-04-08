const mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema(
    {
        _id: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        address: { type: String, required: true },
        landmark: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('hospital', hospitalSchema);