import { Request, Express } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { join, extname } from 'path'
import { faker } from '@faker-js/faker'
import { MAX_FILE_SIZE, UPLOAD_FILE_TYPES } from '../config'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    destination: (
        _req: Request,
        _file: Express.Multer.File,
        cb: DestinationCallback
    ) => {
        cb(
            null,
            join(
                __dirname,
                process.env.UPLOAD_PATH_TEMP
                    ? `../public/${process.env.UPLOAD_PATH_TEMP}`
                    : '../public'
            )
        )
    },

    filename: (
        _req: Request,
        file: Express.Multer.File,
        cb: FileNameCallback
    ) => {
        cb(null, faker.string.uuid() + extname(file?.originalname))
    },
})

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    if (!UPLOAD_FILE_TYPES.includes(file.mimetype)) {
        return cb(null, false)
    }
    return cb(null, true)
}

export default multer({
    storage,
    fileFilter,
    limits: { fileSize: MAX_FILE_SIZE },
})
