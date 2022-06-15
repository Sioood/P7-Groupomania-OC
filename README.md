# groupomania
# DataBase MySQL

### Create the database

```
CREATE DATABASE `groupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
```

### Create user and privileges


```
CREATE USER IF NOT EXISTS user@% IDENTIFIED BY oc
```

```
GRANT ALL ON groupomania.* to user@%;
```

### Create tables

Sequelize will create the tables automatically,
if you need to create an admin user, go to your table user and set admin to "1".

# Back

```
cd back
```

## Project setup

```
npm install
```

## Start server

```
nodemon server or npm run serve
```

# Front

```
cd front
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
