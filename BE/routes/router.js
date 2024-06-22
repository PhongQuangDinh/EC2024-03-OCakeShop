const userRouter = require('./UserRoute');
const authenticationRouter = require('./AuthenticationRoute');
const customerRouter = require('./CustomerRoute');
const cakeRouter = require('./CakeRoute');

function route(app){
    app.use('/user', userRouter);
    app.use('/customer', customerRouter);
    app.use('/cake', cakeRouter);
    app.use('/', authenticationRouter);
}

module.exports = route;