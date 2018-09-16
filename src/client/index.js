$(document).ready(() => {

    $("#signUp").submit(e => {

        e.preventDefault();

        $.ajax({
            url: "/",
            method: "POST",
            data: {
                email:      $("#email").val(),
                username:   $("#username").val(),
                password:   $("#password").val()
            }
        })
        .done(res => {

            console.log(res);
            let message, className = "";
            
            if (res.hasOwnProperty("uid")) {
                // Success
                message = "Your info was saved. Expect notifications soon!";
                className = "alert alert-success";
            } else if (res.hasOwnProperty("code")) {
                // Error
                message = res.message;
                className = "alert alert-danger";
            } else {
                // Exception
                message = "An unexpected error occurred.";
                className = "alert alert-danger";
            }

            $("#alert").text(message);
            $("#alert").attr("class", className);
            $("#alert").attr("hidden", false);
            
        })
        .fail(err => {
            console.log(`Request failed: ${err}`);
        });

    });

});