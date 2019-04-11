const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        _id: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true },
        gender: { type: String, enum: [ 'Male', 'Female', 'Other', null ], required: false, default: null },
        dob: { type: Number, required: false, default: -999 },
        latitude: { type: Number, required: false, default: -999 },
        longitude: { type: Number, required: false, default: -999 },
        blood: { type: String, enum: [ 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', null ], required: false, default: null },
        phone: { type: String, required: false, default: null },
        additional: { type: String, required: false, default: null },
        address: { type: String, required: false, default: null },
        landmark: { type: String, required: false, default: null }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('user', userSchema);