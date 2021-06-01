export interface LoadAccountByIdRepository {
  loadById: (accountId: string) => Promise<LoadAccountByIdRepository.Result>
}

export namespace LoadAccountByIdRepository {
  export type Result = {
    id: string
  }
}
