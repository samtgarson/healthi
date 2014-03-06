var navDealer, contentDealer
function homeFunc() {
	$('.closed').removeClass('closed');
	navDealer = new Dragdealer('navWrapper', {
		x: 1,
		steps: 4,
		loose: true,
		animationCallback: navDuring
	});
	contentDealer= new Dragdealer('contentWrapper', {
		x: 1,
		steps: 4,
		loose: true,
		animationCallback: contentDuring
	})

    var dragged =  0;
    $('#navWrapper').on('click', 'li', function(e) {
    	e.preventDefault();
    	var index = $(e.currentTarget).index()
    	console.log($(e.currentTarget).index())
    	navDealer.setStep(4-index, 0)
    })
}
function navDuring(x, y) {
	if (typeof contentDealer != 'undefined') {
		$('.slider-content .handle').css('left', (contentDealer.bounds.availWidth * x) + 'px')
	} else {
		console.log('boo')
	}
	$('.selector ul').css('margin-left', (x*240)-240 + 'px');
	goalFunc(Math.abs(this.getStep()[0]-4));
	sliderTitle(x);
}
var currentX = 0
function contentDuring(x, y) {
	if (typeof navDealer != 'undefined') {
		$('.slider-nav .handle').css('left', (240 * x) + 'px')
		$('.selector ul').css('margin-left', (x*240)-240 + 'px');
	}
	goalFunc(Math.abs(this.getStep()[0]-4));
	sliderTitle(x)
}
function sliderTitle(x) {
	var newTitle = (x < .8) ? 'goals' : 'home'
    if (newTitle != view.title) {
        view.title = newTitle
        if ($('footer').scrollTop()) {$('footer').scrollTop(0)}
    }
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
	
	$('.selector ul').stop().animate({
		marginLeft: r
	}, time, e)
	$('.slider-nav ul').stop().animate({
		left: m
	}, time, e)
	$('.slider-content').stop().animate({
		left: '-' + pageMargin + '%'
	}, time, e)

	console.log('** ' + r)

	

    var newTitle = $('.slidee').eq(index).attr('class').split('slidee ')[1]
    if (newTitle != view.title) {
        view.title = newTitle
        if ($('footer').scrollTop()) {$('footer').scrollTop(0)}
    }
}
function goalFunc(index) {
	$('.slidee.goals .module').eq(index-1).removeClass('goalClosed');
	$('.slidee.goals .module').not(':eq(' + (index-1) + ')').addClass('goalClosed');
}
