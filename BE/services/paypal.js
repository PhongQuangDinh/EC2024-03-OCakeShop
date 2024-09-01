const axios = require('axios');
const { application } = require('express');
const { getApiUrl } = require('./WebConfig');

async function generateAccessToken() {
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

async function createOrder(orderData) {
    const accessToken = await generateAccessToken();
    const apiUrl = getApiUrl();
    const response = await axios({
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
                    items: orderData.items,
                    amount: {
                        currency_code: orderData.amount.currency_code,
                        value: orderData.amount.value,
                        breakdown: {
                            item_total: {
                                currency_code: orderData.amount.breakdown.item_total.currency_code,
                                value: orderData.amount.breakdown.item_total.value
                            },
                            shipping: {
                                currency_code: orderData.amount.breakdown.shipping.currency_code,
                                value: orderData.amount.breakdown.shipping.value
                            }
                        }
                    }
                }
            ],
            application_context: {
                return_url: apiUrl + '/payment/CONTINUE-ORDER',
                cancel_url: apiUrl + '/payment/CANCEL-ORDER',
                shipping_preference: orderData.shipping_preference,
                user_action: 'PAY_NOW',
                brand_name: 'Ocake-shop'
            }
        })
    });

    return response.data.links.find(link => link.rel === 'approve').href;
}

async function killOrder(token) {
    const accessToken = await generateAccessToken();

    const response = await axios({
        url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${token}`,
        method: 'patch',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        data: [
            {
                op: 'replace',
                path: '/purchase_units/@reference_id=="default"/amount',
                value: {
                    currency_code: 'USD',
                    value: '0.00'
                }
            }
        ],
    });

    return response.data;
}
// this.createOrder().then(result => console.log(result)); // just for testing, this is the demo for a button

module.exports = {
    createOrder: createOrder,
    killOrder: killOrder
}