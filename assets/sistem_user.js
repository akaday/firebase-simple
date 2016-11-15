$(document).ready(function() {

var btn_create_event = "<button id='crete_event' class='btn btn-primary'>Create Event</button>";
var btn_back    = "<button class=\"btn btn-info\" id=\"module_event\" href=\"#\">BACK</button>";

//DEFAULT
$("#title_page").text("List Event");
$("#title_small_page").text("all list event");
$("#title_page_breadcrumb").text("List Event");
$("#title_page_h3").html(btn_create_event);

//show hide
global_show_and_hide();
$('#html_event_list').show();
list_event();



//MODULE EVENT
//list event
$(document).on('click','#module_event',function(){
  //Text keterangan
  $("#title_page").text("List Event");
  $("#title_small_page").text("all list event");
  $("#title_page_breadcrumb").text("List Event");
  $("#title_page_h3").html(btn_create_event);

  //menu
  $("#module_event").addClass("active");
  $("#module_user").removeClass("active");

  //show hide data yang akan tampil
  global_show_and_hide();
  $('#html_event_list').show();

  //Tampilkan data
  list_event();
});

//detail event
$(document).on('click','#detail_event',function(){
  //Text keterangan
  $("#title_page").text("Detail Event");
  $("#title_small_page").text("");
  $("#title_page_breadcrumb").text("Detail Event");

  var id_db = $(this).data('key');

  //show hide data yang akan tampil
  global_show_and_hide();

  detail_event(id_db);
});

//input event
$(document).on('click','#crete_event',function(){
  var do_db_event = "<button id='do_db_event' class='btn btn-primary'>Submit</button>";

  //Text keterangan
  $("#title_page").text("Input Event");
  $("#title_small_page").text("");
  $("#title_page_breadcrumb").text("Input Event");
  $("#title_page_h3").html("<div class='text-right'>"+ do_db_event +" "+ btn_back +"</div>");
  $("#module_event").addClass("active");

    //show hide data yang akan tampil
    global_show_and_hide();
    $('#html_form_list').show();

});


//edit event
$(document).on('click','#edit_event',function(){
  var do_db_event = "<button id='do_db_event' class='btn btn-primary'>Edit</button>";
  //Text keterangan
  $("#title_page").text("Input Event");
  $("#title_small_page").text("");
  $("#title_page_breadcrumb").text("Input Event");
  $("#title_page_h3").html("<div class='text-right'>"+ do_db_event +" "+ btn_back +"</div>");
  $("#module_event").addClass("active");

  //show hide data yang akan tampil
  global_show_and_hide();
  $('#html_form_list').show();

  var id_db = $(this).data('key');

  var db = firebase.database().ref().child('event').child(id_db);
  db.on('value', function(data) {
      $("#key").val(data.key);
      $("#nama_event").val(data.val().nama_event);
      $("#tanggal").val(data.val().tanggal);
      $("#waktu").val(data.val().waktu);
      $("#kuota").val(data.val().kuota);
      $("#deskripsi").val(data.val().deskripsi);
  });

});

//MODULE USER
$(document).on('click','#module_user',function(){
//Text keterangan
$("#title_page").text("List User");
$("#title_small_page").text("all list user");
$("#title_page_breadcrumb").text("List USer");
$("#title_page_h3").text("");
$("#module_user").addClass("active");
$("#module_event").removeClass("active");

//show hide data yang akan tampil
global_show_and_hide();
$('#html_form_list').show();

list_user();

});

function list_event()
{
    module_name = 'event';
    var dataevent = $('#dataevent');
    dataevent.empty();
    var db = firebase.database().ref().child(module_name);
    db.on('value', function(data) {
        i = 1;
        data.forEach(function(data) {
          var isi='<tr><td>'+ i++  +'</td><td><img scr="'+ data.val().image +'" width="200px"></td><td>'+data.val().nama_event+'</td><td>'+data.val().tanggal+'</td><td>'+data.val().waktu+'</td><td>'+data.val().kuota_event+'</td><td><button class="btn btn-success" id="detail_event" data-key="'+data.key+'"><span class="fa fa-eye"></span></button><button class="btn btn-info" id="edit_event" data-key="'+data.key+'"><span class="fa fa-pencil"></span></button><button class="btn btn-danger" id="delete_event" data-key="'+data.key+'" ><span class="fa fa-trash"></span></button></td></tr>';
          dataevent.append(isi);
        });
    });
}

function detail_event(key)
{
    module_name = 'event';
    var db = firebase.database().ref().child(module_name).child(key);
    db.on('value', function(data) {

      var btn_detail_user  = "<button class=\"btn btn-primary\" id=\"btn_detail_user\" href=\"#\"> User Mengikuti </button>";
      var head        = "<div class='text-right'>"+btn_detail_user+" "+btn_back+"</div><br>";
      var image       = "<img class=\"img-thumbnail img-responsive center\" style=\"margin:10px; max-width: 80%\"  src=\""+data.val().image+"\"><br>";
      var tanggal     = "Tanggal : "+data.val().tanggal+", "+data.val().waktu+"<br/>";
      var kuota     = "Kuota : "+data.val().kuota+"<br/>";
      var deskripsi   = "<p>"+data.val().deskripsi+"</p>";

      $('#html_event_detail').append(head);
      $('#html_event_detail').append(image);
      $('#html_event_detail').append(tanggal);
      $('#html_event_detail').append(kuota);
      $('#html_event_detail').append(deskripsi);

      $("#title_page_h3").text(data.val().nama_event);
    });
}


function list_user()
{
    module_name = 'user';
    alert("aa");
    var datauser = $('#datauser');
    datauser.empty();
    var db = firebase.database().ref().child(module_name);
    db.on('value', function(data) {
        i = 1;
        data.forEach(function(data) {
          var isi='<tr><td>'+ i++  +'</td><td>'+data.val().User_ID+'</td><td>'+data.val().Nama+'</td><td>'+data.val().Email+'</td><td>'+data.val().Phone+'</td><td><a class="btn btn-default" id="detail_user" data-key="'+data.key+'"><span class="fa fa-eye"></span></a></td></tr>';
          datauser.append(isi);
          console.log(data.val().Nama);
        });
    });
}


//GLOBAL SHOW AND HIDE
function global_show_and_hide()
{
  //show and hide
  $('#html_event_list').hide();
  $('#html_event_detail').empty();
  $('#html_form_list').hide();
  $('#html_user_list').hide();
  $('#html_user_detail').empty();
  $('#html_user_detail_event').hide();



}


//PROSES INPUT dan Delete EVENT
$(document).on('click','#do_db_event',function(){

    module_name = "event";

    //disable_alert
    $("#alert_nama_event").html();
    $("#alert_tanggal").html();
    $("#alert_waktu").html();
    $("#alert_deskripsi").html();
    $("#alert_file").html();

    //get_value
    var key         = $("#key").val();
    var nama_event  = $("#nama_event").val();
    var tanggal     = $("#tanggal").val();
    var waktu       = $("#waktu").val();
    var kuota       = $("#kuota").val();
    var deskripsi   = $("#deskripsi").val();

    //Validasi
    // if(nama_event.length == 0){
    //   $("#alert_nama_event").html("nama event tidak Boleh Kosong");
    // 	$("#nama_event").focus();
    // 	return false();
    // }
    // else if(tanggal.length == 0){
    //   $("#alert_tanggal").html("tanggal tidak Boleh Kosong");
    // 	$("#tanggal").focus();
    // 	return false();
    // }
    // else if(waktu.length == 0){
    //   $("#alert_waktu").html("waktu tidak Boleh Kosong");
    // 	$("#waktu").focus();
    // 	return false();
    // }
    // else if(kuota.length == 0){
    //   $("#alert_kuota").html("kuota tidak Boleh Kosong");
    // 	$("#kuota").focus();
    // 	return false();
    // }
    // else if(deskripsi.length == 0){
    //   $("#alert_deskripsi").html("deskripsi tidak Boleh Kosong");
    // 	$("#deskripsi").focus();
    // 	return false();
    // }
    // else{
        // do_input();
        rand = Math.floor((Math.random() * 100) + 1);
        var key         = 0;
        var nama_event  = "nama event "+ rand;
        var tanggal     = "tanggal "+ rand;
        var waktu       = "waktu "+ rand;
        var kuota       = "kuota "+ rand;
        var deskripsi   = "deskripsi "+ rand;

        //Untuk Input
        if(key == 0)
        {
            var dbRef = firebase.database().ref(module_name);
            dbRef.push({
                  deskripsi: deskripsi,
                  image:"http://www.bekup-portal.com/images/2016/10/08/NEW-BANNER-BEKUP-20-02-1980x768.png",
                  kuota_event: kuota,
                  nama_event: nama_event,
                  tanggal: tanggal,
                  waktu: waktu,
            });
        }
        else  //Untuk Edit
        {
            alert(key);
            var dbRef = firebase.database().ref(module_name+"/"+key);

            dbRef.update({
                deskripsi: deskripsi,
                image:"http://www.bekup-portal.com/images/2016/10/08/NEW-BANNER-BEKUP-20-02-1980x768.png",
                kuota_event: kuota,
                nama_event: nama_event,
                tanggal: tanggal,
                waktu: waktu,
            });
        }

    //}
    //end

});

//DELETE EVENT
$(document).on('click','#delete_event',function(){

  module_name = 'event';
  var confirm1 = confirm('Are you sure you want to delete this item?');
  if (confirm1) {
    var id_db = $(this).data('key');
    var db = firebase.database().ref(module_name).child(id_db);
    db.remove();

    $(".alert-danger").html("data telah terhapus");

    list_event();
  } else {
    // alert('false');
  }

});


});
