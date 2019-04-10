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
        additional: request.body.additional,
        address: request.body.address,
        landmark: request.body.landmark
    });
    user.save((err,data) => {
        if(data!==null && data!==undefined && !err) {
            global.users.push(data);
            global.userIdArray.push(data._id);
        }
        global.sendResponse(err, data, request, response);
    });
};

exports.getAll = (request, response) => {
    if(request.query.access==='abhishekwl') User.find({}, (err,data) => global.sendResponse(err, data, request, response));
    else global.sendResponse('You do not have sufficient permissions', null, request, response);
};

exports.get = (request, response) => {
    const userObject = global.users.find(user => user._id===request.params.id);
    const err = (userObject===null||userObject===undefined)?'User with provided ID does not exist':null;
    global.sendResponse(err, userObject, request, response);
}

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