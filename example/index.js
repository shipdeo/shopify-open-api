const bcrypt = require('bcrypt');
const axios = require('axios');

const hashing = (plaintext) => {
    const hash = bcrypt.hashSync(plaintext, 12);
    return hash;
}

const orderInfo = {
    shop: "andi-development-store.myshopify.com",
    orderId: "5494079815902",
    orderNumber: "2104",
    clientSecret: "your-clientSecret"
}

const signature = hashing(`${orderInfo.shop}:${orderInfo.orderId}:${orderInfo.orderNumber}:${orderInfo.clientSecret}`);

