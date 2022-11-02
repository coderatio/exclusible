/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do a lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import ResponseComposer from 'App/Supports/ResponseComposer'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    const response = new ResponseComposer(ctx.response)
    if (error.code === 'E_VALIDATION_FAILURE') {
      return response.validationError(error.messages.errors)
    }

    if (error.code === 'E_UNAUTHORIZED_ACCESS') {
      return response.unauthorized('Unauthorized access')
    }

    if (error.code === 'E_ROUTE_NOT_FOUND') {
      return response.notFound(`We couldn't find what you're looking for.`)
    }

    let err
    let message: string = error.message

    if (error.code === 'E_RUNTIME_EXCEPTION') {
      message = 'Put the blame on us. But try again later.'
      err = { message: error.message }
    }

    return response.create(error.status ?? 500, 'failed', message, {
      error: err,
    })
  }
}
