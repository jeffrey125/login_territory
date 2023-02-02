# Tech Exam

- My answers for the Techexam.

**Bug**

- [Fast-refresh problem in tailwindcss](https://github.com/vercel/next.js/issues/43396#issuecomment-1405218446) - Discared tailwindcss since it has a problem in next.js v13

**Notes**

- I'm using PNPM as my package manager if you are using other package managers please remove my `pnpm-lock.yaml` also change the pre-commit hook to your desired package manager. Now you can install and run the project again on your desired package manager.

- If you want to use pnpm you can simply globally installing it by using npm command `npm i -g pnpm`

## Scripts

- `pnpm dev` - To run a dev server.
- `pnpm build` - Builds the app.
- `pnpm start` - Starts a production server (Make sure to run the build script first).
- `pnpm test` - Starts my test cases using jest.

## Objectives

- Create a Login Page with Login function.
- Create a Homepage that lists the territories on auth users.
  - If unauthenticated redirect to login page.

### API Routes

- `/Account/SignIn` - Login Function API.

  ```
  Test Account
  U: foo
  P: bar
  ```

- `/Territories/All` - The list of territories.

### Plan

- Create skeleton pages.
  - Login Page ✅
    - Add skeleton design
  - Homepage ✅
    - Add skeleton design
  - 404 Page ✅
    - Add skeleton design
  - 500 Page ✅
    - Add skeleton design
- Create the req and res Type Def. ✅
- Create the Login Functionality.
  - Validate the credentials (Implement this using SSR).
    - Sanitize user input.
    - Use validator.js for validation.
  - Add an error modal and error handling.
    - Add an error message regarding on failed validation (Status code 401).
  - Use react-hook-form for the Login form.
- Create Homepage.
  - Handle the user auth.
    - If user is authenticated render the page.
    - If user is not authenticated redirect to login page (Status code 304).
  - Create a recursive function to transform the flat array into a tree (Depth is unknown).
    - Observe the pattern of the Parent-Child territories data.
  - Create a recursive drop down component to list down Territories.
- Host the live site in AWS.

### Optional

- Add advanced style and animation
  - MantineUI
  - Framer-motion
- Try to implement react-three-fiber.
- Change favicon.
- Dockerize this nextjs app

### Plan for Recursion on Territories Data

The Parent ID is appended always on the children id
e.g.

- If parent is null then it is the root node
- 01 is the starting count of the ID
- If Manila has parent id 1 then append it on the Manila ID 101

NOTES - The depth of data is unknown so we must handle this using the information above

```
Expected DS (We're going to use Recursion for this)

[
  {
    id: 1,
    name: "Metro Manila",
    parent: null, // Meaning this is the root parent
    children: [
      {
        id: 101,
        name: "Manila",
        parent: 1,
        children: [
          {
            id: 10101,
            name: "Malate",
            parent: 101,
            children: []
          },
          {
            id: 10102,
            name: "Ermita",
            parent: 101,
            children: []
          },
          {
            id: 10103,
            name: Binondo,
            parent: 101,
            children: []
          },
        ],
        {
          id: 102,
          name: "Makati",
          parent: 1,
          children: [
            {
              id: 10201,
              name: "Poblacion",
              parent: 102,
              children: []
            },
            {
              id: 10202,
              name: "Bel-Air",
              parent: 102,
              children: []
            },
            {
              id: 10203,
              name: "San Lorenzo",
              parent: 102,
              children: []
            },
            {
              id: 10203,
              name: "Urdaneta",
              parent: 102,
              children: []
            },
          ],
        },
        {
          id: 103,
          name: "Marikina",
          parent: 1,
          children: [
            {
              id: 10301,
              name: "Sto Nino",
              parent: 103,
              children: []
            },
            {
              id: 10302,
              name: "Malanday",
              parent: 103,
              children: []
            },
            {
              id: 10303,
              name: "Concepcion I",
              parent: 103,
              children: []
            }
          ]
        }
      }
    ]
  }
]

```
