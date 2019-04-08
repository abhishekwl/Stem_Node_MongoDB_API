const Hospital = require('../models/hospital.model');

exports.create = (request, response) => {
    const hospital = new Hospital({
        _id: request.body._id,
        name: request.body.name,
        latitude: request.body.latitude,
        longitude: request.body.longitude,
        address: request.body.address,
        landmark: request.body.landmark
    });
    hospital.save((err,data) => global.sendResponse(err, data, request, response));
};

exports.getAll = (request, response) => {
    if(request.query.access==='abhishekwl') Hospital.find({}, (err,data) => global.sendResponse(err, data, request, response));
    else global.sendResponse('You do not have sufficient permissions', null, request, response);
};

exports.get = (request, response) => {
    const hospitalId = request.params.id;
    Hospital.findById(hospitalId, (err,data) => global.sendResponse(err, data, request, response));
};

exports.update = (request, response) => {
    const hospitalId = request.params.id;
    const updateBody = request.body;
    Hospital.findByIdAndUpdate(hospitalId, { $set: updateBody }, { new: true }, (err,data) => global.sendResponse(err, data, request, response));
};

exports.delete = (request, response) => {
    const hospitalId = request.params.id;
    if(request.query.access==='abhishekwl') Hospital.findByIdAndDelete(hospitalId, (err,data) => global.sendResponse(err, data, request, response));
    else global.sendResponse('You do not have sufficient permissions', null, request, response);
};