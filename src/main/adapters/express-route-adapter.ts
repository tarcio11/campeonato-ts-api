import { Request, Response } from 'express'
import { Controller } from '../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const { file } = req
    let mappedFiles = {}
    if (file) {
      mappedFiles = ((file as Express.Multer.File), {
        name: file.originalname,
        type: file.mimetype,
        content: file.buffer,
        size: file.size,
        extension: `${file.originalname.split('.').pop()}`
      })
    }

    const request = {
      ...(req.body || {}),
      ...(mappedFiles || {}),
      accountId: req.accountId
    }
    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
