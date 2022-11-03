import Route from '@ioc:Adonis/Core/Route';

Route.get('/ws-test', async ({ view }) => {
  return view.render('socket_demo')
})
