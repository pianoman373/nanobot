function replaceAll(original, search, replacement) {
    var target = original
    return target.replace(new RegExp(search, 'g'), replacement)
}



module.exports = function(robot) {
    robot.hear(/one does not simply (.*)/, function(msg) {
		msg.send("https://memegen.link/mordor/one_does_not_simply/" + replaceAll(msg.match[1], " ", "_") + ".jpg")
    })

	robot.hear(/such (.*) very (.*)/, function(msg) {
		msg.send("https://memegen.link/doge/such_" + replaceAll(msg.match[1], " ", "_") + "/very_" + replaceAll(msg.match[2], " ", "_") + ".jpg")
    })
}
