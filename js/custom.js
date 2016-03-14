/*
* @Author: sahildua2305
* @Date:   2016-03-14 20:53:44
* @Last Modified by:   sahildua2305
* @Last Modified time: 2016-03-14 23:42:40
*/


var timer, cursorTimer;

function type(t) {
	t.addText({"keyCode": 123748});
	if(t.index > t.text.length){
		clearInterval(timer);
		clearInterval(cursorTimer);

		// click handler for #first link
		$("#first").click(function(){
			console.log("first clicked");
			$("#console").html("");

			typeFile("first.txt", 6);
		});

		// click handler for #second link
		$("#second").click(function(){
			console.log("second clicked");
			$("#console").html("");

			typeFile("second.txt", 6);
		});

		// click handler for #third link
		$("#third").click(function(){
			console.log("third clicked");
			$("#console").html("");

			typeFile("third.txt", 6);
		});

		// click handler for #back link
		$("#back").click(function(){
			console.log("back clicked");
			$("#console").html("");

			typeFile("intro.txt", 9);
		});
	}
}

function typeFile(filename, speed){

	var Typer = {	
		text: null,
		index: 0,
		speed: 2,
		file: "",

		init: function(){
			cursorTimer = setInterval(function(){
				Typer.updLstChr();
			}, 500);

			$.get(Typer.file, function(data){
				Typer.text = data;
				Typer.text = Typer.text.slice(0, Typer.text.length -  1);
			});
		},

		content: function(){
			return $("#console").html();
		},

		write: function(str){
			$("#console").append(str);
			return false;
		},

		addText: function(key){
			if(Typer.text){
				var cont = Typer.content();
				if(cont.substring(cont.length - 1, cont.length) == "|"){
					$("#console").html($("#console").html().substring(0, cont.length - 1));
				}

				Typer.index += Typer.speed;
				var text = Typer.text.substring(0, Typer.index);
				var rtn = new RegExp("\n", "g");
				$("#console").html(text.replace(rtn,"<br/>"));
				window.scrollBy(0,50);
			}
		},
	 
		updLstChr: function(){
			var cont = this.content();

			if(cont.substring(cont.length - 1, cont.length) == "|"){
				$("#console").html($("#console").html().substring(0,cont.length-1));
			}
			else{
				this.write("|");
			}
		},
	};
	
	Typer.speed = speed;
	Typer.file = filename;
	Typer.init();
	
	timer = setInterval(function(){
		type(Typer);
	}, 40);
}



$(document).ready(function(){

	

	typeFile("intro.txt", 6);

});
