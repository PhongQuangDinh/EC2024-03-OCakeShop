const userRouter = require('./UserRoute');
const authenticationRouter = require('./authenticationRoute');
const customerRouter = require('./CustomerRoute');
const cakeRouter = require('./CakeRoute');
const cartRouter = require('./CartRoute');

const ingredientRouter = require('./IngredientRoute');
const orderCakeRouter = require('./OrderCakeRoute');
const paymentRoute = require('./PaymentRoute');


function route(app){
    app.use('/cake', cakeRouter);
    app.use('/user', userRouter);
    app.use('/customer', customerRouter);
    app.use('/cart', cartRouter);

    app.use('/ingredient', ingredientRouter);
    app.use('/ordercake', orderCakeRouter);
    app.use('/payment', paymentRoute);
    app.use('/', authenticationRouter.router);

}
module.exports = route;
