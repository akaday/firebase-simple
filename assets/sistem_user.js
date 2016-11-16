$(document).ready(function() {

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // alert(user.email);
  }
  else{
    window.location.href='index.html';
  }
});

var module_name       = "user";
var btn_back          = "<button class=\"btn btn-info\" id='module_user' >BACK</button>";

//DEFAULT
$("#title_page").text("List User");
$("#title_small_page").text("all list user");
$("#title_page_breadcrumb").text("List User");
$("#title_page_h3").html("");

//show hide
global_show_and_hide();
$('#html_user_list').show();
list_user();


//MODULE User
//list user
//list event
$(document).on('click','#module_user',function(){
  //Text keterangan
  $("#title_page").text("List User");
  $("#title_small_page").text("all list user");
  $("#title_page_breadcrumb").text("List User");
  $("#title_page_h3").html("");

  //show hide data yang akan tampil
  global_show_and_hide();
  $('#html_user_list').show();
  list_user();
});



//function menampilkan
function list_user()
{
    var datauser = $('#datauser');
    datauser.empty();
    var db = firebase.database().ref().child(module_name);
    db.on('value', function(data) {
        i = 1;
        data.forEach(function(data) {
          var isi='<tr><td>'+ i++  +'</td><td>'+data.val().nama+'</td><td>'+data.val().email+'</td><td>'+data.val().nohp+'</td><td><button class="btn btn-success" id="detail_user_event" data-key="'+data.val().email+'"><span class="fa fa-eye"></span></button></td></tr>';
          datauser.append(isi);
        });
    });
}

//edit event
$(document).on('click','#detail_user_event',function(){

    var id_db = $(this).data('key');

    var nama = "";
    var rootRef = firebase.database().ref();
    var query  = rootRef.child('user').orderByChild('email').equalTo(id_db);
    query.on("child_added", function(data) {
       var nama = data.val().nama;
    });

    $("#title_page").text("Detail User  "+ nama);
    $("#title_small_page").text("user mengikuti event");
    $("#title_page_breadcrumb").text("User");
    $("#title_page_h3").html(btn_back);

    detail_user_event(id_db)

});

function detail_user_event(key)
{
    var datauser = $('#datauser');
    datauser.empty();
    var db = firebase.database().ref().child(module_name);
    db.on('value', function(data) {
        i = 1;
        data.forEach(function(data) {
          if(key == data.val().email)
          {
            var isi='<tr><td>'+ i++  +'</td><td>'+data.val().nama+'</td><td>'+data.val().email+'</td><td>'+data.val().nohp+'</td><td></td></tr>';
            datauser.append(isi);

            var nama = data.val().nama;
          }
        });
    });

}

//GLOBAL SHOW AND HIDE
function global_show_and_hide()
{
  //show and hide
  $('#html_user').hide();
  $('#html_user_event_list').hide();

  //alert
  $("#alert").attr('class', '');
  $("#alert").hide();

  //menu active atau tidak
  $("#module_event").removeClass("active");
  $("#module_user").addClass("active");

}

/**
  BUTTON ACTION
          **/
// PROSES LOGOUT
$(document).on('click','#do_logout',function(){

  firebase.auth().signOut().then(function() {
     console.log("Logged out!");
  }, function(error) {
     console.log(error.code);
     console.log(error.message);
  });

});
/**
    BUTTON
            **/

});
