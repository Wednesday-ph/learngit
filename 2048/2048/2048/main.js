documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
gridCellSpace = 0.04*documentWidth;
gridCellWidth = 0.18*documentWidth;


var board = new Array();
var score = 0;
var hasConflicted = new Array();

 $(document).ready(function(){
	prepareForMobile();
	newgame();
});

function prepareForMobile(){
	if(documentWidth > 500){
		gridContainerWidth = 500;
		gridCellWidth = 100;
		gridCellSpace = 20;
	}

	$('#gridContainer').css('width',gridContainerWidth - 2 * gridCellSpace);
	$('#gridContainer').css('height',gridContainerWidth - 2 * gridCellSpace);
	$('#gridContainer').css('padding',gridCellSpace);

	$('.gridCell').css('width',gridCellWidth);
	$('.gridCell').css('height',gridCellWidth);
	$('.gridCell').css('border-radius',0.06*gridCellWidth);

}

function newgame(){
	init();
	generateOneNumber();
	generateOneNumber();
}

function init(){
	for(var i = 0; i < 4; i++){
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for(var j = 0; j < 4; j++){
			hasConflicted[i][j] = false;
			board[i][j] = 0;
			var gridCell = $('#grid-cell-'+i+'-'+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}

	updateNumberView();
	score = 0;
}

function updateNumberView(){
	$('.numberCell').remove();
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			//$("#gridContainer").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
			$('#gridContainer').append('<div class="numberCell" id="number-cell-'+i+'-'+j+'"></div>');
			var numberCell = $('#number-cell-'+i+'-'+j);
			if(board[i][j] == 0){
				numberCell.css('width','0px');
				numberCell.css('height','0px');
				numberCell.css('top',getPosTop(i,j)+gridCellWidth/2);
				numberCell.css('left',getPosLeft(i,j)+gridCellWidth/2);
			}else{
				numberCell.css('width',gridCellWidth);
				numberCell.css('height',gridCellWidth);
				numberCell.css('top',getPosTop(i,j));
				numberCell.css('left',getPosLeft(i,j));
				numberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				numberCell.css('color',getNumberColor(board[i][j]));
				numberCell.text(board[i][j]);
				numberCell.css('font-size',0.4*gridCellWidth+'px');
				numberCell.css('line-height',gridCellWidth+'px');
				numberCell.css('border-radius',0.06*gridCellWidth+'px');
			}
			hasConflicted[i][j] = false;
		}
	}
	
	
}



function generateOneNumber(){
	if(!nospace(board)){
		var randx = parseInt(Math.floor(Math.random()*4));
		var randy = parseInt(Math.floor(Math.random()*4));

		var times = 0;
		while(times < 50){
			if(board[randx][randy] == 0){
				break;
			}
			randx = parseInt(Math.floor(Math.random()*4));
			randy = parseInt(Math.floor(Math.random()*4));
			times++;
		}

		if(times == 50){
			for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				if(board[i][j] == 0){
					randx = i;
					randy = j;
				}
			}
		}
		}

		var randNumber = Math.random()<0.5 ? 2 : 4;
		board[randx][randy] = 1024;
		//showNumberWithAnimation(randx,randy,randNumber);
		updateNumberView();
	}
	
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37:
			event.preventDefault();
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
				setTimeout("isGameWon()",350);
			}
		break;

		case 38:
			event.preventDefault();
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
				setTimeout("isGameWon()",350);
			}
		break;

		case 39:
			event.preventDefault();
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
				setTimeout("isGameWon()",350);
			}
		break;

		case 40:
			event.preventDefault();
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
				setTimeout("isGameWon()",350);
			}
		break;

		default:
		break;

	}
});

document.addEventListener('touchstart',function(event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

document.addEventListener('touchmove',function(event){
	event.preventDefault();
});

document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	
	var triglex = endx - startx;
	var trigley = endy - starty;

	if(Math.abs(triglex) < 0.3 * documentWidth && Math.abs(trigley) < 0.3 * documentWidth){
		return;
	}

	if(Math.abs(triglex) >= Math.abs(trigley)){
		if(triglex > 0){
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
				setTimeout("isGameWon()",350);
			}
			
		}else{
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
				setTimeout("isGameWon()",350);
			}		
		}
	}else{
		if(trigley > 0){
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
				setTimeout("isGameWon()",350);
			}
		}else{
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
				setTimeout("isGameWon()",350);
			}
		}
	}
});

function isGameOver(){
	if(nospace(board) && nomove(board)){
		alert("Game Over!");
	}
}

function isGameWon(){
	for(var i = 0; i < 4; i ++){
		for(var j = 0; j < 4; j ++){
			if(board[i][j] == 2048){
				alert("2048! YOU WON!")
			}
		}
	}
}

function moveLeft(){
	if(!canMoveLeft){
		return false;
	}

	for(var i = 0; i < 4; i++){
		for(var j = 1; j < 4; j++){
			if(board[i][j] != 0){
				for(var k = 0; k < j; k ++){
					if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
						showNumberMove(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
						showNumberMove(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						hasConflicted[i][k] = true;
						score += board[i][k];
						updateScore(score);
					}
				}
			}
		}
	}
	
	setTimeout("updateNumberView()",200);
	return true;

}


function moveRight(){
	if(!canMoveRight){
		return false;
	}

	for(var i = 0; i < 4; i++){
		for(var j = 2; j > -1; j--){
			if(board[i][j] != 0){
				for(var k = 3; k > j; k --){
					if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
						showNumberMove(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
						showNumberMove(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						updateScore(score);
						hasConflicted[i][k] = true;
					}
				}
			}
		}
	}
	
	setTimeout("updateNumberView()",200);
	return true;

}



function moveDown(){
	if(!canMoveDown){
		return false;
	}

	for(var j = 0; j < 4; j++){
		for(var i = 2; i > -1; i--){
			if(board[i][j] != 0){
				for(var k = 3; k > i; k --){
					if(board[k][j] == 0 && noBlockVertical(j,k,i,board)){
						showNumberMove(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
					}else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
						showNumberMove(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						updateScore(score);
						hasConflicted[k][j] = true;
					}
				}
			}
		}
	}
	
	setTimeout("updateNumberView()",200);
	return true;

}

function moveUp(){
	if(!canMoveUp){
		return false;
	}

	for(var j = 0; j < 4; j++){
		for(var i = 1; i < 4; i++){
			if(board[i][j] != 0){
				for(var k = 0; k < i; k ++){
					if(board[k][j] == 0 && noBlockVertical(j,i,k,board)){
						showNumberMove(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
					}else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
						showNumberMove(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						updateScore(score);
						hasConflicted[k][j] = true;
					}
				}
			}
		}
	}
	
	setTimeout("updateNumberView()",200);
	return true;

}
