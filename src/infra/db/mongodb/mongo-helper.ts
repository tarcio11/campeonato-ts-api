import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: (data: any): any => {
    const { _id, ...rest } = data
    return { ...rest, id: _id }
  },

  accountMap: (data: any): any => {
    if (data instanceof Array) {
      return data.map(item => ({
        id: item._id,
        name: item.name,
        email: item.email,
        avatar: item.avatar
      }))
    }
    return ({
      id: data._id,
      name: data.name,
      email: data.email,
      avatar: data.avatar
    })
  }
}
