var fs = require('fs')

var MarkovChain = require("markovchain")

var markov = new MarkovChain(fs.readFileSync("training.txt", "utf8"))

var ignoredCharacters = "@\n"

var ignoredUsers = [
	"CircuitBot",
	"PieBot",
	"ParkerBot"
	]

function processSentence(sentence) {
    var ret = ""

    for (var j in sentence) {
        var letter = sentence[j]
        var addLetter = true

        for (var i in ignoredCharacters) {
            if (letter == ignoredCharacters[i]) {
                addLetter = false
                break
            }
        }
        if (addLetter) {
            ret += letter
        }
    }

    return ret.toLowerCase()
}

function random(items) {
	return items[ Math.floor(Math.random() * items.length) ]
}

function swap(word, pairList) {
	for (var i in pairList) {
		var word1 = pairList[i][0]
		var word2 = pairList[i][1]

		if (word.match(new RegExp("\\b" + word1 + "\\b", "i")))
			return word2
		else if (word.match(new RegExp("\\b" + word2 + "\\b", "i")))
			return word1
	}
	return word
}

function flipOwnership(sentence) {
	var ret = sentence

	for (var i in ret) {

		var word = ret[i]

		ret[i] = swap(word, [
			["i'd", "you'd"],
			["i'll", "you'll"],
			["i'm", "you're"],
			["i've", "you've"],
			["i", "you"],
			["mine", "yours"],
			["my", "your"],
			["myself", "yourself"]
		])
	}

	return ret
}

function logMessage(msg) {
	var message = msg

	if (msg[0] == "=") {
		message = msg.substr(1)
	}

	//fs.writeFileSync("scripts/training.txt", fs.readFileSync('scripts/training.txt', 'utf8') + message + "\n")
	//markov.parse(message)
}

function findWord(wordList) {
	return random(Object.keys(wordList))
}

module.exports = function(robot) {
    robot.hear(/^(.*)/, function(msg) {
		var message = msg.match[1]
		var name = msg.message.user.name

		if (msg.message.room == "KXEhYccpWF5mqmZGG") {
			if (message[0] == "=") {
				var content = msg.match[1].substr(1).toLowerCase().split(" ")

				var keyword = msg.random(content)
				var response = markov.start(keyword).end(5).process()

				if (keyword === response) {
					response = markov.start(findWord).end(5).process()
				}

				msg.send(response)
			}
		}

		if (ignoredUsers.indexOf(name) == -1) {
			logMessage(message)
		}
    })
}
