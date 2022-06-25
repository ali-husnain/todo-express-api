const createError = require('http-errors');
const responder = require('./../src/utils/responder');


module.exports = (app) =>{
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });
    
    // error handler
    app.use(function (err, req, res, next) {
        console.log(res.headersSent);
        // render the error page
        responder.sendResponse(res, err.status || 500, "error", null, err.message || "Server error!!! Please try again later.");
        
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.log('Unhandled Rejection at:', reason.stack || reason)
        // Recommended: send the information to sentry.io
        // or whatever crash reporting service you use
    });
}