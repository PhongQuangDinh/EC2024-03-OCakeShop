const axios = require('axios');
const { application } = require('express');
const { getApiUrl } = require('./WebConfig');

async function generateAccessToken(){
    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
        method: 'post',
        data: 'grant_type=client_credentials',
        auth: {
            username: process.env.PAYPAL_CLIENT_ID,
            password: process.env.PAYPAL_SECRET
        }
    })
    return response.data.access_token
}

async function createOrder() {
    const accessToken = await generateAccessToken();
    const apiUrl = getApiUrl();
    const response = await axios ({
        url: process.env.PAYPAL_BASE_URL + '/v2/checkout/orders',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        data: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    items: [
                        {
                            name: 'THANH TOAN WORLDCUP :33',
                            description: 'js kidding :>',
                            quantity: 1,
                            unit_amount: {
                                currency_code: 'USD',
                                value: '100.00'
                            }
                        }
                    ],
                    amount: {
                        currency_code: 'USD',
                        value: '100.00',
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: '100.00'
                            }
                        }
                    }
                }
            ],
            application_context: {
                return_url: apiUrl + '/payment/CONTINUE-ORDER',
                cancel_url: apiUrl + '/payment/CANCEL-ORDER',
                shipping_preference: 'NO_SHIPPING',
                user_action: 'PAY_NOW',
                brand_name: 'dinhquangphong.io'
            }
        })  
    }) 

    // console.log(response.data);
    return response.data.links.find(link => link.rel === 'approve').href
}

// this.createOrder().then(result => console.log(result)); // just for testing, this is the demo for a button

module.exports = {
    createOrder : createOrder
}