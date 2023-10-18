import CryptoJS from "crypto-js"

export const VerifyToken = (token) => {
    let bytes = CryptoJS?.["AES"].decrypt(token, "Cubicle123456").toString(CryptoJS?.["enc"].Utf8)
    return JSON.parse(bytes);
}