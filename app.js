import express from "express"
import http from "http"
// import cors from "cors"
import simplefileDownload from "./cron/download_file.js"
import connectMongo from "./db/init.js"
// import excel_to_json from "./analytics/excel_to_json.js"

const app= express()
const httpServer= http.createServer(app)
connectMongo()
simplefileDownload()
// excel_to_json()


httpServer.listen(4000, ()=> console.log("Server run on port 4000"))