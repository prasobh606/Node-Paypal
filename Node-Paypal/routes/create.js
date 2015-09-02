var express = require('express');
var paypal = require('paypal-rest-sdk');
/* var braintree = require('braintree'); */
var config = {};
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {

	var payment_e= {
		"intent": "authorize",
		"payer": {
			"payment_method": "paypal"
		},
		"redirect_urls": {
			"return_url": "http://return.url",
			"cancel_url": "http://cancel.url"
		},
		"transactions": [{
			"item_list": {
				"items": [{
					"name": "item",
					"sku": "item",
					"price": "1.00",
					"currency": "USD",
					"quantity": 1
				}]
			},
			"amount": {
				"currency": "USD",
				"total": "1.00"
			},
			"description": "This is the payment description."
		}]
	};

	 var payment = {
		    "intent": "sale",
		    "payer": {
		        "payment_method": "credit_card",
		        "funding_instruments": [{
		            "credit_card": {
		                "type":req.body.type.toLowerCase(),
		                "number": req.body.cardNumber,
		                "expire_month": req.body.expireMonth,
		                "expire_year": req.body.expireYear,
		                "cvv2": req.body.cvv,
		                "first_name":req.body.firstName,
		                "last_name": req.body.lastName,
		                 "billing_address": {
		                    "line1": "52 N Main ST",
		                    "city": "Johnstown",
		                    "state": "OH",
		                    "postal_code": "43210",
		                    "country_code": "US"
		                } 
		            }
		        }]
		    },
		    "transactions": [{
		        "amount": {
		            "total": req.body.inputAmount,
		            "currency": req.body.currency,
		            /* "details": {
		                "subtotal": "150",
		                "tax": "25",
		                "shipping": "25"
		            } */
		        },
		        "description": req.body.description
		    }]
		};



	paypal.payment.create(payment, function (error, payment) {
		  
		  if (error) {
	        //res.render('about', { title: error });
		    console.log(JSON.stringify(error));
		  } else {
		  	
	        req.session.paymentId = payment.id;
				// in case of payment type as "Paypal" redirect to paypal URL
	    	    if(payment.payer.payment_method === 'paypal') {
	    	    		
	    		      
	    		      var redirectUrl;
	    		      for(var i=0; i < payment.links.length; i++) {
	    		        var link = payment.links[i];
	    		        if (link.method === 'REDIRECT') {
	    		          redirectUrl = link.href;
	    		        }
	    		      }
	    		      res.redirect(redirectUrl);
	    		}
	         res.render('create', { response: payment });  
	        console.log('Approved',JSON.stringify(payment));  
		  }
	});

});


module.exports = router;