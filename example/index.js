const bcrypt = require('bcrypt');
const hashing = (plaintext) => {
    const hash = bcrypt.hashSync(plaintext, 12);
    return hash;
}

const compare = (hash, plaintext) => {
    return bcrypt.compareSync(plaintext, hash);
}

const plaintext = "andi-development-store.myshopify.com:5494079815902:2104";
const data = hashing(plaintext);

console.log(data);
console.log(compare(data, plaintext));