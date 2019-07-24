const d = require('protractor');
const ec = d.ExpectedConditions;
const config = require('./config').config;
const fs = require('fs');
const _ = require('lodash');

afterEach('finalize test reports', async function() {
	let stepName = await this.currentTest.title;
	/**
	 * screenshot if test fails
	 */
	if (this.currentTest.state !== 'passed') {
		const png = await d.browser.takeScreenshot();
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
		return d.browser.wait(ec.presenceOf(d.$(path)), common.defaults.maxwait);
	},
	scrollToIt: async function(path) {
		return await d.browser.executeScript(`document.querySelector("d.${path}").scrollIntoView({block: "end", behavior: "smooth"});`);
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
	ec: ec
};