const connection = require('../../config/db')
const ProductmanageController = {
    getAllProduct: (callback) => {
        const query = 'SELECT * FROM product WHERE is_deleted = 0';
        connection.query(query, callback);
    },
    getProductbyId: (callback) => {
        const query = 'SELECT product_name, product_group, product_year, product_note  * FROM product WHERE product_id=?';
        connection.query(query, callback);
    },
    addProduct: (product, callback) => {
        const query = 'INSERT INTO product (product_name, product_group, product_year, product_note) VALUES (?,?,?)';
        const values = [product.product_name, product.product_group, product.product_year, product.product_note];
        connection.query(query, values, callback);
    },    
    findProduct: (product_name, product_group, product_year, product_note, callback) => {
        const query = 'SELECT * FROM product WHERE product_name = ? AND product_group = ? AND product_year = ? AND product_note = ?';
        const values = [product_name, product_group, product_year, product_note]; 
        connection.query(query, values, callback);
    },
    updateProduct: (product_id, product, callback) => {
        const query = 'UPDATE product SET product_name = ?, product_group = ?, product_year = ?, product_note = ? WHERE product_id = ?';
        const values = [product.product_name, product.product_group, product.product_year, product.product_note, product_id];
        connection.query(query, values, callback);
    },
    deleteProduct: (product_id, callback) => {
        const query = 'UPDATE product SET is_deleted = 1 WHERE product_id = ?';
        connection.query(query, [product_id], callback);
    },
}
module.exports = ProductmanageController;