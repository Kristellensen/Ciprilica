var svgNS = "http://www.w3.org/2000/svg";
var svg = null; 
var totalWidth = 400;
var totalHeight = 500;
var padding = 50;

var ageCategories = [
    {name: "15-18", color: "yellow", ageCorresponds(age){return age <= 18 && age >= 15;}},
    {name: "19-25", color: "orange", ageCorresponds(age){return age <= 25 && age > 18;}},
    {name: "26-35", color: "red", ageCorresponds(age){return age <= 35 && age > 25;}},
    {name: "36-50", color: "magenta", ageCorresponds(age){return age <= 50 && age > 35;}}
];

for(var i=0; i<ageCategories.length; i++){
    console.log('categoria: ' + ageCategories[i].name + ' = ' +  ageCategories[i].color);
}

// SCALE
var YforPlayersConvertor = function(maxPlayersScale){ // maximum amount of players that can be displayed on the graph
    var maxPixels = totalHeight - padding - padding;
    
    return function(players, startingPoint){
        var pixelValue = (maxPixels / maxPlayersScale) * players;
        return totalHeight - padding - pixelValue - startingPoint;
    }
}

var playersToPixels = function(maxPlayers, players){
    var maxPixels = totalHeight - padding - padding;
    
    return (maxPixels / maxPlayers) * players;
}

var providerTeamWidth = function(totalTeams){
    return function(){
        return (totalWidth - padding) / totalTeams;
    }
}

// DRAWING HELPERS
var setAttributes = function(obj, attributeValues){  
    
    for(var i=0; i < attributeValues.length; i+=2){
        obj.setAttribute(attributeValues[i], attributeValues[i + 1]);
    }
    
}

var insertElement = function(type){
    var element = document.createElementNS(svgNS, type);
    
    return function(attributes){        
        setAttributes(element, attributes);
        this.svg.appendChild(element);
        return element;
    }
    
}

var buildHorizontalLegend = function(teamNames){
    insertElement("line")
    (["x1", 0, "y1", totalHeight - padding, "x2", totalWidth, "y2", totalHeight - padding, "stroke-width", 1, "stroke", "black"]);
    
    var teamWidth = providerTeamWidth(teamNames.length);
    var nrOfTeams = teamNames.length;
    
    var t = -1;
    var nextTeamName = function(){
        t++;
        return teamNames[t];
    }
    
    // DRAW RULER
    for(var i=teamWidth(); i<=nrOfTeams * teamWidth(); i+= teamWidth()){
        insertElement("line")
        (["x1", padding + i, "y1", 0, "x2", padding + i, "y2", totalHeight, "stroke-width", 1, "stroke", "black"]);
        
        var textNode = document.createTextNode(nextTeamName());
        
        insertElement("text")
        (["x", i - teamWidth() / 3, "y", totalHeight - padding / 2]).appendChild(textNode);
    }
    
}

var buildVerticalLegend = function(maxPlayers){
    insertElement("line")
    (["x1", padding, "y1", 0, "x2", padding, "y2", totalHeight, "stroke-width", 1, "stroke", "black"]);
    
    var minusDecimalPoint = 0;
    if(maxPlayers > 99){
        minusDecimalPoint = 1;
    }
    
    var nrLength = maxPlayers.toString().length;
    var decimal = maxPlayers / Math.pow(10, nrLength - minusDecimalPoint);
    decimal = Math.ceil(decimal);
    var maxScaleValue = decimal * Math.pow(10, nrLength - minusDecimalPoint);
    
    if(maxPlayers < 50){
        maxScaleValue = 50;
    }
    
    var fiveScaleValues = [];
    
    for(var i=0; i<6; i++){
        fiveScaleValues[i] = (maxScaleValue / 5) * i;
    }
    fiveScaleValues.splice(0, 1);
    
    var YforPlayers = YforPlayersConvertor(maxScaleValue);
    
    // DRAW RULER
    for(var i=0; i<fiveScaleValues.length; i++){

        insertElement("rect")
        (["x", padding - 10, "y", YforPlayers(fiveScaleValues[i], 0), "width", 10, "height", 3, "fill", "red"]);
        
        var textNode = document.createTextNode(fiveScaleValues[i].toString());
        
        insertElement("text")
        (["x", padding/2, "y", YforPlayers(fiveScaleValues[i], 0)]).appendChild(textNode);
        
    }
    
    console.log('max player value: ', maxPlayers);
    console.log('max scale value: ', maxScaleValue);
    console.log('five scale values: ', fiveScaleValues);
    
    return maxScaleValue;
    
}

var drawSegment = function(x, y, width, height, color){
        console.log('draw rectangle; x=' + x + ' y=' + y + ' color: ' + color);
        insertElement("rect")
        (["x", x, "y", y, "width", width, "height", height, "fill", color]);
}

var drawTeamData = function(x, yConvertor, teamData, width, maxScaleValue){
    
    console.log('team data: ', teamData);
    
    var categoryName = "none";
    var color = "none";
    var playerCount = 0;
    var yValue = 0;
    var pixelHeight = 0;
    
    var startingPoint = 0;
    
    // categories sorted by player count;
    
    for(var i=0; i<ageCategories.length; i++){
        
        categoryName = ageCategories[i].name;
        color = ageCategories[i].color;
        playerCount = teamData[categoryName].catAmount;
        yValue = yConvertor(playerCount, startingPoint);
        pixelHeight = playersToPixels(maxScaleValue, playerCount);
        
        drawSegment(x, yValue, width, pixelHeight, color);
        
        startingPoint += pixelHeight;
    }

}

var buildTeamGraphs = function(teamsData, maxScaleValue){
    
    var teamNames = Object.keys(teamsData);
    var teamWidth = providerTeamWidth(teamNames.length);
    
    for(var i=0; i<teamNames.length; i++){
        drawTeamData(padding + teamWidth() * i, YforPlayersConvertor(maxScaleValue), teamsData[teamNames[i]],  teamWidth(), maxScaleValue);
    }
}

// CALCULATION/LOGIC HELPERS
var processData = function(players){
        
    var Category = function(name){
        return {catName : name, catAmount : 0, addAmount : function(){this.catAmount += 1;}}
    };
    
    var Team = function(name){
        return {teamName : name};
    }
    
    var allTeams = [];
    
    var registerTeam = function(teamName){
        
        if(allTeams[teamName] == null){ // register teams with 0 players in each category
            allTeams[teamName] = Team(teamName);
            
            for(var i=0; i<ageCategories.length; i++){
                allTeams[teamName][ageCategories[i].name] = Category(ageCategories[i].name);
            }
            
        }
        
    };

    for(var i=0; i<players.length; i++){
        
        registerTeam(players[i].team);
        
        for(var j=0; j<ageCategories.length; j++){
            
            if(ageCategories[j].ageCorresponds(players[i].age)){ // if player corresponds to category, ++
                
                allTeams[players[i].team][ageCategories[j].name].addAmount();
            }
            
        }
        
    };
    
    return allTeams;
}

var maxPlayersCount = function(data, teamNames){
    var maxCount = 0;
    
    var teamPlayers = 0;
    
    for(var i=0; i<teamNames.length; i++){
        teamPlayers = 0;
        
        for(var j=0; j<ageCategories.length; j++){
           teamPlayers+= data[teamNames[i]][ageCategories[j].name].catAmount;
        }
        
        if(teamPlayers > maxCount){
            maxCount = teamPlayers;
        }
    }
    
    return maxCount;
}

var drawColors = function(){
    var legend = document.getElementById("colors");
    legend.setAttribute("style", "border: 1px solid black");
    legend.setAttribute("width", totalWidth);
    legend.setAttribute("height", 50);
    
    var space = 30;
    
    for(var i=0; i<ageCategories.length; i++){
        
        text = document.createElementNS(svgNS, "text");
        var textNode = document.createTextNode(ageCategories[i].name);
        text.appendChild(textNode);    
        setAttributes(text, ["x", space, "y", 30]);
        legend.appendChild(text);
        
        rect = document.createElementNS(svgNS, "rect");
        setAttributes(rect, ["x", space, "y", 35, "width", 40, "height", 10, "fill", ageCategories[i].color]);
        legend.appendChild(rect);
     
        space += 55;
    }
    

}

// MAIN METHOD
var showGraph = function(allPlayers){
    
    this.svg = document.getElementById("graph");
    this.svg.setAttribute("style", "border: 2px solid black");
    this.svg.setAttribute("width", totalWidth);
    this.svg.setAttribute("height", totalHeight);
    
    drawColors();
    
    var processedData = processData(allPlayers);
    var teamNames = Object.keys(processedData);
    var maxPlayers = maxPlayersCount(processedData, teamNames);
    
    console.log('max players: ', maxPlayers);
    
    console.log('processed data: ', processedData);
    
    maxScaleValue = buildVerticalLegend(maxPlayers);
    
    buildTeamGraphs(processedData, maxScaleValue); // instead of maxPlayers, needs MaxScaleValues
    
    buildHorizontalLegend(teamNames);
}