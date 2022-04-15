'use strict'

const axios = require('axios')

module.exports = {
    get: (req, res) => {
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
                res.json({ status: 1, code: 'SUCCESS', message: 'Thành công!', data: response.data })
            })
            .catch(function (error) {
                console.log(error);
                res.json({ status: 0, code: 'ERROR', message: 'Oops, server đang bận, vui lòng thử lại sau!', data: null })
            });
    }
    
}