var acronym = require('acronym')



module.exports = function(robot) {
    robot.respond(/acronym (.*)/i, function(msg) {
        var input = msg.match[1]

        msg.send(acronym(input))
    })
}
