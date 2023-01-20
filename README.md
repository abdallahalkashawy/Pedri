# Pedri

### Motivation

This project is a simple example of online learning webiste using [Express](https://expressjs.com/) framework with [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and [MongoDB](https://www.mongodb.com/) database.

#

### Build Status

[![Build Status](https://travis-ci.org/ahmedelgabri/pedri.svg?branch=master)](https://travis-ci.org/ahmedelgabri/pedri)
<br />
This project is still under development and not ready for production.
<br />
it has an issue with login for multiple users, I'm working on it,also some parts of the project are not finished yet.

#

### Tech/framework used

[Express](https://expressjs.com/) framework with [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and [MongoDB](https://www.mongodb.com/) database.
<br />
along with the backend, I'm working on the frontend using [React](https://reactjs.org/) and [Redux](https://redux.js.org/).

#

### Code Styles

[StandardJS](https://standardjs.com/)

#

### Features

- [x] User Authentication
- [x] simple CRUD operations
- [x] User profile
- [x] Instructor profile
- [x] Instructor set exams
- [x] Trainee solve exams
- [x] Trainee view results
- [x] new guest signup
- [x] vew all regulations and rules to website

#

### Installation

```javascript
   npm install
```

backend

```javascript
   npm run client
```

frontend

```javascript
   npm start
```

#

### Screenshots

- login
  ![Login](./screenshots/Screen%20Shot%202023-01-17%20at%2010.57.21%20PM.png "Login")
- signup
  ![Signup](./screenshots/Screen%20Shot%202023-01-17%20at%2011.00.40%20PM.png "Signup")
- Instructor profile
  ![Instructor profile](./screenshots/Screen%20Shot%202023-01-17%20at%2011.08.47%20PM.png "Instructor profile")
- Instructor set exams
  ![Instructor set exams](./screenshots/Screen%20Shot%202023-01-17%20at%2011.10.27%20PM.png "Instructor set exams")
- Trainee solve exams
  ![Trainee solve exams](./screenshots/Screen%20Shot%202023-01-17%20at%2011.15.13%20PM.png "Trainee solve exams")
- Trainee view results
  ![Trainee view results](./screenshots/Screen%20Shot%202023-01-17%20at%2011.16.12%20PM.png "Trainee view results")

  #

  ### API Reference

```http
  /login
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| UserName  | `string` | Required username of use  |
| Password  | `string` | Required password of user |

```http
  /signup
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| UserName  | `string` | Required username of use  |
| Password  | `string` | Required password of user |
| Email     | `string` | Required email of user    |
| Firstname      | `string` | Required firstname of user     |
| Lastname      | `string` | Required lastname of user     |
| Gender      | `string` | Required Gender of user     |
| Country      | `string` | Required Country of user     |
| Role      | `string` | Required Role of user     |



```http
  /instructor/addExam
```


| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| Code  | `string` | Required Code of Exam Entered |
| Question  | `string` | Required Question of Exam Entered |
| Choices  | `string` | Required Choices of Exam Entered |
| Answer  | `string` | Required Answer of Exam Entered |
| UserName  | `string` | Required UserName of Instructor |

```http
  /individualtrainee/viewaExam
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| Code  | `string` | Required Code of Exam Entered and check if exam is solved before by trainee |
| TraineeUserName  | `string` | Required TraineeUserName of Traine |


