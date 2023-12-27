## Sich.io

### Description

PWA which helps ukrainian army and social organizations to defeat enemy and recover own lands by donation system. 
People in EU and USA (soon) can make a purchases with % converting into help-points.
Help-points is currency equal 1 USD allows to pay organizations in Foundations API from your card.

### Stack 

Client: **React**, mini-libraries, routing with **Wouter**.  
State management: **Context API** with persisting data in cookies, stores on **Zustand** and state-machine on **XState**.  
Server: **NodeJS**, **Express**, **Socket.IO**, **GraphQL**, **bcrypt** for password hashing, **html-pdf**.  
QA: unit tests on **Jest**.   
Performance test: Lighthouse Report.
Deployment: Render + Netify.  
![sich lighthouse](https://github.com/Slavus54/sich.io/assets/54140819/e61b08df-924a-47bc-a66a-00de5f104823)

You can try Foundations API - https://sich-io.onrender.com

List of foundations
~~~
/foundations
~~~

National Anthem of Ukraine (ENG)  
~~~
/anthem
 ~~~ 

Demo:
Version 1.1 - https://655a15470306dc3c2e94a944--sichwebapp.netlify.app 

Download server and run it on **port 4000** with a command: 

~~~ 
npm run start  
~~~ 
