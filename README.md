# 🛠️ TechHelpDesk

## 📌 Description

**TechHelpDesk** is a full stack ticket management system developed with React (frontend), Spring Boot (backend), and MySQL (database).

The application allows users to create support tickets for **hardware** or **software** issues, and enables technicians to view, manage, and resolve those tickets. It simulates a functional Help Desk environment for internal support teams or IT departments.

## 🔧 Technologies Used

### Frontend
- React
- JavaScript
- CSS3

### Backend
- Java
- Spring Boot
- Spring Data JPA

### Database
- MySQL

---

## 📂 Features

- User registration and login
- Ticket creation with:
  - Title
  - Description
  - Category (Hardware or Software)
  - Priority
- Ticket listing and status updates
- Admin or technician view for managing tickets
- Fully responsive UI

---

## ⚙️ Backend Setup Instructions

To run the backend, create a file named `application.properties` inside:

src/main/resources/


And add the following configuration:

```properties
spring.application.name=techhelpdesk-backend

spring.datasource.url=jdbc:mysql://localhost:3306/techHelpDeskdb
spring.datasource.username=root
spring.datasource.password=your_mysql_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=5MB

api.security.token.secret=${JWT_SECRET:my-secret-key}
```

⚠️ Replace your_mysql_password with your actual MySQL root password.

---

## 🚧 Project Status 

This project is currently under local development and has not yet been deployed online.
