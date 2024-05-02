const siteRouter = require('./site.routes');
const customerRouter = require('./customermanage.routes');

function route(app) {
    app.use('/customer-manage', customerRouter);
    app.use('/', siteRouter);
}

module.exports = route;