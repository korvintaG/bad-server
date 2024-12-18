import { NextFunction, Request, Response } from 'express'
import { constants } from 'http2'
import { loadEsm } from 'load-esm'

import BadRequestError from '../errors/bad-request-error'
import { MIN_FILE_SIZE, UPLOAD_FILE_TYPES } from '../config'

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        return next(new BadRequestError('Файл не загружен'))
    }
    if (req.file.size < MIN_FILE_SIZE)
        return next(new BadRequestError('Файл слишком маленький'))
    try {
        const { fileTypeFromFile } =
            await loadEsm<typeof import('file-type')>('file-type')
        const fileType = await fileTypeFromFile(req.file.path)
        if (!fileType)
            return next(new BadRequestError('Невозможно определить тип файла'))
        if (!fileType.mime)
            return next(new BadRequestError('Невозможно определить тип файла'))
        if (!UPLOAD_FILE_TYPES.includes(fileType.mime))
            return next(
                new BadRequestError('Данный тип файла нельзя загружать')
            )
        const fileName = process.env.UPLOAD_PATH
            ? `/${process.env.UPLOAD_PATH}/${req.file.filename}`
            : `/${req.file?.filename}`
        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName,
            originalName: req.file?.originalname,
        })
    } catch (error) {
        return next(error)
    }
}

export default {}
