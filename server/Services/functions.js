import CryptoJS from "crypto-js"

export const SignToken = async (Data) => {
    return CryptoJS?.["AES"].encrypt(JSON.stringify(Data), "Cubicle123456").toString();
}

export const VerifyToken = async (token) => {
    let bytes = CryptoJS?.["AES"].decrypt(token, "Cubicle123456").toString(CryptoJS?.["enc"].Utf8)
    return JSON.parse(bytes);
}

export const generateUserIdCode =  () => {
    const string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let TransactionID = '';
    const length = string.length;
    for (let i = 0; i < 16; i++ ) {
        TransactionID += string[Math.floor(Math.random() * length)];
    }
    return TransactionID;
}