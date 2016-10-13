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

    this.pleaseFilter = function() {
        toFilter = true;
    }

    this.toFilter = function() {
        return toFilter;
    }

    this.notToFilter = function() {
        toFilter = false;
    }

    this.AddPlayer = function(na, ag, nb, tm) {
        var player = Player(na, ag, nb, tm);
        allP.push(player);
    }
    this.DeleteOnIndex = function(index) {
        allP.splice(index, 1);
    }
    this.EditAPlayer = function(na, ag, nb, tm, index) {
        var editedPlayer = Player(na, ag, nb, tm);
        allP[index] = editedPlayer;
    }
    this.getPlayer = function(selected) {
        return allP[selected];
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




    var filterByName = function(inputName, allData) {
        var filteredP = [];

        for (var i = 0; i < allData.length; i++) {
            if (allData[i].name === inputName) {
                filteredP.push(allData[i]);
            }

        }

        return filteredP;
    }

    var filterByAge = function(inputAge, allData) {
        var filteredP = [];

        for (var i = 0; i < allData.length; i++) {
            if (allData[i].age == inputAge) {
                filteredP.push(allData[i]);
            }
        }
        return filteredP;
    }

    var filterByNumber = function(inputNumber, allData) {
        var filteredP = [];
        for (var i = 0; i < allData.length; i++) {
            if (allData[i].number == inputNumber) {
                filteredP.push(allData[i]);
            }
        }
        return filteredP;
    }

    var filterByTeam = function(inputTeam, allData) {
        var filteredP = [];
        for (var i = 0; i < allData.length; i++) {
          console.log('filter team, if: ' + allData[i].team + ' == ', inputTeam);
            if (allData[i].team == inputTeam) {
                filteredP.push(allData[i]);
            }
        }
        return filteredP;
    }
    this.doFilter = function(na, ag, nb, tm) {
        var query = Player(na, ag, nb, tm);
        // console.log('query: ', query);

        filtP = allP;

        if (query.name != '') {
            filtP = filterByName(query.name, filtP);
        }

        console.log('filtered by name: ', filtP);

        if (query.age != '') {
            filtP = filterByAge(query.age, filtP);
            console.log(inputAge.value);
        }
        console.log('filtered by age: ', filtP);


        if (query.number != '') {
            filtP = filterByNumber(query.number, filtP);
        }
        console.log('filtered by number: ', filtP);

        console.log('query team: ', query.team);
        if (query.team != 'No Team') {
            filtP = filterByTeam(query.team, filtP);
        }
        console.log('filtered by team: ', filtP);

        return filtP;
    }

    // FILL WITH DATA
    var randomNr = function(max) {
        return Math.floor((Math.random() * max) + 1);
    }

    var randomAge = function() {
        var age = 0;
        while (age < 15) {
            age = randomNr(50);
        }
        return age;
    }

    var teams = ["No Team", "Steaua", "Bucharest", "Sector"];
    var randomTeam = function() {
        return teams[randomNr(3)];
    }

    var fillWithData = function() {
        var names = ["Ion", "Mihai", "Mircea", "Vasile", "George", "Andrei", "Lorena", "Bianca", "Soska", "Vlad", "Serge"];
        var nrOfPlayers = 5;

        for (var i = 0; i < nrOfPlayers; i++) {
            var player = Player(names[randomNr(10)], randomAge(), randomNr(30), {
                text: randomTeam()
            });
            allP.push(player);
        }
    }

    fillWithData();

}
