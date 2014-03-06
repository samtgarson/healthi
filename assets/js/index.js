Vue.component('Page', {
    template: 'hello',
    ready: pageReady,
    data: {
        name: 'home',
        title: 'home',
        viewData: {}
    },
    methods: {
        loadContent: loadContent,
    }
})

var app = new Vue({
    el: 'body',
    ready: appReady,
    data: {
        menuOpen: false,
        views: [
            {name: 'home', icon: 'h'},
            {name: 'about', icon: 'a'},
            {name: 'settings', icon: 'C'},

        ]
    },
    methods: {
        toggleMenu: function() {!this.menuOpen ? this.openMenu() : this.closeMenu()},
        closeMenu: closeMenu,
        changeTitle: changeTitle,
        openMenu: openMenu,
        changePage: changePage,
    }
})
var view = app.$.pageref
// app.openMenu()
function appReady () {
    
}
function pageReady() {
    this.$watch('name', function(newValue) {this.title = newValue})
    this.$watch('title', this.$parent.changeTitle)
    this.loadContent()
}

function changePage(item) {

    var newPage = item.name
    if (!$('#' + newPage).hasClass('current')){
        $('section.main').empty()
        view.viewData = {}
    
        view.name = newPage
        
        this.closeMenu()
        view.loadContent()
    } else {
        this.closeMenu()
    }
}
function loadContent() {
    var file = 'build/templates/' + this.name + '.html'
    $.get(file, function(html) {
        $('section.main').html(html)
    }).done(function(){
        setTimeout(function() {eval(view.name + 'Func()')}, 350)
    })    
}

function closeMenu () {
    this.changeTitle(view.title)
    this.menuOpen = false
}

function openMenu () {
    this.menuOpen = true
    $('.current').removeClass('current')

    $('#pages #' + view.name).addClass('current')
    this.changeTitle('menu')
}

function changeTitle (newTitle) {
    document.title = 'Healthi: ' + newTitle.substr(0, 1).toUpperCase() + newTitle.substr(1, newTitle.length)
;
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
