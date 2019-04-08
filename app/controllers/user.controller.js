const User = require('../models/user.model');

exports.create = (request, response) => {
    const user = new User({
        _id: request.body._id,
        name: request.body.name,
        dob: request.body.dob,
        latitude: request.body.latitude,
        longitude: request.body.longitude,
        blood: request.body.blood,
        gender: request.body.gender,
        phone: request.body.phone,
        email: request.body.email,
        additional: request.body.additional
    });
    user.save((err,data) => global.sendResponse(err, data, request, response));
};

exports.getAll = (request, response) => {
    if(request.query.access==='abhishekwl') User.find({}, (err,data) => global.sendResponse(err, data, request, response));
    else global.sendResponse('You do not have sufficient permissions', null, request, response);
};

exports.get = (request, response) => {
    const userId = request.params.id;
    User.findById(userId, (err,data) => global.sendResponse(err, data, request, response));
};

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