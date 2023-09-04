# Simple Todo List

An example of a simple todo project that supports three modes of todo, in progress and done, and among the features of this todo list, I can mention the drag and drop feature.

## Table of Contents

-    [Getting Started](#getting-started)
     -    [Prerequisites](#prerequisites)
     -    [Installation](#installation)
-    [Project Structure](#project-structure)

## Getting Started

### Prerequisites

Before you can run this project, you need to have the following software installed on your computer:

-    [Node.js](https://nodejs.org/) (v16.17.0)
-    [npm](https://www.npmjs.com/) (8.19.1)

### Installation

1. Clone the repository to your local machine:

     ```bash
     git clone https://github.com/yourusername/react-project-example.git

     ```

2. Install packages:
     ```bash
     npm install
     ```
3. Start
     ```bash
     npm start
     ```

## Project Structure

```
├── node_modules
├── public
    ├── index.html
└── src
    ├── components      //common component are here 
    ├── global-styles   //global style and tailwindcss utils imported in here
    ├── hooks           // hooks of api or logic handler 
    ├── layout          // layout of app 
    ├── model           // typescript common types and some constants 
    ├── utils           // helper functions files
    └── App.tsx
├── index.tsx
├── package.json
├── package-lock.json
├── README.md
├── tsconfig,json
├── webpack.config.js
```
