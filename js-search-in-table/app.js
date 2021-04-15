/*
 Germans Rakitenko

 */

var lookup = {};
var recclasses = [];

for (var i in data) {
    var recclass = data[i].recclass;
    if (recclass && !(recclass in lookup)) {
        lookup[recclass] = 1;
        recclasses.push(recclass);
    }
}
recclasses.sort();


//Copy data to make Integer from string

var copydata = data;

for (var i = 0; i < data.length; i++) {
  copydata[i].year = parseInt(data[i].year).toString();
}


//Create table

function CreateTableFromJSON() {
	var mydata = copydata;
	var col = [];
	for (var i =0; i< mydata.length; i++) {
		for (var key in mydata[i]) {
			if (col.indexOf(key) === -1) {
				col.push(key);
			}
		}
	}
	var table = document.createElement("table");
	var tr = table.insertRow(-1);

	for (var i = 0; i<9; i++) {
		var th = document.createElement("th");
		th.innerHTML = col[i];
		tr.appendChild(th);
	}

	for (var i = 0; i < mydata.length; i++) {
		tr = table.insertRow(-1);
		for (var j = 0; j < 9; j++) {
			var tabCell = tr.insertCell(-1);
			tabCell.innerHTML = mydata[i][col[j]];
		}
	}

	var divContainer = document.getElementById("showdata");
	divContainer.innerHTML = "";
	divContainer.appendChild(table);
}

//Change text and show/hide button

$(document).ready(function(){
    $("th").val($(this).val().toUpperCase());
    $("th:nth-child(9)").text('Longitude');
    $("th:nth-child(8)").text('Latitude');
  });


$(document).ready(function() {
            $('#hide').click(function() {
                $('td:nth-child(8),th:nth-child(8)').toggle();
                $('td:nth-child(9),th:nth-child(9)').toggle();
            });
        });


function toggleText()  {
   var text = document.getElementById("hide").firstChild;
   text.data = text.data == "Hide coordinates" ? "Show coordinates" : "Hide coordinates";
}

//Create unique array from class

var uniquedataclass = []; 
               
        var count = 0; 
        var start = false; 
          
        for (j = 0; j < data.length; j++) { 
            for (k = 0; k < uniquedataclass.length; k++) { 
                if ( data[j].recclass == uniquedataclass[k] ) { 
                    start = true; 
                } 
            } 
            count++; 
            if (count == 1 && start == false) { 
                uniquedataclass.push(data[j].recclass); 
            } 
            start = false; 
            count = 0; 
        }
uniquedataclass.sort(); 

//Fill select options

function createselect () {
		var select = document.getElementById("class-select");
		var sloption = "<option value='0'>All Meteorites Class</option>";

 		for(var i = 0; i < uniquedataclass.length; i++) {
 		sloption += "<option value='"+uniquedataclass[i]+"'>"+uniquedataclass[i]+"</option>"
 	}
	select.innerHTML = sloption;
}

//Add class
$(document).ready(function(){
    $("table").addClass("mytable");
  });

//Digit validation
$(document).ready(function () {
  $("#year-from").keypress(function (e) {
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        $("#errmsg").html("* Input digits only (0 - 9)").show().delay(2000).fadeOut("slow");
               return false;
    }
   });
  $("#year-until").keypress(function (a) {
     if (a.which != 8 && a.which != 0 && (a.which < 48 || a.which > 57)) {
        $("#errmsg2").html("* Input digits only (0 - 9)").show().delay(2000).fadeOut("slow");
               return false;
    }
   });
});

//Table filter
$(document).ready(function() {
	 $('#show-list').click(function() {
	   	var input_year_from = parseInt( $('#year-from').val(), 10);
	   	var input_year_until = parseInt( $('#year-until').val(), 10);
	   	var today = new Date();
	   	var year_now = today.getFullYear();
	   	if (input_year_from > 0) {
		   	if (!(input_year_from >= 1700 && input_year_from <= year_now)) {
		   		$("#errmsg-range").html("* Year range must be from 1700 to current year").show().delay(2000).fadeOut("slow");
	            input_year_from = 'NaN';   
		   	}
		}
		if (input_year_until > 0) {
		   	if (!(input_year_until >= 1700 && input_year_until <= year_now)) {
		   		$("#errmsg2-range").html("* Year range must be from 1700 to current year").show().delay(2000).fadeOut("slow");
	            input_year_until = 'NaN';   
		   	}
		}
	   	var input_select = $('#class-select').val();
	   	var filter_input = input_select.toLowerCase();
	   	var input_search = $('#search').val();
	   	var filter_input_search = input_search.toLowerCase();
	  	$('.mytable tbody tr').each(function() {
	    var year = parseFloat( $('td:eq(6)', this).text() || 0); 
	    var select_row = $('td:eq(3)', this).text().toLowerCase();
	    var search_row = $('td:eq(0)', this).text().toLowerCase();
	     	if ((( isNaN( input_year_from ) && isNaN( input_year_until )) ||
	        ( isNaN( input_year_from ) && year <= input_year_until ) ||
	        ( input_year_from <= year   && isNaN( input_year_until )) ||
	        ( input_year_from <= year   && year <= input_year_until )) &&
	     	((select_row.indexOf(filter_input) > -1 && select_row == filter_input) || input_select == '0') &&
	     	(search_row.indexOf(filter_input_search) > -1))  {
	        $(this).show();
	    } else {
	        $(this).hide();
	    } 
	    $('tr:eq(0)').show();  
	   })
	});
})


