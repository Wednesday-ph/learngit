function showNumberWithAnimation(randx,randy,randNumber){
	var numberCell = $('#number-cell-'+randx+'-'+randy);
	numberCell.css('color',getNumberColor(randNumber));
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.text(randNumber);

	numberCell.animate({
		width:gridCellWidth,
		height:gridCellWidth,
		top:getPosTop(randx,randy)+'px',
		left:getPosLeft(randx,randy)+'px'
	},50);
}

function showNumberMove(fromx,fromy,tox,toy){
	var numberCell = $('#number-cell-'+fromx+'-'+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}
