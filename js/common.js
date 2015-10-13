var reportEvent = function(category, action) {
    ga('send', 'event', category, action);
};

var toggleModal = function(headerTxt, msgTxt) {
    $('#modal-container').fadeToggle('fast');

    clearForm();
    enableForm();

    $('#modal-text').text(msgTxt);
};

var clearForm = function() {
    $('#modal-text').text('').removeClass('error');
    $('#submit-btn').text('subscribe').removeClass('success');
    $('#email-input').val('');
};

var disableForm = function() {
    $('#email-input').prop('disabled', true);
    $('#submit-btn').prop('disabled', true);
};

var enableForm = function() {
    $('#email-input').prop('disabled', false);
    $('#submit-btn').prop('disabled', false);
};

var validateEmail = function() {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test($('#email-input').val());
};


var postMailChimp = function(cb) {
    $.ajax({
        url: '//hacksmith.us11.list-manage.com/subscribe/post-json?u=d34fa4a644386de0931196c68&id=ec056dd018&c=?',
        type: 'POST',
        data: 'EMAIL=' + $('#email-input').val(),
        dataType: 'jsonp',
        contentType: "application/json; charset=utf-8",
        success: cb
    });
};


var subscribe = function(e) {
    reportEvent('subscription', 'clicked');

    $('#modal-text').removeClass('error').text('subscribing...');
    disableForm();

    if (validateEmail()) {
        postMailChimp(function(res) {
        	if (res['result'] != "success") {
        		reportEvent('subscription', 'error');
		        $('#modal-text').addClass('error').html(res['msg']);
		        enableForm();		
		        $('#email-input').focus();
        	} else {
	            reportEvent('subscription', 'success');
	            $('#modal-text').text('Thank you for joining! Check your email for further instructions!');
	            $('#submit-btn').text('subscribed!').addClass('success');
            }
        });
    } else {
        reportEvent('subscription', 'notvalid');
        $('#modal-text').addClass('error').text('Please enter a valid email address');
        enableForm();
        $('#email-input').focus();
    }

    return false;
};