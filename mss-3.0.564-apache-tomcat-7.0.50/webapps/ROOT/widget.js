var gUserName;
var socketPath;
(function() {
var widget = window.widget =function widget(){
var WIDGET_HOST ="SDW2092";
var WIDGET_PORT ="8080";

var image1 ="http://"+WIDGET_HOST+":"+WIDGET_PORT+"/Swift/res/img/icon-cog-small.png";
var image2 ="http://"+WIDGET_HOST+":"+WIDGET_PORT+"/Swift/res/img/webrtc.jpg"; 


var audioMainPanel = document.createElement("div");
var audioContentDiv = "<div><div style='position: absolute;right: 7%;top:31%'><div id='normal-button' class='settings-button' style='position:absolute; right: 1%;'><img src="+image1+" /></div></div></div><div id='user-options' class='toolbar-icons' style='display: none;'><a href='#' id='video-panel'><i class='icon-user'></i></a><a href='#' id='dail-textbox'><i class='icon-star'></i></a><a href='#'><i class='icon-edit'></i></a><a href='#' id='rotate-position'><i class='icon-trash'></i></a><a href='#' id='hide-video-panel'><i class='icon-ban-circle'></i></a></div><div id='video-options' class='toolbar-icons' style='display: none;z-index: 9999;position: absolute;width: 300px; height: 176px;right: 1%;top: 0%;'><video controls id='remoteVideo' poster="+image2+" autoplay style='margin:0 0 5px 0px;height:225px;width:400px' class='img-responsive'></video></div><div id='dailpad-options' class='toolbar-icons' style='display:none;z-index:9999;position:absolute;width: 300px;right: -1%;top: 18%;'><label>Enter Number</label><input type='text' name='destNumber' id='destUser'><br /><input id='dest-number' type='button' value='Call' style='right:21%;position:absolute;width: 44%;'></div>";
audioMainPanel.innerHTML = audioContentDiv;
var body = document.querySelector('body');
body.appendChild(audioMainPanel);

var getUserWebsocket ="http://SDW2092:8888/SwiftWidgetRest/rest/auth/domain/"+window.location.hostname;

$.ajax({
	type: 'GET',
	url: getUserWebsocket,
	dataType: "json",
	success: loadUserWebsocket 
});


function loadUserWebsocket(data){
	console.log(data);
	gUserName = data.userName;
	socketPath = data.socketUri;
}


function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref);
}


//loadjscssfile("http://"+WIDGET_HOST+":"+WIDGET_PORT+"/Swift/css/bootstrap.min.css", "css");


//LOAD WIDGET CSS AND JAVASCRIPT FILES

loadjscssfile("http://"+WIDGET_HOST+":"+WIDGET_PORT+"/Swift/res/widgetcsss/bootstrap.icons.css", "css");
loadjscssfile("http://"+WIDGET_HOST+":"+WIDGET_PORT+"/Swift/res/widgetcsss/jquery.toolbars.css", "css");


loadjscssfile("http://"+WIDGET_HOST+":"+WIDGET_PORT+"/Swift/res/widgetjs/jquery.toolbar.js", "js");


widget.loadWidgetUI = function($) {

	$('#video-panel').on('click', function( event ) {
		//event.preventDefault();
		console.log("click event got triggered!");
		$('#dailpad-options').hide();
		$('#video-options').show();
		
	});
	
	$('#hide-video-panel').on('click', function( event ) {
		console.log("click event got triggered!");
		$('#video-options').hide();
		$('#dailpad-options').hide();
		endCall();
		
	});
	$('#dail-textbox').on('click', function( event ) {
		console.log("click event got triggered!");
		$('#video-options').hide();
		$('#dailpad-options').show();
		
	});
	
	$('#dest-number').on('click', function( event ) {
		console.log("click event got triggered!");
		$('#dailpad-options').hide();
		$('#video-options').show();
		call($("#destUser").val());
		
	});
	$('#dest-number').on('click', function( event ) {
		console.log("click event got triggered!");
		$('#dailpad-options').hide();
		$('#video-options').show();
		
	});
	$('#normal-button').toolbar({content: '#user-options', position: 'top'});
	$("#video-options").draggable();
	$("#video-options").draggable();
	$("#normal-button").draggable();
	//$("#mainWidget").draggable();
	
	
};


loadjscssfile("http://"+WIDGET_HOST+":"+WIDGET_PORT+"/Swift/js/jquery-ui-1.10.3.js", "js");
loadjscssfile("http://"+WIDGET_HOST+":"+WIDGET_PORT+"/Swift/res/javascript/globals.js", "js");
loadjscssfile("http://"+WIDGET_HOST+":"+WIDGET_PORT+"/Swift/res/javascript/swift.js", "js");
loadjscssfile("http://"+WIDGET_HOST+":"+WIDGET_PORT+"/Swift/res/javascript/usingSwiftSapnTheme.js", "js");
loadjscssfile("http://"+WIDGET_HOST+":"+WIDGET_PORT+"/Swift/res/javascript/websocket.js", "js");
loadjscssfile("http://"+WIDGET_HOST+":"+WIDGET_PORT+"/Swift/res/widgetjs/widgetAPI.js", "js");

	$("#normal-button").one( "click", function() {
		  widget.loadWidgetUI($);
		  init();
	});
};
})();
$(document).ready(function() { 
	widget();
});