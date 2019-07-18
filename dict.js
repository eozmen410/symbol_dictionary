var active_type = "none";
var verbCount = 0;
var nounCount = 0;
var adjCount = 0;
var allCount = 0;
var concepts = [];

var events = ['winter', 'summer', 'spring', 'fall','christmas', 'new years', 'halloween', 'easter','4th of july','valentines day','hanukkah', 'chinese new years','super bowl', 'day of the dead','st patricks day', 'ramadan','mother\'s day', 'father\'s day','thanksgiving','cinco de mayo']
$(document).ready(function() {
    console.log("document ready, all_data:");
    $("#search_in").css('visibility', 'visible')
    $("#search_btn").css('visibility', 'visible')

    console.log(all_data);
    console.log(concepts)
    loadHome(Object.keys(all_data))
    loadNavBar();
    console.log(concepts)
    // $("#bar").css('display', 'none')
    load_concepts_array()
    // loadImages("img_grid", active_type);

    var hash = window.location.hash;
		// $('#myTab a[href="' + hash + '"]').tab('show');
    if (hash.length > 1) {
        console.log(hash)
        $("#search_in").css('visibility', 'hidden')
        $("#search_btn").css('visibility', 'hidden')
        var w_id = hash.split('_')[0]
        w_id = w_id.substr(1)
        console.log(w_id)
        setActive(w_id)
    }

    // display_symbols(active_type)

    $("#header").click(function(){
        $("#search_in").css('visibility', 'visible')
        $("#search_btn").css('visibility', 'visible')
        console.log('clicked on home')
        // $("#btns").removeClass('invisible')
        $("#btns").hide()
        $("#search_btns").empty()
        loadHome(Object.keys(all_data))
        active_type="none"
        window.location.href = '#'
        // loadImages("img_grid", active_type);
        // display_symbols(active_type)
    })

    $("#search_btn").click(function(){
        // console.log($("#search_in").val())
        var input =$("#search_in").val() 
        console.log(input)
        search(input)
    })

    $("#search_in").keyup(function(){

        var input =$("#search_in").val() 
        console.log(input)
        search(input)
    })

    $("#extra_1").click(function(){
        changeArrow(1)
    });

    $("#extra_2").click(function(){
        changeArrow(2)
    });

    $("#extra_3").click(function(){
        changeArrow(3)
    });
    //add hash val load images
});

function changeArrow(i){
        if ($("#extra"+i).hasClass('glyphicon-triangle-right')) {
            $("#extra" + i).removeClass('glyphicon-triangle-right')
            $("#extra"+ i).addClass('glyphicon-triangle-bottom')
        }  else {
            $("#extra"+i).removeClass('glyphicon-triangle-bottom')
            $("#extra"+i).addClass('glyphicon-triangle-right')
        }   
    // $("#extra").toggleClass('glyphicon-arrow-right').toggleClass('glyphicon-arrow-left');

}


function search(word) {
    window.location.href = '#'
    var matching = []
    for (var i=0; i<concepts.length;i++) {
        var name = concepts[i]['concept']
        if(name.includes(word)){
            console.log(name)
            // matching.push(concepts[i])
            matching.push(concepts[i]['id'])
        }
    }

    console.log(matching)
    // load_search_results(matching)
    loadHome(matching)

}


function load_concepts_array() {
    for (var key in all_data) {
        var name = all_data[key]['concept_name'];
        concepts.push({'concept': name, 'id':key})
    }
}

function empty_concepts() {
    $("#verb_btns").empty()
    // $("#verb_btns").append('<div align="center" class="col-header">Verbs</div><br>')
    $("#noun_btns").empty()
    // $("#noun_btns").append('<div align="center" class="col-header">Nouns</div><br>')
    $("#adjective_btns").empty()
    // $("#adjective_btns").append('<div align="center" class="col-header">Adjectives</div><br>')
    $("#events_btns").empty()
    // $("#events_btns").append('<div align="center" class="col-header">Events</div><br>')
}

function loadHome(arr) {
    $("#img_div").hide()
    $("#btns").show()
    console.log(arr)
    $("#verb_btns").empty()
    $("#verb_btns").append('<div align="center" class="col-header">Verbs</div><br>')
    $("#noun_btns").empty()
    $("#noun_btns").append('<div align="center" class="col-header">Nouns</div><br>')
    $("#adjective_btns").empty()
    $("#adjective_btns").append('<div align="center" class="col-header">Adjectives</div><br>')
    $("#events_btns").empty()
    $("#events_btns").append('<div align="center" class="col-header">Events</div><br>')
    

    // $("#btns").empty()
    for (var i in arr) {
        var id = arr[i];
        var key = arr[i]
        var name = all_data[key]['concept_name'];
        // console.log(name)
        var pos = all_data[key]['partOfSpeech'];
        var link = id + '_' + name;
        var btn = $("<button class='btn homeBtn'>"+ capitalFirstLetter(name) + "</button>")
        $(btn).attr('id', id)
        $(btn).data('name', name)
        $(btn).attr('href', '#'+link)
        $(btn).click(function(){
             $("#search_in").css('visibility', 'hidden')
             $("#search_btn").css('visibility', 'hidden')
            setActive(this.id)
            $("#btns").hide()
            empty_concepts()
            window.location.href = $(this).attr('href')//'#' + $(this).attr('id') + '_' + $(this).data('name')
        })
        var btndiv = $("<div class='row'>")
        $(btndiv).append(btn)
        var pos = '#'+ pos + '_btns';
        if (events.includes(name.toLowerCase())){
            pos = "#events_btns"
        }
        $(pos).append(btndiv);
    }
}


function loadNavBar() {
    console.log("loading navbar...");
    Object.keys(all_data).forEach(function(key, index) {
        var id = key;
        var name = all_data[key]['concept_name'];
        console.log(name)
        var pos = all_data[key]['partOfSpeech'];
        addConcept(id, name, pos);
    })
    $('#verbDropdown').html("Verbs (" + verbCount + ")");
    $('#nounDropdown').html("Nouns (" + nounCount + ")");
    $('#adjDropdown').html("Adjectives (" + adjCount + ")");
    // $('#allDropdown').html("All (" + allCount + ")");
}

function addConcept(id, name, partOfSpeech) {
    var link = id + '_' + name;
    console.log("adding dropdown concept: " + name);
    var conceptOption = $("<a class='dropdown-item text-light' href='#"+link+"'>"+capitalFirstLetter(name)+"</a>");
    $(conceptOption).attr('id',  id);
    $(conceptOption).click(function() {
        console.log(this.id);
        $("#btns").hide()
        // $("#btns").addClass('invisible')
        // $("#search_btns").empty()
        empty_concepts()
        $("#search_in").css('visibility', 'hidden')
        $("#search_btn").css('visibility', 'hidden')
        setActive(this.id)
    })
    var pos = '#'+ partOfSpeech + 's';
    $(pos).append(conceptOption);
    updateCount(partOfSpeech);
    //to add the concept to the dropdown menu for its part of speech, need to make a deep copy first
    // var concept_obj = conceptOption.clone();
    // $(pos).append(concept_obj);
    //update the count for each part of speech so it can be displayed
    
}


function updateCount(pos) {
    allCount++;
    if (pos == 'verb') {
        verbCount++;
    } else if (pos == 'noun') {
        nounCount++;
    } else if (pos == 'adjective') {
        adjCount++;
    }
}

//helper function to easily format names
function capitalFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

// function loadImages(table_id, id) {
//     console.log('creating image grid...')
//     console.log(id)
//     $("#images").show()
//     if (id !== "none") {
//         $("#message").show()
//         var symbol_list = all_data[id]["symbols"]
//         var count = 0;
//         var concept = all_data[id]["concept_name"]
//         concept =  capitalFirstLetter(concept);
//         // clear table first.
//         $('#' + table_id + ' tr').remove();
//         var table = document.getElementById(table_id);
//         row_num = 0;
//         var row = table.insertRow(row_num);
//         cell_num = 0;
//         for (i = 0; i < symbol_list.length; i++) {
//                         console.log(symbol_list.length)
//                         if(symbol_list[i]["deleted"].valueOf() === "False" ){
//             url = symbol_list[i]["imageURL"]
//             search_term = symbol_list[i]['term']
//             cell = row.insertCell(-1);
//             html = '<div class=\"parent\"> <img src=\"' + url + '\"/> <div  class=\"info\">' + search_term + '</div>';

//             // html = '<div class=\"parent\"> <img style=\'width: 350px; border: 2px solid white; padding: 3px; margin: 2px;\' src=\"' + url + '\"/> <div  class=\"info\">' + search_term + '</div>';

//             cell.innerHTML = html;
//                             count++;
//                         }
//             // make new row
//             if ((count ) % 3 == 0) {
//                 row_num = row_num + 1;
//                 row = table.insertRow(row_num);
//             }
//         }
//         $("#symbolType").html(" [" + all_data[id]['partOfSpeech'] + "]")
//         $("#symbolCount").html("# of symbols: " + count);
//         $("#conceptName").html(concept);
//     } else {
//         $('#' + table_id + ' tr').remove();
//         $("#message").hide()
//         $("#symbolCount").html("");
//         $("#conceptName").html("Pick a concept to start!");
//     }
// }

function display_symbols(id) {
    $("#img_div").show()
    $("#btns").hide()
    $("#images").empty()
    var total = 0
    var symbol_list = all_data[id]["symbols"]
    for (i = 0; i < symbol_list.length;) {
        var counter = 0;
        var imgRow = $("<div>")
        $(imgRow).addClass("row")
        $(imgRow).addClass("gridrow")
    
        while (i < symbol_list.length && counter < 5) {
    
          //if the symbol obj's deleted field is not True, display it
          if (symbol_list[i]["deleted"].valueOf() == "False".valueOf()) {
            symbol_added = true;
            symbol_url = symbol_list[i]["imageURL"];
    
            var caption = $("<div>")
            
            var search_term = String(symbol_list[i]["term"]);
            $(caption).html(search_term)
            $(caption).addClass("term")
            var term = $("<div>")
            $(term).append(search_term)
            $(term).addClass("term")
         
            var symbol = $("<div>")
            $(symbol).addClass("col-md-2")
            $(symbol).addClass("gridcolumns")
            // wrap.append(symbol)
            var symbol_img = $("<img>")
            $(symbol_img).attr('src', symbol_url)
            $(symbol_img).addClass("symbol")
            $(symbol).append(symbol_img)
            $(symbol).append(term)
            $(imgRow).append(symbol)
    
            counter++;
            total++;
          }
          i++;
        }
        // console.log(imgRow)
        $("#images").append(imgRow)
      }

      if(total == 1)
      {
        $("#symbolCount").empty()
        $("#symbolCount").append("<div style='display: inline-block; vertical-align: middle;'> " +total + " symbol for this concept</div>")
      }
      else if (total > 1){
        $("#symbolCount").empty()
        $("#symbolCount").append("<div style='display: inline-block; vertical-align: middle;'> " +total + " symbols for this concept</div>")
      }    
      $("#symbolType").html(" [" + all_data[id]['partOfSpeech'] + "]")
      //         $("#symbolCount").html("# of symbols: " + count);
      var concept = all_data[id]["concept_name"]
      $("#conceptName").html(concept);
}

function setActive(uid) {
    active_type = uid;
    // loadImages("img_grid",active_type);
    display_symbols(uid)
}	