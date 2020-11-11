const { response } = require('express');
const { Stripe } = require('stripe');
const Product = require('../models/product');
const User = require('../models/user');


const stripe = new Stripe(process.env.SECRET_STRIPE_KEY);

const getCheckoutsSessions = async(req, res = response) => {

    const sessions = await stripe.checkout.sessions.list({
        limit: 10
    });

    res.json({
        ok: true,
        sessions
    });

}

const getCheckoutsCustomers = async(req, res = response) => {

    const customers = await stripe.customers.list({
        limit: 10
    });

    res.json({
        ok: true,
        customers
    });

}

const getCheckoutsItems = async(req, res = response) => {

    const id = req.params.id;

    const lineItems = await stripe.checkout.sessions.listLineItems(id, { limit: 10 });

    res.json({
        ok: true,
        lineItems
    });

}

const createCheckoutSession = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const productDB = await Product.findById(id);

        const userDB = await User.findById(uid);

        const { name, unitPrice, description, img } = productDB;

        const { email } = userDB;

        const customer = await stripe.customers.create({
            email
        });

        const product = await stripe.products.create({
            name,
            description,
            images: img
        });

        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: unitPrice,
            currency: 'ars'
        });

        const session = await stripe.checkout.sessions.create({
            customer_email: customer.email,
            payment_method_types: ['card'],
            line_items: [{
                price: price.id,
                quantity: 1
            }],
            mode: 'payment',
            success_url: `https://example.com/success`,
            cancel_url: 'https://example.com/cancel'
        });

        res.json({
            ok: true,
            id: session
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });

    }

}


module.exports = {
    getCheckoutsSessions,
    getCheckoutsCustomers,
    getCheckoutsItems,
    createCheckoutSession
}