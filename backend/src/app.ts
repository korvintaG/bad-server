import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'
import mongoSanitize from 'express-mongo-sanitize'
import path from 'path'
import errorHandler from './middlewares/error-handler'
import serveStatic from './middlewares/serverStatic'
import { normalizeLimit, checkQueryOnObject } from './middlewares/request-query'
import routes from './routes'
import { limiter } from './middlewares/rate-limit'
import {
    DB_ADDRESS,
    ORIGIN_ALLOW,
    PORT,
    MAX_BODY_SIZE,
    COOKIES_SECRET,
} from './config'

const app = express()
app.use(cookieParser(COOKIES_SECRET))
app.use(limiter)
app.use(json({ limit: MAX_BODY_SIZE }))
app.use(cors({ origin: ORIGIN_ALLOW, credentials: true }))
app.use(serveStatic(path.join(__dirname, 'public')))
app.use(urlencoded({ extended: true }))
app.use(checkQueryOnObject)
app.use(mongoSanitize())
app.use(normalizeLimit)
app.use(routes)
app.use(errors())
app.use(errorHandler)

// eslint-disable-next-line no-console

const bootstrap = async () => {
    try {
        await mongoose.connect(DB_ADDRESS)
        await app.listen(PORT, () => console.log('ok'))
    } catch (error) {
        console.error(error)
    }
}

bootstrap()
