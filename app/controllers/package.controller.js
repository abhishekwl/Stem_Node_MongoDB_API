const Package = require('../models/package.model');

exports.create = (request, response) => {
    const package = new Package({
        title: request.body.title,
        description: request.body.description,
        tests: request.body.tests,
        hospital: request.body.hospital
    });
    package.save((err,data) => global.sendResponse(err, data, request, response));
};

exports.getAll = (request, response) => Package.find({ hospital: request.query.hospital }, (err,data) => global.sendResponse(err, data, request, response));

exports.get = (request, response) => Package.findById(request.params.id, (err,data) => global.sendResponse(err, data, request, response));

exports.update = (request, response) => {
    const pacakageId = request.params.id;
    const updateBody = request.body;
    Package.findByIdAndUpdate(pacakageId, {$set: updateBody}, {new: true}, (err,data) => global.sendResponse(err, data, request, response));
};

exports.delete = (request, response) => Package.findByIdAndDelete(request.params.id, (err,data) => global.sendResponse(err, data, request, response));