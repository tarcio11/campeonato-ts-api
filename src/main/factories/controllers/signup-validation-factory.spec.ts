import { makeSignUpValidation } from './signup-validation-factory'
import { Validation } from '../../../presentation/protocols'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../validation/validators'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

jest.mock('../../../validation/validators/validation-composite')

describe('SignupValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
