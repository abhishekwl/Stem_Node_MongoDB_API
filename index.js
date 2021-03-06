const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
//LOCAL
const config = require('./config');

mongoose.Promise = global.Promise;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

global.sendResponse = (err, data, request, response) => {
    if(err || data===null) {
        response.status(400).json({ error: err||'NA' });
        const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
        console.log('[!ERR] ['+ip+'] '+request.method+' '+request.url);
    } else response.status(200).json(data);
};

app.get('/', (request, response) => response.status(200).json({ message: 'All requests should be directed to /api/v1 endpoint' }));

require('./app/routes/user.routes')(app);
require('./app/routes/hospital.routes')(app);
require('./app/routes/test.routes')(app);
require('./app/routes/package.routes')(app);
require('./app/routes/order.routes')(app);
app.listen(config.PORT, '0.0.0.0', ()=>{
    console.log('[SERVER] Listening on port '+config.PORT);
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }).catch(err => {
        console.log('[!DB] Server could not connect to DB. Exiting...\nERROR: '+err+'\n\n');
        process.exit();
    }).then(() => console.log('[DB] Successfully hooked to DB'));
});