# FireLounge

### Table of Contents
- [About the Project](#about-the-project)
- [Usage](#usage)
    - [Getting Started](#getting-started) 
    - [Creating a New Firebase Project](#creating-a-new-firebase-project) 
    - [Add an Existing Firebase Project](#add-an-existing-firebase-project)
    - [Firebase Project Management](#firebase-project-management)
    - [Database Management](#database-management)
    - [Database Queries](#database-queries)
- [Contributors](#contributors)
- [Credits](#credits)

## About the Project
- FireLounge is an application that allows developers to quickly create, connect and manage their Firebase applications. 
Specifically, it allows users to run SQL style queries to perform CRUD operations on Firebase RealTime databases.

## Usage

### Getting Started
```
git clone https://github.com/robertstef/Firelounge.git
cd Firelounge && npm install

#run in development mode
npm run start

#build executable
npm run build
```

### Creating a New Firebase Project
- Creating a new Firebase project through FireLounge is done using an basic step-by-step process. 
Each step contains the necessary fields required for each respective Firebase feature. Currently, 
FireLounge supports project creation with Database, Hosting, and Functions features. The project
creation stepper can be found under the Creation tab denoted by the pencil icon. 

<img src = 'images/proj_creation_screenshot.png'/>

### Add an Existing Firebase Project

### Firebase Project Management
- Users are able to manage their Firebase projects through FireLounge. Project management can accessed through 
the Management tab denoted by a briefcase icon. In addition, users are able to deploy all of the features on the 
project or a select set of features from their selected project through FireLounge. 

<img src = 'images/manage_proj_screenshot.png'/>

### Database Management

### Database Queries


## Contributors
- Jackson Schuler (https://github.com/jacksonschuler)
- Benjamyn Baker (https://github.com/BenjamynBaker)
- Robert Stefanyshin (https://github.com/robertstef)


## Credits
- Joseph Roddy (https://github.com/JoeRoddy) for his Firebase SQL library (https://www.npmjs.com/package/fbsql)
