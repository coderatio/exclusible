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
;(async () => await KrakenService.tick())()
