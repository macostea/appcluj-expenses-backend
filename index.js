var express = require('express')
var bodyParser = require('body-parser')
var mongoUri = process.env.MONGOLAB_URI
var mongoose = require('mongoose')
mongoose.connect(mongoUri)

var app = express();

app.set('port', (process.env.PORT || 5000))

var Expense = require('./app/models/expense')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

/* POST expense */
app.post('/api/expenses', function(request, response) {
	var expense = new Expense()
	expense.type = request.body.type
	expense.date = request.body.date
	expense.amount = request.body.amount

	expense.save(function(error) {
	 if (error) {
		 response.send(error)
	 }

	 response.json(expense)
 	 })
})

/* GET expense by id */
app.get('/api/expenses/:expense_id', function(request, response) {
	Expense.findById(request.params.expense_id, function(error, expense) {
		if (error) {
			response.send(error)
		}

		response.json(expense)
	})
})

/* PUT (update) expense */
app.put('/api/expenses/:expense_id', function(request, response) {
	Expense.findById(request.params.expense_id, function(error, expense) {
		if (error) {
			response.send(error)
		}

		if (request.body.type != null) {
			expense.type = request.body.type
		}

		if (request.body.date != null) {
			expense.date = request.body.date
		}

		if (request.body.amount != null) {
			expense.amount = request.body.amount
		}

		expense.save(function(error) {
			if (error) {
				response.send(error)
			}

			response.json(expense)
		})
	})
})

/* DELETE expense */
app.delete('/api/expenses/:expense_id', function(request, response) {
	Expense.remove({
		_id: request.params.expense_id
	}, function(error, expense) {
		if (error) {
			response.send(error)
		}

		response.json({message: 'Deleted!'})
	})
})

app.get('/', function(request, response) {
	response.json({message: "Hello expenses app!"})
})

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'))
})
