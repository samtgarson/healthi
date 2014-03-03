function homeFunc() {
	$('.closed').removeClass('closed')
    $('.slider-nav ul').pep({
        axis: 'x',
        velocityMultiplier: 0,
        removeMargins: false,
        stop: dragStop,
        drag: dragDuring,
        cssEaseDuration: 300,
        cssEaseString: 'easeOutExpo',
        useCSSTranslation: false,
        shouldEase: false,
        callIfNotStarted: []
    });

    $('.slider-content').pep({
        axis: 'x',
        velocityMultiplier: 0,
        removeMargins: false,
        stop: pageDragStop,
        drag: pageDragDuring,
        cssEaseDuration: 300,
        cssEaseString: 'easeOutExpo',
        useCSSTranslation: false,
        shouldEase: false,
        callIfNotStarted: []
    });

    var dragged =  0;
    $('.slider-nav li')
    	.on('touchstart mousedown', function () {
    		dragged = 0;
	    	$(this).on('touchmove mousemove', function () {
	    		dragged = 1
	    	});
	    })
	    .on('touchend mouseup', function () {
	    	if (!dragged) {
	    		slideAll($(this).index())
	    	}
	    })
}
// function nearest(a, n) {
// 	var curr = a[0]
// 	for (i = 0; i < a.length; ++i) {
// 		v = a[i]
// 		if (Math.abs(n - v) < Math.abs(n - curr)) {
// 			curr = v
// 		}
// 		return curr
// 	}
// }
function dragStop() {
	var ease = 'easeOutExpo';
	var time = 700

	var navArray = [0, -79, -158, -237];
	var navTarget = parseInt($('.selector ul').css('marginLeft'));
	var navIndex = nearest(navTarget, navArray)[1]
	// var navMargin = $('body').width()/2 + navResult
	
	slideAll(navIndex)	

	return false;

}
function pageDragStop() {
	var ease = 'easeOutExpo';
	var time = 700
	
	var pageArray = [0, -100, -200, -300]
	var pageTarget = parseInt($('.slider-content').css('left')) / $('.slider-content').width();
	var pageIndex = nearest(pageTarget * 400, pageArray)[1]
	
	slideAll(pageIndex)

	return false;

}
function dragDuring() {
	var l = parseInt($('.slider-nav ul').css('left')) - $('body').width()/2

	$('.selector ul').css('marginLeft', l-2);	

	var dragPercent = parseFloat($('.selector ul').css('margin-left')) / $('.slider-nav ul').width()
	var pageMargin = $('.slider-content').width() * dragPercent

	$('.slider-content').css('left', pageMargin)
}

function pageDragDuring() {
	var bodyW = $('body').width()/2;
	var dragPercent = parseInt($('.slider-content').css('left')) / $('.slider-content').width() ;
	var selectMargin = (dragPercent * $('.slider-nav ul').width())
	var navMargin = bodyW  + selectMargin

	$('.slider-nav ul').css('left', navMargin)
	$('.selector ul').css('marginLeft', selectMargin-2);	

}

function nearest (num, arr) {
	var i = 0
	var res = arr.reduce(function (prev, curr) {
		if (Math.abs(curr - num) < Math.abs(prev - num)) {
			i ++;
			return curr
		} else {
    		return prev;
    	}
	});
	return [res, i]
}
function slideAll (index) {
	var r = index * -79
	var m = $('body').width()/2 + r
	var e = 'easeOutExpo';
	var time = 700

	var pageMargin = index * 100

	$('.slider-content').animate({
		left: '-' + pageMargin + '%'
	}, time, e)

	$('.selector ul').animate({
		marginLeft: r
	}, time, e)
	$('.slider-nav ul').animate({
		left: m
	}, time, e)

    var newTitle = $('.slidee').eq(index).attr('class').split('slidee ')[1]
    if (newTitle != view.title) {
        view.title = newTitle
        if ($('footer').scrollTop()) {$('footer').scrollTop(0)}
    }

}
