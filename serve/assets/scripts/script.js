function getBrowserWidth(){
 if (window.innerWidth){
		return window.innerWidth;}
	else if (document.documentElement && document.documentElement.clientWidth != 0){
		return document.documentElement.clientWidth;	}
	else if (document.body){return document.body.clientWidth;}
		return 0;
}

function dynamicLayout(sSize, rStep, sPer, dPer, amount) {
    var browserWidth = getBrowserWidth();
    var startSize = parseInt(sSize, 10);
    var stepSize = parseInt(rStep, 10);
    var startPercentage = parseInt(sPer, 10);
    var stepPercentage = parseInt(dPer, 10);
    var amountSteps = parseInt(amount, 10);
    if (browserWidth >= ( startSize - stepSize )) {
        document.body.style.fontSize = String(startSize) + "%";
    }
    var i = 0;
    for (i = 1; i <= amountSteps; i++) {
        if (browserWidth < (startSize - (i * stepSize))) {
            var newPercentage = startPercentage - (i * stepPercentage);
            document.body.style.fontSize = String(newPercentage) + "%";
        }
        return true;
    }
}