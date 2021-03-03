import { LogControllerDecorator } from './log-controller-decorator'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogErrorRepository } from '../../data/protocols'
import { ok, serverError } from '../../presentation/helpers'

import faker from 'faker'

class LogErrorRepositorySpy implements LogErrorRepository {
  stack: string

  async logError (stack: string): Promise<void> {
    this.stack = stack
  }
}

class ControllerSpy implements Controller {
  request: any
  httpResponse = ok(faker.random.uuid())

  async handle (request: HttpRequest): Promise<HttpResponse> {
    this.request = request
    return this.httpResponse
  }
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const request: any = faker.lorem.sentence()
    await sut.handle(request)
    expect(controllerSpy.request).toEqual(request)
  })

  test('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpResponse = await sut.handle(faker.lorem.sentence() as any)
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = mockServerError()
    controllerSpy.httpResponse = serverError
    await sut.handle(faker.lorem.sentence() as any)
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })
})
