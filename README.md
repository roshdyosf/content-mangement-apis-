# Content Management APIs

A Node.js RESTful API for managing e-learning platform content, including courses, sections, videos, and exams, with educator and moderator roles. Built with Express.js and MongoDB, supporting file uploads (Cloudinary), authentication, and role-based access control.

---

## Features

- Educator and moderator roles with authentication
- Course, section, and video CRUD operations
- Exam management (create, update, delete, add questions, get exams)
- File upload support for videos (Cloudinary)
- Approval workflow for moderators
- Request validation and error handling
- Modular service/controller structure

---

## Table of Contents

- [Project Overview](#content-management-apis)
- [Features](#features)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [Authentication & Roles](#authentication--roles)
- [API Documentation](#api-documentation)
- [Contribution](#contribution)
- [License](#license)
- [Contact](#contact)

---

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd content-mangement-apis-
   ```
2. Install dependencies:
   ```bash
   cd e-learning-platform-contnet-management
   npm install
   ```
3. Set up environment variables (see below).
4. Start the server:
   ```bash
   npm start
   ```

---

## Environment Variables

Create a `.env` file in `e-learning-platform-contnet-management/` with the following:

```
PORT=5008
CONNECTION_STRING=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET_KEY=your_jwt_secret
```

---

## Running the Server

- Development: `npm run dev` (if you add a dev script)
- Production: `npm start`

---

## Authentication & Roles

- JWT-based authentication is required for all endpoints.
- Roles:
  - **Educator**: Can create, update, and delete their own courses, sections, and videos.
  - **Moderator**: Can approve or reject courses, sections, and videos.
- Use the `/login` and `/register` endpoints (not shown here) to obtain a JWT token.
- Pass the token in the `Authorization: Bearer <token>` header.

---

## API Documentation

### Course Management

#### Get Courses for Educator

- **GET** `/api/course/get-for-educator/:educatorId/:limit/:offset`
- **Request Params:** `educatorId` (string), `limit` (number), `offset` (number)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Courses fetched successfully.",
    "status": 200,
    "data": [ { ...courseObject } ]
  }
  ```

#### Get Courses for Tag

- **GET** `/api/course/get-for-tag/:tag/:limit/:offset`
- **Request Params:** `tag` (string), `limit` (number), `offset` (number)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Courses fetched successfully.",
    "status": 200,
    "data": [ { ...courseObject } ]
  }
  ```

#### Get All Courses

- **GET** `/api/course/get-all/:limit/:offset`
- **Request Params:** `limit` (number), `offset` (number)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Courses fetched successfully.",
    "status": 200,
    "data": [ { ...courseObject } ]
  }
  ```

#### Get Courses Like Name

- **GET** `/api/course/get-course-like/:courseName/:limit/:offset`
- **Request Params:** `courseName` (string), `limit` (number), `offset` (number)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Courses fetched successfully.",
    "status": 200,
    "data": [ { ...courseObject } ]
  }
  ```

#### Create Course

- **POST** `/api/course/create`
- **Body:**
  ```json
  {
    "title": "...",
    "description": "...",
    "price": 0,
    "educatorId": "...",
    "educator": "...",
    "tags": ["..."],
    "level": "..."
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Course created successfully.",
    "status": 201,
    "data": { ...courseObject }
  }
  ```

#### Update Course Information

- **PUT** `/api/course/update`
- **Body:**
  ```json
  {
    "courseId": "...",
    "title": "...",
    "description": "...",
    "price": 0,
    "rating": 0
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Course updated successfully.",
    "status": 200,
    "data": { ...updatedCourseObject }
  }
  ```

#### Delete Course

- **DELETE** `/api/course/delete/:courseId`
- **Request Params:** `courseId` (string)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Course deleted successfully.",
    "status": 200,
    "data": { ...deletedCourseObject }
  }
  ```

#### Update Course Rating

- **PUT** `/api/course/update-rating`
- **Body:**
  ```json
  {
    "courseId": "...",
    "rating": 4.5
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Course rating updated successfully.",
    "status": 200,
    "data": { ...updatedCourseObject }
  }
  ```

---

### Section Management

#### Get All Sections for a Course

- **GET** `/api/section/get-all/:courseId`
- **Request Params:** `courseId` (string)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Sections fetched successfully.",
    "status": 200,
    "data": [ { ...sectionObject } ]
  }
  ```

#### Get Section by ID

- **GET** `/api/section/get-section/:sectionId`
- **Request Params:** `sectionId` (string)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Section fetched successfully.",
    "status": 200,
    "data": { ...sectionObject }
  }
  ```

#### Create Section

- **POST** `/api/section/add`
- **Body:**
  ```json
  {
    "title": "...",
    "description": "...",
    "order": 1,
    "courseId": "..."
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Section created successfully.",
    "status": 201,
    "data": { ...sectionObject }
  }
  ```

#### Update Section

- **PUT** `/api/section/update`
- **Body:**
  ```json
  {
    "sectionId": "...",
    "title": "...",
    "description": "...",
    "order": 2,
    "courseId": "..."
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Section updated successfully.",
    "status": 200,
    "data": { ...updatedSectionObject }
  }
  ```

#### Delete Section

- **DELETE** `/api/section/delete/:sectionId`
- **Request Params:** `sectionId` (string)
- **Body:**
  ```json
  {
    "courseId": "..."
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Section deleted successfully.",
    "status": 200,
    "data": { ...deletedSectionObject }
  }
  ```

---

### Video Management

#### Get Videos for Section

- **GET** `/api/video/get-all/:sectionId`
- **Request Params:** `sectionId` (string)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Videos fetched successfully.",
    "status": 200,
    "data": [ { ...videoObject } ]
  }
  ```

#### Get Single Video

- **GET** `/api/video/get-video/:videoId`
- **Request Params:** `videoId` (string)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Video fetched successfully.",
    "status": 200,
    "data": { ...videoObject }
  }
  ```

#### Create Video

- **POST** `/api/video/add`
- **Body:**
  ```json
  {
    "title": "...",
    "description": "...",
    "order": 1,
    "courseId": "...",
    "sectionId": "..."
  }
  ```
- **File Upload:** Key: `video` (multipart/form-data)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Video created successfully.",
    "status": 201,
    "data": { ...videoObject }
  }
  ```

#### Update Video Information

- **PUT** `/api/video/update`
- **Body:**
  ```json
  {
    "videoId": "...",
    "title": "...",
    "description": "...",
    "order": 1,
    "courseId": "..."
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Video updated successfully.",
    "status": 200,
    "data": { ...updatedVideoObject }
  }
  ```

#### Delete Video

- **DELETE** `/api/video/delete/:videoId`
- **Request Params:** `videoId` (string)
- **Body:**
  ```json
  {
    "courseId": "..."
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Video deleted successfully.",
    "status": 200,
    "data": { ...deletedVideoObject }
  }
  ```

---

### Moderator Management

#### Approve Course

- **PUT** `/api/moderator/approve-course`
- **Body:**
  ```json
  {
    "courseId": "...",
    "approval": true
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Course approved successfully.",
    "status": 200
  }
  ```

#### Approve Section

- **PUT** `/api/moderator/approve-section`
- **Body:**
  ```json
  {
    "sectionId": "...",
    "approval": true
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Section approved successfully.",
    "status": 200
  }
  ```

#### Approve Video

- **PUT** `/api/moderator/approve-video`
- **Body:**
  ```json
  {
    "videoId": "...",
    "approval": true
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Video approved successfully.",
    "status": 200
  }
  ```

#### Get Unapproved Courses

- **GET** `/api/moderator/get-unapproved-course`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Unapproved courses fetched successfully.",
    "status": 200,
    "data": [ { ...courseObject } ]
  }
  ```

#### Get Unapproved Sections

- **GET** `/api/moderator/get-unapproved-section`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Unapproved sections fetched successfully.",
    "status": 200,
    "data": [ { ...sectionObject } ]
  }
  ```

#### Get Unapproved Videos

- **GET** `/api/moderator/get-unapproved-video`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Unapproved videos fetched successfully.",
    "status": 200,
    "data": [ { ...videoObject } ]
  }
  ```

---

### Exam Management

#### Create Exam

- **POST** `/api/exam/create`
- **Body:**
  ```json
  {
    "title": "...",
    "sectionId": "...",
    "courseId": "...",
    "educatorId": "..."
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Exam created successfully.",
    "status": 201,
    "data": { ...examObject }
  }
  ```

#### Add Question to Exam

- **PUT** `/api/exam/add-question`
- **Body:**
  ```json
  {
    "examId": "...",
    "question": "...",
    "choices": ["A", "B", "C", "D"],
    "answer": "A"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Question added successfully.",
    "status": 200
  }
  ```

#### Update Exam

- **PUT** `/api/exam/update-exam`
- **Body:**
  ```json
  {
    "examId": "...",
    "title": "...", // or
    "question": "...", "questionIndex": 0, // or
    "choice": "...", "questionIndex": 0, "choiceIndex": 0, // or
    "answer": "...", "questionIndex": 0
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Exam updated successfully.",
    "status": 200,
    "data": { ...updatedExamObject }
  }
  ```

#### Get All Exams for Section

- **GET** `/api/exam/get-all-exams/:sectionId`
- **Request Params:** `sectionId` (string)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Exams fetched successfully.",
    "status": 200,
    "data": [ { ...examObject } ]
  }
  ```

#### Get Exam by ID

- **GET** `/api/exam/get-exam/:examId`
- **Request Params:** `examId` (string)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Exam fetched successfully.",
    "status": 200,
    "data": { ...examObject }
  }
  ```

#### Delete Exam

- **DELETE** `/api/exam/delete-exam`
- **Body:**
  ```json
  {
    "examId": "...",
    "courseId": "..."
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Exam deleted successfully.",
    "status": 200,
    "data": { ...deletedExamObject }
  }
  ```

---

## Example Exam Object

```json
{
  "_id": "...",
  "educatorId": "...",
  "courseId": "...",
  "sectionId": "...",
  "title": "Exam Title",
  "mcq": [
    {
      "question": "What is 2+2?",
      "choices": ["1", "2", "3", "4"],
      "answer": "4"
    }
  ]
}
```

---

## Standard Response Format

- **Success:**
  ```json
  {
    "success": true,
    "message": "Success message.",
    "status": 200,
    "data": { ... }
  }
  ```
- **Error:**
  ```json
  {
    "success": false,
    "message": "Error message.",
    "status": 400,
    "data": null
  }
  ```

---

## Educator Workflow

1. **Create Course**: Add a new course with title, description, educator info, and tags.
2. **Create Sections**: Add sections to the course, each with its own title and description.
3. **Upload Videos**: Upload videos to sections, with metadata and file upload (Cloudinary).

---

## Error Handling

All responses follow a standard format as shown above.

---
