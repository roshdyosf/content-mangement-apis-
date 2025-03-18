# content-mangement-apis-

content mangement apis

## API Documentation

---

1. Course Management API

1.1 Get Courses for Educator  
• Description: Fetches all courses for a specific educator.  
• URL: /api/course/get-for-educator/:educatorId  
• Method: GET  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o validateId('educatorId', 'params'): Validates the educatorId in the URL parameters.  
• Response:  
 o 200 OK: Returns the list of courses for the educator.  
 o 404 Not Found: No courses found for the educator.  
 o 500 Internal Server Error: An error occurred while fetching the courses.

---

1.2 Get Courses for Tag  
• Description: Fetches all courses for a specific tag.  
• URL: /api/course/get-for-tag/:tag  
• Method: GET  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
• Response:  
 o 200 OK: Returns the list of courses for the tag.  
 o 404 Not Found: No courses found for the tag.  
 o 500 Internal Server Error: An error occurred while fetching the courses.

---

1.3 Get All Courses  
• Description: Fetches all courses with pagination.  
• URL: /api/course/get-all/:limit/offset  
• Method: GET  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
• Response:  
 o 200 OK: Returns the list of all courses.  
 o 404 Not Found: No courses found.  
 o 500 Internal Server Error: An error occurred while fetching the courses.

---

1.4 Create Course  
• Description: Creates a new course.  
• URL: /api/course/add  
• Method: POST  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o educatorRoleCheck: Ensures the user has the educator role.  
 o validateId('educatorId', 'body'): Validates the educatorId in the request body.  
• Request Body:  
{
"title": "Data Structures",
"description": "Learn about data structures.",
"educator": "John Doe",
"educatorId": "123",
"tags": ["programming", "algorithms"]
}

---

1.5 Update Course Information  
• Description: Updates the information of a course.  
• URL: /api/course/update  
• Method: PUT  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o educatorRoleCheck: Ensures the user has the educator role.  
 o educatorIdentityCheck: Ensures the user owns the course.  
 o validateId('courseId', 'body'): Validates the courseId in the request body.  
• Request Body:  
{
"courseId": "456",
"title": "Updated Course Title",
"description": "Updated course description."
}  
• Response:  
 o 200 OK: The course was updated successfully.  
 o 400 Bad Request: Invalid course data.  
 o 404 Not Found: The course ID is incorrect.  
 o 500 Internal Server Error: An error occurred while updating the course.  
• Note: You should always provide the following three fields: { courseId, title, description } even if only one field is being updated.

---

1.6 Delete Course  
• Description: Deletes a course.  
• URL: /api/course/delete/:courseId  
• Method: DELETE  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o educatorRoleCheck: Ensures the user has the educator role.  
 o educatorIdentityCheck: Ensures the user owns the course.  
 o validateId('courseId', 'params'): Validates the courseId in the URL parameters.  
• Response:  
 o 200 OK: The course was deleted successfully.  
 o 404 Not Found: The course ID is incorrect.  
 o 500 Internal Server Error: An error occurred while deleting the course.

---

1.7 Update Course Rating  
• Description: Updates the rating of a course.  
• URL: /api/course/update-rating  
• Method: PUT  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o validateId('courseId', 'body'): Validates the courseId in the request body.  
• Request Body:  
{
"courseId": "456",
"rating": 4.5
}  
• Response:  
 o 200 OK: The course rating was updated successfully.  
 o 404 Not Found: The course was not found.  
 o 500 Internal Server Error: An error occurred while updating the course rating.

---

2. Section Management API

2.1 Get Sections for Course  
• Description: Fetches all sections for a specific course.  
• URL: /api/section/get-all/:courseId  
• Method: GET  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o validateId('courseId', 'params'): Validates the courseId in the URL parameters.  
• Response:  
 o 200 OK: Returns the list of sections for the course.  
 o 404 Not Found: No sections found for the course.  
 o 500 Internal Server Error: An error occurred while fetching the sections.

---

2.2 Create Section  
• Description: Creates a new section for a course.  
• URL: /api/section/add  
• Method: POST  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o educatorRoleCheck: Ensures the user has the educator role.  
 o validateId('courseId', 'body'): Validates the courseId in the request body.  
• Request Body:  
{
"title": "Introduction",
"description": "Introductory section.",
"courseId": "123"
}  
• Response:  
 o 201 Created: The section was created successfully.  
 o 400 Bad Request: Invalid section data.  
 o 500 Internal Server Error: An error occurred while creating the section.

---

2.3 Update Section Information  
• Description: Updates the information of a section.  
• URL: /api/section/update  
• Method: PUT  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o educatorRoleCheck: Ensures the user has the educator role.  
 o educatorIdentityCheck: Ensures the user owns the section.  
 o validateId('sectionId', 'body'): Validates the sectionId in the request body.  
• Request Body:  
{
"sectionId": "456",
"title": "Updated Section Title",
"description": "Updated section description."
}  
• Response:  
 o 200 OK: The section was updated successfully.  
 o 400 Bad Request: Invalid section data.  
 o 404 Not Found: The section ID is incorrect.  
 o 500 Internal Server Error: An error occurred while updating the section.  
• Note: You should always provide the following five fields: { courseId, sectionId, order, title, description } even if only one field is being updated.

---

2.4 Delete Section  
• Description: Deletes a section.  
• URL: /api/section/delete/:sectionId  
• Method: DELETE  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o educatorRoleCheck: Ensures the user has the educator role.  
 o educatorIdentityCheck: Ensures the user owns the section.  
 o validateId('sectionId', 'params'): Validates the sectionId in the URL parameters.  
• Response:  
 o 200 OK: The section was deleted successfully.  
 o 404 Not Found: The section ID is incorrect.  
 o 500 Internal Server Error: An error occurred while deleting the section.

---

3. Video Management API

3.1 Get Videos for Section  
• Description: Fetches all videos for a specific section.  
• URL: /api/video/get-all/:sectionId  
• Method: GET  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o validateId('sectionId', 'params'): Validates the sectionId in the URL parameters.  
• Response:  
 o 200 OK: Returns the list of videos for the section.  
 o 404 Not Found: No videos found for the section.  
 o 500 Internal Server Error: An error occurred while fetching the videos.

---

3.2 Create Video  
• Description: Creates a new video for a section.  
• URL: /api/video/add  
• Method: POST  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o educatorRoleCheck: Ensures the user has the educator role.  
 o validateId('sectionId', 'body'): Validates the sectionId in the request body.  
 o validateId('courseId', 'body'): Validates the courseId in the request body.  
 o uploadMiddleware.single("video"): Handles video file upload.  
• Request Body:  
{
"title": "Lecture 1",
"description": "First lecture of the course.",
"courseId": "123",
"sectionId": "456"
}  
• File Upload:  
 o Key: video  
 o Type: Video file (multipart form-data).  
• Response:  
 o 201 Created: The video was created successfully.  
 o 400 Bad Request: No video file uploaded or invalid video data.  
 o 500 Internal Server Error: An error occurred while creating the video.

---

3.3 Update Video Information  
• Description: Updates the information of a video.  
• URL: /api/video/update  
• Method: PUT  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o educatorRoleCheck: Ensures the user has the educator role.  
 o educatorIdentityCheck: Ensures the user owns the video.  
 o validateId('videoId', 'body'): Validates the videoId in the request body.  
• Request Body:  
{
"videoId": "789",
"title": "Updated Lecture Title",
"description": "Updated lecture description."
}  
• Response:  
 o 200 OK: The video was updated successfully.  
 o 400 Bad Request: Invalid video data.  
 o 404 Not Found: The video ID is incorrect.  
 o 500 Internal Server Error: An error occurred while updating the video.  
• Note: You should always provide the following five fields: { courseId, sectionId, videoId, order, title, description } even if only one field is being updated.

---

3.4 Delete Video  
• Description: Deletes a video.  
• URL: /api/video/delete/:videoId  
• Method: DELETE  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o educatorRoleCheck: Ensures the user has the educator role.  
 o educatorIdentityCheck: Ensures the user owns the video.  
 o validateId('videoId', 'params'): Validates the videoId in the URL parameters.  
• Response:  
 o 200 OK: The video was deleted successfully.  
 o 404 Not Found: The video ID is incorrect.  
 o 500 Internal Server Error: An error occurred while deleting the video.

---

4. Moderator Management API

4.1 Approve Course  
• Description: Approves or disapproves a course.  
• URL: /api/moderator/approve-course  
• Method: PUT  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o moderatorMiddleware: Ensures the user has the moderator role.  
 o validateApproval: Validates the approval field in the request body.  
 o validateId('courseId', 'body'): Validates the courseId in the request body.  
• Request Body:  
{
"courseId": "123",
"approval": true
}  
• Response:  
 o 200 OK: The course approval status was updated successfully.  
 o 400 Bad Request: Missing or invalid courseId or approval.  
 o 500 Internal Server Error: An error occurred while updating the course approval.

---

4.2 Approve Section  
• Description: Approves or disapproves a section.  
• URL: /api/moderator/approve-section  
• Method: PUT  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o moderatorMiddleware: Ensures the user has the moderator role.  
 o validateApproval: Validates the approval field in the request body.  
 o validateId('sectionId', 'body'): Validates the sectionId in the request body.  
• Request Body:  
{
"sectionId": "456",
"approval": true
}  
• Response:  
 o 200 OK: The section approval status was updated successfully.  
 o 400 Bad Request: Missing or invalid sectionId or approval.  
 o 500 Internal Server Error: An error occurred while updating the section approval.

---

4.3 Approve Video  
• Description: Approves or disapproves a video.  
• URL: /api/moderator/approve-video  
• Method: PUT  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o moderatorMiddleware: Ensures the user has the moderator role.  
 o validateApproval: Validates the approval field in the request body.  
 o validateId('videoId', 'body'): Validates the videoId in the request body.  
• Request Body:  
{
"videoId": "789",
"approval": true
}  
• Response:  
 o 200 OK: The video approval status was updated successfully.  
 o 400 Bad Request: Missing or invalid videoId or approval.  
 o 500 Internal Server Error: An error occurred while updating the video approval.

---

4.4 Get Unapproved Courses  
• Description: Fetches all unapproved courses.  
• URL: /api/moderator/get-unapproved-course  
• Method: GET  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o moderatorMiddleware: Ensures the user has the moderator role.  
• Response:  
 o 200 OK: Returns the list of unapproved courses.  
 o 404 Not Found: No unapproved courses found.  
 o 500 Internal Server Error: An error occurred while fetching the courses.

---

4.5 Get Unapproved Sections  
• Description: Fetches all unapproved sections.  
• URL: /api/moderator/get-unapproved-section  
• Method: GET  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o moderatorMiddleware: Ensures the user has the moderator role.  
• Response:  
 o 200 OK: Returns the list of unapproved sections.  
 o 404 Not Found: No unapproved sections found.  
 o 500 Internal Server Error: An error occurred while fetching the sections.

---

4.6 Get Unapproved Videos  
• Description: Fetches all unapproved videos.  
• URL: /api/moderator/get-unapproved-video  
• Method: GET  
• Middleware:  
 o authMiddleware: Ensures the user is authenticated.  
 o moderatorMiddleware: Ensures the user has the moderator role.  
• Response:  
 o 200 OK: Returns the list of unapproved videos.  
 o 404 Not Found: No unapproved videos found.  
 o 500 Internal Server Error: An error occurred while fetching the videos.

---

5. Standard Response Format

Success Response  
• Status Code: 200 OK, 201 Created, etc.  
• Response:  
 o success: true  
 o message: Success message.  
 o status: Status code.  
 o data: Response data (if applicable).

Error Response  
• Status Code: 400 Bad Request, 404 Not Found, 500 Internal Server Error, etc.  
• Response:  
 o success: false  
 o message: Error message.  
 o status: Status code.  
 o data: null.
