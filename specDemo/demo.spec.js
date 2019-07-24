const { common, config } = require('../testconfig');
const d = require('protractor');
const google = config.mobile ? require('./google.page').google.mobile : require('./google.page').google.desktop;

before('remove angular checks', async function() {
	await d.browser.waitForAngularEnabled(false);
});

describe('Google - search for protractor-4-all', function() {

	it('should go to google.com and search for AbacusNext', async function() {
		await d.browser.get('https://google.com');
		await common.waitForIt(google.search);
		await d.$(google.search).sendKeys('AbacusNext');
		await	d.browser.actions().sendKeys(d.Key.ENTER).perform();
		await common.waitForIt(google.address);
		(await d.$(google.address).getText()).should.contain('4850 Eastgate Mall, San Diego, CA 92121');
	});

});