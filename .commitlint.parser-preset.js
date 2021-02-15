module.exports = {
	parserOpts: {
		headerPattern: /^(\w+)!?(?:\s*(?:[/(]([\w,/]+)[)]?))?!?\s*[~:]?\s*(.*)$/,
		headerCorrespondence: ['type', 'scope', 'subject'],
	},
};
