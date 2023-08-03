const stripe = require('./dist/config/stripeConfig')
const customer = require('./dist/functions/customer')
const checkout = require('./dist/functions/checkout')

module.exports = {
    stripe,
    customer,
    checkout
}    