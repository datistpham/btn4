import puppeteer  from "puppeteer";
import path from "path"

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
    setInterval(async ()=> {
        page.click(".buttons-excel")
    }, 10000)
    
}

const fakesleep= (ms)=> new Promise(rel=> setTimeout(rel, ms))