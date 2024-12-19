import { ErrorRequestHandler } from 'express'
import { MulterError } from 'multer'

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
    const statusCode = err.statusCode || 500
    let message: string
    if (err instanceof MulterError) message = err.message
    else
        message =
            statusCode === 500 ? 'На сервере произошла ошибка' : err.message
    console.log(err)
    res.status(statusCode).send({ message })

    next()
}

export default errorHandler
