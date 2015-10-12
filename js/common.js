var toggleModal = function(headerTxt, msgTxt) {
	$('#modal-container').fadeToggle('fast');
	$('#modal-header').text(headerTxt);
	$('#modal-text').text(msgTxt);
	$('#email-input').focus();
};

var subscribe = function() {
	// $('#email-form').hide();
	$('#modal-header').text('');
	$('#modal-text').text('');
	return false;
};