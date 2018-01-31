// # Description:
// #   None
// #
// # Dependencies:
// #   None
// #
// # Configuration:
// #   None
// #
// # Commands:
// #   nanobot quote - Display a random funny quote.
// #
// # Author:
// #   pianoman373
var fs = require('fs')

var saidQuotes = []

function contains(arr, pattern) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == pattern) {
            return true
        }
    }
    return false
}

module.exports = function(robot) {
    robot.respond(/quote/i, function(msg) {
		if (msg.message.room == "GENERAL") {
		    var array1 = JSON.parse(fs.readFileSync('quotes.json', 'utf8')).quotes

		    if (saidQuotes.length >= array1.length) {
		        saidQuotes = []
		    }
		    var usableQuotes = []

		    for (var i = 0; i < array1.length; i++) {
		        if (!contains(saidQuotes, array1[i])) {
		            usableQuotes.push(array1[i])
		        }
		    }
		    //console.log("Usable Quotes: " + "[" + usableQuotes + "]")

		    var quote = msg.random(usableQuotes)
		    msg.send(quote)

		    saidQuotes.push(quote)
		    //console.log("Said quotes: " + "[" + saidQuotes + "]")
		}
    })
}
