const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const cryptoKey = Buffer.concat([Buffer.from(process.env.CRYPTO_KEY), Buffer.alloc(32)], 32)

module.exports = (value) => {
    let textParts = value.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(cryptoKey, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
