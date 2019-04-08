module.exports = app => {
    const ext = require('../../config').EXT+'/tests';
    const testController = require('../controllers/test.controller');

    app.post(ext, testController.create);
    app.get(ext, testController.getAll);
    app.get(ext+'/:id', testController.get);
    app.put(ext+'/:id', testController.update);
    app.delete(ext+'/:id', testController.delete);
};