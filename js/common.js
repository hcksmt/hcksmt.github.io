var toggleModal = function(headerTxt, msgTxt) {
	$('#modal-container').fadeToggle('fast');

	clearForm();
	enableForm();
	
	$('#modal-text').text(msgTxt);
};

var clearForm = function() {
	$('#modal-text').text();
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


var subscribe = function() {

	$('#modal-text').removeClass('error').text('subscribing...');	
	disableForm();

	if(validateEmail()) {
		$('#modal-text').text('thank you for subscribing');	
		$('#submit-btn').text('subscribed!').addClass('success');
	} else {
		$('#modal-text').addClass('error').text('Please enter a valid email address');	
		enableForm();
	}

	return false;
};