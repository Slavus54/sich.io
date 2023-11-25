# Sich.io

### Description
PWA which helps ukrainian army and social organizations to defeat enemy and recover own lands by donation system. 
People in EU and USA (soon) can make a purchases with % converting into help-points.
Help-points is currency equal 1 USD allows to pay organizations in Foundations API from your card.

### Stack 
Client: **React**, mini-libraries on **JS** (ES2023), routing with **Wouter**.  
State management: **Context API** with persisting data in cookies, stores on **Zustand** and state-machine on **XState**.  
Server: **NodeJS**, **Express**, **Socket.IO**, **GraphQL**, bcrypt, html-pdf.  
QA: unit tests on **Jest**.  
CI/CD: *very soon*.  
Deployment: Render + Netify.  

Client side code will be published in repo "sich.io-client" in 2.0 version.  

You can try Foundations API - https://sich-io.onrender.com

/ foundations - list of foundations  
/ anthem - National Anthem of Ukraine (ENG)  

Download server and run it on port 4000 with a command: 

~~~ 
npm run start  
~~~ 

Demo:
Version 1.1 - https://655a15470306dc3c2e94a944--sichwebapp.netlify.app  
