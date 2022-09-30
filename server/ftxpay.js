import crypto from "crypto";
import fetch from 'node-fetch';

export async function createFtxpayOrder(price) {
    const method = "POST"
    const body = {'size': price, 'coin': 'USD'}
    const stringified_body = JSON.stringify(body).replaceAll(":", ": ").replaceAll(",", ", ")
    const pathUrl = "/api/ftxpay/apps/" + getFtxpayAppId() + "/orders"
    const headers = getFtxHeaders(pathUrl, method, stringified_body)
    try {
        const response = await fetch(getFtxBaseUrl() + pathUrl, {
            method: method,
            body: stringified_body,
            headers: headers
        })
        const data = await response.json()
        return data.result.id
    } catch(error) {
        return 0;
    }

}

export async function getFtxpayOrder(ftxpayOrderId) {
    const method = "GET"
    const body = null
    const pathUrl = "/api/ftxpay/apps/" + getFtxpayAppId() + "/" + ftxpayOrderId + "/single_order"
    const headers = getFtxHeaders(pathUrl, method, body)
        try {
        const response = await fetch(getFtxBaseUrl() + pathUrl, {
            method: method,
            headers: headers
        })
        const data = await response.json()
        return data.result
    } catch(error) {
        console.log(error)
        return 0;
    }
}

export async function cancelFtxpayOrder(ftxpayOrderId){
    const method = "DELETE"
    const body = null
    const pathUrl = "/api/ftxpay/apps/" + getFtxpayAppId() + "/" + ftxpayOrderId + "/orders"
    const headers = getFtxHeaders(pathUrl, method, body)
        try {
        const response = await fetch(getFtxBaseUrl() + pathUrl, {
            method: method,
            headers: headers
        })
        const data = await response.json()
        return data.result
    } catch(error) {
        console.log(error)
        return 0;
    }
}

export async function returnFtxpayOrder(paymentId){
    const method = "POST"
    const body = null
    const pathUrl = "/api/ftxpay/" + getFtxpayAppId() + "/" + paymentId + "/return"
    const headers = getFtxHeaders(pathUrl, method, body)
        try {
        const response = await fetch(getFtxBaseUrl() + pathUrl, {
            method: method,
            headers: headers
        })
        const data = await response.json()
        return data.result
    } catch(error) {
        console.log(error)
        return 0;
    }
}

function getFtxHeaders(url,method,body){
    const key = getFtxApiKey()
    const ts = Date.now()
    const string = (method === "POST") ? `${ts}${method}${url}${body}` : `${ts}${method}${url}`
    const sign = sign_string(getFtxApiSecret(),string)
    return {'FTXUS-KEY': key, 'FTXUS-TS': ts, 'FTXUS-SIGN': sign, "Content-Type": "application/json"}
}

function sign_string(key_b64, sign_string) {
    const to_sign = Buffer.from(sign_string)
    const key = Buffer.from(key_b64)
    return crypto.createHmac("sha256", key )
                 .update(to_sign)
                 .digest('hex');
}

function getFtxBaseUrl(){
    return "https://ftx.us"
}

function getFtxpayAppId(){
    return "6845"
}

function getFtxApiKey(){
    return "Rk7Unng3WW1bNdlPT756Os62L01LK9DGtOb82LGM";
}

function getFtxApiSecret(){
    return "P9n33sNn1nW6L1IyuB3-udGz18c7UEOTCA9DbbL8";
}