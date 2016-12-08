$(document).ready(function () {

	function showProjects() {
		$('.noteboook-bg').animate({
			'top': '0',
		}, 2000);
	}

	$('#instruction').click(function() {
		showProjects()
	});

	function loadApp() {

		$('.flipbook').turn({
			display: 'single',
			// autocenter: true
		});
	}

	loadApp();

	var currentPage = 0;

	$('#instruction').click(function() {
		// $('.notebook-bg').animate({
		// 	'top': '0'
		// }, 500);

		// $('#left').css('top', '0');
		// $('#right').css('top', '0');
		$("html, body").animate({
			scrollTop: $(".flipbook-viewport").offset().top
		}, 750);
	});

	$('.project').click(function() {
		console.log(currentPage);

		var pages = $(this).data("page");
		currentPage = pages;

		(function turnPage (i) {          
			setTimeout(function () {   
				$('.flipbook').turn('next');
				console.log("Should be doing something");             
		      
		      	if (--i) turnPage(i);
		   }, 350)
		})(pages); 
	})

	$('.bookmark').click(function() {
		var page = $(this).data("page");
		numToTurn = page - currentPage;

		if(numToTurn < 0) {
			numToTurn = Math.abs(numToTurn);

			(function turnPage(i) {
				setTimeout(function () {
					$('.flipbook').turn('previous');          
			      
			      	if (--i) turnPage(i);

			      	$('#b' + (currentPage - 1)).animate({right: "40px"}, 500);
			      	$('#b' + (currentPage - 1)).animate({right: "-15px"}, 150);

			      	// $('#b' + currentPage).style.transform="rotateY(180deg)"
			      	currentPage--;

				}, 400)
			})(numToTurn);
		} else if(numToTurn > 0) {
			(function turnPage(i) {
				setTimeout(function () {
					$('.flipbook').turn('next');          

			      	if (--i) turnPage(i);

			      	$('#b' + currentPage).animate({right: "40px"}, 50);
			      	$('#b' + currentPage).animate({right: "-15px"}, 600);

			      	currentPage++;
				}, 400)
			})(numToTurn);
		}
	});

	$('.index').click(function() {
		(function turnPage (i) {          
			setTimeout(function () {   
				$('.flipbook').turn('previous');

		      	if (--i) turnPage(i);

		   }, 350)
		})(currentPage); 
	});

	$('.right').click(function() {
		if(currentPage < 5) {
			$('.flipbook').turn('next');
	      	$('#b' + currentPage).animate({right: "40px"}, 50);
	      	$('#b' + currentPage).animate({right: "40px"}, 50);
	      	$('#b' + currentPage).animate({right: "-15px"}, 600);
			currentPage++;
			console.log(currentPage);
		};
	});

	$('.left').click(function() {
		if(currentPage > 0) {
			$('.flipbook').turn('previous');
	      	$('#b' + (currentPage - 1)).animate({right: "60px"}, 400);
	      	$('#b' + (currentPage - 1)).animate({right: "61px"}, 0);
	      	$('#b' + (currentPage - 1)).animate({right: "-15px"}, 150);
			currentPage--;
			console.log(currentPage);
		};
	});

	var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
	$('body').bind(mousewheelevt, function(e){

	    var evt = window.event || e //equalize event object     
	    evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
	    var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF

	    var offset = $(window).scrollTop()

	    if(delta > 0) {
	        //scroll up
	    }
	    else{

	        //scroll down
	   //      if(offset == 1076 && currentPage != 4) {
				// (function turnPage (i) {          
				// 	setTimeout(function () {   
				// 		$('.flipbook').turn('next');
				      
				//       	if (--i) turnPage(i);
				//    }, 350)
				// })(currentPage); 
	   //      }
	    }   
	});

	$('div.button').on('mouseenter', function() {
		var left = $(this).offset().left + 10;
		var width = $(this).outerWidth(true);
		var selectorWidth = $('#selector').outerWidth(true);
		var leftOffset = left + width / 11;
		console.log(leftOffset);

		$('#selector').animate({
			'left': leftOffset
		}, 250);
	});

	$('div.buttonwrapper').on('mouseleave', function() {
		$('#selector').animate({
			'left': '-250px'
		}, 250);
	});

	$('#phone').on('mouseenter', function() {
		$(this).attr('src', 'resources/phone2.png');
	});

	$('#phone').on('mouseleave', function() {
		$(this).attr('src', 'resources/phone.png');
	})

	$('#phone').click(function() {
		$("html, body").animate({
			scrollTop: $(".landing-viewport").offset().top
		}, 750);


		while(currentPage>0) {
			$('.flipbook').turn('previous');
	      	$('#b' + (currentPage - 1)).animate({right: "60px"}, 400);
	      	$('#b' + (currentPage - 1)).animate({right: "61px"}, 0);
	      	$('#b' + (currentPage - 1)).animate({right: "-15px"}, 150);
			currentPage--;
		};
	});

});