import { adaptRoute } from '../adapters'
import { makeAccountAvatarController, makeLoadAccountsController } from '../factories/controllers'
import { auth } from '../middlewares'

import { Router } from 'express'
import multer from 'multer'
const uploadConfig = multer()

export default (router: Router): void => {
  router.get('/users', auth, adaptRoute(makeLoadAccountsController()))

  router.patch('/users/avatar', auth, uploadConfig.single('avatar'), adaptRoute(makeAccountAvatarController()))
}
