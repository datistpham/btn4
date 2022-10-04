import fs from "fs"
import xlsx from "xlsx"
import { fakesleep } from "../cron/download_file.js"
import { dbconnection } from "../db/init.js"

export default function excel_to_json() {
    const workbook1=  xlsx.readFile("./excel/Volume Screener -  Xypher.IO.xlsx")
    const workbook2= xlsx.readFile("./excel/Volume Screener -  Xypher.IO (1).xlsx")
    const workbook3= xlsx.readFile("./excel/Volume Screener -  Xypher.IO (2).xlsx")
    let sheet_name_list_1 = workbook1.SheetNames
    let sheet_name_list_2 = workbook2.SheetNames
    let sheet_name_list_3 = workbook3.SheetNames
    const newArr1= []
    const newArr2= []
    const newArr3= []
    const a1= xlsx.utils.sheet_to_json(workbook1.Sheets[sheet_name_list_1[0]])
    const a2= xlsx.utils.sheet_to_json(workbook2.Sheets[sheet_name_list_2[0]])
    const a3= xlsx.utils.sheet_to_json(workbook3.Sheets[sheet_name_list_3[0]])
    a1.map(item=> {
        const { 
            'Volume Screener -  Xypher.IO': exchange,
            __EMPTY: symbol,
            __EMPTY_3: bought,
            __EMPTY_4: sold,
            __EMPTY_5: total_trade,
         }= item
         const newa1= {exchange, symbol, bought, sold, total_trade}
         newArr1.push(newa1)
    })
    a2.map(item=> {
        const {
            'Volume Screener -  Xypher.IO': exchange,
            __EMPTY: symbol,
            __EMPTY_3: bought,
            __EMPTY_4: sold,
            __EMPTY_5: total_trade,
            __EMPTY_6: diff,
        }= item
        const newa2= {exchange, symbol, bought, sold, total_trade, diff}
        newArr2.push(newa2)
    })
    a3.map(item=> {
        const {
            'Volume Screener -  Xypher.IO': exchange,
            __EMPTY: symbol,
            __EMPTY_3: bought,
            __EMPTY_4: sold,
            __EMPTY_5: total_trade,
            __EMPTY_6: diff,
        }= item
        const newa3= {exchange, symbol, bought, sold, total_trade, diff}
        newArr3.push(newa3)
    })
    dbconnection.collection("data_btn4").insertMany(newArr1.concat(newArr2).concat(newArr3), async function(err, result) {
        if(err) throw err
        else {
            await fakesleep(7000)
            dbconnection.collection("data_btn4").deleteMany({}, function(err, result) {
                if(err) throw err
                else {
                    console.log(result.deletedCount)
                }
            })
        }
    })
    fs.unlink("./excel/Volume Screener -  Xypher.IO.xlsx", (err)=> {
        if(err ) throw err
    })
    fs.unlink("./excel/Volume Screener -  Xypher.IO (1).xlsx", (err) => {
        if(err) throw err
    })
    fs.unlink("./excel/Volume Screener -  Xypher.IO (2).xlsx", (err) => {
        if(err) throw err
    })
}
