# easyEncryption Encryption

EasyIC is a simple encryption and decryption library implemented in JavaScript.

## Installation

To install easyEncryption, you can use npm:

```bash
npm install @piaochen/easy-encryption
```

## Usage

First, import the `easyic-encryption` module in your JavaScript file:

```js
const easyEncryption = require('@piaochen/easy-encryption');
```

Then, create an instance of the `easyEncryption` class with your secret key:

```js
const key = "your-secret-key"; // you can replace this with your actual secret key
const ee = new easyEncryption(key);
```

You can now use the `doEncode` and `doDecode` methods to encrypt and decrypt strings:

```js
// Encrypt a string
let ciphertext = ee.doEncode("HelloWorld"); // cMajQBpYsgnwsQHDiBPOTezlERPsQvsulGINyvJoQWFKCtYLvCojxbFpYrYdSHqXjLDE
/*
Perhaps the effect of your encryption is different from mine, 
because easyEncryption uses random numbers during the encryption process, 
resulting in different encrypted strings in each encryption. 
But it won't affect its normal decryption!
*/

// Decrypt a string
let plaintext = ee.doDecode(ciphertext); // HelloWorld
```

**Attention!** If you add punctuation to a string, the encryption effect may become strange, so I suggest that you do not add punctuation to the string.

## API

### doEncode(plaintext)

This method takes a plaintext string as input and returns the encrypted string.

### doDecode(ciphertext)

This method takes an encrypted string as input and returns the decrypted plaintext string.

## Notes

- The same secret key must be used for both encryption and decryption.
- The input to both `doEncode` and `doDecode` must be a string. If it is not, an error will be thrown.
- Please replace `"your-secret-key"` with your actual secret key. 
- The security of this encryption algorithm mainly depends on the secret key and random process. Only by knowing the correct secret key and random process rules can the original string be decoded correctly. But please note that this is a simple encryption algorithm and may not be suitable for scenarios that require high security. If you need a higher level of security, it is recommended to use libraries specifically designed for secure encryption.