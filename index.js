var express = require('express')
var mongoUri = process.env.MONGOLAB_URI ||
'mongodb://expenses_user:expenses_password@ds051720.mongolab.com:51720/heroku_app31740700'
var mongoose = require('mongoose')
mongoose.connect(mongoUri)

var app = express();

app.set('port', (process.env.PORT || 5000))

var Expense = require('./app/models/expense')

app.get('/', function(request, response) {
  response.json({message: "Hello expenses app!"})
})

/* Get all expenses */
app.get('/api/expenses', function(request, response) {
	Expense.find(function(error, expenses) {
		if (error) {
			response.send(error)
		}
		
		response.json(expenses)
	})
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
