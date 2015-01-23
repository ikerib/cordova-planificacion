
var eguneratu = function (mydate) {
  if (mydate === undefined) { return false }
  var jqxhr = $.getJSON( "http://gitek2.grupogureak.com/api/getplanificacion/" + mydate, function(data) {
    $('#mytable').empty();
    var items = [];
    var mycount = data.length;

    for ( var i=0; i<mycount; i++) {
      var _id = data[i]._id;
      var val = data[i].ref;
      var tof;
      var tref;

      val = val.replace("<BR>", "<br>").replace("<BR />", "<br>").replace("<br />", "<br>");
      if (val === undefined) { return false }
      var n = val.indexOf("<br>");
      if (n > 0) {
        var miarray = val.split('<br>');
        tref = miarray[0];
        tof = miarray[1];
      } else {
        return;
      }
      var that = this;

      var myurl = "http://gitek2.grupogureak.com/proxy/expertis/" + tof;

      $.ajax({
        url: myurl,
        dataType: 'json',
        async: true,
        success: function(data) {
          var QFabricar = parseInt(data.QFabricar);
          var QFabricada = parseInt(data.QFabricada);
          var QIniciada = parseInt(data.QIniciada);
          $('#mytable').append(
              '<li>'
                  +'<h3>Ref: ' + data.IDArticulo + ' // OF: ' + data.NOrden + '</h3>'
                  +'<p> Fabricada : ' + QFabricada.toString() + '</p>'
                  +'<p> A Fabricar: ' + QFabricar.toString() + '</p>'
             +'</li>'
          );
        }
      });
    }
  });

}

document.addEventListener('deviceready', function () {

  var gaur = $('#gaur').text();
  console.log (">" + $('#gaur').text());

  if ( (gaur === undefined) ||  ( gaur === "") ) {
    var fetxa = moment().format('YYYY-MM-DD');
    this.gaur = fetxa;
    $('#gaur').text(fetxa);
  }
  console.log("gaur  :" + gaur);

  eguneratu(fetxa);

  $('#dayprev').on('click', function(e){
    e.stopImmediatePropagation();
    e.preventDefault();
    var gaur = $('#gaur').text();
    var momentgaur = moment(gaur, "YYYY-MM-DD").subtract(1, 'days').format('YYYY-MM-DD');

    eguneratu(momentgaur);
    $('#gaur').text(momentgaur);
  });

  $('#daynext').on('click', function(e){
    e.stopImmediatePropagation();
    e.preventDefault();
    var gaur = $('#gaur').text();
    var momentgaur = moment(gaur, "YYYY-MM-DD").add(1, 'days').format('YYYY-MM-DD');

    eguneratu(momentgaur);
    $('#gaur').text(momentgaur);
  });


}, false);


