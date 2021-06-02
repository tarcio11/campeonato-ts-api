import { makeAccountAvatarValidation } from './account-avatar-validation-factory'
import { Validation } from '../../../presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../validation/validators'

jest.mock('../../../validation/validators/validation-composite')

describe('AccountAvatarValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAccountAvatarValidation()
    const validations: Validation[] = []
    for (const field of ['name']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
