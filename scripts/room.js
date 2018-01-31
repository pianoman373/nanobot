module.exports = function(robot) {
    robot.respond(/room$/i, function(msg) {
		msg.send(msg.message.room);
	});
}
