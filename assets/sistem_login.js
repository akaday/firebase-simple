$(document).ready(function() {

// cek_login();
$("#alert").attr('class', '');
$("#alert").hide();


/** BUTTON **/
/** do login **/
$(document).on('click','#do_login',function(){

  $("#alert").attr('class', '');
  $("#alert").hide();

  var email         = $("#email").val();
  var password      = $("#password").val();

  if(email.length == 0){
    $("#alert_email").html("email tidak Boleh Kosong");
    $("#email").focus();

    $("#alert").addClass('alert alert-danger');
    $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> username tidak boleh kosong");
    $("#alert").show();
  }
  else if(password.length == 0){
    $("#alert_password").html("password tidak Boleh Kosong");
    $("#password").focus();

    $("#alert").addClass('alert alert-danger');
    $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> password tidak boleh kosong");
    $("#alert").show();
  }
  else{

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      if(error.code == "auth/user-not-found")
      {
        $("#alert").addClass('alert alert-danger');
        $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> username tidak ditemukan");
        $("#alert").show();
      }
      else if(error.code == "auth/wrong-password"){
        $("#alert").addClass('alert alert-danger');
        $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> username atau password salah");
        $("#alert").show();
      }
      console.log(error.code);
      console.log(error.message);
    });
  }

});

/** do login gmail **/
$(document).on('click','#do_login_gmail',function(){

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    console.log(token);

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    console.log(errorCode);
    var errorMessage = error.message;
    console.log(errorMessage);
    // The email of the user's account used.
    var email = error.email;
    console.log(email);
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(credential);

    $("#alert").addClass('alert alert-danger');
    $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> login gmail bermasalah");
    $("#alert").show();

  });

});

/** do logout **/
$(document).on('click','#do_logout',function(){

  firebase.auth().signOut().then(function() {
     console.log("Logged out!");
     $.removeCookie('user_session');  //remove cookies
  }, function(error) {
     console.log(error.code);
     console.log(error.message);
  });

});
/** END BUTTON **/


/** CEK LOGIN, MEMUNCULKAN DAN MENGHILANGKAN ALERT **/
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // alert(user.email);
        $("#alert").addClass('alert alert-success');
        $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> LOGIN ");
        $("#alert").show();
        $("#do_logout").show();

        //goto another page
        window.location.href = 'event.html';
    }
    else{
        // $("#alert").addClass('alert alert-info');
        // $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> LOGOUT");
        $("#alert").show();
        $("#do_logout").hide();
    }
});

});
