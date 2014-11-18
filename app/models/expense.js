var mongoose     = require('mongoose');

var ExpenseSchema   = new mongoose.Schema({
    type: String,
	date: { type: Date, default: Date.now },
	amount: Number
});

module.exports = mongoose.model('Expense', ExpenseSchema);