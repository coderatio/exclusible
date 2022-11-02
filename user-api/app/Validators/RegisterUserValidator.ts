import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    firstName: schema.string({ escape: true, trim: true }),
    lastName: schema.string({ escape: true, trim: true }),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.minLength(6)]),
    confirmPassword: schema.string.optional({}, [
      rules.confirmed('password'),
      rules.requiredIfExists('password'),
    ]),
    role: schema.string.optional({ escape: true, trim: true }),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'firstName.required': 'The first name field is required',
    'lastName.required': 'The last name field is required',
    'email.required': 'The email field is required',
    'email.unique': 'The email is already taken',
    'email.email': 'The email is invalid',
    'password.required': 'The password field is required',
    'password.minLength': 'The password must not be less than 6 characters',
    'password.confirmed': 'The password did not match',
    'confirmPassword.requiredIfExists': 'The confirm password field is required',
  }
}
