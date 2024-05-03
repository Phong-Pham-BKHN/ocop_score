const CustomermanageModel = require('../models/CustomermanageModel');
const xlsx = require('xlsx');

class CustomermanageController {
    index(req, res) {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = 8; // Kích thước trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const searchItem = req.query.search || '';
        CustomermanageModel.getAllCustomer((err, data) =>{
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
                
                res.render('customer_manage', viewData);
            }
        })
    }

    getbyId(){
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = 8; // Kích thước trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const searchItem = req.query.search || '';
        CustomermanageModel.getCustomerbyId((err, data_id) =>{
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
                
                res.render('customer_manage', viewData);
            }
        })
    }
    
    create(req, res) {
        const customer_name = req.body.customer_name;
        const customer_phone = req.body.customer_phone;
        const customer_address = req.body.customer_address;

        const form = {
            customer_name: customer_name,
            customer_phone: customer_phone,
            customer_address: customer_address,
        };
        CustomermanageModel.findCustomer(customer_name, customer_phone, customer_address, (err, results) => {
            if (err) {
                console.log('Lỗi truy vấn', err);
                res.json({ success: false, message: 'Lỗi truy vấn' });
            }
            else {
                if (results.length === 0) {
                    CustomermanageModel.addCustomer(form, (err) => {
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
                    // Nếu khách hàng đã tồn tại, trả về thông báo cho người dùng
                    res.json({ success: false, message: 'Khách hàng đã tồn tại trong cơ sở dữ liệu' });
                }

            }
        })
    }

    edit(req, res) {
        const Id = req.params.id;
        CustomermanageModel.getCustomerbyId(Id, (err, data_id) => {
            if (err) {
                console.log('Lỗi truy vấn', err);
            }
            else {
                CustomermanageModel.getAllCustomer((err, data) => {
                    if (err) {
                        console.log('Lỗi truy vấn', err);
                    }
                    else {
                        if (err) {
                            console.log('Lỗi truy vấn', err);
                        }
                        else {
                            res.render('customer_manage', { data: data_id[0], data });
                        }
                    }
                })

            }
        })
    }

    update(req, res) {
        const customer_id = req.params.id; // ID của khách hàng cần cập nhật
        const { customer_name, customer_phone, customer_address } = req.body; // Thông tin mới của khách hàng

        // Gọi hàm updateCustomer từ model
        CustomermanageModel.updateCustomer(customer_id, { customer_name, customer_phone, customer_address }, (err, result) => {
            if (err) {
                // Xử lý lỗi nếu có
                console.error('Lỗi khi cập nhật thông tin khách hàng:', err);
                res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi cập nhật thông tin khách hàng' });
            } else {
                res.redirect('back');
            }
        });
    }

    delete(req, res, next) {
        const customer_id = req.params.id
        CustomermanageModel.deleteCustomer(customer_id, (err, results) => {
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

    upload = (req, res) => {
        try {
            const file = req.files.file;
            if (!file) {
                return res.status(400).json({ message: 'No file uploaded.' });
            }
    
            const workbook = xlsx.readFile(file.path);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(worksheet);
    
            // Gọi model để xử lý dữ liệu và đẩy vào MySQL
            CustomermanageModel.uploadFileCustomer(data, (err) => {
                if (err) {
                    console.log('Lỗi truy vấn', err);
                    res.status(500).json({ success: false, message: 'Lỗi truy vấn' });
                } else {
                    res.status(200).json({ message: 'File uploaded successfully.' });
                }
            });
        } catch (error) {
            console.error('Lỗi:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    
}

module.exports = new CustomermanageController();
