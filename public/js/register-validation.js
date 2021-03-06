$(function() {
    $("#firstName-error-message").hide();
    $("#lastName-error-message").hide();
    $("#email-error-message").hide();
    $("#password-error-message").hide();

    let error_firstName = false;
    let error_lastName = false;
    let error_email = false;
    let error_password = false;

    $("#firstName").focusout(function() {
        check_firstName();
    });

    $("#lastName").focusout(function () {
        check_lastName();
    });

    $("#email").focusout(function () {
        check_email();
    });

    $("#password").focusout(function () {
        check_password();
    });

    function check_firstName() {
        let firstName_pattern = new RegExp(/^[a-z ,.'-]+$/i);

        if (firstName_pattern.test($("#firstName").val())) {
            $("#firstName-error-message").hide();
        } else {
            $('#firstName').addClass('validation-error');
            $("#firstName-error-message").html("Invalid first name.");
            $("#firstName-error-message").show();
            error_firstName = true;
        }
    }

    function check_lastName() {
        let lastName_pattern = new RegExp(/^[a-z ,.'-]+$/i);

        if (lastName_pattern.test($("#lastName").val())) {
            $("#lastName-error-message").hide();
        } else {
            $('#lastName').addClass('validation-error');
            $("#lastName-error-message").html("Invalid last name.");
            $("#lastName-error-message").show();
            error_lastName = true;
        }

    }

    function check_email() {
        let email_pattern = new RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);
        
        if(email_pattern.test($("#email").val())) {
            $("#email-error-message").hide();
        } else {
            $('#email').addClass('validation-error');
            $("#email-error-message").html("Invalid email address.");
            $("#email-error-message").show();
            error_email = true;
        }
    }

    function check_password() {
        let password_length = $("#password").val().length;

        if (password_length < 5 || password_length > 20) {
            $('#password').addClass('validation-error');
            $("#password-error-message").html("Password should be between 5-20 characters.");
            $("#password-error-message").show();
            error_password = true;
        } else {
            $("#password-error-message").hide();
        }
    }
});