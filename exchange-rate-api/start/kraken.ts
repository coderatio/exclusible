/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import KrakenService from 'App/Services/kraken.service'
KrakenService.run().catch((error) => console.log('Kraken Service Error', error))
