const Stripe = require('./dist/config/stripeConfig')
const Customer = require('./dist/functions/customer')
const Checkout = require('./dist/functions/checkout')
const PaymentIntent = require('./dist/functions/paymentIntents')
const PaymentMethod = require('./dist/functions/paymentmethod')

module.exports = {
    Stripe,
    Customer,
    Checkout,
    PaymentIntent,
    PaymentMethod
}   
