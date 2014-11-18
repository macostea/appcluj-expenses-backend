var mongoose     = require('mongoose');

var ExpenseSchema   = new mongoose.Schema({
    type: String,
	date: Date,
	amount: Number
});

module.exports = mongoose.model('Expense', ExpenseSchema);