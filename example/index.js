const bcrypt = require('bcrypt');
const axios = require('axios');

const hashing = (plaintext) => {
    const hash = bcrypt.hashSync(plaintext, 12);
    return hash;
}

const orderInfo = {
    shop: "andi-development-store.myshopify.com",
    orderId: "5494079815902",
    orderNumber: "2104"
}

const signature = hashing(`${orderInfo.shop}:${orderInfo.orderId}:${orderInfo.orderNumber}`);

let data = JSON.stringify({
    "deliveryTime": "2023-09-22T14:00:00+07:00",
    "deliveryType": "pickup"
});

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://sf-plugin-main-api-development.shipdeo.app/v1/fulfilment',
    headers: {
        'signature': signature,
        'Content-Type': 'application/json'
    },
    data: data
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });