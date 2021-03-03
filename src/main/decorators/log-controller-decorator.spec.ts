import { LogControllerDecorator } from './log-controller-decorator'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { ok } from '../../presentation/helpers'

import faker from 'faker'

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    class ControllerSpy implements Controller {
      request: any
      httpResponse = ok(faker.random.uuid())

      async handle (request: HttpRequest): Promise<HttpResponse> {
        this.request = request
        return this.httpResponse
      }
    }
    const controllerSpy = new ControllerSpy()
    const sut = new LogControllerDecorator(controllerSpy)
    const request: any = faker.lorem.sentence()
    await sut.handle(request)
    expect(controllerSpy.request).toEqual(request)
  })
})
