const connection = require('../../config/db')
const CustomermanageController = {
    getAllCustomer: (callback) => {
        const query = 'SELECT * FROM customer WHERE is_deleted = 0';
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
    updateCustomer: (customer_id, customer, callback) => {
        const query = 'UPDATE customer SET customer_name = ?, customer_phone = ?, customer_address = ? WHERE customer_id = ?';
        const values = [customer.customer_name, customer.customer_phone, customer.customer_address, customer_id];
        connection.query(query, values, callback);
    },
    deleteCustomer: (customer_id, callback) => {
        const query = 'UPDATE customer SET is_deleted = 1 WHERE customer_id = ?';
        connection.query(query, [customer_id], callback);
    },
    uploadFileCustomer: (data, callback) => {
        const query = 'INSERT INTO customer (customer_name, customer_phone, customer_address) VALUES ?';
        const values = data.map(customer => [customer.customer_name, customer.customer_phone, customer.customer_address]);
        connection.query(query, [values], callback);
    },
}
module.exports = CustomermanageController;