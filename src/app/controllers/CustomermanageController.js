const CustomermanageModel = require('../models/CustomermanageModel')

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
                console.log(data);
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
                console.log(data);
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
        console.log(form);
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
}

module.exports = new CustomermanageController();
