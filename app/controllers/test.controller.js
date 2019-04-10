const Test = require('../models/test.model');

exports.create = (request, response) => {
    const test = new Test({
        name: request.body.name,
        price: request.body.price,
        hospital: request.body.hospital,
        description: request.body.description
    });
    test.save((err,data) => global.sendResponse(err, data, request, response));
};

exports.getAll = (request, response) => {
    if(request.query.access==='abhishekwl') Test.find({}, (err,data) => global.sendResponse(err, data, request, response));
    else if(request.query.hospital) Test.find({ hospital: request.query.hospital }, (err,data) => global.sendResponse(err, data, request, response));
    else global.sendResponse('Missing query parameter: access/hospital', null, request, response);
};

exports.get = (request, response) => Test.findById(request.params.id, (err,data) => global.sendResponse(err, data, request, response));

exports.update = (request, response) => {
    const testId = request.params.id;
    const updateBody = request.body;
    Test.findByIdAndUpdate(testId, { $set: updateBody }, { new: true }, (err,data) => global.sendResponse(err, data, request, response));
};

exports.delete = (request, response) => {
    const testId = request.params.id;
    const hospitalId = request.query.hospital;
    Test.findOneAndDelete({ _id: testId, hospital: hospitalId }, (err, data) => global.sendResponse(err, data, request, response));
};