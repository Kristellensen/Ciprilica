function Controller(view, model) {
    "use strict";

    this.clickAdd = function() {

        var validationMessage = model.ValidatePlayer(view.getInputedName(), view.getInputedAge(), view.getInputedNumber(), view.getInputedTeam());

        if (validationMessage === "") {
            model.AddPlayer(view.getInputedName(), view.getInputedAge(), view.getInputedNumber(), view.getInputedTeam());
            view.refresh(model);
            buttonEdit.innerHTML = "EDIT";

        } else {
            alert(validationMessage);
        }
    };
    this.clickEdit = function() {


        if (view.getSelectedIndex() !== -1) {
            if (buttonEdit.innerHTML === "EDIT") {
                var selected = view.getSelectedIndex();
                var selectedPlayer = model.getPlayer(selected);
                view.setInputedName(selectedPlayer.name);
                view.setInputedAge(selectedPlayer.age);
                view.setInputedNumber(selectedPlayer.number);
                view.setInputedTeam(selectedPlayer.team);
                buttonEdit.innerHTML = "SAVE";
            } else {
                var reValidationMessage = model.ValidatePlayer(view.getInputedName(), view.getInputedAge(), view.getInputedNumber(), view.getInputedTeam());
                if (reValidationMessage === "") {
                    model.EditAPlayer(view.getInputedName(), view.getInputedAge(), view.getInputedNumber(), view.getInputedTeam(), view.getSelectedIndex());
                    view.refresh(model);
                } else {
                    alert(reValidationMessage);
                }
                buttonEdit.innerHTML = "EDIT";
            }
        } else {
            alert("Please select a player to edit");
        }
    };


    this.clickDelete = function() {
        var selectedIndex = view.getSelectedIndex();

        if (selectedIndex !== -1) {
            model.DeleteOnIndex(selectedIndex);
        }

        view.refresh(model);
        buttonEdit.innerHTML = "EDIT";

    };

    this.clickFilter = function() {
        model.pleaseFilter();
        var filtered = model.doFilter(view.getInputedName(), view.getInputedAge(), view.getInputedNumber(), view.getInputedTeam());
        view.refresh(model);
    }

    this.clickReset = function() {
        view.cleanInputboxes();
        view.refresh(model);
    };

    view.refresh(model);
    showGraph(model.allPlayers());
}
