const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const cryptoKey = Buffer.concat([Buffer.from(process.env.CRYPTO_KEY), Buffer.alloc(32)], 32)
const ivLength = 16;

module.exports = (value) => {
    let iv = crypto.randomBytes(ivLength);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(cryptoKey, 'hex'), iv);
    let encrypted = cipher.update(value);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}