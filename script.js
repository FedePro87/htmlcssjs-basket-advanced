function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function isPresent(player,players){
  for (var i = 0; i < players.length; i++) {
    if (players[i].id==player.id) {
      return true;
    }
  }
  return false;
}

function getTeams(){
  var teams=[
    {"teamName" : "Chicago Bulls", "roster": ["Rawle Alkins","Ryan Arcidiacono","Antonio Blakeney", "Kris Dunn", "Cristiano Felicio","Shaquille Harrison","Chandler Hutchison","Zach LaVine","Robin Lopez","Lauri Markkanen"]},
    {"teamName":"Boston Celtics","roster":["Aron Baynes","Jaylen Brown","PJ Dozier","Gordon Hayward","Al Horford","RJ Hunter2","Kyrie Irving","Marcus Morris","Semi Ojeleye","Terry Rozier"]},
    {"teamName":"Los Angeles Lakers","roster":["Lonzo Ball","Isaac Bonga","Reggie Bullock","Alex Caruso","Tyson Chandler","Josh Hart","Brandon Ingram","LeBron James","Kyle Kuzma","Mike Muscala","Rajon Rondo"]}
  ];
  return teams;
}

function getPlayerName(index){
  var player="";
  var teams=getTeams();
  var roster=teams[index].roster;
  player=roster[getRandom(0,9)];
  return player;
}

function getPlayer(index){
  var twoPerc=getRandom(0,100);
  var threePerc=100-twoPerc;


  var player={
    "id": getPlayerName(index),
    "points": getRandom(0,100),
    "bounce": getRandom(0,20),
    "mistake": getRandom(0,50),
    "twoPerc": twoPerc,
    "threePerc": threePerc
  }

  return player;
}

function getAllPlayers(index){
  var players=[];

  while (players.length < 10) {
    var player=getPlayer(index);
    if (!isPresent(player,players)) {
      players.push(player);
    }
  }

  return players;
}

function getTeamByName(teams,selectedTeam){
  var team;
  for (var i = 0; i < teams.length; i++) {
    if (teams[i].teamName==selectedTeam) {
      team=teams[i];
    }
  }
  return team;
}

function getIndexByTeamName(selectedTeam,teams){
  var index;

  for (var i = 0; i < teams.length; i++) {
    if (selectedTeam==teams[i].teamName) {
      index=i;
    }
  }
  return index;
}

function clearUi(){
  $("div.selection").html("");

  var idDom=$("#id > span.content");
  var pointsDom=$("#points > span.content");
  var bounceDom=$("#bounce > span.content");
  var mistakeDom=$("#mistake > span.content");
  var twoPercDom=$("#twoPerc > span.content");
  var threePercDom=$("#threePerc > span.content");

  idDom.text("");
  pointsDom.text("");
  bounceDom.text("");
  mistakeDom.text("");
  twoPercDom.text("");
  threePercDom.text("");
}

function updateUi(teams){
  clearUi();
  var teamsSelection=$("#selected-team");
  var selectedTeam=teamsSelection.val();
  var team= getTeamByName(teams,selectedTeam);
  var selectedIndex=getIndexByTeamName(selectedTeam,teams);
  var players= getAllPlayers(selectedIndex);

  var selection=$("div.selection");

  for (var i = 0; i < players.length; i++) {
    var newP= document.createElement("p");
    var selectP=$(newP);
    selectP.addClass("player");
    selectP.text(players[i].id);
    selection.append(selectP);
  }

  var playersSelect=$("p.player");
  playersSelect.click(function(){
    var me=$(this);
    var player= getPlayerById(players, me.text());
    populateSpans(player);
  });
}

function getPlayerById(players,selectedId){
  var player;
  for (var i = 0; i < players.length; i++) {
    if (players[i].id==selectedId) {
      player=players[i];
    }
  }

  return player;
}

function populateSpans(player){
  var idDom=$("#id > span.content");
  var pointsDom=$("#points > span.content");
  var bounceDom=$("#bounce > span.content");
  var mistakeDom=$("#mistake > span.content");
  var twoPercDom=$("#twoPerc > span.content");
  var threePercDom=$("#threePerc > span.content");

  idDom.text(player.id);
  pointsDom.text(player.points);
  bounceDom.text(player.bounce);
  mistakeDom.text(player.mistake);
  twoPercDom.text(player.twoPerc + "%");
  threePercDom.text(player.threePerc + "%");
}

function teamExist(team,teams){
  for (var i = 0; i < teams.length; i++) {
    if (teams[i].teamName==team) {
      return true;
    }
  }
  return false;
}

function updateList(teams){
  var datalist=$("#teams");
  for (var i = 0; i < teams.length; i++) {
    var opt=document.createElement("option");
    opt.value=teams[i].teamName;
    datalist.append(opt);
  }
}

function init(){
  var selectedTeam=$("#selected-team");
  var teams= getTeams();
  updateList(teams);
  selectedTeam.on("change",function(){
    if (teamExist(selectedTeam.val(),teams)) {
      updateUi(teams);
    }
  });
}

$(document).ready(init);
