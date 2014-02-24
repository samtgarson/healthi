function navLib () {
    $('#menu').click(function() {
      $(this).toggleClass('close');
    })
}
function changePage (page) {
    var curr = $('body').attr('data-page')
    if (page != curr) {

        changeTitle(page)
        $('body').attr('data-page', page)

        eval(page + '()')
    }
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

function home() {
    $('footer').removeClass('action')
}

function goals() {
    $('footer').addClass('action')
}