export interface UpdateAvatar {
  update: (avatar: UpdateAvatar.Params) => Promise<UpdateAvatar.Result>
}

export namespace UpdateAvatar {
  export type Params = {
    accountId: string
    name: string
  }

  export type Result = {
    avatar: string
    avatar_url: string
  }
}
