import { adaptRoute } from '../adapters'
import { makeAccountAvatarController, makeLoadAccountsController, makeLoadAccountByIdController } from '../factories/controllers'
import { auth } from '../middlewares'

import { Router } from 'express'
import multer from 'multer'
const uploadConfig = multer()

export default (router: Router): void => {
  router.patch('/users/avatar', auth, uploadConfig.single('avatar'), adaptRoute(makeAccountAvatarController()))
  router.get('/users', auth, adaptRoute(makeLoadAccountsController()))
  router.get('/users/:userId/profile', auth, adaptRoute(makeLoadAccountByIdController()))
}
