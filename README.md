# Web Development API Task

**Your task is to create an API to manage a user persistence layer.**

We would expect this task to take a few hours, however there is no strict time limit and you won't be judged on how long it took you to complete. Please find a few pointers below:

Your solution _must_:

- Be implemented with Node.js.
- Expose a user model, with (at least) the following attributes:
  - **`id`** - _a unique user id_
  - **`email`** - _a user's email address_
  - **`givenName`** - _in the UK this is the user's first name_
  - **`familyName`** - _in the UK this is the user's last name_
  - **`created`** - _the date and time the user was added_
- Have the ability to persist user information for at least the lifetime of the test.
- Expose functionality to create, read, update and delete (CRUD) users.
- Be easily consumable by a plain HTTP client (e.g. cURL or Postman) or, if using a transport other than HTTP, be trivial to write a client application to consume it.
- Implement (partial or full) test coverage.

Although the main outcomes of the task are listed above, if you feel like you want to go that extra mile and show us what you're capable of, here is a list of potential enhancements that we have come up with:

- Provide a way for your API to be easily tested/consumed (e.g. a custom front-end, a [Postman](https://www.getpostman.com/) collection or a [Swagger/OpenAPI](https://swagger.io/) API specification).
- Sanitisation checks of inputs.
- Use of an industry standard data exchange format.

Alternatively if you can think of any other features that you feel would further enhance your API, then we'd love to see what you can come up with!

---

To run project install server dependencies:

```bash
npm install
```

Create a .env inside of server directory and add the following config variables

```bash
  PORT=<PORT> // 3000
  JWT_SECRET=<JWT_SECRET> // jwt secret
  JWT_TOKEN_EXPIRE=<JWT_TOKEN_EXPIRE> // millisecond 36000
  DBURL=<DBURL> // database url mongodb://localhost:27017/holidayextra
```

To run both application in **DEV** mode, from the root of the project

```bash
npm run dev
```

To run both application in **PROD** mode, from the root of the project

```bash
npm start
```

---

### **AVAILABLE ENDPOINTS**

| Endpoint         | Resource                      | Payload                                      | Method |
| ---------------- | ----------------------------- | -------------------------------------------- | ------ |
| '/'              | Server is up                  | N/A                                          | GET    |
| '/auth'          | Auth a user returns jwt token | email & password in req.body                 | POST   |
| '/users'         | Create new user               | email, password, givenName, familyName       | POST   |
| '/users/:userId' | Get User by ID                | userId as req.userId                         | GET    |
| '/users/:userId' | Update entire User data by ID | userId as req.userId and User object payload | PUT    |
| '/users/:userId' | Patch User data by ID         | userId as req.userId and update payload      | PATCH  |
| '/users/:userId' | Delete User by ID             | userId as req.userId                         | DELETE |

---

**Use link below to Import Postman Collection**

[API Postman Collection](https://documenter.getpostman.com/view/5533777/Tzeah5Xd/)
