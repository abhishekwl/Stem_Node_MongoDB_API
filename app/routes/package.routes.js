module.exports = app => {
    const ext = require('../../config').EXT+'/packages';
    const packagesController = require('../controllers/package.controller');

    app.post(ext, packagesController.create);
    app.get(ext, packagesController.getAll);
    app.get(ext+'/:id', packagesController.get);
    app.put(ext+'/:id', packagesController.update);
    app.delete(ext+'/:id', packagesController.delete);
};