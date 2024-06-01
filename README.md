<h1 align="center">Kudos Software</h1>

<p align="center">This project involves the development of a user-friendly interface using Angular 17, allowing users to create and manage projects and tasks effortlessly. Users can easily create projects, add tasks to them, and track the progress of each task. The interface provides intuitive controls for marking tasks as in progress or completed, enhancing user experience and productivity.
    <br> 
</p>

URL Software: https://delfosti-software.netlify.app
Notes: The server sometimes becomes down which requests can take up to 50 seconds maximum due to relogging.

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Structure](#structure)
- [Features](#features)
- [Built Using](#built_using)
- [Deploy Using](#deploy_using)

## 🧐 About <a name = "about"></a>
- This frontend application serves as the user interface for a React application developed with Vite and Vitest. It provides a user-friendly experience for authenticated users, particularly administrators, enabling them to interact with the backend API securely.
- The frontend facilitates various functionalities such as uploading CSV files, managing records, and performing administrative tasks.
- Developed using Angular 17, the frontend follows modern architectural patterns to ensure scalability, maintainability, and efficiency in handling user interactions and data management.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
You will need to have the following installed on your machine:
- [Angular.js](https://angular.io)
- [Node.js](https://nodejs.org/en/)

### Installing
With the prerequisites installed, and with docker running, you can run the following commands to get the project up and running:

1. Clone the repository or download the zip file and extract it:
```bash
git clone https://github.com/iska1234/DelfostiFront.git
```

2. Install the dependencies:
```bash
npm install
```

3. Start the server:
```bash
ng serve
```

## 🏗️ Structure <a name = "structure"></a>
The project is structured as follows:
```

├── app: Folder containing application files.

│   ├── core: This folder holds critical components and logic essential for the application's core functionality.

│   │   ├── domain: Contains domain-specific logic and data models for the application. It includes subfolders for models, repositories, repository interfaces, and use cases.

│   │   ├── guards: Holds guard services responsible for protecting routes based on certain conditions or permissions.

│   │   ├── services: Houses shared services used throughout the application.

│   │   ├── utils: Contains utility functions or helpers used across the application.

│   ├── mod: This folder represents modules within the application

│   │   ├── admin: Contains components, services, and other resources related to the admin module.

│   │   ├── auth: Holds components and services related to authentication functionality.

│   │   ├── boss: Contains components, services, and resources specific to the boss module.

│   │   ├── user: Contains components, services, and resources specific to the user module.

│   ├── shared: This folder contains reusable components and resources shared across multiple modules.

│   │   ├── admin: Holds shared components, services, and resources used within the admin module.

│   │   ├── boss: Contains shared components, services, and resources for the boss module.

│   │   ├── ui: Contains shared UI components, directives, and pipes used across multiple modules.

│   │   ├── user: Holds shared components, services, and resources used within the user module.

│   ├── app.routes: Defines the routes for the application, specifying the components to load for each route.

│   ├── app.component.html: The HTML template for the root component of the application.

│   ├── app.component.ts: The TypeScript file containing the logic for the root component of the application.


```

## 🎈 Features <a name = "features"></a>

### Auth Module - Login

![image](https://github.com/iska1234/DelfostiFront/assets/119825666/b768f374-e858-453f-bcaa-b357bcd61177)

Allows users to log in to the application using their credentials.


### Auth Module - Register

![image](https://github.com/iska1234/DelfostiFront/assets/119825666/f69af3f5-b30e-4064-bd2c-936be6be95dc)

Enables new users to create an account by providing necessary details for registration.


### Admin Module - Home

![image](https://github.com/iska1234/DelfostiFront/assets/119825666/0b799e62-efdb-4c1d-881e-a2c769635e96)

The landing page for administrators, providing an overview of essential information and actions. Here you will find all the available projects divided into cards.


### Admin Module - Modal NewProject

![image](https://github.com/iska1234/DelfostiFront/assets/119825666/11691358-7c1b-483d-98eb-aaa0ed9587aa)

A modal window for create new project.


### Admin Module - Projects Page - Cards View

![image](https://github.com/iska1234/DelfostiFront/assets/119825666/c4906ffe-0d19-4bf6-bc56-007cad7c3717)

Displays projects in a card-based layout for easy navigation and management. This and all views have a menu button to change views if the user wishes.


### Admin Module - Projects Page - TimeLine View

![image](https://github.com/iska1234/DelfostiFront/assets/119825666/67181846-1566-4830-9f00-0b50963041ee)

Visualizes project timelines, enabling administrators to track project progress over time.


### Admin Module - Projects Page - Gantt View

![image](https://github.com/iska1234/DelfostiFront/assets/119825666/e3a27fac-d6c8-4e43-a31c-031d7526de99)

Presents projects in a Gantt chart format, offering a comprehensive view of project schedules and dependencies.


### Admin Module - Projects Page - Modal for NewTask

![image](https://github.com/iska1234/DelfostiFront/assets/119825666/cd84cbe5-3e9f-45ec-a7f9-abd40f3edbf0)

A modal window for creating new tasks within a project, streamlining task management.


### Admin Module - Project details page

![image](https://github.com/iska1234/DelfostiFront/assets/119825666/a152b429-18a4-4bb7-8189-89c23b435f39)

Provides detailed information about a specific project, including tasks, timelines, and team members.


### User Module - Homepage

![image](https://github.com/iska1234/DelfostiFront/assets/119825666/395cf2df-18df-43a0-90ad-dbeed5b462fb)

The landing page for regular users, offering an overview of their tasks and projects. It also has a priority filter according to the status of the tasks.


### User Module - Task details

![image](https://github.com/iska1234/DelfostiFront/assets/119825666/d3d587a0-94db-4f22-871d-f7300d832c68)

Displays detailed information about a specific task, including its status, due date, and description. Here includes a button that will allow you to send the task for review



### Boss Module - Homepage

![image](https://github.com/iska1234/DelfostiFront/assets/119825666/7d5a5e4e-ec0b-41a6-abae-77524f949bce)

The landing page for bosses or team leads, providing insights into team performance and project statuses. It also has a priority filter according to the status of the tasks.


### Boss Module - Task details

![image](https://github.com/iska1234/DelfostiFront/assets/119825666/4a073ca5-008f-411a-bf1f-90574317c6b8)

Offers detailed information about a specific task, facilitating oversight and management by team leads. Here it includes two buttons that allow you to mark the task as completed and send it for observation in case something negative has arisen.


## ⛏️ Built Using <a name = "built_using"></a>
- [Typescript](https://www.typescriptlang.org/)
- [Angular 17](https://angular.dev)
- [AngularMaterial](https://material.angular.io)
- [Tailwind](https://tailwindcss.com)

## 🚀 Deploy Using <a name = "built_using"></a>
- [Netlify](https://www.netlify.com)
