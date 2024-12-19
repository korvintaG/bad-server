import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export default function serveStatic(baseDir: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        // Определяем полный путь к запрашиваемому файлу
        const sanitizedPath = req.path.replace('..', '').replace('~', '') // чтоб нельзя было за пределы каталога выходить
        const filePath = path.join(baseDir, sanitizedPath)

        // Проверяем, существует ли файл
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                // Файл не существует отдаем дальше мидлварам
                return next()
            }
            // Файл существует, отправляем его клиенту
            return res.sendFile(filePath, (errex) => {
                if (errex) {
                    next(errex)
                }
            })
        })
    }
}
