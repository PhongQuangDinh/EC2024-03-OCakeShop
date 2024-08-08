const userRouter = require('./UserRoute');
const authenticationRouter = require('./authenticationRoute');
const customerRouter = require('./CustomerRoute');
const cakeRouter = require('./CakeRoute');
const cartRouter = require('./CartRoute');

function route(app){
    app.use('/cake', cakeRouter);
    app.use('/user', userRouter);
    app.use('/customer', customerRouter);
    app.use('/cart', cartRouter);
    app.use('/', authenticationRouter);
}
module.exports = route;