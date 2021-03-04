import { ValidationComposite } from './validation-composite'
import { ValidationSpy } from '../../presentation/tests/mocks'
import { MissingParamError } from '../../presentation/errors'

import faker from 'faker'

const field = faker.random.word()

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const validationSpies = [
      new ValidationSpy(),
      new ValidationSpy()
    ]
    const sut = new ValidationComposite(validationSpies)
    validationSpies[0].error = new MissingParamError(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(validationSpies[0].error)
  })
})
