const stripe = require('./dist/config/stripeConfig')
const customer = require('./dist/functions/customer')
const checkout = require('./dist/functions/checkout')
const paymentintent = require('./dist/functions/paymentIntents')

module.exports = {
    stripe,
    customer,
    checkout,
    paymentintent
}   
