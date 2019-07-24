# protractor-4-all
A flavor of protractor for testing any web application, with Gulp, Mocha/Chai, async/await, BrowserStack, mochawesome, page objects (mobile/desktop) and screenshots

Steps:

1) npm i
2) add browserstack credentials and your devices in browserStack.cred.js.setup
3) change browserStack.cred.js.setup to browserStack.cred.js 
    (this is a gitignore so you can contribute to the project)
4) Run the desktop or browserstack/mobile job from the gulpfile.js