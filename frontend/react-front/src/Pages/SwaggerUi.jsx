import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUi = () => {
  const swaggerSpec = {
    openapi: "3.0.0",
    info: {
      title: "Student-Attendance API",
      version: "1.0.0",
      description: "API for getting user details",
    },
    servers: [
      {
        url: "http://localhost:8080/v1",
      },
    ],
    paths: { 
      "/user/updateUser/{id}": {
  put: {
    summary: "Update a user by ID",
    description: "Updates the details of a user, including their first name and last name, based on their unique ID.",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "The unique ID of the user to update",
        schema: {
          type: "integer",
          example: 1,
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              firstName: {
                type: "string",
                example: "John",
                description: "The user's updated first name",
              },
              lastName: {
                type: "string",
                example: "Doe",
                description: "The user's updated last name",
              },
            },
            required: ["firstName", "lastName"], // Both fields are mandatory
          },
        },
      },
    },
    responses: {
      "200": {
        description: "User updated successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  example: 1,
                  description: "The unique ID of the user",
                },
                firstName: {
                  type: "string",
                  example: "UpdatedFirstName",
                  description: "The user's updated first name",
                },
                lastName: {
                  type: "string",
                  example: "UpdatedLastName",
                  description: "The user's updated last name",
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Invalid input provided",
      },
      "404": {
        description: "User not found",
      },
    },
  },
},
    "/user/getUsers": {
        get: {
          summary: "Get all users",
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        example: 1,
                      },
                      name: {
                        type: "string",
                        example: "John Doe",
                      },
                    },
                  },
                },
              },
            },
            "404": {
              description: "User not found",
            },
          },
        },
      },
      "/user/getUsers/{id}": {
        get: {
          summary: "Get a user by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID of the user to fetch",
              schema: {
                type: "integer",
                example: 1,
              },
            },
          ],
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        example: 1,
                      },
                      name: {
                        type: "string",
                        example: "John Doe",
                      },
                    },
                  },
                },
              },
            },
            "404": {
              description: "User not found",
            },
          },
        },
      },
      "/user/createStudent": {
  post: {
    summary: "Create a new student",
    description: "Creates a new student record with the provided details (first name, last name, UID, email, and password).",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              firstName: {
                type: "string",
                example: "John",
                description: "The student's first name",
              },
              lastName: {
                type: "string",
                example: "Doe",
                description: "The student's last name",
              },
              uid: {
                type: "string",
                example: "12345",
                description: "A unique identifier for the student",
              },
              email: {
                type: "string",
                format: "email",
                example: "john.doe@example.com",
                description: "The student's email address",
              },
              password: {
                type: "string",
                format: "password",
                example: "password123",
                description: "The student's password",
              },
            },
            required: ["firstName", "lastName", "uid", "email", "password"], // All fields are mandatory
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Student created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  example: 1,
                  description: "The unique ID of the created student",
                },
                firstName: {
                  type: "string",
                  example: "John",
                  description: "The student's first name",
                },
                lastName: {
                  type: "string",
                  example: "Doe",
                  description: "The student's last name",
                },
                uid: {
                  type: "string",
                  example: "12345",
                  description: "A unique identifier for the student",
                },
                email: {
                  type: "string",
                  example: "john.doe@example.com",
                  description: "The student's email address",
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Invalid input, missing required fields or incorrect format",
      },
      "409": {
        description: "Student with the provided UID or email already exists",
      },
    },
  },
},
 "/user/createProfessor": {
  post: {
    summary: "Create a new professor",
    description: "Creates a new professor record with the provided details (first name, last name, email, and password).",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              firstName: {
                type: "string",
                example: "John",
                description: "The professor's first name",
              },
              lastName: {
                type: "string",
                example: "Doe",
                description: "The professor's last name",
              },
              email: {
                type: "string",
                format: "email",
                example: "john.doe@university.com",
                description: "The professor's email address",
              },
              password: {
                type: "string",
                format: "password",
                example: "password123",
                description: "The professor's password",
              },
            },
            required: ["firstName", "lastName", "email", "password"], // All fields are mandatory
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Professor created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  example: 1,
                  description: "The unique ID of the created professor",
                },
                firstName: {
                  type: "string",
                  example: "John",
                  description: "The professor's first name",
                },
                lastName: {
                  type: "string",
                  example: "Doe",
                  description: "The professor's last name",
                },
                email: {
                  type: "string",
                  example: "john.doe@university.com",
                  description: "The professor's email address",
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Invalid input, missing required fields or incorrect format",
      },
      "409": {
        description: "Professor with the provided email already exists",
      },
    },
  },
},
  "/student/delete/{id}": {
        delete: {
          summary: "Delete a student",
          description: "Deletes a student record by their ID.",
          parameters: [
            {
              name: "id", // The path parameter
              in: "path",
              required: true,
              description: "The unique ID of the student to delete",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Student deleted successfully",
            },
            404: {
              description: "Student not found",
            },
          },
        },
      },
      "/student/find/{id}": {
          get: {
            summary: "Find a student",
            description: "Fetches details of a student by their unique ID.",
            parameters: [
              {
                name: "id", // The path parameter
                in: "path",
                required: true,
                description: "The unique ID of the student to find",
                schema: {
                  type: "integer",
                },
              },
            ],
            responses: {
              200: {
                description: "Student found successfully",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          description: "The ID of the student",
                        },
                        name: {
                          type: "string",
                          description: "The name of the student",
                        },
                        age: {
                          type: "integer",
                          description: "The age of the student",
                        },
                        class: {
                          type: "string",
                          description: "The class of the student",
                        },
                      },
                    },
                  },
                },
              },
              404: {
                description: "Student not found",
              },
            },
          },
        },    
        "/student/findAll": {
        get: {
          summary: "Find all students",
          description: "Fetches a list of all students in the system.",
          responses: {
            200: {
              description: "A list of students",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          description: "The unique ID of the student",
                        },
                        name: {
                          type: "string",
                          description: "The name of the student",
                        },
                        age: {
                          type: "integer",
                          description: "The age of the student",
                        },
                        class: {
                          type: "string",
                          description: "The class of the student",
                        },
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "No students found",
            },
          },
        },
      },
      "/student/getByLigjerata/{id}": {
        get: {
          summary: "Get students by lecture ID",
          description: "Fetches a list of students associated with a specific lecture.",
          parameters: [
            {
              name: "id", // The path parameter
              in: "path",
              required: true,
              description: "The unique ID of the lecture",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "A list of students for the given lecture",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          description: "The unique ID of the student",
                        },
                        name: {
                          type: "string",
                          description: "The name of the student",
                        },
                        age: {
                          type: "integer",
                          description: "The age of the student",
                        },
                        class: {
                          type: "string",
                          description: "The class of the student",
                        },
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "No students found for the given lecture ID",
            },
          },
        },
      },
      "/professors/delete/{id}": {
        delete: {
          summary: "Delete a professor",
          description: "Deletes a professor by their unique ID.",
          parameters: [
            {
              name: "id", // The path parameter
              in: "path",
              required: true,
              description: "The unique ID of the professor to delete",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Professor deleted successfully",
            },
            404: {
              description: "Professor not found",
            },
          },
        },
      },
      "/professors/find/{id}": {
        get: {
          summary: "Find a professor",
          description: "Fetches details of a professor by their unique ID.",
          parameters: [
            {
              name: "id", // The path parameter
              in: "path",
              required: true,
              description: "The unique ID of the professor to find",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Professor details retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        description: "The unique ID of the professor",
                      },
                      name: {
                        type: "string",
                        description: "The name of the professor",
                      },
                      department: {
                        type: "string",
                        description: "The department of the professor",
                      },
                      courses: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        description: "The courses taught by the professor",
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "Professor not found",
            },
          },
        },
      },
      "/professors/findAll": {
        get: {
          summary: "Find all professors",
          description: "Fetches a list of all professors in the system.",
          responses: {
            200: {
              description: "A list of professors",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          description: "The unique ID of the professor",
                        },
                        name: {
                          type: "string",
                          description: "The name of the professor",
                        },
                        department: {
                          type: "string",
                          description: "The department of the professor",
                        },
                        courses: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                          description: "The courses taught by the professor",
                        },
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "No professors found",
            },
          },
        },
      },
    "/ligjerata/create": {
  post: {
    summary: "Create a lecture",
    description: "Creates a new lecture with the provided details, including the lecture's ID, professor, subject, and start and end times.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                description: "The unique ID of the lecture",
                example: 1,
              },
              professor: {
                type: "object",
                description: "The professor teaching the lecture",
                example: null, // Or you could reference an actual professor object here
              },
              lenda: {
                type: "object",
                description: "The subject of the lecture",
                example: null, // Or you could reference an actual subject object here
              },
              fillimiLigjerates: {
                type: "string",
                format: "date-time",
                description: "The start time of the lecture",
                example: "2024-12-30T09:00:00Z",
              },
              mbarimiLigjerates: {
                type: "string",
                format: "date-time",
                description: "The end time of the lecture",
                example: "2024-12-30T11:00:00Z",
              },
            },
            required: ["id", "professor", "lenda", "fillimiLigjerates", "mbarimiLigjerates"], // These fields are required in the body
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Lecture created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  description: "The unique ID of the created lecture",
                  example: 1,
                },
                professor: {
                  type: "object",
                  description: "The professor teaching the lecture",
                  example: null, // Or a reference to a professor object
                },
                lenda: {
                  type: "object",
                  description: "The subject of the lecture",
                  example: null, // Or a reference to a subject object
                },
                fillimiLigjerates: {
                  type: "string",
                  format: "date-time",
                  example: "2024-12-30T09:00:00Z",
                },
                mbarimiLigjerates: {
                  type: "string",
                  format: "date-time",
                  example: "2024-12-30T11:00:00Z",
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Invalid input, unable to create lecture",
      },
    },
  },
},
      "/ligjerata/delete/{id}": {
        delete: {
          summary: "Delete a lecture",
          description: "Deletes a lecture by its unique ID.",
          parameters: [
            {
              name: "id", // The path parameter
              in: "path",
              required: true,
              description: "The unique ID of the lecture to delete",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Lecture deleted successfully",
            },
            404: {
              description: "Lecture not found",
            },
          },
        },
      },
      "/ligjerata/find/{id}": {
        get: {
          summary: "Find a lecture",
          description: "Fetches the details of a lecture by its unique ID.",
          parameters: [
            {
              name: "id", // The path parameter
              in: "path",
              required: true,
              description: "The unique ID of the lecture to find",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Lecture details retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        description: "The unique ID of the lecture",
                      },
                      title: {
                        type: "string",
                        description: "The title of the lecture",
                      },
                      description: {
                        type: "string",
                        description: "A description of the lecture",
                      },
                      professorId: {
                        type: "integer",
                        description: "The ID of the professor teaching the lecture",
                      },
                      startTime: {
                        type: "string",
                        format: "date-time",
                        description: "The start time of the lecture",
                      },
                      endTime: {
                        type: "string",
                        format: "date-time",
                        description: "The end time of the lecture",
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "Lecture not found",
            },
          },
        },
      },
      "/ligjerata/getByProfessor/{id}": {
        get: {
          summary: "Find lectures by professor",
          description: "Retrieves all lectures taught by the professor with the specified ID.",
          parameters: [
            {
              name: "id", // The path parameter for professor ID
              in: "path",
              required: true,
              description: "The unique ID of the professor whose lectures you want to retrieve",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "A list of lectures taught by the professor",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          description: "The unique ID of the lecture",
                        },
                        title: {
                          type: "string",
                          description: "The title of the lecture",
                        },
                        professorId: {
                          type: "integer",
                          description: "The unique ID of the professor teaching the lecture",
                        },
                        date: {
                          type: "string",
                          format: "date",
                          description: "The date when the lecture is scheduled",
                        },
                        description: {
                          type: "string",
                          description: "Additional details about the lecture",
                        },
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "No lectures found for the specified professor",
            },
            400: {
              description: "Invalid professor ID or request format",
            },
          },
        },
      },
      "/ligjerata/findAll": {
        get: {
          summary: "Find all lectures",
          description: "Fetches a list of all lectures in the system.",
          responses: {
            200: {
              description: "A list of all lectures",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          description: "The unique ID of the lecture",
                        },
                        title: {
                          type: "string",
                          description: "The title of the lecture",
                        },
                        description: {
                          type: "string",
                          description: "A description of the lecture",
                        },
                        professorId: {
                          type: "integer",
                          description: "The ID of the professor teaching the lecture",
                        },
                        startTime: {
                          type: "string",
                          format: "date-time",
                          description: "The start time of the lecture",
                        },
                        endTime: {
                          type: "string",
                          format: "date-time",
                          description: "The end time of the lecture",
                        },
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "No lectures found",
            },
          },
        },
      },
      "/ligjerata/update/{id}": {
        put: {
          summary: "Update a lecture",
          description: "Updates the details of a lecture by its unique ID.",
          parameters: [
            {
              name: "id", // The path parameter
              in: "path",
              required: true,
              description: "The unique ID of the lecture to update",
              schema: {
                type: "integer",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      description: "The title of the lecture",
                    },
                    description: {
                      type: "string",
                      description: "A description of the lecture",
                    },
                    professorId: {
                      type: "integer",
                      description: "The ID of the professor teaching the lecture",
                    },
                    startTime: {
                      type: "string",
                      format: "date-time",
                      description: "The start time of the lecture",
                    },
                    endTime: {
                      type: "string",
                      format: "date-time",
                      description: "The end time of the lecture",
                    },
                  },
                  required: ["title", "professorId", "startTime", "endTime"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Lecture updated successfully",
            },
            404: {
              description: "Lecture not found",
            },
            400: {
              description: "Invalid input, unable to update lecture",
            },
          },
        },
      },
      "/lenda/create": {
        post: {
          summary: "Create a subject",
          description: "Creates a new subject with the provided details.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description: "The name of the subject",
                    },
                    code: {
                      type: "string",
                      description: "The code for the subject",
                    },
                    department: {
                      type: "string",
                      description: "The department to which the subject belongs",
                    },
                    professorId: {
                      type: "integer",
                      description: "The ID of the professor responsible for the subject",
                    },
                    credits: {
                      type: "integer",
                      description: "The number of credits for the subject",
                    },
                  },
                  required: ["name", "code", "department", "professorId", "credits"],
                },
              },
            },
          },
          responses: {
            201: {
              description: "Subject created successfully",
            },
            400: {
              description: "Invalid input, unable to create subject",
            },
          },
        },
      },
      "/lenda/delete/{id}": {
        delete: {
          summary: "Delete a subject",
          description: "Deletes a subject by its unique ID.",
          parameters: [
            {
              name: "id", // The path parameter
              in: "path",
              required: true,
              description: "The unique ID of the subject to delete",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Subject deleted successfully",
            },
            404: {
              description: "Subject not found",
            },
          },
        },
      },
      "/lenda/find/{id}": {
        get: {
          summary: "Find a subject by ID",
          description: "Fetches the details of a subject by its unique ID.",
          parameters: [
            {
              name: "id", // The path parameter
              in: "path",
              required: true,
              description: "The unique ID of the subject to find",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Subject details retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        description: "The unique ID of the subject",
                      },
                      name: {
                        type: "string",
                        description: "The name of the subject",
                      },
                      code: {
                        type: "string",
                        description: "The code of the subject",
                      },
                      department: {
                        type: "string",
                        description: "The department to which the subject belongs",
                      },
                      professorId: {
                        type: "integer",
                        description: "The ID of the professor responsible for the subject",
                      },
                      credits: {
                        type: "integer",
                        description: "The number of credits for the subject",
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "Subject not found",
            },
          },
        },
      },
      "/lenda/findAll": {
        get: {
          summary: "Find all subjects",
          description: "Fetches a list of all subjects in the system.",
          responses: {
            200: {
              description: "A list of all subjects",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          description: "The unique ID of the subject",
                        },
                        name: {
                          type: "string",
                          description: "The name of the subject",
                        },
                        code: {
                          type: "string",
                          description: "The code of the subject",
                        },
                        department: {
                          type: "string",
                          description: "The department to which the subject belongs",
                        },
                        professorId: {
                          type: "integer",
                          description: "The ID of the professor responsible for the subject",
                        },
                        credits: {
                          type: "integer",
                          description: "The number of credits for the subject",
                        },
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "No subjects found",
            },
          },
        },
      },
      "/lenda/update/{id}": {
        put: {
          summary: "Update a subject",
          description: "Updates the details of a subject by its unique ID.",
          parameters: [
            {
              name: "id", // The path parameter
              in: "path",
              required: true,
              description: "The unique ID of the subject to update",
              schema: {
                type: "integer",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description: "The name of the subject",
                    },
                    code: {
                      type: "string",
                      description: "The code of the subject",
                    },
                    department: {
                      type: "string",
                      description: "The department to which the subject belongs",
                    },
                    professorId: {
                      type: "integer",
                      description: "The ID of the professor responsible for the subject",
                    },
                    credits: {
                      type: "integer",
                      description: "The number of credits for the subject",
                    },
                  },
                  required: ["name", "code", "department", "professorId", "credits"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Subject updated successfully",
            },
            404: {
              description: "Subject not found",
            },
            400: {
              description: "Invalid input, unable to update subject",
            },
          },
        },
      },
      "/attendance/create": {
        post: {
          summary: "Create a new attendance record",
          description: "Creates a new attendance record for a student in a specific class.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    studentId: {
                      type: "integer",
                      description: "The unique ID of the student",
                    },
                    classId: {
                      type: "integer",
                      description: "The unique ID of the class for which attendance is being recorded",
                    },
                    date: {
                      type: "string",
                      format: "date",
                      description: "The date of the class session (e.g., 2024-12-30)",
                    },
                    status: {
                      type: "string",
                      enum: ["present", "absent"],
                      description: "The attendance status of the student (either 'present' or 'absent')",
                    },
                  },
                  required: ["studentId", "classId", "date", "status"],
                },
              },
            },
          },
          responses: {
            201: {
              description: "Attendance record created successfully",
            },
            400: {
              description: "Invalid input, unable to create attendance record",
            },
            404: {
              description: "Student or class not found",
            },
          },
        },
      },
      "/attendance/delete/{id}": {
        delete: {
          summary: "Delete an attendance record",
          description: "Deletes an attendance record by its unique ID.",
          parameters: [
            {
              name: "id", // The path parameter
              in: "path",
              required: true,
              description: "The unique ID of the attendance record to delete",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Attendance record deleted successfully",
            },
            404: {
              description: "Attendance record not found",
            },
            400: {
              description: "Invalid ID, unable to delete attendance record",
            },
          },
        },
      },
      "/attendance/find/{id}": {
        get: {
          summary: "Find an attendance record by ID",
          description: "Fetches the attendance record for a student by its unique ID.",
          parameters: [
            {
              name: "id", // The path parameter
              in: "path",
              required: true,
              description: "The unique ID of the attendance record to find",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Attendance record found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        description: "The unique ID of the attendance record",
                      },
                      studentId: {
                        type: "integer",
                        description: "The unique ID of the student",
                      },
                      classId: {
                        type: "integer",
                        description: "The unique ID of the class the attendance is recorded for",
                      },
                      date: {
                        type: "string",
                        format: "date",
                        description: "The date of the class session",
                      },
                      status: {
                        type: "string",
                        enum: ["present", "absent"],
                        description: "The attendance status (either 'present' or 'absent')",
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "Attendance record not found",
            },
          },
        },
      },
      "/attendance/findAll": {
        get: {
          summary: "Find all attendance records",
          description: "Fetches a list of all attendance records in the system.",
          responses: {
            200: {
              description: "A list of all attendance records",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          description: "The unique ID of the attendance record",
                        },
                        studentId: {
                          type: "integer",
                          description: "The unique ID of the student",
                        },
                        classId: {
                          type: "integer",
                          description: "The unique ID of the class the attendance is recorded for",
                        },
                        date: {
                          type: "string",
                          format: "date",
                          description: "The date of the class session",
                        },
                        status: {
                          type: "string",
                          enum: ["present", "absent"],
                          description: "The attendance status (either 'present' or 'absent')",
                        },
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "No attendance records found",
            },
          },
        },
      },
      "/attendance/update/{id}": {
        put: {
          summary: "Update an attendance record",
          description: "Updates the attendance record for a student by its unique ID.",
          parameters: [
            {
              name: "id", // The path parameter
              in: "path",
              required: true,
              description: "The unique ID of the attendance record to update",
              schema: {
                type: "integer",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    studentId: {
                      type: "integer",
                      description: "The unique ID of the student",
                    },
                    classId: {
                      type: "integer",
                      description: "The unique ID of the class the attendance is recorded for",
                    },
                    date: {
                      type: "string",
                      format: "date",
                      description: "The date of the class session (e.g., 2024-12-30)",
                    },
                    status: {
                      type: "string",
                      enum: ["present", "absent"],
                      description: "The attendance status (either 'present' or 'absent')",
                    },
                  },
                  required: ["studentId", "classId", "date", "status"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Attendance record updated successfully",
            },
            404: {
              description: "Attendance record not found",
            },
            400: {
              description: "Invalid input, unable to update attendance record",
            },
          },
        },
      },
      "/attendance/findAttendances/{id}": {
        get: {
          summary: "Find attendance records by student or class ID",
          description: "Fetches all attendance records for a specific student or class by its unique ID.",
          parameters: [
            {
              name: "id", // The path parameter
              in: "path",
              required: true,
              description: "The unique ID of the student or class to find attendance records for",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "A list of attendance records for the specified ID",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          description: "The unique ID of the attendance record",
                        },
                        studentId: {
                          type: "integer",
                          description: "The unique ID of the student",
                        },
                        classId: {
                          type: "integer",
                          description: "The unique ID of the class the attendance is recorded for",
                        },
                        date: {
                          type: "string",
                          format: "date",
                          description: "The date of the class session",
                        },
                        status: {
                          type: "string",
                          enum: ["present", "absent"],
                          description: "The attendance status (either 'present' or 'absent')",
                        },
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "Attendance records not found for the specified ID",
            },
            400: {
              description: "Invalid ID format or request",
            },
          },
        },
      },
      "/attendance/check-in/{id}": {
        post: {
          summary: "Check-in a student for a class session",
          description: "Marks the student as 'present' for a specific class session by their unique ID.",
          parameters: [
            {
              name: "id", // The path parameter
              in: "path",
              required: true,
              description: "The unique ID of the student to check-in",
              schema: {
                type: "integer",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    classId: {
                      type: "integer",
                      description: "The unique ID of the class for which the student is checking in",
                    },
                    date: {
                      type: "string",
                      format: "date",
                      description: "The date of the class session (e.g., 2024-12-30)",
                    },
                    status: {
                      type: "string",
                      enum: ["present"],
                      description: "The attendance status (only 'present' for check-in)",
                    },
                  },
                  required: ["classId", "date", "status"], // The check-in request must include these fields
                },
              },
            },
          },
          responses: {
            200: {
              description: "Student successfully checked-in for the class session",
            },
            404: {
              description: "Student or class not found",
            },
            400: {
              description: "Invalid input or missing required fields",
            },
          },
        },
      },
      "/attendance/findByProfessor/{id}": {
        get: {
          summary: "Find all attendance records for a professor",
          description: "Fetches all attendance records for classes taught by a specific professor identified by their ID.",
          parameters: [
            {
              name: "id", // The path parameter for professor ID
              in: "path",
              required: true,
              description: "The unique ID of the professor whose classes' attendance records you want to retrieve",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "A list of attendance records for the professor's classes",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          description: "The unique ID of the attendance record",
                        },
                        studentId: {
                          type: "integer",
                          description: "The unique ID of the student",
                        },
                        professorId: {
                          type: "integer",
                          description: "The unique ID of the professor who taught the class",
                        },
                        classId: {
                          type: "integer",
                          description: "The unique ID of the class for which attendance is recorded",
                        },
                        date: {
                          type: "string",
                          format: "date",
                          description: "The date of the class session",
                        },
                        status: {
                          type: "string",
                          enum: ["present", "absent"],
                          description: "The attendance status (either 'present' or 'absent')",
                        },
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "No attendance records found for the specified professor",
            },
            400: {
              description: "Invalid input or missing required fields",
            },
          },
        },
      },
    },
  };
  
 

  return (
    <div className="App">
      <SwaggerUI spec={swaggerSpec} />
    </div>
  );
};

export default SwaggerUi;