/* GLOBAL VARIABLES */

// Load a few standard compliments, just in case the live list reload ceases to work.
var tasks = [];
var links = ['#', '#', '#', '#'];
var clickcounter = 0;
var backgroundColors = [
    '#5eafff',
    '#fec422',
    '#9cd2a6',
    '#043f4c',
    '#fe5f55'
];
var date = new Date();
var task;

var refreshTasks = function() {

    $.getJSON('http://cors.io/?u=http://rage.dance/dev/task.json', function(data) {
            console.log(data);
            tasks = [];
            links = [];
            for (var i = 0; i < data.length; i++) {
                tasks.push(data[i]['Title']);
                links.push(data[i]['Task']);
            }
            console.log('tasks list was refreshed successfully');
        })
        .done(function() {})
        .fail(function(jqxhr, textStatus, error) {
            console.log('There was an error fetching new compliments: ' + textStatus);
        })
        .always(function() {
            task = Math.floor(Math.random()* tasks.length);
            showNewCompliment();
        });
}

var showNewCompliment = function() {
    if(task == tasks.length-1) task = 0;
    setRandomBackground();
    var newCompliment = tasks[task];
    $('.title').text(newCompliment);
    // Set link path here
    $('.quest').text(links[task]);
}





var setRandomBackground = function() {
    var bgcolor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    $('body').css('background-color', bgcolor);
    $('li').css('background-color', bgcolor);
}

$(document).ready(function() {

    var loc = (window.location.pathname.split('/').length > 0) ? window.location.pathname.split('/').reverse()[0] : '/index.html';
    if (loc == '') loc = '/';
    console.log(loc);

    console.log('Index page setup');
    refreshTasks();

    // $('body').css('background-color', bgcolor);
    $('li').css('background-color', $('body').css('background-color'));

    $('#body').click(function() {
        task = Math.floor(Math.random()* tasks.length);
        showNewCompliment();
    });
    $('#body').on("tap",function() {
        task = Math.floor(Math.random()* tasks.length);
        showNewCompliment();
    });
    $('#body').on("swiperight", function () {
        task++;
        showNewCompliment();
    });
    $('#body').on("swipeleft", function () {
        task--;
        showNewCompliment();
    });
    $(document).keydown(function (e) {
        if(e.keyCode == 37)
          task --;
        else if (e.keyCode == 39)
          task++;
        showNewCompliment();
    });

});
