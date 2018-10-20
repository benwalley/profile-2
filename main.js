var background = $(".mainDiv")[0];
var backgroundImage = "images/siera.jpg";
var topLayer = 10;
var currentWindow = undefined;
var currentHover = undefined;
var mouse = {x:undefined, y:undefined, down: false, windowClicked: false}


var state = {
	apps:[
		{name:"One", image: "fab fa-affiliatetheme", active: false, open:false},
		{name:"Two", image: "fas fa-adjust", active: true, open:false},
		{name:"Three", image: "fas fa-at", active: false, open:false}
	],
	windows:{}
}

function refreshListeners(){
	windowClickListeners()
}

function windowClickListeners(){
	windowListener = $(".window").click(function(){
		topLayer += 1
		this.style.zIndex = topLayer
	})

}

function fillIcons(){
	for (var i = 0; i < state.apps.length; i++) {
		$('<div class = "icon" data-name="' + state.apps[i].name +'"><i class="' + state.apps[i].image +'"></div>').appendTo(".startBar")[0]
	}
}

function setBackgroundImage(){
	background.style.backgroundImage = "url('" + backgroundImage + "')"
}

function resizeButton(name){
	if(Math.abs($(name).outerWidth() - $(window).width()) < 2 && Math.abs($(name).outerHeight() - $(window).height()) - 50 < 2){
		$(name).removeClass("fullScreen")

	}else{
		$(name).addClass("fullScreen")
		console.log()
	}
}

function createWindow(name){

	$('<div class = "window ui-draggable" id="' + name +'">\
		<div class = "windowBar">\
			<div class="close" onClick="closeWindow(' + name + ')"><i class="fas fa-times"></i></div>\
			<div class = "size" onClick="resizeButton(' + name + ')"><i class="far fa-window-restore"></i></div>\
			<div class="minus"><i class="fas fa-minus"></i></div>\
		</div>\
		<iframe class = "windowInner" src="./' + name + '/index.html"></iframe>\
	</div>\
	').appendTo(".mainDiv")[0]
	state.windows[name]={open:true, alive:true}
	$(".window").draggable({
		handle: ".windowBar"
	});
	refreshListeners()
}

function openWindow(name){
	if(state.windows[name]){
		var current = $("#" + name)[0]
		current.style.display = "block"
		current.style.zIndex = topLayer + 1
		topLayer += 1
	}else{
		createWindow(name)
	}
}

function initMouseListeners(){
	// update mouse on mousemove
	$(window).mousemove(function(e) {
		mouse.x = e.clientX
		mouse.y = e.clientY
	})
}

function closeWindow(name){

	name.style.display ="none"
	// $("#" + name).style.display = "none"
}

function iconClickListeners(){
	var icons = $(".icon")
	for (var i = 0; i < icons.length; i++) {
		$(icons[i]).on("click", function() {
			var name = this.dataset.name
			openWindow(name)
		})
	}
}



// initialize. evantially may add startup data stored locally
function init(data){
	setBackgroundImage()
	fillIcons()
	iconClickListeners()
	initMouseListeners()
}

$(function() {
	init(data = {})
})

