export interface UpdateAvatarRepository {
  updateAvatar: (accountId: string, avatar: string) => Promise<void>
}
