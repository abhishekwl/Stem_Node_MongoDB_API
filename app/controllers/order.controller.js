const Order = require('../models/order.model');

exports.create = (request, response) => {
    const order = new Order({
        user: request.body.user,
        hospital: request.body.hospital,
        tests: request.body.tests,
        latitude: request.body.latitude,
        longitude: request.body.longitude
    });
    order.save((err,data) => global.sendResponse(err, data, request, response));
};

exports.getAll = (request, response) => {
    if(request.query.access==='abhishekwl') Order.find({}, (err,data) => global.sendResponse(err, data, request, response));
    else if(request.query.hospital) Order.find({ hospital: request.query.hospital }, (err,data) => global.sendResponse(err, data, request, response));
    else if(request.query.user) Order.find({ user: request.query.user }, (err, data) => global.sendResponse(err, data, request, response));
    else global.sendResponse('Missing query parameter access|hospital|user', null, request, response);
};

exports.get = (request, response) => Order.findById(request.params.id, (err, data) => global.sendResponse(err, data, request, response));

exports.update = (request, response) => {
    const orderId = request.params.id;
    const updateBody = request.body;
    Order.findByIdAndUpdate(orderId, { $set: updateBody }, { new: true }, (err,data) => global.sendResponse(err, data, request, response));
};

exports.delete = (request, response) => {
    const orderId = request.params.id;
    if(request.query.access==='abhishekwl') Order.findByIdAndDelete(orderId, (err,data) => global.sendResponse(err, data, request, response));
};