# workflow-editor - Visual Workflow Builder

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Running Locally (Development)](#running-locally-development)  
- [Building for Production](#building-for-production)  
- [Testing](#testing)  
---

## Overview

**workflow-editor** is an intuitive visual workflow builder built with React, Redux Toolkit, Material UI, and Xyflow. It allows users to drag-and-drop workflow components, create complex workflows with conditional branching, and validate them in real time.

---

## Features

- Drag-and-drop workflow nodes  
- Connect nodes with edges including condition labels  
- Real-time validation with errors and warnings  
- Persistent flow saving/loading via localStorage  
- Material UI components with responsive design  
- Undo/redo and node highlighting on validation  
- Modular Redux state management  

---

## Tech Stack

- React 19  
- Redux Toolkit  
- Material UI 7  
- Xyflow React 12  
- Vite 7  
- Jest & React Testing Library  
- TypeScript (optional)  

---

## Prerequisites

- Node.js v16 or higher  
- npm v8+ or yarn v3+  

---

## Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/yourusername/my-app.git
cd my-app
npm install
# or
yarn install

Running the App
npm run dev
# or
yarn dev

Building for Production
npm run build
# or
yarn build


Running Tests
npm test
# or
yarn test


Technologies Used
React 19
Redux Toolkit
React-Redux
Vite (build tool)
Material-UI (MUI) v7
XState (statecharts)
Jest (testing)
@xyflow/react (flowchart library)

Local Storage
Flows are saved and loaded from browser localStorage under key savedFlow for persistence across sessions.