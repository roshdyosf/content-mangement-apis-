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

```env
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

- **GET** `/api/v1/cms/course/get-for-educator/:educatorId/:limit/:offset`
- **Request Params:** `educatorId` (string), `limit` (number), `offset` (number)
- **Response:** See [API Response Format](#api-response-format)

#### Get Courses for Tag

- **GET** `/api/v1/cms/course/get-for-tag/:tag/:limit/:offset`
- **Request Params:** `tag` (string), `limit` (number), `offset` (number)
- **Response:** See [API Response Format](#api-response-format)

#### Get All Courses

- **GET** `/api/v1/cms/course/get-all/:limit/:offset`
- **Request Params:** `limit` (number), `offset` (number)
- **Response:** See [API Response Format](#api-response-format)

#### Get Courses Like Name

- **GET** `/api/v1/cms/course/get-course-like/:courseName/:limit/:offset`
- **Request Params:** `courseName` (string), `limit` (number), `offset` (number)
- **Response:** See [API Response Format](#api-response-format)

#### Get Course by ID

- **GET** `/api/v1/cms/course/get-course/:courseId`
- **Request Params:** `courseId` (string)
- **Response:** See [API Response Format](#api-response-format)

#### Create Course

- **POST** `/api/v1/cms/course/create`
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

- **Response:** See [API Response Format](#api-response-format)

#### Update Course Information

- **PUT** `/api/v1/cms/course/update`
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

- **Response:** See [API Response Format](#api-response-format)

#### Update Course Enrollment Count (Notifications)

- **PUT** `/api/v1/cms/course/notifications`
- **Body:**

  ```json
  {
    "courseId": "...",
    "key": "..." // (if required by your logic)
  }
  ```

- **Response:** See [API Response Format](#api-response-format)

#### Delete Course

- **DELETE** `/api/v1/cms/course/delete/:courseId`
- **Request Params:** `courseId` (string)
- **Response:** See [API Response Format](#api-response-format)

#### Update Course Rating

- **PUT** `/api/v1/cms/course/update-rating`
- **Body:**

  ```json
  {
    "courseId": "...",
    "rating": 4.5
  }
  ```

- **Response:** See [API Response Format](#api-response-format)

---

### Section Management

#### Get All Sections for a Course

- **GET** `/api/v1/cms/section/get-all/:courseId`
- **Request Params:** `courseId` (string)
- **Response:** See [API Response Format](#api-response-format)

#### Get Section by ID

- **GET** `/api/v1/cms/section/get-section/:sectionId`
- **Request Params:** `sectionId` (string)
- **Response:** See [API Response Format](#api-response-format)

#### Create Section

- **POST** `/api/v1/cms/section/add`
- **Body:**

  ```json
  {
    "title": "...",
    "description": "...",
    "order": 1,
    "courseId": "..."
  }
  ```

- **Response:** See [API Response Format](#api-response-format)

#### Update Section

- **PUT** `/api/v1/cms/section/update`
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

- **Response:** See [API Response Format](#api-response-format)

#### Delete Section

- **DELETE** `/api/v1/cms/section/delete/:sectionId`
- **Request Params:** `sectionId` (string)
- **Body:**

  ```json
  {
    "courseId": "..."
  }
  ```

- **Response:** See [API Response Format](#api-response-format)

---

### Video Management

#### Get Videos for Section

- **GET** `/api/v1/cms/video/get-all/:sectionId`
- **Request Params:** `sectionId` (string)
- **Response:** See [API Response Format](#api-response-format)

#### Get Single Video

- **GET** `/api/v1/cms/video/get-video/:videoId`
- **Request Params:** `videoId` (string)
- **Response:** See [API Response Format](#api-response-format)

#### Create Video

- **POST** `/api/v1/cms/video/add`
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
- **Response:** See [API Response Format](#api-response-format)

#### Update Video Information

- **PUT** `/api/v1/cms/video/update`
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

- **Response:** See [API Response Format](#api-response-format)

#### Delete Video

- **DELETE** `/api/v1/cms/video/delete/:videoId`
- **Request Params:** `videoId` (string)
- **Body:**

  ```json
  {
    "courseId": "..."
  }
  ```

- **Response:** See [API Response Format](#api-response-format)

---

### Moderator Management

#### Approve Course

- **PUT** `/api/v1/cms/moderator/approve-course`
- **Body:**

  ```json
  {
    "courseId": "...",
    "approval": true
  }
  ```

- **Response:** See [API Response Format](#api-response-format)

#### Approve Section

- **PUT** `/api/v1/cms/moderator/approve-section`
- **Body:**

  ```json
  {
    "sectionId": "...",
    "approval": true
  }
  ```

- **Response:** See [API Response Format](#api-response-format)

#### Approve Video

- **PUT** `/api/v1/cms/moderator/approve-video`
- **Body:**

  ```json
  {
    "videoId": "...",
    "approval": true
  }
  ```

- **Response:** See [API Response Format](#api-response-format)

#### Get Unapproved Courses

- **GET** `/api/v1/cms/moderator/get-unapproved-course`
- **Response:** See [API Response Format](#api-response-format)

#### Get Unapproved Sections

- **GET** `/api/v1/cms/moderator/get-unapproved-section`
- **Response:** See [API Response Format](#api-response-format)

#### Get Unapproved Videos

- **GET** `/api/v1/cms/moderator/get-unapproved-video`
- **Response:** See [API Response Format](#api-response-format)

---

### Exam Management

#### Create Exam

- **POST** `/api/v1/cms/exam/create`
- **Body:**

  ```json
  {
    "title": "...",
    "sectionId": "...",
    "courseId": "...",
    "educatorId": "..."
  }
  ```

- **Response:** See [API Response Format](#api-response-format)

#### Add Question to Exam

- **PUT** `/api/v1/cms/exam/add-question`
- **Body:**

  ```json
  {
    "examId": "...",
    "question": "...",
    "choices": ["A", "B", "C", "D"],
    "answer": "A"
  }
  ```

- **Response:** See [API Response Format](#api-response-format)

#### Update Exam

- **PUT** `/api/v1/cms/exam/update-exam`
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

- **Response:** See [API Response Format](#api-response-format)

#### Get All Exams for Section

- **GET** `/api/v1/cms/exam/get-all-exams/:sectionId`
- **Request Params:** `sectionId` (string)
- **Response:** See [API Response Format](#api-response-format)

#### Get Exam by ID

- **GET** `/api/v1/cms/exam/get-exam/:examId`
- **Request Params:** `examId` (string)
- **Response:** See [API Response Format](#api-response-format)

#### Delete Exam

- **DELETE** `/api/v1/cms/exam/delete-exam`
- **Body:**

  ```json
  {
    "examId": "...",
    "courseId": "..."
  }
  ```

- **Response:** See [API Response Format](#api-response-format)

---

## API Response Format

All API endpoints return a standard response structure:

```json
{
  "success": true | false,
  "message": "A message describing the result.",
  "status": 200, // or other HTTP status code
  "data": { ... } // The relevant data for the request, or null on error
}
```

- On success, `data` contains the created, updated, fetched, or deleted resource(s).
- On error, `data` is `null` or may contain validation details.
- All endpoints now enforce existence checks for parent resources (e.g., course for section, section for video, etc.) and cascade deletes for related resources.

**Note:**
- For file uploads, send files as `multipart/form-data` with the correct field name (e.g., `image` for course images, `video` for videos).
- Arrays (like `tags`) should be sent as repeated fields in form data.
- All create/update/delete operations now ensure data integrity and proper cleanup of related resources.

---

## Example Data Objects

### Course Object

```json
{
  "_id": "664f1e2b8c1a2b001f7e4a1a",
  "title": "JavaScript Basics",
  "description": "Learn the basics of JavaScript programming.",
  "price": 100,
  "educatorId": "664f1e2b8c1a2b001f7e4a1b",
  "educator": "John Doe",
  "tags": ["javascript", "programming"],
  "imageUrl": "https://cloudinary.com/image.jpg",
  "imagePublicId": "cloudinary-public-id",
  "enrollmentCount": 120,
  "sections": [
    {
      "_id": "664f1e2b8c1a2b001f7e4a1c",
      "title": "Introduction",
      "order": 1
    }
  ],
  "approved": true,
  "createdAt": "2025-06-14T12:00:00.000Z",
  "updatedAt": "2025-06-14T12:00:00.000Z"
}
```

### Section Object

```json
{
  "success": true,
  "message": "section fetched successfully.",
  "status": 200,
  "data": {
    "_id": "684e58154dce7bfbd397cfcd",
    "title": "secion1",
    "description": "section1 discrption",
    "courseId": "684e57274dce7bfbd397cfca",
    "videos": [
      {
        "_id": "684e585b4dce7bfbd397cfd0",
        "title": "new video1",
        "order": 1,
        "approved": false,
        "createdAt": "2025-06-15T05:21:31.580Z",
        "updatedAt": "2025-06-15T05:21:31.580Z"
      },
      {
        "_id": "684e5a0e4dce7bfbd397cfd5",
        "title": "vid2",
        "order": 2,
        "approved": false,
        "createdAt": "2025-06-15T05:28:46.341Z",
        "updatedAt": "2025-06-15T05:28:46.341Z"
      },
      {
        "_id": "684e5f8714220258d8a3b8c3",
        "title": "vid3",
        "order": 3,
        "approved": false,
        "createdAt": "2025-06-15T05:52:07.843Z",
        "updatedAt": "2025-06-15T05:52:07.843Z"
      },
      {
        "_id": "684e604414220258d8a3b8ce",
        "title": "vid4",
        "order": 4,
        "approved": false,
        "createdAt": "2025-06-15T05:55:16.021Z",
        "updatedAt": "2025-06-15T05:55:16.021Z"
      },
    ],
    "order": 1,
    "approved": true,
    "createdAt": "2025-06-15T05:20:21.892Z",
    "updatedAt": "2025-06-15T09:47:02.114Z",
    "__v": 0,
    "exams": [
      {
        "_id": "684e83b4b2b07d0bc66af41d",
        "title": "exam1 name",
        "createdAt": "2025-06-15T08:26:28.239Z",
        "updatedAt": "2025-06-15T09:03:11.058Z"
      },
      {
        "_id": "684e853db2b07d0bc66af425",
        "title": "exam1 name",
        "createdAt": "2025-06-15T08:33:01.632Z",
        "updatedAt": "2025-06-15T08:33:01.632Z"
      }
    ]
  }
}
```

### Video Object

```json
{
  "_id": "664f1e2b8c1a2b001f7e4a1d",
  "title": "Welcome Video",
  "url": "https://cloudinary.com/video.mp4",
  "publicId": "cloudinary-public-id",
  "order": 1,
  "courseId": "664f1e2b8c1a2b001f7e4a1a",
  "sectionId": "664f1e2b8c1a2b001f7e4a1c",
  "approved": false,
  "createdAt": "2025-06-14T12:00:00.000Z",
  "updatedAt": "2025-06-14T12:00:00.000Z"
}
```

### Exam Object

```json
{
  "_id": "664f1e2b8c1a2b001f7e4a1e",
  "educatorId": "664f1e2b8c1a2b001f7e4a1b",
  "courseId": "664f1e2b8c1a2b001f7e4a1a",
  "sectionId": "664f1e2b8c1a2b001f7e4a1c",
  "title": "Final Exam",
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
