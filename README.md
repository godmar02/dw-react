# DW-REACT

This is a basic character sheet generator for Dungeon-World written in ReactJS and hosted on a Github Pages project page. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and created using the following steps:
1. Install nodejs, npm and create-react-app
2. Run `npx create-react-app dw-react` to create a new blank project
3. Create a new blank repository on Github
4. Add all files and committing them to the local git-repo and set remote origin
5. Clear out the src dir except index files and push changes to GitHub
6. Following the deployment instructions here [Deployment - GitHub Pages](https://create-react-app.dev/docs/deployment/#github-pages) to ensure the project is set up for a GitHub pages deployment

Optional steps to help with development:
1. Ensure browser has React Developer Tools
2. Ensure has 'react' and 'linter-eslint' when using Atom

## Available Scripts

In the project directory, you can run:

### `npm install`

- installs all of the listed dependencies in the package.json file

### `npm start`

- Runs the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- The page will reload if you make edits.
- You will also see any lint errors in the console.

### `npm test`

- Launches the test runner in the interactive watch mode.
- See [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

- Builds the app for production to the `build` folder.
- It correctly bundles React in production mode and optimizes the build for the best performance.
- The build is minified and the filenames include the hashes.
- Your app is ready to be deployed!
- See [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

- Builds and then subsequently deploys to a 'gh-pages' branch of the your targeted git repo

## Learn More

- You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## To Do
- set null alignments on changing race and trigger state change
- set values for read only fields
- validation
- sheet header
- persistence / auto save
- routes and navbar
- Create new character pop-up
- Create new campaign pop-up
