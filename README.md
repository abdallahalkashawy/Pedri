## Title and Description
Learn Mania - An Online Learning Platform
Learn Mania is a full-stack MERN application that provides an online learning system for students. 
It allows instructors to upload course videos for students to watch and learn from.
The platform is designed to make education more accessible and convenient for students who can learn from the comfort of their own home.
The platform includes a user-friendly interface for instructors to upload and manage their courses, as well as for students to browse and enroll in the courses. 
## Screenshots

![App Screenshot](https://ibb.co/ZGvNDfH)
![App Screenshot](https://ibb.co/3NHQbyw)
![App Screenshot](https://ibb.co/VWpNF1W)
![App Screenshot](https://ibb.co/5LHMmMW)
![App Screenshot](https://ibb.co/HCFWvtL)


## Motivation
The development of Learn Mania was motivated by the need for an accessible and convenient online learning platform. As the world becomes increasingly digital, traditional forms of education have had to adapt to the changing times.
With the advent of the internet, more and more students are turning to online platforms to further their education. However, many of these platforms lack the features and functionality that make for an engaging and interactive learning experience.
Learn Mania was created to fill this gap in the market and provide a comprehensive online learning platform for students.
This project was developed as a requirement for the Advanced Computer Lab 7th semester in the German University in Cairo.
The goal was to create an application that would not only meet the needs of students and instructors, but also exceed their expectations.
Through the use of cutting-edge technologies such as the MERN stack, the team behind Learn Mania was able to deliver a platform that is both easy to use and packed with features.
## Technologies
*Node Js *React *Express *Mongo DB *REST API  *Axios *crypto *Joi
## Build Status
Build Status: Beta Testing

Learn Mania is currently in beta testing phase, which means that it has undergone initial development and testing, but is not yet ready for release. 

As the application is still in beta, users may encounter some issues or errors while using it.

Please report any bugs or issues that you encounter , so that we can address them as soon as possible. We will keep you updated on the progress of the beta testing phase, and look forward to launching a stable version of Learn Mania soon.

## Code Style
Learn Mania follows a modular and organized file structure, with a  folder (Pedri-Bihos-Branch) that contains all the necessary code for the application.
The folder contains several subfolders, including a react folder ("react-front" folder)which contains all the code related to the frontend part of the application. 
This folder is further organized into subfolders such as components,each component has all the css fiels required for it,excluding the index.css file for the Home page and the navbar.
## Features
Features of Learn Mania:

- Report a problem with a course: Users can report any technical, financial or other problems they encounter with a course.
- View reported problems: Users can view previously reported problems and their statuses, and mark them as "unseen" when viewing them.
- Follow up on unresolved problems: Users can follow up on unresolved problems and track their progress.
- Request access to a specific course: Users can request access to specific courses that they do not have access to.
- Mark reported problems as "resolved" or "pending": Administrators can mark reported problems as "resolved" or "pending" based on the status of the problem.
- Refund an amount to a trainee: Administrators can refund an amount to a trainee's wallet in case of any issues.
- Add another administrator: Administrators can add additional administrators with a set username and password.
- Add instructors: Administrators can add instructors and create their usernames and passwords.
- Add corporate trainees: Administrators can add corporate trainees and create their usernames and passwords.
- View course requests from corporate trainees: Administrators can view course requests from corporate trainees.
- Grant corporate trainees access to specific courses: Administrators can grant corporate trainees access to specific courses.
- Set a promotion: Administrators can set a promotion (sale percentage) for specific courses, several courses or all courses.
- Change and Reset Password: User can change his password or reset it via email he registered with.

## Code Examples

- Course Schema: 
```bash
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    
    title: {
      type: String,
      required: true,
      unique:true,
    },
    instructor: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
    Status: {
      type: String,
      required: true
    },
    isRegistered: {
      type: Boolean,
      required: false
    },
    Discount: {
      type: Number,
      required: false,
      Default : 0
    },
    Totalhours: {
      type: Number,
      required: true
    }
  });

const course = mongoose.model('course', courseSchema);

module.exports = course;
```

- Add Corporate Trainee Frontend: 
```bash
import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

 const AddCorpTrainee = () => {
      const [Password, setnewID] = useState("");
	const [UserName, setnewPass] = useState("");
	const [email, setemail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:5000/addingCorporateTrainee`;
			const { data } = await axios.post(url, { UserName,Password,email});
			setMsg(data.message);
			setError("Corporate Trainee added succuessfully");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("An error Occured,please revise data");
			}
		}
	};

	return (
		<div className={styles.container}>
			<form className={styles.form_container} onSubmit={handleSubmit}>
				<h1>Add a new Corporate Trainee</h1>
				<input
					type="UserName"
					placeholder="UserName"
					name="UserName"
					onChange={(e) => setnewPass(e.target.value)}
					value={UserName}
					required
					className={styles.input}
				/>
                <input
					type="Password"
					placeholder="Password"
					name="Password"
					onChange={(x) => setnewID(x.target.value)}
					value={Password}
					required
					className={styles.input}
				/>
				<input
					type="email"
					placeholder="email"
					name="email"
					onChange={(z) => setemail(z.target.value)}
					value={email}
					required
					className={styles.input}
				/>
				{error && <div className={styles.error_msg}>{error}</div>}
				{msg && <div className={styles.success_msg}>{msg}</div>}
				<button type="submit" className={styles.green_btn}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddCorpTrainee;
```

- Registered Courses Frontend  
```bash
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";

function RegisteredCourses() {
    const [courses,setCourses] = useState([]);
    const history = useHistory();
    useEffect(() => {
        axios.post('http://localhost:5000/viewRegisteredCourses', {UserName:'youssefahmed'})
         .then(res => {
        console.log(res)
         setCourses(res.data.Registered_Courses)
         })
         .catch(err => {
          console.log(err)
         })
    },[]);
    const x = courses.map((c) => {
        return (
          <div>
            <span className={styles.courseName}>{c}</span>
            <button className="report-button" onClick={() => {
                localStorage.setItem("CourseID", c);
                history.push("/reportcourse")
            }}>report</button>
          </div>
        );
         });
    return(
        
        <div>
            <h1>Registered Courses</h1>
             {x}  
            
        </div>
    )  } export default RegisteredCourses;


```

- Reset Password Route 

```bash
const { Administrator } = require("../Model/Administrator");
const { CorporateTrainee } = require("../Model/CorporateTrainee");
const Token = require("../Model/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await CorporateTrainee.findOne({ email: req.body.email })
        
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.get("/:userId/:token", async (req, res) => {
	try {
		const user = await CorporateTrainee.findOne({ _id: req.params.userId });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		res.status(200).send("Valid Url");
	} catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});




router.post("/:userId/:token", async (req, res) => {
    try {
        console.log(req.body);
        const schema = Joi.object({ Password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user =  await CorporateTrainee.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        }); 
        if (!token) return res.status(400).send("Invalid link or expired");

        user.Password = req.body.Password;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

module.exports = router;

```

- Refund Request Model 
```bash
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RefundSchema = new Schema({
  UserName: {
    type: String,
    required: true,
  },
Course:{
  type: String,
  required: true
},
Price:{
  type: String,
  required:true,
},
Reason_for_Refund:{
  type: String,
  required:true,
}

});

const RefundRequests = mongoose.model('RefundRequests', RefundSchema);
module.exports = RefundRequests;

```

## Installation Guide
To run the backend, in the main file from the terminal run -npm install then npm run dev to run the backend. 
To run the frontend,in the main file open a SECOND terminal then cd react-front then npm install then in the second terminal npm run start. 
## API Reference

#### Requests

```http
  /requestCourse
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| Course    | `string` | Required. The title of the course you want to request |
| NameofRequestor    | `string` | Required. The Username of the person who requested the course |

```http
  /registerAcourse
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| title    | `string` | Required. The title of the course you want to register |
| UserName    | `string` | Required. The username of the person who wants to register for the course |


```http
  /rejectRequestedCourse
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| title    | `string` | Required. The title of the course request you want to reject |
| UserName    | `string` | Required. The username of the person who requested the course |


```http
  /viewRegisteredCourses  
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| UserName    | `string` | Required. The username of the person whose registered courses you want to view |



```http
    GET /fetchallCourses

```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| no parameter    | `..` |  Fetches all courses of a specific user |



```http
  /viewCourses
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| id    | `string` | Required. The id of the corporate trainee whose registered courses you want to view |



```http
  GET  /ViewCourseRequests
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| no parameter    | `` | Displays all the course requests from corporate trainees to the admin |



```http
  /courseReport
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| UserName    | `string` |Required. The username of the person reporting the course |
| CourseID    | `string` | Required. The ID of the course that is being reported |
| Report_Type    | `string` | Required. The type of report being submitted (e.g. technical, financial, other) |


```http
  /viewReportedCourses
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| UserName	    | `string` | Required. Retrieve a list of reported courses by a specific user |




```http
  GET /ViewCoursesReported
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| no parameter    | `` | Fetches the courses reported for the user |
| NameofRequestor    | `string` | Required. The Username of the person who requested the course |


```http
  /StatusPending
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| UserName    | `string` | Required. takes the UserName of the user who reported a problem and sets his status to Pending |
| CourseID    | `string` | Required. takes the name of the reported course |



```http
  /StatusResolved
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| UserName    | `string` | Required. takes the UserName of the user who reported a problem and sets his status to Resolved |
| CourseID    | `string` | Required. takes the name of the reported course |


```http
  /RequestRefund
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| UserName    | `string` | Required. The UserName of the person who requested the refund |
| Course    | `string` | Required. The course title for which the refund is requested|
| Price    | `number` | Required. The price of the course|
| Reason_for_Refund	    | `string` | Required. The reason for refund|



```http
 GET   /ViewRefundRequests
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| no parameter    | `` | Get all the refund requests for Administrator|




```http
  /refundTowallet
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| UserName    | `string` |Required. The UserName of the person who requested the refund |
| Course    | `string` | Required. The course title for which the refund is requested |
| amount    | `number` | Required. The amount to be refunded to the user's wallet |



```http
  /RefuserefundTowallet
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| UserName    | `string` |Required. The UserName of the person whose refund request is denied|
| Course    | `string` | Required. The course title for which the refund is requested |



```http
  /FollowupNote
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| UserName    | `string` | Required. The UserName of the person who reported the course|
| CourseID    | `string` | Required. The ID of the course which was reported|
| CourseID    | `string` | Required. The followup note on the course report|



```http
  /setDiscountToAll
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| Discount    | `string` | Required. The amount of discount to be applied to all courses|




```http
  /setDiscountToAcourse
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| title    | `string` | Required. The title of the course to which the discount will be applied|
| Discount    | `string` |Required. The amount of discount to be applied to the course|



```http
  /setDiscountToSeveralCourses
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| subject    | `string` | Required. The subject of the courses to which the discount will be applied|
| Discount    | `string` | Required. The amount of discount to be applied to the courses|


```http
  /addingAdmin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| UserName    | `string` | Required. The username of the administrator being added|
| Password    | `string` | Required. The password of the administrator being added|
| email    | `string` |  The email of the administrator being added|


```http
  /addingCorporateTrainee
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| UserName    | `string` |Required. The username of the corporate trainee being added|
| Password    | `string` | Required. The password of the corporate trainee being added|
| email    | `string` | Required. The email of the corporate trainee being added|

```http
  /addingInstructor
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| UserName    | `string` |Required. The username of the Instructor being added|
| Password    | `string` | Required. The password of the Instructor  being added|
| email    | `string` | Required. The email of the Instructor being added|



```http
  /changepass
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| newPass    | `string` |Required. The new password for a user|
| id    | `string` | Required. the id of the user whoose changing the password|



```http
  /api/password-reset
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| email    | `string` |Required. The email of the user requesting a password reset|







## License


MIT License

Copyright (c) [2023] [Mohamed Ahmed Bahaa]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
## How to use

- First, ensure that you have Node.js and MongoDB installed on your computer.

- Next, download or clone the repository for the MERN stack app from the provided source.

- In the command line, navigate to the root directory of the app and run "npm install" to install all the necessary dependencies.

- In a new command line window, navigate to the root directory of the app and run "npm start" to start the development server.

- Open your web browser and go to "http://localhost:3000/home" to access the admin  page.

- Once logged in, You will see all the available options like adding administrator, adding instructor, adding CorporateTrainee, adding IndividualTrainee, setting Discounts, viewing Refund requests, followup notes and many more.

- You can use the options like adding administrator by clicking on the button and fill the form which appears after the click.

- You can use the options like setting discount to all courses by clicking on the button and fill the form which appears after the click.

- You can use the options like viewing Refund requests by clicking on the button and it shows all the requests made till now.

- You can use the options like followup notes by clicking on the button and fill the form which appears after the click.

- Once you have made the changes, You can see the changes in the respective collections in the MongoDB.

- To stop the development server, press "ctrl + c" in the command line window.

- To stop the MongoDB server, press "ctrl + c" in the command line window where the MongoDB server is running.
## Credits

This project part is made by Mohamed Ahmed Bahaa/Guc/Met 7th semester Student.
 It is a part of a bigger project which is the Advanced Computer Lab Online learning system project at the German University
in Cairo,However this is only 15/60 points (Mohamed's share of the project 25%).
- this project is intended for 4-5 members.
## Contribution

We welcome and appreciate any contributions to this project. If you have any ideas or suggestions, feel free to open an issue or submit a pull request. Whether you're a beginner or an experienced developer, there's always something that you can contribute. You can help us by fixing bugs, adding new features or improving the documentation.

To submit a pull request:

- Fork this repository
- Create a new branch for your changes
- Make your changes
- Commit your changes and push to your fork
- Open a pull request to this repository, describing the changes you made
- Thank you for considering contributing to this project!