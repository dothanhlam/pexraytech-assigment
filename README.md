# pexraytech-assigment
Pexraytech assigment react skills testing

## Prerequisite
- NodeJS 8.10.0 or above
- NPM 5.6.0 or above
Please make sure you have installed both nodejs and npm, as this assignment has both server / client side code. 
This code has been tested on MacOS only, but not Windows.

## installation
You can download or checkout the source from this repo. If using zip file, extract them and change into the project folder.
At the first time, please run this command to install all needed dependencies

`npm i`

After all dependencies installing finish, you can run following command to check:
- `npm run dev` - run the web with webpack, open `http://localhost:3000` to check the web
- `npm run mocha` - run some unit testcase for the app reducer

## Technology stacks
- React, React Router and Redux
- React Saga for side effect management
- Webpack
- Express and websocket for mocking server api


## How this work
When you run `npm run dev`, this will execute 2 instance - the web api with serve some basic thing runs with port 3001,
this api also creates an instance of websocket with port 3002. The webpack dev server hosting the react web runs at port
3000. The react web will call the api via axio with http, or consume the websocket directly. As the assignment mentioned
about websocket, I made the modification to run with websocket, but just handled the 'onOpen' as the requirement is simple.
