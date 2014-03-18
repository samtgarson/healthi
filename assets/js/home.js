// Register Card template
Vue.component('card', {
	template: '#cardTpl'
})

// Init Home component
function homeInit() {
	console.log('home init')
	$('.closed').removeClass('closed');
	initSliders()
}
var navDealer, contentDealer;

// Init sliders
function initSliders() {
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

	// Setup click function for nav slider
    var dragged =  0;
    $('#navWrapper').on('click', 'li', function(e) {
    	e.preventDefault();
    	var index = $(e.currentTarget).index()
    	navDealer.setStep(4-index, 0)
    })
}

// Attach content position to nav slider position
var currentStep = 0
function navDuring(x, y) {
	if (typeof contentDealer != 'undefined') {
		$('.slider-content .handle').css('left', (($('#contentWrapper').width() - $('#contentWrapper .handle').width()) * x) + 'px')
		console.log(x)
	} else {
	}
	$('.selector ul').css('margin-left', (x*240)-240 + 'px');
	var newStep = Math.abs(this.getStep()[0]-4)
	if (currentStep != newStep) goalFunc(newStep);
	currentStep = newStep;
	sliderTitle(x);
}

// Attach nav slider position to content position
function contentDuring(x, y) {
	if (typeof navDealer != 'undefined') {
		$('.slider-nav .handle').css('left', (240 * x) + 'px')
		$('.selector ul').css('margin-left', (x*240)-240 + 'px');
	}
	var newStep = Math.abs(this.getStep()[0]-4)
	if (currentStep != newStep) goalFunc(newStep);
	currentStep = newStep;
	sliderTitle(x)
}

// Change page title on slide
function sliderTitle(x) {
	var newTitle = (x < .8) ? 'goals' : 'home'
    if (newTitle != app.$.View.title) {
        app.$.View.title = newTitle
        if ($('footer').scrollTop()) {$('footer').scrollTop(0)}
    }
}

// Entrance animation for cards
function goalFunc(index) {
	$('.slidee.goals .module').eq(index-1).removeClass('goalClosed');
	$('.slidee.goals .module').not(':eq(' + (index-1) + ')').addClass('goalClosed');
}
