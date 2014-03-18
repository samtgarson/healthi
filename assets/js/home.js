//// APP

//Regiser Home component
Vue.component('home', {
    template: '#homeTpl',
    ready: viewReady,
    data: {
        name: 'home',
        title: 'home',
        currentGoal: -1,
    },
    methods: {
        init: homeInit,
        replaceCard: replaceCard
    }
});

// Init Home component
function homeInit() {
    $('.closed').removeClass('closed'); // Transition entry
    initSliders(); // Init sliders
    this.$on('replaceCard', replaceCard);
}

function replaceCard (index) {
    console.log('replacing ' + index)
}

//// INTERFACE
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
    });

    // Setup click function for nav slider
    var dragged =  0;
    $('#navWrapper').on('click', 'li', function(e) {
        e.preventDefault();
        var index = $(e.currentTarget).index();
        navDealer.setStep(4-index, 0);
    });
}

// Attach content position to nav slider position
var currentStep = 0;
function navDuring(x, y) {
    if (typeof contentDealer != 'undefined') {
        $('.slider-content .handle').css('left', (($('#contentWrapper').width() - $('#contentWrapper .handle').width()) * x) + 'px');
    } else {
    }
    $('.selector ul').css('margin-left', (x*240)-240 + 'px');
    var newStep = Math.abs(this.getStep()[0]-4);
    if (currentStep != newStep) goalFunc(newStep);
    currentStep = newStep;
    sliderTitle(x);
}

// Attach nav slider position to content position
function contentDuring(x, y) {
    if (typeof navDealer != 'undefined') {
        $('.slider-nav .handle').css('left', (240 * x) + 'px');
        $('.selector ul').css('margin-left', (x*240)-240 + 'px');
    }
    var newStep = Math.abs(this.getStep()[0]-4);
    if (currentStep != newStep) goalFunc(newStep);
    currentStep = newStep;
    sliderTitle(x);
}

// Change page title on slide
function sliderTitle(x) {
    var newTitle = (x < 0.8) ? 'goals' : 'home';
    if (newTitle != app.$.View.title) {
        app.$.View.title = newTitle;
        if ($('footer').scrollTop()) $('footer').scrollTop(0);
    }
}

// Entrance animation for cards
function goalFunc(index) {
    app.$.View.currentGoal = index-1;
    $('.slidee.goals .module').eq(index-1).removeClass('goalClosed');
    $('.slidee.goals .module').not(':eq(' + (index-1) + ')').addClass('goalClosed');
}
