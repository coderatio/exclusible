/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for the majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { service: 'User Api' }
})

Route.post('/register', 'RegisterController').as('register')
Route.post('login', 'LoginController').as('login')
Route.delete('/logout', 'LogoutController').as('logout')

// Rates - Admin Role
Route.post('/settings/update-rates', 'SettingsController.updateRates')
  .middleware(['auth', 'onlyAdmin'])
  .as('settings.updateRates')
