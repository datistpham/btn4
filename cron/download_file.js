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
    await fakesleep(25000)
    await page.select("#ScanExchange", "All")
    await page.select("#quote", "BTC")
    await page.click("#ScanSub")
    await page.click(".buttons-excel")
    await fakesleep(1000)
    await page.select("#ScanExchange", "All")
    await page.select("#quote", "ETH")
    await page.click("#ScanSub")
    await page.click(".buttons-excel")
    await fakesleep(3000) // wait for download btc and eth
    excel_to_json()
    setInterval(async ()=> {
        await page.select("#ScanExchange", "All")
        await page.select("#quote", "BTC")
        await page.click("#ScanSub")
        await page.click(".buttons-excel")
        await fakesleep(1000)
        await page.select("#ScanExchange", "All")
        await page.select("#quote", "ETH")
        await page.click("#ScanSub")
        await page.click(".buttons-excel")
        await fakesleep(3000) // wait for download btc and eth
        excel_to_json()
    }, 10000)
    
}

export const fakesleep= (ms)=> new Promise(rel=> setTimeout(rel, ms))