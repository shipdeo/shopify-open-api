# Open API Plugin Shopify Shipdeo
Open API fulfilment merupakan fitur yang mengarahkan proses mengubah status fulfilment order dari shipdeo plugin shopify. Sehingga seller tetap dapat mengelola order mereka melalui ERP tanpa perlu mengakses portal atau plugin shipdeo untuk shopify.
## Get Started

Implement code in `javascript` use nodejs, before implement you need install library `bcrypt` & `axios`

```javascript
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
```

Example in curl.

```bash
curl --location 'https://sf-plugin-main-api-development.shipdeo.app/v1/fulfilment' \
--header 'signature: $2b$12$tnnJF8zJ9LIRu1CcOC9aSO9zx218mD1HAIR3Ppjd8ep2y1chKoiha' \
--header 'Content-Type: application/json' \
--data '{
    "deliveryTime": "2023-09-22T14:00:00+07:00",
    "deliveryType": "pickup"
}'
```