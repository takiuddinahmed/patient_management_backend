import { generateKeyPairSync } from "crypto"
import { writeFileSync } from "fs"


const genKeyPair = ()=>{
    const keyPair = generateKeyPairSync('ec',{
        namedCurve: 'secp256k1',

        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },

        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    })

    writeFileSync('private_key.pem',keyPair.privateKey,'utf-8');
    writeFileSync('public_key.pem',keyPair.publicKey,'utf-8');
}

genKeyPair()