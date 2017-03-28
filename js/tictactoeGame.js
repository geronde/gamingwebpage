$(document).ready(function() {	
Controller.initGame(Model);
//View.WinOrTieMessage('test','test');
});

//Controller.initGame(Model);
//document.getElementById("#wrapper").appendChild( Controller.view );


//--------------------------------------------------------------View

var View= {

//create the grid 

createGrid:function() {

var grid=document.querySelector("#gameContainerTTT");

grid.innerHTML='';
	for(var i=1; i<=9;i++) {

		grid.innerHTML += '<div id="g_c'+ i +'"></div>'
	}

},
 WinOrTieMessage:function(dialog,gameCase) {
	var $dialog=$('<div id="message" title="'+gameCase+'"><p>'+ dialog +'</p></div>');
	$($dialog).appendTo('#gameContainerTTT');
	
	$("#message").dialog({

    position: {my: 'top-55', at: 'center+60'},
    show: 'blind',
    hide: 'blind',
    width: 500, 
    height:100,   
    
});
}


};

//--------------------------------------------------------------Model

var Model= {
	
players: [ {name:'player1',symbol:"X",fields:[]},{name:"player2", symbol:"O",fields:[]}],

gameturn:0,

currentPlayer:{},

winscenarios: [
    ["g_c1","g_c2","g_c3"],["g_c4","g_c5","g_c6"],["g_c7","g_c8","g_c9"],
    ["g_c1","g_c5","g_c9"],["g_c7","g_c5","g_c9"],["g_c1","g_c4","g_c7"],
    ["g_c2","g_c5","g_c8"],["g_c3","g_c6","g_c9"]
  ],
init:function() {
	Model.gameturn=1;
	Model.players[0].fields=[];
	Model.players[1].fields=[];
	Model.currentPlayer=Model.players[0];
},

nextTurn:function(){
	//assign next player
	Model.currentPlayer=Model.players[Model.gameturn % 2];
	//save game state
	Model.gameturn+=1;
},

checkForWin:function() {
	var fields=Model.currentPlayer.fields;
	//check if the players fields matches the wining scenarios
    for(var i=Model.winscenarios.length;i--;) {
    	if(Model.winscenarios[i].intersection(fields).length==3) {

    	//alert(Model.currentPlayer.name+' wins!');
    	View.WinOrTieMessage(''+Model.currentPlayer.name+' won!',"Message");

    	$('.gameb').show();
    	$('#gameContainerTTT').find('div').off('click');


    }    	
    
    }
    },
    

checkForTie:function() {
var boardArray=Model.players[0].fields.concat(Model.players[1].fields);
if(boardArray.length==9) {
	
	View.WinOrTieMessage("Tie!","Message");
   $('.gameb').show();
}
},


restartBoard:function() {
$('#replay_TicTacToe').click(function() {
	$('#gameContainerTTT > div').css('background-image','transparent');
	$('#gameContainerTTT').empty();
	Controller.initGame();
});
}



};


//-------------------------------------------------------------Controller
var Controller= {


initGame:function(game) {

//initiate players
Model.init();

//link Model to Controller
Controller.model=game;
//creating the view
Controller.view=View.createGrid();
$('.gameb').hide();
$('#gameContainerTTT').find('div').one('click', function() {
	

	var div=this.id
	Controller.action(div);
	

});

},

action:function(someId) {

var gridDiv='#'+someId;
var game=Controller.model;
var player=Model.currentPlayer;


	if(player==Model.players[0]) { $(gridDiv).addClass('cross');}
        
    else if(player==Model.players[1]){ $(gridDiv).addClass('nought');}


player.fields.push(someId);
Model.checkForWin();
Model.nextTurn();
Model.checkForTie();
Model.restartBoard();
},



};


Array.prototype.intersection = function(arr) {
    return this.filter(x => arr.indexOf(x) > -1)
};









