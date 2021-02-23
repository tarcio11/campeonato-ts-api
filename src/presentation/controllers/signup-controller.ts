export class SignUpController {
  async handle (request: any): Promise<any> {
    if (!request.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }
    return {
      statusCode: 400,
      body: new Error('Missing param: email')
    }
  }
}
