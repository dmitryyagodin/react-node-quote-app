This app is based on a tutorial called [How to Create a React App with a Node Backend: The Complete Guide](https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/)
## Step 1. Create a Node (Express) backend
1. Create a project folder
2. Create a Node project inside the folder: `npm init -y`
3. Create `server` folder and `index.js` in it.
```javascript
// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
```
4. Install Express as a dependency: `npm i express`
5. Add a *start* script to package.json:
```
// server/package.json, allow npm start the server
"scripts": {
  "start": "node server/index.js"
},
```
## Step 2. Create an API Endpoint

Add an endpoint for the route `/api`
```javascript
// server/index.js, add this before app.listen

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
```
## Step 3. Create React front-end

1. Use `npx create-react-app client` to create a new React project
2. Add a `proxy` property to package.json
```
// client/package.json
"proxy": "http://localhost:3001",
```
## Step 4. Make HTTP Requests from React to Node

1. Use `React.useEffect` to make an HTTP request
2. Use `React.useState` to put the response data in a state variable `data`

```javascript
// client/src/App.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
```

## Step 5. Deploy your app to the web with Heroku

1. Delete git from the client folder (app git will be enough) 
```
cd client
rm -rf .git
```
2. Add another GET method to index.js to handle app requests

>This code will first allow Node to access our built React project using the express.static function for static files.

>And if a GET request comes in that is not handled by our /api route, our server will respond with our React app.

>This code allows our React and Node app to be deployed together on the same domain.

```javascript
// server/index.js
const path = require('path');
const express = require('express');

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
```
3. Add `build` script to server package.json
```javascript
// server/package.json
...
"scripts": {
    "start": "node server/index.js",
    "build": "cd client && npm install && npm run build"
  },
...
```
4. Specify Node version used to build the project in server/package.json

```javascript
// server/package.json

"engines": {
  "node": "12.19.0" // check it with node -v
}
```