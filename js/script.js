
var data={"buttons":[41,38,-24,-13],"bars":[89,51,65,35],"limit":130};// api data

//var sampleData1 = {"buttons":[41,38,-24],"bars":[89,51,65,35],"limit":100}; //100% view of data

// Wrong Limit data
//var data={"buttons":[41,38,-24,-13],"bars":[89,51,65,35],"limit":0}; //data sample with 0 limit
//var data={"buttons":[41,38,-24,-13],"bars":[89,51,65,35],"limit":-130};// data sample with negative limit
//var data={"buttons":[41,38,-24,-13],"bars":[89,51,65,35]}; //when limit is missing

//Wrong Bars data
//var data={"buttons":[41,38,-24,-13],"bars":[89,51,-65,35]}; //when bar value is negative
//var data={"buttons":[41,38,-24,-13],"limit":130};// api data without bars

//Wrong Buttons data
//var data={"bars":[89,51,65,35],"limit":130};// api data

function formBuilder(){
	var divError = document.getElementById("errorHandling"); 
		
//console.log(data.buttons.length);
if(data.buttons == undefined){  //buttons missing in JSON from api
		divError.innerText="Buttons data not found in API \n";
	}
	else{
		for(i=0;i<data.buttons.length;i++){
			var dataVal = data.buttons[i];
			var btn = document.createElement("BUTTON"); 
			btn.id="btn"+data.buttons[i];
			btn.className ="custome";
			btn.innerHTML = dataVal; 
			document.getElementById("btnHolder").appendChild(btn);
			}
}
	
//console.log(data.bars.length);
if(data.limit>0){ // check if limit is positive number	
	//bind bars from api into select box
	if(data.bars == undefined){  //check if bars missing in JSON from api
		divError.innerText="Bars data not found in API \n";
	}
	else{
	var selecter = document.createElement("SELECT");
	selecter.id="barController";
	document.getElementById("btnHolder").appendChild(selecter);
	
	for(i=0;i<data.bars.length;i++){
		if(data.bars[i]>0){ //check if -ive value inserted via api
	var selectController = document.getElementById("barController");	
	var option = document.createElement("OPTION");
	option.innerHTML = "Progress Bar "+[i+1];
    option.value = 'bar'+data.bars[i]; 
	//Add the Option element to DropDownList.
	selectController.options.add(option);
	
	//bind bars from api for view
	var divParent = document.createElement("DIV"); 
	divParent.id="barParent"+data.bars[i];
	divParent.className ="myProgress";
	
	var divChild = document.createElement("DIV");
	divChild.id="bar"+data.bars[i];
	divChild.className ="myBar";
	divChild.style.width =(data.bars[i]*100/data.limit)+'%';
	divChild.innerHTML = data.bars[i]; 
	document.getElementById("barContainer").appendChild(divParent);	
	document.getElementById("barParent"+data.bars[i]).appendChild(divChild);
		}
		else{
			divError.innerText="One of the bars content is negative in API \n";
		}
	}	
	}
}
else if(data.limit == undefined){ //limit missing in api
	divError.innerText="Limit is not provided in API \n";
}
else{ //negative limit
	divError.innerText+="Limit is incorrect in API \n";
}
	
var btns = document.getElementsByClassName("custome");
for (var j = 0; j < btns.length; j++) {
    (function () {
        var valueHere = btns[j].id.slice(3);
        btns[j].addEventListener("click", function() { btnClicked(valueHere); }, false);
		}());
	}
	}

function btnClicked(btnNumber) {
var e = document.getElementById("barController");
var getSelected = e.options[e.selectedIndex].value;

var elem = document.getElementById(getSelected);  
//console.log(elem.style.width); 
var width = parseInt(elem.innerText);
var getSign = Math.sign(btnNumber);
console.log(getSign+" "+width+" "+btnNumber+" "+(width+parseInt(btnNumber)));
var checkforZero=false;
if(getSign.toString()=="-1"){ // check if button clicked was a negative number
	if(width+parseInt(btnNumber)<=0){ //btnNumber is already negative (postivieNum + (-negativeNum))
	checkforZero=true;

	}
	else{
		checkforZero=false;
	}
}
console.log(checkforZero);
if(!checkforZero){
elem.style.width = (((width+ parseInt(btnNumber))*100)/data.limit) + '%';
var newFiller= parseInt(width)+parseInt(btnNumber);
  document.getElementById(getSelected).innerText= newFiller;
  if (parseInt(newFiller) > data.limit) {elem.style.backgroundColor  = "red";}
  else{elem.style.backgroundColor  = "#56aab8";}
  }
}