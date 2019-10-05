var path = require('path');
var friends = require('../data/friends');

module.exports = function(app) {
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function(req, res) {
        
        console.log(req.body.scores);

        var userInput = req.body;

        for(var i = 0; i < userInput.scores.length; i++) {
            userInput.scores[i] = parseInt(userInput.scores[i]);
        }

        var friendIndex = 0;
        
        // Examine the friends array
        for (i = 0; i < friends.length; i++) {
            
            var totalDifference = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                var difference = Math.abs(userInput.scores[j] - friends[i].scores[j]);
                totalDifference += difference;
            }
            
            var minDiff = 30;
            if (totalDifference < minDiff) {
                minDiff = totalDifference;
                friendIndex = i;
            }
        }

        friends.push(userInput);
        res.json(friends[friendIndex]);
  
    });

};