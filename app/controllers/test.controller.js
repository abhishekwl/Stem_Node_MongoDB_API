const Test = require('../models/test.model');
const Hospital = require('../models/hospital.model');
const geolib = require('geolib');

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

exports.getFeatured = (request, response) => {
    const userLatitude = request.query.latitude;
    const userLongitude = request.query.longitude;
    Hospital.find({}, (errHospital, dataHospital)=>{
        if(errHospital || dataHospital.length===0) global.sendResponse(errHospital||'No centers found', null, request, response);
        else {
            const hospitalsArray = [];
            dataHospital.forEach(hospital => {
                const hospitalLatitude = hospital.latitude;
                const hospitalLongitude = hospital.longitude;
                const separationInMeters = geolib.getDistance({ latitude: userLatitude, longitude: userLongitude }, { latitude: hospitalLatitude, longitude: hospitalLongitude });
                hospital["separation"] = separationInMeters;
                hospitalsArray.push(hospital);
            });
            hospitalsArray.sort((a,b) => a.separation-b.separation);
            global.sendResponse(null, {centers:hospitalsArray}, request, response);
        }
    });
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