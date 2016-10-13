function Controller(view, model) {
    "use strict";

    this.clickAdd = function() {

        var validationMessage = model.ValidatePlayer(view.getInputedName(), view.getInputedAge(), view.getInputedNumber(), view.getInputedTeam());

        if (validationMessage == "") {
            model.AddPlayer(view.getInputedName(), view.getInputedAge(), view.getInputedNumber(), view.getInputedTeam());
            view.refresh(model);

        } else {
            alert(validationMessage);
        }
    }
    this.clickEdit = function() {

        if (buttonEdit.innerHTML == "EDIT") {
            buttonEdit.innerHTML = "SAVE";
        } else {
            buttonEdit.innerHTML = "EDIT";
        }
    }

    this.clickDelete = function() {
        var selectedIndex = view.getSelectedIndex();

        if (selectedIndex != -1) {
            model.DeleteOnIndex(selectedIndex);
        }

        view.refresh(model);
    }

    this.clickFilter = function() {
      model.toFilter = true;
      model.doFilter(inputName, inputAge, inputNumber, inputTeam);
    }

    this.clickReset = function() {
        view.cleanInputboxes();
    }

    view.refresh(model);
}
