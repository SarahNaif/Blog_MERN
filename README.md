<H1 align ="center" > MERN BLOG  </h1>
<h5  align ="center"> 
Fullstack blogging project made with MongoDB, Express, React & Nodejs (MERN) </h5>
<br/>

  * [Configuration and Setup](#configuration-and-setup)
  * [Key Features](#key-features)
  * [Technologies used](#technologies-used)
      - [Frontend](#frontend)
      - [Backend](#backend)
      - [Database](#database)
  * [📸 Screenshots](#screenshots)
  * [Author](#author)



## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the Frontend on one terminal and the Backend on the other terminal)

In the first terminal

```
$ cd client
$ npm install (to install frontend-side dependencies)
$ npm run  start (to start the frontend)
```


In the second terminal

- cd server and Set environment variables in .env under ./server.
- Create your mongoDB connection url.
- Supply the following credentials.

```
#  ---  Config.env  ---

PORT = 
DB_URI = 
JWT_SECRET = 
NODE_ENV = 
SALT_ROUNDS =

# Nodemailer

APP_WEBSITE_NAME=
APP_DOMAIN=
APP_MAIL_HOST=smtp.gmail.com
APP_MAIL_PORT=465
APP_MAIL_PASSWORD=your_password
APP_MAIL_USER=example@gmail.com


```


```
# --- Terminal ---

$ npm install (to install backend-side dependencies)
$ npm start (to start the backend)
```



##  Key Features

- User registration and login
- Authentication using JWT Tokens
- Article searching  and pagination 
- CRUD operations (Article create, read, update and delete)
- Upload profile ımages and article ımages to the server
- Commenting  on the article
- Skeleton loading effect
- Responsive Design

<br/>



##  Technologies used

This project was created using the following technologies.



####  Frontend 

- [React js ](https://www.npmjs.com/package/react) - JavaScript library that is used for building user interfaces specifically for single-page applications
- [Vite]()-  to create react application.
- [Redux Toolkit ](https://redux-toolkit.js.org/) - is a modern, efficient, and easy-to-use library for managing application state in a React application. 
-  [React Hooks Form](https://reactjs.org/docs/hooks-intro.html) - React Hook Form is a simple and powerful library for managing forms in a React application to easily handle form state and validation.  
- [React Query](https://tanstack.com/query/v3/) - is a simple and efficient library for managing data fetching in a React application. It provides a high-level API for fetching data, caching it, and refetching it when necessary, making it easy to build performant, reactive applications.  
- [React Icons ](https://reactjs.org/docs/hooks-intro.html) - React Icons is a collection of reusable vector icons for React, designed to be easy to integrate and customize.  
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - To handle routing
- [axios](https://www.npmjs.com/package/axios) - For making Api calls
- [Tailwind](https://developer.mozilla.org/en-US/docs/Web/CSS) - For User Interface
- [Tiptap](https://tiptap.dev/) - its full control of your text editor experience. It’s customizable, comes with a ton of extensions
- [uuid](https://www.npmjs.com/package/uuid) - For random id generator
- [React icons](https://react-icons.github.io/react-icons/) -
 Small library that helps you add icons to your react apps.
- [React Hot Toast](https://react-hot-toast.com/) -
 Small library that helps you add icons to your react apps.
 
 
####  Backend 


- [Node js](https://nodejs.org/en/) -A runtime environment to help build fast server applications using JS
- [Express js](https://www.npmjs.com/package/express) -The server for handling and routing HTTP requests
- [Mongoose  ](https://reactjs.org/docs/hooks-intro.html) - For modeling and mapping MongoDB data to JavaScript
- [jsonwebtoken  ](https://reactjs.org/docs/hooks-intro.html) - For authentication
- [bcryptjs](https://www.npmjs.com/package/react-router-dom) - For data encryption
- [Nodemailer](https://www.npmjs.com/package/axios) - Send e-mails from Node.js
- [dotenv](https://developer.mozilla.org/en-US/docs/Web/CSS) - Zero Dependency module that loads environment variables
- [multer](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html) - Node.js middleware for uploading files 
- [slugify](https://www.npmjs.com/package/uuid) - For encoding titles into a URL-friendly format
- [cors](https://www.npmjs.com/package/uuid) - Provides a Connect/Express middleware



####  Database 

 - [MongoDB ](https://www.npmjs.com/package/uuid) - It provides a free cloud service to store MongoDB collections.
 
## Author

- Github: [@SarahNaif](https://github.com/SarahNaif)
- Linkedin: [@sarah-althowebi](https://www.linkedin.com/in/sarah-althowebi/)
- Email: [sarah.althowebi@gmail.com](mailto:sarah.althowebi@gmail.com)
 
 
 
 
