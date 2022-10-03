import fs from "fs"
import xlsx from "xlsx"
import { fakesleep } from "../cron/download_file.js"
import { dbconnection } from "../db/init.js"

export default function excel_to_json() {
    const workbook= xlsx.readFile("./excel/Volume Screener -  Xypher.IO.xlsx")
    const workbook2= xlsx.readFile("./excel/Volume Screener -  Xypher.IO (1).xlsx")
    let sheet_name_list = workbook.SheetNames
    let sheet_name_list_2= workbook2.SheetNames
    const newArr= []
    const newArr2= []
    const a= xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    const a2= xlsx.utils.sheet_to_json(workbook2.Sheets[sheet_name_list_2[0]])
    a.map(item=> {
        const { 
            'Volume Screener -  Xypher.IO': exchange,
            __EMPTY: symbol,
            __EMPTY_3: bought,
            __EMPTY_4: sold,
            __EMPTY_5: total_trade,
         }= item
         const newa= {exchange, symbol, bought, sold, total_trade}
         newArr.push(newa)
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
    dbconnection.collection("data_btn4").insertMany(newArr.concat(newArr2), async function(err, result) {
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
}
