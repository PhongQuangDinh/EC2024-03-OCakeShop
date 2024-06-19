const userRouter = require('./UserRoute');
const authenticationRouter = require('./authenticationRoute');

function route(app){
    app.use('/user', userRouter);
    app.use('/', authenticationRouter)
}

module.exports = route;
