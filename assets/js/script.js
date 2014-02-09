$(document).ready(function() {
    $('.slider-nav ul').pep({
        axis: 'x',
        initiate: function() {console.log('started')}
    });
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
function nearest (num, arr) {
	var res = arr.reduce(function (prev, curr) {
    return (Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev);
	});
}
