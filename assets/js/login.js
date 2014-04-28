function loginInit() {
	console.log('login!');
}
function loginClick () {
	var $this = this;
    $.ajax({
        type: 'GET',
        url: 'http://jsonstub.com/login',
        beforeSend: function (request) {
            request.setRequestHeader('JsonStub-User-Key', '8e131e3f-7886-49d2-9c9d-189a0a98070a');
            request.setRequestHeader('JsonStub-Project-Key', '93627ecc-f971-4ad7-98c0-ac1f1e1c803e');
        }
    }).done(function (json) {
        storage.set(json);
        $this.$parent.loadData();
        $this.$parent.changePage('home');
    });
}