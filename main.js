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
            showNewCompliment();
        });
}

var showNewCompliment = function() {
    setRandomBackground();
    var date = new Date();
    var i =  Math.floor(Math.random()*tasks.length);
    var newCompliment = tasks[i];
    $('.title').text(newCompliment);
    // Set link path here
    console.log(tasks[i]);
    console.log(links[i]);
    $('.quest').text(links[i]);
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

    $('#text').click(function() {
        showNewCompliment();
    });

});
