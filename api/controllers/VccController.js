'use strict'

const axios = require('axios')

module.exports = {
    get: (req, res) => {
        if (
            req.headers &&
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
          ) {
            var token = req.headers.authorization.split(" ")[1];
            if(token == "N0dROyFMNCFqZ1M5MlJfdClKKzQ3Wyw5QV5VUWskV0o0JGd9aFcrXjJhWm53VEE2TSxUSHghNlYzbilGMlxYNg==") {
                const query = req.query;
                console.log(query);
                const searchParams = new URLSearchParams(query);
                const vccUrl = 'https://vcc-web1.vinaphone.com.vn/0889685656/api/v1/calls?' + searchParams;

                var config = {
                    method: 'get',
                    url: vccUrl,
                    headers: { 
                        'Authorization': 'Bearer 5XTTp2q2i5ceFOI', 
                    }
                };
                
                axios(config)
                    .then(function (response) {
                        console.log(response.data);
                        res.json({ status: 1, code: 'SUCCESS', message: 'Thành công!', data: response.data });
                    })
                    .catch(function (error) {
                        console.log(error);
                        res.json({ status: 0, code: 'ERROR', message: 'Oops, server đang bận, vui lòng thử lại sau!', data: null });
                    });
            } else {
                res.json({ status: 0, code: 'UNAUTHORIZED', message: 'Lỗi xác thực người dùng!', data: null });
            }
        }
        else {
            res.json({ status: 0, code: 'UNAUTHORIZED', message: 'Lỗi xác thực người dùng!', data: null });
        }
        
    }
    
}