import fs from "fs"
import xlsx from "xlsx"

export default function excel_to_json() {
    const workbook= xlsx.readFile("./excel/Volume Screener -  Xypher.IO.xlsx")
    var sheet_name_list = workbook.SheetNames
    const newArr= []
    const a= xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    a.map(item=> {
        const { 
            'Volume Screener -  Xypher.IO': exchange,
            __EMPTY: symbol,
            __EMPTY_1: quote,
            __EMPTY_2: base,
            __EMPTY_3: bought,
            __EMPTY_4: sold,
            __EMPTY_5: total_trade,
            __EMPTY_6: diff,
            __EMPTY_7: percent,
            __EMPTY_8: vol
         }= item
         const newa= {symbol, quote, base, bought, sold, total_trade, diff, percent, vol}
         newArr.push(newa)
    })
    console.log(newArr)
    fs.unlink("./excel/Volume Screener -  Xypher.IO.xlsx", (err)=> {
        if(err ) throw err
    })
}
