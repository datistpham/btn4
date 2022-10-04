import puppeteer  from "puppeteer";
import excel_to_json from "../analytics/excel_to_json.js";
// import path from "path"

export default async function simplefileDownload() {
    const browser= await puppeteer.launch({
        headless: false,
        product: "chrome"
    })
    const page= await browser.newPage()
    await page.goto('https://xypher.io/login.asp', { waitUntil: "networkidle2" })
    await page.type('.form-group input[type=text]', 'bathh02@gmail.com')
    await page.type('.form-group input[type=password]', 'rxfBwm9v9vv3*i.')
    await fakesleep(15000)
    await page.goto('https://xypher.io/Screener/Volume', { waitUntil: "networkidle2" })
    await fakesleep(20000)
    // USDT
    await page.select("#ScanExchange", "All")
    await page.select("#quote", "All")
    await page.click("#ScanSub")
    await fakesleep(3000)
    await page.focus("input[type='search']")
    await page.keyboard.type("btc")
    await fakesleep(2000)
    await page.click(".buttons-excel")
    await fakesleep(2000)
    excel_to_json()
    setInterval(async ()=> {
        await page.click(".buttons-excel")
        await fakesleep(4000)
        excel_to_json()
    }, 10000)
}

export const fakesleep= (ms)=> new Promise(rel=> setTimeout(rel, ms))