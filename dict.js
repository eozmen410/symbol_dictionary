var active_type = "none";
var verbCount = 0;
var nounCount = 0;
var adjCount = 0;
var allCount = 0;
var concepts = [];
$(document).ready(function() {
    console.log("document ready, all_data:");
    console.log(all_data);
    console.log(concepts)
    loadHome()
    loadNavBar();
    console.log(concepts)
    // $("#bar").css('display', 'none')
    loadImages("img_grid", active_type);

    $("#home").click(function(){
        console.log('clicked on home')
        $("#btns").removeClass('invisible')
        // loadHome()
        active_type="none"
        loadImages("img_grid", active_type);
    })

    $("#search_btn").click(function(){
        // console.log($("#search_in").val())
        var input =$("#search_in").val() 
        console.log(input)
        search(input)
    })
});


function search(word) {
    
    var matching = []
    for (var i=0; i<concepts.length;i++) {
        var name = concepts[i]['concept']
        if(name.includes(word)){
            console.log(name)
            matching.push(concepts[i])
        }
    }
    console.log(matching)
    load_search_results(matching)

}

function load_search_results(arr) {
    // $("verb_btns").empty()
    // $("noun_btns").empty()
    // $("adjective_btns").empty()
    $("#btns").addClass('invisible')
    $("#search_btns").empty()
    $("#search_btns").removeClass('invsible')
    // $("#search_btns").removeClass('invsible')
    setActive("none")
    for(var i=0; i<arr.length;i++) {
        var id = arr[i]['id'];
        var name = arr[i]['concept'];
        var pos = all_data[id]['partOfSpeech'];
        var link = id + '_' + name;
        var btn = $("<button class='btn btn-secondary homeBtn'>"+ capitalFirstLetter(name) +" ("+pos+")"+ "</button>")
        $(btn).attr('id', id)
        $(btn).attr('href', '#'+link)
        $(btn).click(function(){
            setActive(this.id)
            $("#search_btns").empty()
            // $("#bar").css('display', 'block')
        })
        var btndiv = $("<div class='row'>")
        $(btndiv).append(btn)
        $("#search_btns").append(btndiv)
    }
}

function loadHome() {
    $("verb_btns").empty()
    $("noun_btns").empty()
    $("adjective_btns").empty()
    // $("btns").empty()
    Object.keys(all_data).forEach(function(key, index) {
        var id = key;
        var name = all_data[key]['concept_name'];
        concepts.push({'concept': name, 'id':id})
        // console.log(name)
        var pos = all_data[key]['partOfSpeech'];
        var link = id + '_' + name;
        var btn = $("<button class='btn btn-secondary homeBtn'>"+ capitalFirstLetter(name) +" ("+pos+")"+ "</button>")
        $(btn).attr('id', id)
        $(btn).attr('href', '#'+link)
        $(btn).click(function(){
            setActive(this.id)
            $("#btns").addClass('invisible')
            // $("#bar").css('display', 'block')
        })
        var btndiv = $("<div class='row'>")
        $(btndiv).append(btn)
        var pos = '#'+ pos + '_btns';
        $(pos).append(btndiv);
    })
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
        $("#btns").addClass('invisible')
        $("#search_btns").empty()
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

function loadImages(table_id, id) {
    console.log('creating image grid...')
    console.log(id)
    if (id !== "none") {
        var symbol_list = all_data[id]["symbols"]
        var count = 0;
        var concept = all_data[id]["concept_name"]
        concept =  capitalFirstLetter(concept);
        // clear table first.
        $('#' + table_id + ' tr').remove();
        var table = document.getElementById(table_id);
        row_num = 0;
        var row = table.insertRow(row_num);
        cell_num = 0;
        for (i = 0; i < symbol_list.length; i++) {
                        console.log(symbol_list.length)
                        if(symbol_list[i]["deleted"].valueOf() === "False" ){
            url = symbol_list[i]["imageURL"]
            search_term = "search term: " + symbol_list[i]['term']
            cell = row.insertCell(-1);
            html = '<div class=\"parent\"> <img style=\'width: 350px; border: 2px solid white; padding: 3px; margin: 2px;\' src=\"' + url + '\"/> <div  class=\"info\">' + search_term + '</div>';
            cell.innerHTML = html;
                            count++;
                        }
            // make new row
            if ((count ) % 3 == 0) {
                row_num = row_num + 1;
                row = table.insertRow(row_num);
            }
        }
        $("#symbolCount").html("# of symbols: " + count);
        $("#conceptName").html("Concept: " + concept);
    } else {
        $('#' + table_id + ' tr').remove();
        $("#symbolCount").html("");
        $("#conceptName").html("Pick a concept to start!");
    }
}

function setActive(uid) {
    active_type = uid;
    loadImages("img_grid",active_type);
}	