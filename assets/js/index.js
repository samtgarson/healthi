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
        views: ['home', 'settings']
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

function pageReady() {
    this.$watch('name', function(newValue) {this.title = newValue; console.log('changingTitle')})
    this.$watch('title', this.$parent.changeTitle)
    this.loadContent()
}

function changePage(item) {
    var newPage = item.$value
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
        setTimeout(function() {eval(view.name + 'Func()')}, 400)
    })    
}

function appReady () {
}

function closeMenu () {
    view.title = view.name
    this.menuOpen = false
}

function openMenu () {
    this.menuOpen = true
    $('.current').removeClass('current')

    $('#' + view.name).addClass('current')
    view.title = 'menu'
}

function changeTitle (newTitle) {
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
