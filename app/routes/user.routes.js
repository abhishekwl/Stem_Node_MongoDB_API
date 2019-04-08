module.exports = app => {
    const ext = require('../../config').EXT+'/users';
    const userController = require('../controllers/user.controller');

    app.post(ext, userController.create);
    app.get(ext, userController.getAll);
    app.get(ext+'/:id', userController.get);
    app.put(ext+'/:id', userController.update);
    app.delete(ext+'/:id', userController.delete);
};