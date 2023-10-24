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
    orderNumber: "2104",
    apiKey: "your-api-key"
}

const signature = hashing(`${orderInfo.shop}:${orderInfo.orderId}:${orderInfo.orderNumber}:${orderInfo.apiKey}`);

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
Example in PHP

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://sf-plugin-main-api-development.shipdeo.app/v1/fulfilment',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
    "deliveryTime": "2023-09-22T14:00:00+07:00",
    "deliveryType": "pickup"
}',
  CURLOPT_HTTPHEADER => array(
    'signature: $2b$12$tnnJF8zJ9LIRu1CcOC9aSO9zx218mD1HAIR3Ppjd8ep2y1chKoiha',
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;

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
Description for Request Headers

| Attribute| Type | Exaple | Mandatory | Description |
| ----------- | --------- | ---------- | ---------- | ---------- |
| signature | string | hashing saltround 13 | true | di generate dari 4 data shop, orderId, orderNumber dan apiKey |
| apiKey | string | your-apikey | true | untuk api key di generate dari sistem kita, di portal shopify plugin shipdeo |

Description for request body.

| Attribute| Type | Exaple | Mandatory | Description |
| ----------- | --------- | ---------- | ---------- | ---------- |
| deliveryTime | string | 2023-09-22T14:00:00+07:00 | false | ini menjadi wajib ketika `deliveryType` bernilai `pickup`, format waktu tanggal saat ini dan GMT +7 atau WIB |
| deliveryType | string | pickup or dropoff | true | nilai dari `deliveryType` dapat di input `pickup` atau `dropoff`, pickup dalam arti kurir akan datang pickup barang ke lokasi pengirim atau gudang, kalau dropoff merupakan proses untuk barang yang akan dikirim di anter ke gerai terdekat |
