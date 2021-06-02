import { adaptRoute } from '../adapters'
import { makeAccountAvatarController } from '../factories/controllers'
import { auth } from '../middlewares'

import { Router } from 'express'
import multer from 'multer'
const uploadConfig = multer()

export default (router: Router): void => {
  router.patch('/users/avatar', auth, uploadConfig.single('avatar'), adaptRoute(makeAccountAvatarController()))
}
