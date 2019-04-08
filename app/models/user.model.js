const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        _id: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        dob: { type: Number, required: false, default: null },
        latitude: { type: Number, required: false, default: null },
        longitude: { type: Number, required: false, default: null },
        blood: { type: String, enum: [ 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-' ], required: true },
        gender: { type: String, enum: [ 'Male', 'Female', 'Other' ], required: true },
        phone: { type: String, required: false, default: null },
        email: { type: String, required: true },
        additional: { type: String, required: false, default: null },
        address: { type: String, required: false, default: null },
        landmark: { type: String, required: false, default: null }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('user', userSchema);