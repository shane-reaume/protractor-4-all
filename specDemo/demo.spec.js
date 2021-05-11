const { common, config } = require('../testconfig');
const { browser, $, Key } = require('protractor');
const google = config.mobile ? require('./google.page').google.mobile : require('./google.page').google.desktop;

before('remove angular checks', async function() {
	await browser.waitForAngularEnabled(false);
});

describe('Google - search for protractor-4-all', function() {

	it('should go to google.com and search for AbacusNext', async function() {
		await browser.get('https://google.com');
		await common.waitForIt(google.search);
		await $(google.search).sendKeys('AbacusNext').sendKeys(Key.RETURN);
		await common.waitForIt(google.address);
		(await $(google.address).getText()).should.contain('www.abacusnext.com');
	});

});