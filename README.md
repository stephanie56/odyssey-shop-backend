# Odyssey Shop

This is the backend repository of the Odyssey Shop project. Odyssey Shop is a full-stack e-commerce application, with [front end](https://github.com/stephanie56/odyssey-shop) developed using [Angular 8](https://angular.io/) and back end developed in NodeJS using [NestJS](https://nestjs.com/), a NodeJS framework.

## Get Started

### Installation

```
yarn install
```

### Running the App

The server is open on port `3000` in development mode.

```
# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Connect to Database

1. Run `mysql -u [username] -p` in command line, enter password.
2. Run `USE odysseyshop` to select database
3. Run `SHOW TABLES` to view all existing tables
4. Run `SHOW FIELDS FROM [tablename]` to view all data types of the selected table

See [Basic MySql Operations](https://www.notion.so/stephblogspots/Basic-MySql-Operations-537d958a07894e608a79c24ae2a85fae) for more basic database operations.
