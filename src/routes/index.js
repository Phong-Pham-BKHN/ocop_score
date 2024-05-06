const siteRouter = require('./site.routes');
const customerRouter = require('./customermanage.routes');
const productRouter = require('./productmanage.route');

function route(app) {
    app.use('/product-manage', productRouter);
    app.use('/customer-manage', customerRouter);
    app.use('/', siteRouter);
}

module.exports = route;