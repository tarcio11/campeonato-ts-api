import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '../../presentation/errors'

import faker from 'faker'

const field = faker.random.word()

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation(field)
    const error = sut.validate({ invalidField: faker.random.word() })
    expect(error).toEqual(new MissingParamError(field))
  })
})
