const { browser, $, ExpectedConditions } = require('protractor');
const EC = ExpectedConditions;
const config = require('./config').config;
const fs = require('fs');
const _ = require('lodash');

afterEach('finalize test reports', async function() {
	let stepName = await this.currentTest.title;
	/**
	 * screenshot if test fails
	 */
	if (this.currentTest.state !== 'passed') {
		const png = await browser.takeScreenshot();
		try {
			common.saveScreenshot(png, `${stepName}.png`);
		} catch (err) {
			console.log(err);
		}
	}
});

let common = {
	defaults: {
		maxwait: 30000
	},
	waitForIt: function(path) {
		return browser.wait(EC.presenceOf($(path)), common.defaults.maxwait);
	},
	scrollToIt: async function(path) {
		return await browser.executeScript(`document.querySelector("d.${path}").scrollIntoView({block: "end", behavior: "smooth"});`);
	},
	hasClass: function(element, cls) {
		return element.getAttribute('class').then(function (classes) {
			return classes.split(' ').indexOf(cls) !== -1;
		});
	},

	saveScreenshot: function (data, filename) {
		const path = `./testingReports/screenshots/${filename.replace(/ /g,'_')}`;
		fs.writeFileSync(path, Buffer.from(data, 'base64'));
	}
};

module.exports = {
	config: config,
	common: common,
	_: _,
	EC: EC
};