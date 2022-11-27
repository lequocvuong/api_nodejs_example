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
			if(response.data.code == 'OK') {
                        	console.log('numFound: ' + response.data.numFound + ", length: " + response.data.calls.length);
                        	res.json({ status: 1, code: 'SUCCESS', message: 'Thành công!', data: response.data });
                        }
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
        
    },
    post: (req, res) => {
        if (
            req.headers &&
            req.headers.token
          ) {
            var token = req.headers.token;
            if(token == "1.0m3dl4T3c@190056!56?56") {
                const body = req.body;
                const tainhaUrl = 'https://api-tainha.medcom.vn/api/CallCenter/getadvisor';

                var config = {
                    method: 'post',
                    url: tainhaUrl,
                    headers: { 
                        'Token': token, 
                        'Content-Type': 'application/json'
                    },
                    data : JSON.stringify(body)
                };
                
                axios(config)
                    .then(function (response) {
                        if(response.data.Successfull == true && response.data.Result != null) {
                                res.json({ status: 1, code: 'SUCCESS', message: 'Thành công!', data: response.data.Result });
                            }
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
