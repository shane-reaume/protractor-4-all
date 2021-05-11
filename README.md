# protractor-4-all
### A vanilla flavor of protractor, batteries included!

Key features:
- Works on Windows, MacOS and Ubuntu without any changes.
- Gulp to organize test scripts and associated config/args
- Mocha/Chai assertions 
- async/await for the modern JavaScript experience
- BrowserStack and mobile option, just add credentials and pick appropriate gulp task or make your own
- Automagically open a report if needed via mochawesome and open
- Page Objects (get started with POM)
- Screenshots

Requirements:

- Install nodejs 16.1.0
   - https://nodejs.org
   - if nodejs already installed on older version checkout nvm

Steps:

1) download the repo and access root directory in terminal or command to run
2) `npm i` # installing dependencies 
3) `gulp google-desktop-chrome` # run the gulp task/test

Next Steps If using browserstack: 

1) add browserstack credentials and your devices in browserStack.cred
2) Run the desktop or browserstack/mobile job from the gulpfile.js