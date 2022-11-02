import Logger from '@ioc:Adonis/Core/Logger'

export default class ResponseComposer {
  protected context

  constructor(response) {
    this.context = response
  }

  public create(code: number = 200, state: string = 'success', message: string, data: object = {}) {
    return this.context.status(code).send({
      state,
      statusCode: code,
      message,
      data,
    })
  }

  public success(message: string, data: object = {}) {
    return this.create(200, 'success', message, data)
  }

  public failed(message: string, data: object = {}) {
    return this.create(406, 'failed', message, data)
  }

  public validationError(errors) {
    return this.create(422, 'failed', 'Validation failed.', {
      errors: errors,
    })
  }

  public notFound(message: string) {
    return this.create(404, 'failed', message)
  }

  public unauthorized(message: string, data: object = {}) {
    return this.create(401, 'failed', message, data)
  }

  public serverError(message: string, data: object = {}) {
    Logger.error(message)
    return this.create(500, 'failed', message, data)
  }

  public badRequest(message: string, data: object = {}) {
    return this.create(400, 'failed', message, data)
  }
}
