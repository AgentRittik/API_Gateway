FRONTEND - MIDDLE-END - BACKEND

-We need an intermediate layer between the client side and the microservices
- Using this middle end , When client send request we willl be able to make decisionn that which moicroservice should actually respond to this request
- We can do message validation , response transformation , rate limiting
- WE  try to prepare an API that acts as this middle end.

-RATE LIMITING : we can limit the lots of incoming request coming from the same IP . 

- We can handle the authentication in api gateway only once

- RESPONSE TRANSORFATION  - i wants to change the response of same endpoint according to the request made from the type of device ,  so i don't want to do it in all microservices so i will handle it in Api_Gateway