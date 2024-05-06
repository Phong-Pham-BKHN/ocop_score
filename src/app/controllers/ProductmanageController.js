const ProductmanageModel = require('../models/ProductmanageModel');

class ProductmanageController {
    index(req, res) {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = 8; // Kích thước trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const searchItem = req.query.search || '';
        ProductmanageModel.getAllProduct((err, data) =>{
            if (err){
                console.log('Lỗi truy vấn', err)
            } else {
                const totalPages = Math.ceil(data.length / pageSize);
                const pages = Array.from({ length: totalPages }, (_, index) => {
                    return {
                        number: index + 1,
                        active: index + 1 === page,
                        isDots: index + 1 > 5
                    };
                });
                const paginatedData = data.slice(startIndex, endIndex);
                // Chuẩn bị dữ liệu để truyền vào template
                const viewData = {
                    data: paginatedData,
                    pagination: {
                        prev: page > 1 ? page - 1 : null,
                        next: endIndex < data.length ? page + 1 : null,
                        pages: pages,
                    },
                };
                
                res.render('product_manage', viewData);
            }
        })
    }

    getbyId(){
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = 8; // Kích thước trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const searchItem = req.query.search || '';
        ProductmanageModel.getProductbyId((err, data_id) =>{
            if (err){
                console.log('Lỗi truy vấn', err)
            } else {
                const totalPages = Math.ceil(data_id.length / pageSize);
                const pages = Array.from({ length: totalPages }, (_, index) => {
                    return {
                        number: index + 1,
                        active: index + 1 === page,
                        isDots: index + 1 > 5
                    };
                });
                const paginatedData = data_id.slice(startIndex, endIndex);
                // Chuẩn bị dữ liệu để truyền vào template
                const viewData = {
                    data: paginatedData,
                    pagination: {
                        prev: page > 1 ? page - 1 : null,
                        next: endIndex < data.length ? page + 1 : null,
                        pages: pages,
                    },
                };
                
                res.render('product_manage', viewData);
            }
        })
    }
    
    create(req, res) {
        const product_name = req.body.product_name;
        const product_group = req.body.product_group;
        const product_year = req.body.product_year;
        const product_note = req.body.product_note;

        const form = {
            product_name: product_name,
            product_group: product_group,
            product_year: product_year,
            product_note: product_note,
        };
        ProductmanageModel.findProduct(product_name, product_group, product_year, product_note, (err, results) => {
            if (err) {
                console.log('Lỗi truy vấn', err);
                res.json({ success: false, message: 'Lỗi truy vấn' });
            }
            else {
                if (results.length === 0) {
                    ProductmanageModel.addProduct(form, (err) => {
                        if (err) {
                            console.log('lỗi truy vấn', err);
                            res.json({ success: false, message: 'Lỗi truy vấn' });
                        }
                        else {
                            res.redirect('back');
                        }
                    })
                }
                else {
                    // Nếu sản phảm đã tồn tại, trả về thông báo cho người dùng
                    res.json({ success: false, message: 'Sản phẩm đã tồn tại trong cơ sở dữ liệu' });
                }

            }
        })
    }

    edit(req, res) {
        const Id = req.params.id;
        ProductmanageModel.getProductbyId(Id, (err, data_id) => {
            if (err) {
                console.log('Lỗi truy vấn', err);
            }
            else {
                ProductmanageModel.getAllProduct((err, data) => {
                    if (err) {
                        console.log('Lỗi truy vấn', err);
                    }
                    else {
                        if (err) {
                            console.log('Lỗi truy vấn', err);
                        }
                        else {
                            res.render('Product_manage', { data: data_id[0], data });
                        }
                    }
                })

            }
        })
    }

    update(req, res) {
        const product_id = req.params.id; // ID của sản phẩm cần cập nhật
        const { product_name, product_group, product_year, product_note } = req.body; // Thông tin mới của sản phẩm

        // Gọi hàm updateProduct từ model
        ProductmanageModel.updateProduct(product_id, { product_name, product_group, product_year, product_note }, (err, result) => {
            if (err) {
                // Xử lý lỗi nếu có
                console.error('Lỗi khi cập nhật thông tin sản phẩm:', err);
                res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi cập nhật thông tin sản phẩm' });
            } else {
                res.redirect('back');
            }
        });
    }

    delete(req, res, next) {
        const product_id = req.params.id
        ProductmanageModel.deleteProduct(product_id, (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn:', err);
                res.status(500).send('Internal Server Error');
            } else {
                if (results.affectedRows === 0) {
                    res.status(404).send(' not found');
                } else {
                    res.redirect('back')
                }
            }
        })
    }
    
}

module.exports = new ProductmanageController();
