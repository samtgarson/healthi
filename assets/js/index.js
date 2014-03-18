function viewReady() {
    var t = this;
    setTimeout(function(){t.init();}, 100);
    this.$watch('title', this.$parent.changeTitle);
}

function test () {
    console.log('testing');
}

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
});


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
        toggleMenu: function() {
            !this.menuOpen ? this.openMenu() : this.closeMenu();
        },
        closeMenu: closeMenu,
        changeTitle: changeTitle,
        openMenu: openMenu,
        changePage: changePage,
        appReady: appReady,
        loadData: loadData,
        syncUser: syncUser,
        syncGoals: syncGoals,
        logout: logout
    },
});

function appReady() {

    // If user is not logged in, goto login view
    if (!storage('user')) {
        this.changePage('login');
    } else {
        // Else load user from storage
        var t = this;
        setTimeout(function() {t.loadData();}, 0);
    }
}
function loadData() {
    this.user = storage('user'); // Load User object into app
    this.goals = storage('goals'); // Load Goals list into app

    this.$watch('user', this.syncUser);
    this.$watch('goals', this.syncGoals);

    this.changePage('home');
}
// Change assigned component
function changePage(newpage) {
    this.view = newpage;


    setTimeout(function(){app.changeTitle(app.$.View.title);}, 0);
}

// Close menu
function closeMenu (item) {
    // if new page selected, change view
    if (typeof item != 'undefined' && !$(item.$el).hasClass('current')) this.changePage(item.name);
    this.changeTitle(this.$.View.title);
    this.menuOpen = false;
}


// Open Menu
function openMenu () {
    this.menuOpen = true;
    this.changeTitle('menu');
}

// New title transition
function changeTitle (newTitle) {
    if (newTitle != $('span.old').text().toLowerCase()){
        document.title = 'Healthi: ' + newTitle.substr(0, 1).toUpperCase() + newTitle.substr(1, newTitle.length);
        $('h1#title span').addClass('old');
        $('h1#title').prepend("<span class='new'>" + newTitle + "</span>");
        setTimeout(function() {
            $('.new').css('margin-top', 0);
            setTimeout (function(){
                $('.old').remove();
                $('span.new').removeClass('new');
            }, 400);
        }, 0);
    }
}

// Sync app with storage
function syncUser (newval) {
    storage.set('user', newval);
}
function syncGoals (newval) {
    storage.set('goals', newval);
}

// Logout 
function logout () {
    storage.empty();
    console.log(this)
    this.user = false;
    this.goals = false;
    this.changePage('login');
    this.closeMenu();
}
