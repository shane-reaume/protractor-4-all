let google = {
	desktop: {
		search: 'input[title="Search"]',
		address: 'div#rhs'
	},
	mobile: {
		search: 'input[type="Search"]',
		address: 'div[data-async-context="query:AbacusNext"]'
	}
};

module.exports = {
	google: google
};