var express = require('express');
var paypal = require('paypal-rest-sdk');
var braintree = require('braintree');
var config = {};
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(req.route);
});





router.init = function(c){

  config = c;
  paypal.configure(c.api);
  //console.log("paypal",paypal);
}




module.exports = router;



/* {
    "result": {
        "id": "PAY-3WD96341JH495223UKWIZLOQ",
        "create_time": "2015-06-29T19:00:10Z",
        "update_time": "2015-06-29T19:00:10Z",
        "state": "created",
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal",
            "payer_info": {
                "shipping_address": {}
            }
        },
        "transactions": [
            {
                "amount": {
                    "total": "1.00",
                    "currency": "USD",
                    "details": {
                        "subtotal": "1.00"
                    }
                },
                "description": "This is the payment description.",
                "item_list": {
                    "items": [
                        {
                            "name": "item",
                            "sku": "item",
                            "price": "1.00",
                            "currency": "USD",
                            "quantity": "1"
                        }
                    ]
                },
                "related_resources": []
            }
        ],
        "links": [
            {
                "href": "https://api.sandbox.paypal.com/v1/payments/payment/PAY-3WD96341JH495223UKWIZLOQ",
                "rel": "self",
                "method": "GET"
            },
            {
                "href": "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-0SY62842811867012",
                "rel": "approval_url",
                "method": "REDIRECT"
            },
            {
                "href": "https://api.sandbox.paypal.com/v1/payments/payment/PAY-3WD96341JH495223UKWIZLOQ/execute",
                "rel": "execute",
                "method": "POST"
            }
        ],
        "httpStatusCode": 201
    }
} */