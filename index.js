const Stripe = require('./dist/config/stripeConfig')
const Customer = require('./dist/functions/customer')
const Checkout = require('./dist/functions/checkout')
const PaymentIntent = require('./dist/functions/paymentIntents')
const PaymentMethod = require('./dist/functions/paymentmethod')

Stripe.setStripeSecretKey('sk_test_51NaWpfSExVYHj4PxB7PSnpMwofCkbTOolNPV45SIYjoZi7DoA8AdK5kO86VszFVlHXlPOiK44LwtS1pqw6tsSxK200VPAla7UU')
const custor = PaymentMethod.listCustomerPaymentMethods({
    customerId:'cus_ONfaDJW0CEf9Xd',
    // usage:'on_session'
})
custor.then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})
module.exports = {
    Stripe,
    Customer,
    Checkout,
    PaymentIntent,
    PaymentMethod
}   
