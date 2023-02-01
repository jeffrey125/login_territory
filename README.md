# Tech Exam

- My answers for the Techexam.

**Notes**

- I'm using PNPM as my package manager

## Objectives

- Create a Login Page with Login function
- Create a Homepage that lists the territories on auth users
  - If unauthenticated redirect to login page

### API Routes

- `/Account/SignIn` - Login Function API
  Test Account
  ```
  U: foo
  P: bar
  ```
- `/Territories/All` - The list of territories

### Plan

- Create skeleton pages
  - Login Page
  - Homepage
- Create the req and res Type Def
- Create the Login Functionality
  - Validate the credentials (Implement this using SSR)
    - Sanitize user input
    - Use validator.js for validation
  - Add an error modal and error handling
    - Add an error message regarding on failed validation (Status code 401)
  - Use react-hook-form for the Login form
- Create Homepage
  - Handle the user auth
    - If user is authenticated render the page
    - If user is not authenticated redirect to login page (Status code 304)
  - Create a recursive function to transform the flat array into a tree (Depth is unknown)
    - Observe the pattern of the Parent-Child territories data
  - Create a recursive drop down component to list down Territories
- Host the live site in AWS

### Optional

- Implement the CSS and Animation using TailwindCSS and Framer-motion
- Try to implement react-three-fiber
- Change favicon
