module.exports = app => {
    const ext = require('../../config').EXT+'/orders';
    const orderController = require('../controllers/order.controller');

    app.post(ext, orderController.create);
    app.get(ext, orderController.getAll);
    app.get(ext+'/:id', orderController.get);
    app.put(ext+'/:id', orderController.update);
    app.delete(ext+'/:id', orderController.delete);
};