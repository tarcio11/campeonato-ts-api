export class SignUpController {
  async handle (request: any): Promise<any> {
    return {
      statusCode: 400,
      body: new Error('Missing param: name')
    }
  }
}
