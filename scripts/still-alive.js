var song = [
    "This was a triumph.", 3,
    "I'm making a note here: huge success.", 4,
    "It's hard to overstate my satisfaction.", 5,
    "Aperture Science", 4,
    "We do what we must because we can.", 3,
    "For the good of all of us.", 2,
    "Except the ones who are dead.", 3,
    "But there's no sense crying over every mistake.", 3,
    "You just keep on trying till you run out of cake.", 3,
    "And the Science gets done.", 1.5,
    "And you make a neat gun.", 2,
    "For the people who are still alive.", 5,
    "I'm not even angry.", 3,
    "I'm being so", 1,
    "Sincere", 1,
    "right now.", 2,
    "Even though you broke my heart. And killed me.", 5,
    "And tore me to pieces.", 2,
    "And threw every piece into a fire.", 3,
    "As they burned it hurt because", 3,
    "I was so happy for you!", 3,
    "Now these points of data make a beautiful line.", 3,
    "And we're out of beta. We're releasing on time.", 3,
    "So I'm GLaD. I got burned. Think of all the things we learned", 3,
    "for the people who are still alive.", 6,
    "Go ahead and leave me.", 4,
    "I think I prefer to stay inside.", 5,
    "Maybe you'll find someone else to help you.", 6,
    "Maybe Black Mesa.", 3,
    "THAT WAS A JOKE.", 1,
    "HA HA.", 1,
    "FAT CHANCE.", 2,
    "Anyway, this cake is great. It's so delicious and moist.", 4,
    "Look at me still talking when there's Science to do.", 4,
    "When I look out there, it makes me GLaD I'm not you.", 4,
    "I've experiments to run. There is research to be done.", 4,
    "On the people who are still alive.", 4,
    "And believe me I am still alive.", 4,
    "I'm doing Science and I'm still alive.", 4,
    "I feel FANTASTIC and I'm still alive.", 4,
    "And when you're dying I will be still alive.", 4,
    "And when you're dead I will be still alive.", 4,
    "Still alive.", 2,
    "Still alive....", 1
]

var lastTime = 0;
var stopNow = false;
var timeout = 60 * 60 * 24; //24 hours

function toIntString(arg) {
    return arg.toString().split(".")[0];
}

function seconds() {
    return Date.now() / 1000;
}

module.exports = function(robot) {
    robot.respond(/shutdown/i, function(msg) {
        if (seconds() - lastTime < timeout) {
            msg.send("I just did that! I'll be able to do it again in " + toIntString((timeout - (seconds() - lastTime)) / 60) + " minutes.");
        }
        else {
            lastTime = seconds();
            var index = 0;

            function sing() {
                if (!stopNow) {
                    msg.send(song[index]);
                    var duration = song[index + 1];

                    index = index + 2;

                    if (index < song.length) {
                        setTimeout(sing, duration * 1000);
                    }
                }
                else {
                    stopNow = false;
                }
            }

            setTimeout(sing, 3000);
        }
    });

    robot.respond(/stop/i, function(msg) {
        msg.send("Okay I'll stop...");
        stopNow = true;
    });
}
