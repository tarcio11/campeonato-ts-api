export interface UploadAvatar {
  upload: (file: UploadAvatar.Params) => Promise<UploadAvatar.Result>
}

export namespace UploadAvatar {
  export type Params = {
    name: string
    type: string
    content: string
    size: number
    extension: string
  }
  export type Result = {
    avatar_url: string
  }
}
