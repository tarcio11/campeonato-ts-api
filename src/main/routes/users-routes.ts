import { Router } from 'express'
import { adaptRoute } from '../adapters'
import { makeAccountAvatarController } from '../factories/controllers'
import { auth } from '../middlewares'

export default (router: Router): void => {
  router.patch('/users/avatar', auth, adaptRoute(makeAccountAvatarController()))
}
