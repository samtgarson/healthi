function loginInit() {
	console.log('login!');
}
function loginClick () {
	var $this = this;
    console.log('clicked!');
    var url = 'http://www.json-generator.com/j/chKopNNLUy?indent=4';
    $.get(url, function(json) {
        storage.set(json);
    }).done(function() {
    	$this.$parent.loadData();
        $this.$parent.changePage('home');
    })
}