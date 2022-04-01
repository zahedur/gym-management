const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    let token = req.headers['token-key'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
        if (err){
            res.status(401).json({ status: 'fail', message: 'Unauthorized'});
        }else{

            // Get user name from decoded token and add with req header
            req.headers.user = decoded['data'];
            next()
        }
    })
}
