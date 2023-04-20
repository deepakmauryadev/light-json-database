# Installation

```
npm install light-json-database
```

# Introduction

This is very simple and extremely light database for server side NodeJS applications. It stores the data in json file generated in the current working directory.

# Example

1. **Creating a database**

```js
const { JsonDatabase } = require("light-json-database");

const db = new JsonDatabase("example"); // example is database name

console.log(db.getAll()); // output: {}
```

2. **Inserting data in database**

```js
const { JsonDatabase } = require("light-json-database");

const db = new JsonDatabase("example"); // example is database name

db.set("name", "Jon Doe"); // db.set(key, value)

console.log(db.get("name")); // output: "Jon Doe"

console.log(db.getAll()); // output: { name: "Jon Doe" }
```

3. **Updating data in database**

```js
const { JsonDatabase } = require("light-json-database");

const db = new JsonDatabase("example"); // example is database name

db.set("name", "Jon Doe"); // db.set(key, value)

console.log(db.get("name")); // output: "Jon Doe"

db.set("name", "Another name"); // updating value of key "name"

console.log(db.get("name")); // output: "Another name"
```

4. **Deleting data from database**

```js
const { JsonDatabase } = require("light-json-database");

const db = new JsonDatabase("example"); // example is database name

db.set("name", "Jon Doe"); // db.set(key, value)

console.log(db.getAll()); // output: { name: "Jon Doe" }

db.remove("name"); // removing data of key "name"

console.log(db.get("name")); // output: {}
```

5. **All methods**

```js
db.get(key); // return value assigned for given key

db.getAll(); // return all the data in the database

db.set(key, value); // set the value for given key
// also can be used for updating value any key that already exists in database then it will overwrite/update it.

db.setAll(data); // set/overwrite all data of database

db.remove(key); // delete the data with given key

db.removeAll(); // delete all the data in the database
```
