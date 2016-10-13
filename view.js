function View() {
    "use strict";
    var buttonAdd = document.getElementById("buttonAdd");
    var buttonFilter = document.getElementById("buttonFilter");
    var buttonReset = document.getElementById("buttonReset");
    var buttonEdit = document.getElementById("buttonEdit");
    var buttonDelete = document.getElementById("buttonDelete");

    var inputName = document.getElementById("inputName");
    var inputAge = document.getElementById("inputAge");
    var inputNumber = document.getElementById("inputNumber");
    var inputTeam = document.getElementById("inputTeam");

    var table = document.getElementById("generalTable")
    var previousSelectedRow = 0;



    this.getInputedName = function() {
        return inputName.value;
    }
    this.getInputedAge = function() {
        return inputAge.value;
    }
    this.getInputedNumber = function() {
        return inputNumber.value;
    }

    this.getInputedTeam = function() {
        return inputTeam.options[inputTeam.selectedIndex];
    }

    this.setInputedName = function(newInputName) {
        inputName.value = newInputName;
    }
    this.setInputedAge = function(newInputAge) {
        inputAge.value = newInputAge;
    }
    this.setInputedNumber = function(newInputNumber) {
        inputNumber.value = newInputNumber;
    }
    this.setInputedTeam = function(newInputTeam) {
        for (var i = 0; i < inputTeam.options.length; i++) {
            if (newInputTeam === inputTeam.options[i].text) {
                inputTeam.selectedIndex = i;
            }
        }
    }

    this.refresh = function(model) {
        // clean table
        while (table.rows.length > 2) {
            table.deleteRow(2);
        }

        previousSelectedRow = 0;

        if (model.toFilter()) {
            for (var i = 0; i < model.filteredPlayers().length; i++) {
                this.insertPlayerRow(model.filteredPlayers()[i], i);
            }

            model.notToFilter();

        } else {
            for (var i = 0; i < model.allPlayers().length; i++) {
                this.insertPlayerRow(model.allPlayers()[i], i);
            }
        }

        this.cleanInputboxes();
    }

    this.cleanInputboxes = function() {
        inputName.value = "";
        inputAge.value = "";
        inputNumber.value = "";
    }

    this.control = function(controller) {
        buttonAdd.onclick = controller.clickAdd;
        buttonDelete.onclick = controller.clickDelete;
        buttonReset.onclick = controller.clickReset;
        buttonEdit.onclick = controller.clickEdit;
        buttonFilter.onclick = controller.clickFilter;
    }

    this.getSelectedIndex = function() {

        for (var i = 2; i < table.rows.length; i++) {

            if (table.rows[i].cells[0].childNodes[0].checked) {
                return table.rows[i].cells[0].childNodes[0].value;
            }
        }
        return -1;
    }

    this.S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    this.GUID = function() {
        return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
    }

    this.insertPlayerRow = function(player, index) {

        var row = table.insertRow(2);
        var guid = this.GUID();

        var radioBtn = document.createElement("input");
        radioBtn.setAttribute("type", "radio");
        radioBtn.setAttribute("name", "player");
        radioBtn.setAttribute("value", index.toString());
        row.setAttribute("id", guid);
        radioBtn.onchange = function() {
            row.style.backgroundColor = "lightgrey";
            if (previousSelectedRow === 0) {} else {
                document.getElementById(previousSelectedRow).style.backgroundColor = "white";

            }
            previousSelectedRow = guid;
            buttonEdit.innerHTML = "EDIT";
            inputName.value = "";
            inputAge.value = "";
            inputNumber.value = "";

        }
        row.insertCell(0).appendChild(radioBtn);
        row.insertCell(1).innerHTML = player.name;
        row.insertCell(2).innerHTML = player.age;
        row.insertCell(3).innerHTML = player.number;
        row.insertCell(4).innerHTML = player.team;
    }

}
