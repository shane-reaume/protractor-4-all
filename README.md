# protractor-4-all
A flavor of protractor for testing any web application, with Gulp, Mocha/Chai, async/await, BrowserStack, mochawesome, page objects (mobile/desktop) and screenshots

Steps:

1) download the repo
2) `npm i`
3) run the gulp task named google-desktop-chrome

Next Steps If using browserstack: 

1) add browserstack credentials and your devices in browserStack.cred.js.setup
2) change browserStack.cred.js.setup to browserStack.cred.js 
    (this is a gitignore so you can contribute to the project)
3) Run the desktop or browserstack/mobile job from the gulpfile.js