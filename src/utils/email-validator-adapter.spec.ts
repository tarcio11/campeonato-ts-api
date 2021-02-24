import { EmailValidatorAdapter } from './email-validator-adapter'

import faker from 'faker'

describe('EmailValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid(faker.internet.email())
    expect(isValid).toBe(false)
  })
})
