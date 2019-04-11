const User = require('../models/user.model');

exports.create = (request, response) => {
    const user = new User({
        _id: request.body._id,
        name: request.body.name,
        email: request.body.email,        
        phone: request.body.phone,
        dob: request.body.dob || -999,
        latitude: request.body.latitude || -999,
        longitude: request.body.longitude || -999,
        blood: request.body.blood,
        gender: request.body.gender,
        additional: request.body.additional,
        address: request.body.address,
        landmark: request.body.landmark
    });
    user.save((err,data) => global.sendResponse(err, data, request, response));
};

exports.getAll = (request, response) => {
    if(request.query.access==='abhishekwl') User.find({}, (err,data) => global.sendResponse(err, data, request, response));
    else global.sendResponse('You do not have sufficient permissions', null, request, response);
};

exports.get = (request, response) => User.findById(request.params.id, (err,data) => global.sendResponse(err, data, request, response));

exports.update = (request, response) => {
    const userId = request.params.id;
    const updateBody = request.body;
    User.findByIdAndUpdate(userId, { $set: updateBody }, { new: true }, (err,data) => global.sendResponse(err, data, request, response));
};

exports.delete = (request, response) => {
    const userId = request.params.id;
    if(request.query.access==='abhishekwl') User.findByIdAndDelete(userId, (err,data) => global.sendResponse(err, data, request, response));
    else global.sendResponse('You do not have sufficient permissions', null, request, response);
};