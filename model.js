function Model() {
    "use strict";

    function Player(na, ag, nb, tm) {
        var thePlayer = {
            name: na,
            age: ag,
            number: nb,
            team: tm.text
        };
        return thePlayer;
    }

    var allP = [];
    var filtP = [];
    var toFilter = false;

    this.allPlayers = function() {
        return allP;
    }

    this.filteredPlayers = function() {
        return filtP;
    }

    this.toFilter = function() {
        return toFilter;
    }

    this.AddPlayer = function(na, ag, nb, tm) {
        var player = Player(na, ag, nb, tm);
        allP.push(player);
    }
    this.DeleteOnIndex = function(index) {
        allP.splice(index, 1);
    }

    this.ValidatePlayer = function(na, ag, nb, tm) {
        var message = "";
        if (na == "") {
            message += 'Name is empty | ';
        } else if (na.length > 20) {
            message += 'Name too long | ';
        } else if (!(isNaN(na))) {
            message += 'Name cannot be a number | '
        }
        if (ag == "") {
            message += 'Age is empty | ';
        } else if (isNaN(ag)) {
            message += 'Age is not a number | ';
        } else if (!(ag >= 15 && ag < 50)) {
            message += 'Age must be between 15-50 | ';
        }
        if (nb == "") {
            message += 'Number is empty | ';
        } else if (isNaN(nb)) {
            message += 'Number is not valid | ';
        } else if (!(nb >= 1 && nb <= 99)) {
            message += 'Number must be between 1-99 | ';
        }
        if (tm == inputTeam.options[0]) {
            message += 'Player must be in a team';
        }
        return message;
    }




    var filterByName = function(inputName) {
        if (inputName == "") {
            return filteredPlayers;
        } else if (player.name == inputName) {

            filteredPlayers.push(player);
        }
    }

    var filterByAge = function(inputAge) {
        if (inputAge.value === "") {
            return filteredPlayers;
        } else if (player.age === inputAge.value) {
            filteredPlayers.push(player);
        }
    }

    var filterByNumber = function(inputNumber) {
        if (inputNumber.value === "") {
            return filteredPlayers;
        } else if (player.number === inputNumber.value) {
            filteredPlayers.push(player);
        }
    }

    var filterByTeam = function(inputTeam) {
        if (inputTeam.value === "") {
            return filteredPlayers;
        } else if (player.team === inputTeam.value) {
            filteredPlayers.push(player);
        }
    }
    this.doFilter = function(na, ag, nb, tm) {
        var query = Player(na, ag, nb, tm);
        console.log('query: ', query);
        filterByName();
    }

    // FILL WITH DATA
    var randomNr = function() {
        return Math.floor((Math.random() * 10) + 1);
    }

    var fillWithData = function() {
        var names = ["Ion", "Mihai", "Mircea", "Vasile", "George", "Andrei", "Lorena", "Bianca", "Soska", "Vlad", "Serge"];
        var teams = ["Bars", "Mars", "Pluto", "Huiuto", "Pizda", "Pula", "Mos", "Craciun", "Blea", "Suka", "Nahui"];

        for (var i = 0; i < 8; i++) {
            var player = Player(names[randomNr()], randomNr(), randomNr(), {
                text: teams[randomNr()]
            });
            allP.push(player);
        }
    }

    fillWithData();

}
