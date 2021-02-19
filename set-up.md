# SETUP
This project was set up using the following commands:
- nodejs, npm and create-react-app installed
- npx create-react-app dw-react
- cd dw-react
- git add .
- git commit -m "blah"
- git remote add origin https://github.com/godmar02/dw-react.git
- git push -u origin master
- ensure browser has React Developer Tools
- ensure atom has 'react' and 'linter-eshint'

# DEVELOPMENT
- clear out the src dir except index files and replace css with https://taniarascia.github.io/primitive/css/main.css and start coding
- npm start //Runs the app in development mode, The page will automatically reload if you make changes to the code.

# PRE-BUILD SETUP FOR GH PAGES
- edit package.json with homepage ("homepage": "https://godmar02.github.io/<repo>") and predeploy and deploy script properties
- adding gd-pages to devDependencies package.json (npm install --save-dev gh-pages)
- On repo on settings ensure that github pages source is set to you gh-pages branch (post first deploy)

# BUILD
- npm run build // Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

# BUILD & DEPLOY
- npm run deploy // builds and then deploys to gh-pages branch of git repo
