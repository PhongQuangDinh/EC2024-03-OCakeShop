const userRouter = require('./UserRoute');
const authenticationRouter = require('./AuthenticationRoute');
const customerRouter = require('./CustomerRoute');
const cakeRouter = require('./CakeRoute');
<<<<<<< Updated upstream

function route(app){
    app.use('/user', userRouter);
    app.use('/customer', customerRouter);
    app.use('/cake', cakeRouter);
=======
const cartRouter = require('./CartRoute');

function route(app){
    app.use('/cake', cakeRouter);
    app.use('/user', userRouter);
    app.use('/customer', customerRouter);
    app.use('/cart', cartRouter);
>>>>>>> Stashed changes
    app.use('/', authenticationRouter);
}

module.exports = route;