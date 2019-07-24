const chai = require('chai');
global['chai'] = chai;
global['should'] = chai.should();
const viewReport = require('open');
const bs = require('./browserStack.cred');

let x = new Date;
let arg = process.argv;
/**
 * Return value of passed in key arg via CLI or gulpfile
 * @param key
 * @param arg
 * @returns {*}
 */
function indOfArg(key, arg) {
	/**
   *
   * @returns {*}
   */
	function indOfKey () {
		let indexOfKey = arg.indexOf(key);
		return arg[indexOfKey + 1];
	}
	return arg.indexOf(key) !== -1 ? indOfKey().toString() : false;
}

let env = indOfArg('--env', arg) || 'sandbox';

/**
 * 'local' is default and will enable mochawesome reports and disable headless browser
 * This is for development of tests, while you can create any custom args
 * like jenkins or pipeline for example
 */
let rep = indOfArg('--rep', arg) || 'local';

// Increase the default timeout as needed
let mto = indOfArg('--mto', arg) || '';

// BROWSERSTACK option, you just add arg --bst true in gulp
let bst = indOfArg('--bst', arg) || false;

// Mobile testing
let mob = indOfArg('--mob', arg) || false;

// OS/platform is determined for proper drivers
console.log(`This platform is ${process.platform}`);
const CHROMEDRIVER = (process.platform === 'darwin') ? 'chromedriver' : 'chromedriver.exe';

// chrome args
let chromeArgs = [ '--disable-infobars', '--disableChecks', '--start-maximized' ];
if (rep !== 'local') chromeArgs.push('--headless');

// default capabilities
let capabilities = {
	browserName: 'chrome',
	chromeOptions: {
		args: chromeArgs,
		prefs: { 'profile.password_manager_enabled': false, credentials_enable_service: false }
	}
};

// building unique mochawesome report file name by day
const REPORT_FILENAME = `e2e-${env}-Report-${x.getMonth()}-${x.getDay()}-${x.getFullYear()}`;

// use if you have a production and sandbox environment, this is just an example
let domain = 'google';
switch (env) {
	case 'sandbox': domain = 'google';
		break;
	case 'production': domain = 'boogle';
		break;
	default:
		domain = 'google';
}
let baseUrl = `https://www.${domain}.com`;
console.log(`base url: https://www.${baseUrl}.com`);

// browserstack config if bst arg
if (bst) {
	capabilities = {
		browserName: 'android',
		device: 'Samsung Galaxy S9 Plus',
		realMobile: 'true',
		os_version: '9.0',
		'browserstack.user': bs.credentials.user,
		'browserstack.key': bs.credentials.key,
		name: 'Sample Test'
	};
}

// final config
let config = {
	env: env,
	rep: rep,
	framework: 'mocha',
	seleniumServerJar: bst ? '' : './bin/selenium-server-standalone-2.53.1.jar',
	mobile: mob ? true : false,
	mochaOpts: {
		ui: 'bdd',
		reporter: (rep === 'local') ? 'mochawesome' : '',
		reporterOptions: {
			reportDir: './testingReports',
			reportFilename: REPORT_FILENAME,
			enableCharts: 1,
			reportTitle: 'E2E Test Results',
			reportPageTitle: 'E2E Test Results'
		},
		timeout: mto.length ? mto : 120000,
		exit: true
	},
	chromeDriver: `./bin/${CHROMEDRIVER}`,
	capabilities: capabilities,
	/*
   * local reporting can open report in browser
   */
	onComplete: (rep === 'local') ? () => { viewReport(`./testingReports/${REPORT_FILENAME}.html`); } : console.log('DONE!'),
};

if (mob) capabilities.seleniumAddress = 'http://hub-cloud.browserstack.com/wd/hub';

module.exports = {
	config: config
};