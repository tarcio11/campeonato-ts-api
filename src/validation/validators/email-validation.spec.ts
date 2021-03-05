import { EmailValidation } from './email-validation'
import { EmailValidatorSpy } from '../../presentation/tests/mocks'
import { InvalidParamError } from '../../presentation/errors'

import faker from 'faker'

describe('Email Validation', () => {
  test('Should return an error if EmailValidator returns false', async () => {
    const field = faker.random.word()
    const emailValidatorSpy = new EmailValidatorSpy()
    const sut = new EmailValidation(field, emailValidatorSpy)
    emailValidatorSpy.isEmailValid = false
    const email = faker.internet.email()
    const error = await sut.validate({ [field]: email })
    expect(error).toEqual(new InvalidParamError(field))
  })
})
