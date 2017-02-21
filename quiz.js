var storedData = localStorage.getItem("fragen");
if (storedData) {
    var fragen = JSON.parse(storedData);
	console.log("daten geladen!");
} else {
			var fragen = [
  ["Frage 1", "Antwort 1", 0, 0],
  ["Frage 2", "Antwort 2", 0, 0],
  ["Frage 3", "Antwort 3", 0 , 0]
]; console.log("daten nicht geladen!");

	}
	
	

var tombola = new Array(0);

	var frageindex;
var rnd;

window.onload=filltombola();
window.onload=newQuestion;


function filltombola(){
	
	tombola.length=0;
	
	var i;
	for (i = 0; i < fragen.length; i++)
	{
	
		var richtig=fragen[i][3];
		var gesamt=fragen[i][2];
		var falsch=gesamt-richtig;
		if (gesamt>0){
			var quote = richtig/gesamt;
		} else {
			quote=0;
		}
	
		if (gesamt>2 && quote>0.75) {
			
		} else {
				if (falsch>0) {
				var j;
				for (j=0; j<falsch+1;j++)
				{
					tombola.push(i);
				}
			} else {
				tombola.push(i);
			}
			}
			
	}
	
}

function newQuestion(){
filltombola();
rnd = Math.floor((Math.random() * tombola.length)); 
frageindex = tombola[rnd];

if (fragen[frageindex]==undefined)
{	
	frageauswahl = "Keine Fragen mehr übrig!";
	console.log("keine Frage übrig");

} else {
	var frageauswahl = fragen[frageindex][0];
}

document.getElementById("frage").innerHTML = frageauswahl;
document.getElementById("antwort").innerHTML = " ";

console.log(fragen);
console.log(tombola);

localStorage.setItem("fragen",  JSON.stringify(fragen));
}

function showAnswer(){
	if (fragen[frageindex]==undefined)
{	
var antwortauswahl = "";
} else {
var antwortauswahl = fragen[frageindex][1];
document.getElementById("antwort").innerHTML = antwortauswahl;
}
}

function enterNewQuestion(){
	var frageExists = document.getElementById('frageinput');
		
	if (frageExists === null){
    var frage = document.createElement("INPUT");
    frage.setAttribute("type", "text");
    frage.setAttribute("value", "Frage eingeben");
	frage.setAttribute("id", "frageinput");
    document.body.appendChild(frage);
	
    var antwort = document.createElement("INPUT");
    antwort.setAttribute("type", "text");
    antwort.setAttribute("value", "Antwort eingeben");
	antwort.setAttribute("id", "antwortinput");
    document.body.appendChild(antwort);
	
	
	var submitq = document.createElement("button");
	var submittext = document.createTextNode("Submit Question!");      
	submitq.appendChild(submittext);                                	
	submitq.setAttribute("class", "button");
	submitq.setAttribute("id", "submitinput");
	submitq.setAttribute("onclick", "submitNewQuestion()")
    document.body.appendChild(submitq);
	} else {
	 var frage = document.getElementById("frageinput");
	 var antwort = document.getElementById("antwortinput");
	 var submitq = document.getElementById("submitinput");
	document.body.removeChild(frage);
	document.body.removeChild(antwort);
	document.body.removeChild(submitq);
	}
	
	
}


function gewusst(){
	if (fragen[frageindex]==undefined){
		
	} else {
		fragen[frageindex][2]+=1;
	fragen[frageindex][3]+=1;
	newQuestion();
	}
	
}

function nichtgewusst(){
	if (fragen[frageindex]==undefined){
		
	} else {
		fragen[frageindex][2]+=1;
	newQuestion();
	}
	
}

function submitNewQuestion(){
	var frage = document.getElementById("frageinput").value;
	var antwort = document.getElementById("antwortinput").value;	
	var faarray =[frage,antwort,0,0]
	fragen.push(faarray);
}

function export_Excel() {
    var lineArray = [];
    fragen.forEach(function (infoArray, index) {
       var line = infoArray.join(";");
       lineArray.push(index == 0 ? line : line);
    });
    var csvContent = lineArray.join("\n");
    var excel_file = document.createElement('a');
    excel_file.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    excel_file.setAttribute('download', 'example.csv');
    document.body.appendChild(excel_file);
    excel_file.click();
    document.body.removeChild(excel_file);
}


        $(document).ready(function() {
      if(isAPIAvailable()) {
        $('#files').bind('change', handleFileSelect);
      }
    });
    function isAPIAvailable() {
      // Check for the various File API support.
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        return true;
      } else {
        // source: File API availability - http://caniuse.com/#feat=fileapi
        // source: <output> availability - http://html5doctor.com/the-output-element/
        document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
        // 6.0 File API & 13.0 <output>
        document.writeln(' - Google Chrome: 13.0 or later<br />');
        // 3.6 File API & 6.0 <output>
        document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
        // 10.0 File API & 10.0 <output>
        document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
        // ? File API & 5.1 <output>
        document.writeln(' - Safari: Not supported<br />');
        // ? File API & 9.2 <output>
        document.writeln(' - Opera: Not supported');
        return false;
      }
    }
	
    function handleFileSelect(evt) {
      var files = evt.target.files; // FileList object
      var file = files[0];
      // read the file metadata
      var output = ''
          output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
          output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
          output += ' - FileSize: ' + file.size + ' bytes<br />\n';
          output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '<br />\n';
	  
	  // read the file contents
      printTable(file);
      // post the results
      $('#list').append(output);
	
	}
	
     function printTable(file) {
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(event){
        var csv = event.target.result;
        var data = $.csv.toArrays(csv, {'separator':';'});
       console.log(data);
        
		fragen=data;
       
      };
      reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
    }
	
jQuery(document).ready(function(){
        jQuery('#hideshow').on('click', function(event) {        
             jQuery('#submitbox').toggle('show');
        });
		jQuery('#submitinput').on('click', function(event) {        
             jQuery('#submitbox').toggle('show');
        });
    });
	
	
window.addEventListener("beforeunload", function () {
	
// Store
localStorage.setItem("fragen",  JSON.stringify(fragen));
	

});