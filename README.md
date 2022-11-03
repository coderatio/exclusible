[# Exclusible Project
This project is a simple microservice architecture with two services(exchange rate and user api).
The services communicate through a message broker like Redis PubSub.

### High-level Architecure
![Architecture Diagram](https://i.imgur.com/erkLB4k.png)

### Problem
When building solutions, it's good to understand the underlying problem. 
This understanding helps in building resilient and effective solutions
that's easy to use, maintain and scale.

For this task, I see a problem with administrators of a system finding it
difficult to update rates and let this change be shown to users immediately.
I also see a rigid existing way of updating rates on a system, and it needs to be better.

### Solution
- Service that stream live rates from CoinmarketCap or Kraken Exchange
- A service that shares these rates with another users where user data is stored
- A service that gets notified of new rates
- A service that provides an endpoint for admin to add spread to exchange rate
- Websocket with subscription for Exchange rate on the FE (connecting to
external API or websocket)

Looking at the itemized solutions above, we could solve the assumped problems highlighted.

### Technologies
For every problem given to an engineer, there will be tools needed to help them solve those problems.
Here are the technologies used for this task.
- JavaScript (Language)
- Node.js (Run-time)
- MySQL (Datastore)
- Typescript (Typing)
- Redis (Caching & PubSub)
- Adonisjs (Framework)
- Jest (Testing)
- Japa (Testing)
- Docker (Virtualization, Contanerization, Orchestration)
- Socket.io (Websocket)

### The Services
As earlier mentioned and seen on the high-level architecture above, we need two services, and they
should be able to communicate effectively with each other. Here are the services:
1. #### Exchange Rate
    - This service is responsible for getting rates from Kraken exchange via a websocket connection 
    - Publishing the rates to Redis
    - Providing an endpoint to get rates via http
2. User Api
    - The service enable users to register, login and logout
    - It's responsible for getting rates published by the exchange rate service through subscription
    - It stores spread values on a DB table
    - It provides an endpoint an Admin user to update rates
    - It creates Websocket connection for the Frontend to stream live rates from
    - It broadcasts live rates to the frontend
    - It provides an endpoint for the frontend to get rates + spread via with http

### How to use
1. **Running Services**
    
    The two services and other depencies like MySQL and Redis, are all bundled into a docker container.
    This means, we only need `Docker` on a machine to run the services. 

    1. You can run the services by executing the docker command below:
    ```shell
      docker compose up
    ```
   As soon as the container is running, you may run the command below to `ssh` into the services
    ```shell
      # Exchange rate
      docker exec -it exchange-rate-service sh 
      
      # User Api
      docker exec -it user-api-service sh
    ```
   You need to `ssh` into the services to be able to run migrations and seeders. Here are the commands:
    ```shell
      node ace migration:
   
      # To Seed data on User Api, run this command
      node ace db:seed
    ```
2. **API Documentation** 

    The documentation for all API endpoints are found on the link below:
    [https://documenter.getpostman.com/view/6955209/2s8YY9vmW9](https://documenter.getpostman.com/view/6955209/2s8YY9vmW9)

### Websocket
The websocket server is accessible on the link below:
```shell
ws://127.0.0.1:3334
```
As soon as the `user-api-service` is running, you can make websocket connection the link above.
1. **Websocket payload**
```js
{
   BTC_USD: {
      original: { buy: 20249, sell: 20249 },
      withSpread: { buy: 20699, sell: 20682 },
      currentSpread: { buy: 450, sell: 433 }
   }
}
```
2. **Websocket event**
  
   All rates are broadcasted through the `rates:live` event.
### Misc
I created a frontend page to demo rate streaming. You may access the page by visiting the link below. 
You will need to change branch to `ws-client-test`
```shell
http://127.0.0.1:3334/ws-test/

# Ensure you switch branch to "ws-client-test"

```
![Websocket Test](https://i.imgur.com/39J3CKW.png)