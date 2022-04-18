const { getUserbyUsername,
    addItemToCart,
    getCartByUsername,
    deleteItemFromCart,
    createLineItems,
    placeOrder } = require('../../models/user.model')

async function HttpGetUserbyUsername(req, res) {
    const userName = req.params.username
    return res.send(await getUserbyUsername(userName))
}

async function HttpGetUserCart(req, res) {

    const username = req.params.username;
    return res.send(await getCartByUsername(username));
}

async function HttpAddItemToCart(req, res) {

    const userName = req.params.username;
    const data = req.body
    const response = await addItemToCart(userName, data)
    return res.send(response)

}

async function HttpGetItemFromCart(req, res) {

    const username = req.params.username;
    let cart = await getCartByUsername(username)
    cart = cart['cart']['items'];
    let filtered = cart.filter(item => item.itemID.toString() == req.params.id)
    console.log(filtered)
    return res.send(filtered[0])
}

async function HttpRemoveItemFromCart(req, res) {

    const username = req.params.username;
    const itemID = req.params.id;
    const response = await deleteItemFromCart(username, itemID).then((response) => {
        return response
    });
    console.log("Response inside HTTP Backend Delete Function", response);
    res.send(response)
}

// async function HttpInitiateCheckout(req, res) {

//     const data = req.body;
//     const line_items = await createLineItems(data['cart'])
//     const session = await stripe.checkout.sessions.create({
//         line_items: line_items,
//         mode: 'payment',
//         payment_method_types: ['card'],
//         success_url: `http://localhost:8000/success`,
//         cancel_url: `http://localhost:8000/?canceled=true`,
//       });
//       res.json({url: session.url}) 
// }

async function HttpPlaceOrder(req, res){

    const {token, amount, cart, user} = req.body;
    placeOrder(token, amount, cart, user);

}


module.exports = {
    HttpGetUserbyUsername,
    HttpGetUserCart,
    HttpAddItemToCart,
    HttpRemoveItemFromCart,
    HttpGetItemFromCart,
    HttpPlaceOrder
}