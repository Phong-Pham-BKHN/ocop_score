const connection = require('../../config/db / index')
const CustomermanageController = {
    getAllCustomer: (callback) => {
        const query = 'SELECT * FROM customer';
        connection.query(query, callback);
    },
    getCustomerbyId: (callback) => {
        const query = 'SELECT customer_name, customer_phone, customer_address * FROM customer WHERE customer_id=?';
        connection.query(query, callback);
    },
    addCustomer: (customer, callback) => {
        const query = 'INSERT INTO customer (customer_name, customer_phone, customer_address) VALUES (?,?,?)';
        const values = [customer.customer_name, customer.customer_phone, customer.customer_address];
        connection.query(query, values, callback);
    },    
    findCustomer: (customer_name, customer_phone, customer_address, callback) => {
        const query = 'SELECT * FROM customer WHERE customer_name = ? AND customer_phone = ? AND customer_address = ?';
        const values = [customer_name, customer_phone, customer_address];
        connection.query(query, values, callback);
    },   
}
module.exports = CustomermanageController;