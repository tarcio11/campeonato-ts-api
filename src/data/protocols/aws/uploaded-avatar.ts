import { UploadAvatar } from '../../../domain/usecases'

export interface UploadedAvatar {
  upload: (options: UploadedAvatar.Params) => Promise<UploadedAvatar.Result>
}

export namespace UploadedAvatar {
  export type Params = UploadAvatar.Params

  export type Result = UploadAvatar.Result
}
