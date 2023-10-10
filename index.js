const express = require('express');
const morgan  = require('morgan');
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { rateLimit } = require('express-rate-limit')

const app = express();
const PORT = 3005;

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
})

app.use(morgan('combined'));
app.use(limiter);
app.use('/bookingService', async(req,res,next) => {
    try{
        // console.log(req.headers['x-access-token']);
        const response  = await axios.get('http://localhost:3001/api/v1/isAuthenticated',{
            headers: {
                'x-access-token': req.headers['x-access-token']
            }
        });
        console.log(response.data);
        if(response.data.sucess){
            next();
        }
        else{
            return res.status(401).json({
                message : 'Unauthorized'
            })
        }
    }
    catch(error){
        return res.status(401).json({
            message : 'Unauthorized'
        })
    }
    
});
//implemented the reverse proxy
app.use('/bookingService', createProxyMiddleware({ target: 'http://localhost:3002/', changeOrigin: true }));

// but what if i want to hit the authentication service before hitting the booking service to check weather the user is authenticated or not

app.get('/home', (req,res) =>{
    return res.json({Message : 'ok'});
})
app.listen(PORT , () =>{
    console.log(`Server started at ${PORT}`);
})