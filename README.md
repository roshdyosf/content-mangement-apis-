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
PORT=5000
MONGODB_URI=your_mongodb_connection_string
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
- **Middleware:** `authMiddleware`, `validateId('educatorId', 'params')`
- **Response:** 200 OK (courses array), 404 Not Found, 500 Internal Server Error

#### Get Courses for Tag

- **GET** `/api/course/get-for-tag/:tag/:limit/:offset`
- **Middleware:** `authMiddleware`
- **Response:** 200 OK (courses array), 404 Not Found, 500 Internal Server Error

#### Get All Courses

- **GET** `/api/course/get-all/:limit/:offset`
- **Middleware:** `authMiddleware`
- **Response:** 200 OK (courses array), 404 Not Found, 500 Internal Server Error

#### Get Courses Like Name

- **GET** `/api/course/get-course-like/:courseName/:limit/:offset`
- **Middleware:** `authMiddleware`
- **Response:** 200 OK (courses array), 404 Not Found, 500 Internal Server Error

#### Create Course

- **POST** `/api/course/create`
- **Middleware:** `authMiddleware`, `educatorRoleCheck`, `validateId('educatorId', 'body')`
- **Body:** `{ "title": "...", "description": "...", "educator": "...", "educatorId": "...", "tags": ["..."] }`
- **Response:** 201 Created (course object), 400 Bad Request, 500 Internal Server Error

#### Update Course Information

- **PUT** `/api/course/update/`
- **Middleware:** `authMiddleware`, `educatorRoleCheck`, `educatorIdentityCheck`, `validateId('courseId', 'body')`
- **Body:** `{ "courseId": "...", "title": "...", "description": "...", "price": 0, "rating": 0 }`
- **Response:** 200 OK (updated course), 400 Bad Request, 404 Not Found, 500 Internal Server Error

#### Delete Course

- **DELETE** `/api/course/delete/:courseId`
- **Middleware:** `authMiddleware`, `educatorRoleCheck`, `educatorIdentityCheck`, `validateId('courseId', 'params')`
- **Response:** 200 OK (deleted course), 404 Not Found, 500 Internal Server Error

#### Update Course Rating

- **PUT** `/api/course/update-rating/`
- **Middleware:** `authMiddleware`, `validateId('courseId', 'body')`
- **Body:** `{ "courseId": "...", "rating": 4.5 }`
- **Response:** 200 OK (updated course), 404 Not Found, 500 Internal Server Error

---

### Section Management

#### Get All Sections for a Course

- **GET** `/api/section/get-all/:courseId`
- **Middleware:** `authMiddleware`, `validateId('courseId', 'params')`
- **Response:** 200 OK (sections array), 404 Not Found, 500 Internal Server Error

#### Get Section by ID

- **GET** `/api/section/get-section/:sectionId`
- **Middleware:** `authMiddleware`, `validateId('sectionId', 'params')`
- **Response:** 200 OK (section object), 404 Not Found, 500 Internal Server Error

#### Create Section

- **POST** `/api/section/add`
- **Middleware:** `authMiddleware`, `educatorRoleCheck`, `validateId('courseId', 'body')`
- **Body:** `{ "title": "...", "description": "...", "order": 1, "courseId": "..." }`
- **Response:** 201 Created (section object), 400 Bad Request, 500 Internal Server Error

#### Update Section

- **PUT** `/api/section/update`
- **Middleware:** `authMiddleware`, `educatorRoleCheck`, `educatorIdentityCheck`, `validateId('sectionId', 'body')`
- **Body:** `{ "sectionId": "...", "title": "...", "description": "...", "order": 2, "courseId": "..." }`
- **Response:** 200 OK (updated section), 400 Bad Request, 404 Not Found, 500 Internal Server Error

#### Delete Section

- **DELETE** `/api/section/delete/:sectionId`
- **Middleware:** `authMiddleware`, `educatorRoleCheck`, `educatorIdentityCheck`, `validateId('sectionId', 'params')`
- **Body:** `{ "courseId": "..." }`
- **Response:** 200 OK (deleted section), 404 Not Found, 500 Internal Server Error

---

### Video Management

#### Get Videos for Section

- **GET** `/api/video/get-all/:sectionId`
- **Middleware:** `authMiddleware`, `validateId('sectionId', 'params')`
- **Response:** 200 OK (videos array), 404 Not Found, 500 Internal Server Error

#### Get Single Video

- **GET** `/api/video/get-video/:videoId`
- **Middleware:** `authMiddleware`, `validateId('videoId', 'params')`
- **Response:** 200 OK (video object), 404 Not Found, 500 Internal Server Error

#### Create Video

- **POST** `/api/video/add`
- **Middleware:** `authMiddleware`, `educatorRoleCheck`, `uploadMiddleware.single('video')`, `validateId('sectionId', 'body')`, `validateId('courseId', 'body')`
- **Body:** `{ "title": "...", "description": "...", "courseId": "...", "sectionId": "..." }`
- **File Upload:** Key: `video` (multipart/form-data)
- **Response:** 201 Created (video object), 400 Bad Request, 500 Internal Server Error

#### Update Video Information

- **PUT** `/api/video/update`
- **Middleware:** `authMiddleware`, `educatorRoleCheck`, `validateId('courseId', 'body')`, `educatorIdentityCheck`, `validateId('videoId', 'body')`
- **Body:** `{ "videoId": "...", "title": "...", "description": "...", "order": 1, "courseId": "..." }`
- **Response:** 200 OK (updated video), 400 Bad Request, 404 Not Found, 500 Internal Server Error

#### Delete Video

- **DELETE** `/api/video/delete/:videoId`
- **Middleware:** `authMiddleware`, `educatorRoleCheck`, `educatorIdentityCheck`, `validateId('videoId', 'params')`
- **Body:** `{ "courseId": "..." }`
- **Response:** 200 OK (deleted video), 404 Not Found, 500 Internal Server Error

---

### Moderator Management

#### Approve Course

- **PUT** `/api/moderator/approve-course`
- **Middleware:** `authMiddleware`, `moderatorMiddleware`, `validateApproval`, `validateId('courseId', 'body')`
- **Body:** `{ "courseId": "...", "approval": true }`
- **Response:** 200 OK, 400 Bad Request, 500 Internal Server Error

#### Approve Section

- **PUT** `/api/moderator/approve-section`
- **Middleware:** `authMiddleware`, `moderatorMiddleware`, `validateApproval`, `validateId('sectionId', 'body')`
- **Body:** `{ "sectionId": "...", "approval": true }`
- **Response:** 200 OK, 400 Bad Request, 500 Internal Server Error

#### Approve Video

- **PUT** `/api/moderator/approve-video`
- **Middleware:** `authMiddleware`, `moderatorMiddleware`, `validateApproval`, `validateId('videoId', 'body')`
- **Body:** `{ "videoId": "...", "approval": true }`
- **Response:** 200 OK, 400 Bad Request, 500 Internal Server Error

#### Get Unapproved Courses

- **GET** `/api/moderator/get-unapproved-course`
- **Middleware:** `authMiddleware`, `moderatorMiddleware`
- **Response:** 200 OK (courses array), 404 Not Found, 500 Internal Server Error

#### Get Unapproved Sections

- **GET** `/api/moderator/get-unapproved-section`
- **Middleware:** `authMiddleware`, `moderatorMiddleware`
- **Response:** 200 OK (sections array), 404 Not Found, 500 Internal Server Error

#### Get Unapproved Videos

- **GET** `/api/moderator/get-unapproved-video`
- **Middleware:** `authMiddleware`, `moderatorMiddleware`
- **Response:** 200 OK (videos array), 404 Not Found, 500 Internal Server Error

---

### Exam Management

#### Create Exam

- **POST** `/api/exam/create`
- **Middleware:** `authMiddleware`, `educatorRoleCheck`, `validateId('educatorId', 'body')`
- **Body:** `{ "title": "...", "sectionId": "...", "courseId": "...", "educatorId": "..." }`
- **Response:** 201 Created (exam object), 400 Bad Request, 500 Internal Server Error

#### Add Question to Exam

- **PUT** `/api/exam/add-question`
- **Middleware:** `authMiddleware`, `educatorRoleCheck`, `educatorIdentityCheck`, `validateId('examId', 'body')`
- **Body:** `{ "examId": "...", "question": "...", "choices": ["A", "B", "C", "D"], "answer": "A" }`
- **Response:** 200 OK, 400 Bad Request, 500 Internal Server Error

#### Update Exam

- **PUT** `/api/exam/update-exam`
- **Middleware:** `authMiddleware`, `educatorRoleCheck`, `educatorIdentityCheck`, `validateId('examId', 'body')`
- **Body:** Update exam title, question, choice, or answer (see code for options)
- **Response:** 200 OK (updated exam), 400 Bad Request, 500 Internal Server Error

#### Get All Exams for Section

- **GET** `/api/exam/get-all-exams/:sectionId`
- **Middleware:** `authMiddleware`, `validateId('sectionId', 'params')`
- **Response:** 200 OK (exams array), 404 Not Found, 500 Internal Server Error

#### Get Exam by ID

- **GET** `/api/exam/get-exam/:examId`
- **Middleware:** `authMiddleware`, `validateId('examId', 'params')`
- **Response:** 200 OK (exam object), 404 Not Found, 500 Internal Server Error

#### Delete Exam

- **DELETE** `/api/exam/delete-exam`
- **Middleware:** `authMiddleware`, `educatorRoleCheck`, `educatorIdentityCheck`, `validateId('examId', 'body')`
- **Body:** `{ "examId": "...", "courseId": "..." }`
- **Response:** 200 OK (deleted exam), 404 Not Found, 500 Internal Server Error

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
