# CSVUploader

# Description

A simple CSV uploader web app which allows to uplaod and view csv files data in table format.

# Features

- Upload CSV files.
- View all uploaded files
- Delete files.
- Sort data of CSV Files by clicking on column name.
- Search box to filter data.
- Responsive Design.

# Components

HTML,CSS,Javascript,jQuery
Node.js,MongoDB,Express.js and EJS

# How to Install

- Clone the project onto your local machine.
- Run 'npm install' to install required dependencies.
- Run 'npm start' in terminal to start server.
- Visit your app at http://localhost:8000.

# Project Dependencies

    "connect-flash": "^0.1.1",
    "cookie-parser": "^1.4.6",
    "csv-parser": "^3.0.0",
    "ejs": "^3.1.7",
    "express": "^4.17.3",
    "express-ejs-layouts": "^2.5.1",
    "express-session": "^1.17.2",
    "fs": "^0.0.1-security",
    "mongoose": "^6.3.1",
    "multer": "^1.4.4",
    "nodemon": "^2.0.15",
    "path": "^0.12.7"

# Action Routes

- POST : /upload >> Upload files
- GET : /view/:id >> View the Uploaded CSV file
- GET : /del/:id >> Delete the targeted CSV file
- POST : /uploadAPI >> Upload File via API


# Link To App
[CSV Uploader](https://csv-uploader-pro.herokuapp.com/)