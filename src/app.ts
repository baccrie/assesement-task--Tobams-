import express from 'express'

const app = express()

const PORT: any = 8080

app.listen((PORT: any) => console.log(`server is running on port ${PORT}`))