const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    let token = req.headers['token-key'];
    jwt.verify(token, 'secretkey16874497', (err, decoded) =>{
        if (err){
            res.status(401).json({ status: 'fail', message: 'Unauthorized'});
        }else{

            // Get user name from decoded token and add with req header
            let username = decoded['data']['UserName'];
            req.headers.username = username;

            next()
        }
    })
}
