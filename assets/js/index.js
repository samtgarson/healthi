Vue.component('Page', {
    template: 'hello',
    ready: pageReady,
    data: {
        name: 'home'
    },
    methods: {
        loadContent: loadContent,
    }
})

var app = new Vue({
    el: 'body',
    ready: appReady,
    data: {
        title: 'home',
        menuOpen: false,
    },
    methods: {
        toggleMenu: function() {!this.menuOpen ? this.openMenu() : this.closeMenu()},
        closeMenu: closeMenu,
        changeTitle: changeTitle,
        openMenu: openMenu,
    }
})

var VM = app.$.pageref

function pageReady() {
    this.$watch('name', loadContent)
    // this.loadContent
}

function loadContent() {
    var file = 'build/templates/' + this.name + '.html'
    $.get(file, function(html) {
        $('section.main').html(html)
    })

    eval(this.name + '()')
}

function appReady () {
    this.$watch('title', this.changeTitle)
}

function closeMenu (newPage) {
    if(typeof(newPage)==='undefined') {newPage = VM.name};

    this.menuOpen = false
    this.title = newPage
}

function openMenu () {
    console.log('opened')
    this.menuOpen = true
    this.title = 'menu'
}

function changeTitle (page) {
    var n = "<span class='new'>" + page + "</span>"
    $('#title').prepend(n)
    setTimeout(function() {
        $('.new').css('margin-top', 0)
    }, 100)
    setTimeout(function(){
        $('.old').remove()
        $('.new').removeClass('new').addClass('old')
    }, 500)
}
