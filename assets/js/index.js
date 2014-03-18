function viewReady() {
    setTimeout(this.init, 0)
    this.$watch('title', this.$parent.changeTitle)
}

// Register Home view
Vue.component('home', {
    template: '#homeTpl',
    ready: viewReady,
    data: {
        name: 'home',
        title: 'home',
    },
    methods: {
        init: homeInit
    }
})

// Register Login view
Vue.component('login', {
    template: '#loginTpl',
    data: {
        name: 'login',
        title: 'login',
    },
    methods: {
        init: loginInit,
        loginClick: loginClick
    }
})


//define the app
var app = new Vue({
    el: 'body',
    ready: appReady,
    data: {
        view: 'home',
        menuOpen: false,
        views: [
            {name: 'home', icon: 'h'},
            // {name: 'about', icon: 'a'},
            // {name: 'settings', icon: 'C'},
        ],
        user: {},
        goals: []
    },
    methods: {
        toggleMenu: function() {!this.menuOpen ? this.openMenu() : this.closeMenu()},
        closeMenu: closeMenu,
        changeTitle: changeTitle,
        openMenu: openMenu,
        changePage: changePage,
        appReady: appReady,
        loadData: loadData,
        logout: logout
    },
})

function appReady() {

    // If user is not logged in, goto login view
    if (typeof storage('user') == 'undefined') {
        this.changePage('login')
    } else {
        
    }
}
function loadData() {
    this.user = storage('user') // Load User object into app
    this.goals = storage('goals') // Load Goals list into app
    for (var i in this.goals) { // Create tick lists
        this.goals[i].ticks = []
        var r = this.goals[i].repeat
        var d = this.goals[i].done
        for (var j= 0; j < r; j++) {
            this.goals[i].ticks[j] = (j < d) ? true : false
        }
    }
    this.changePage('home')
}
// Change assigned component
function changePage(newpage) {
    this.view = newpage;


    setTimeout(function(){this.changeTitle(app.$.View.title)}, 0);
}

// Close menu
function closeMenu (item) {
    // if new page selected, change view
    if (typeof item != 'undefined' && !$(item.$el).hasClass('current')) this.changePage(item.name)
    this.changeTitle(this.$.View.title)
    this.menuOpen = false
}


// Open Menu
function openMenu () {
    this.menuOpen = true
    this.changeTitle('menu')
}

// New title transition
function changeTitle (newTitle) {
    if (newTitle != $('span.old').text().toLowerCase()){
        document.title = 'Healthi: ' + newTitle.substr(0, 1).toUpperCase() + newTitle.substr(1, newTitle.length);
        $('h1#title span').addClass('old')
        $('h1#title').prepend("<span class='new'>" + newTitle + "</span>")
        setTimeout(function() {
            $('.new').css('margin-top', 0)
            setTimeout (function(){
                $('.old').remove()
                $('span.new').removeClass('new')
            }, 400)
        }, 0)
    }
}

// Logout 
function logout () {
    storage.empty();
    this.changePage('login');
    this.closeMenu()
}
