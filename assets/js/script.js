$(document).ready(function() {

    $('.slider-nav ul').pep({
        axis: 'x',
        velocityMultiplier: 0,
        removeMargins: false,
        stop: dragStop,
        drag: dragDuring,
        cssEaseDuration: 300,
        cssEaseString: 'easeOutExpo',
        useCSSTranslation: false,
        shouldEase: false
    });

    $('.slider-nav li').click(function () {
    	slideNav($(this).index())
    })
});
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
	var a = [0, -79, -158, -237];
	var n = parseInt($('.selector ul').css('marginLeft'));
	var r = nearest(n, a)
	var m = $('body').width()/2 + r
	var e = 'easeOutExpo';
	var time = 700

	$('.selector ul').animate({
		marginLeft: r
	}, time, e)
	$('.slider-nav ul').animate({
		left: m
	}, time, e)

	return false;

}
function dragDuring() {
	var l = parseInt($('.slider-nav ul').css('left')) - $('body').width()/2

	$('.selector ul').css('marginLeft', l-2);	
}
function nearest (num, arr) {
	var res = arr.reduce(function (prev, curr) {
    return (Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev);
	});
	return res
}
function slideNav (index) {
	var r = index * -79
	var m = $('body').width()/2 + r
	var e = 'easeOutExpo';
	var time = 700

	$('.selector ul').animate({
		marginLeft: r
	}, time, e)
	$('.slider-nav ul').animate({
		left: m
	}, time, e)
}