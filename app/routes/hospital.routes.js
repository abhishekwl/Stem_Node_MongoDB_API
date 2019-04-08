module.exports = app => {
    const ext = require('../../config').EXT+'/hospitals';
    const hospitalController = require('../controllers/hospital.controller');

    app.post(ext, hospitalController.create);
    app.get(ext, hospitalController.getAll);
    app.get(ext+'/:id', hospitalController.get);
    app.put(ext+'/:id', hospitalController.update);
    app.delete(ext+'/:id', hospitalController.delete);
};