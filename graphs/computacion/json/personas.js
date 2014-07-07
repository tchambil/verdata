/* Aquí va el script para generar la visualización. */
function listaPerson(alpha){
var a="a";
  nom="prefix u: <http://verdata.cl/graphs/computacion#> " +
"prefix e: <http://verdata.cl/graphs/escuela/> " +
" select * where "+
"{{ " +

 "   SELECT ('Academico' as ?tipo) ?apepart ?apemat ?name ?sexo ?titulo ?publ ?cv " +
  "  WHERE { GRAPH <http://verdata.cl/graphs/computacion/>  " +
    "{ ?acad a u:Academico. " +
    "  ?acad u:TituloGrado ?titulo. " +
     " ?acad u:apellidoMaterno ?apemat . " +
      "?acad u:apellidoPaterno ?apepart. " +
      "?acad u:nombre ?name.  " +
      "?acad u:sexo ?sexo. "+
      "?acad u:ePublicacion ?publ. "+
      "?acad u:eCurriculum ?cv . "+
      "FILTER(regex(?apepart, '"+alpha+"' )) }}}"+
    " union "+
     " { SELECT ('Alumno' as ?tipo) ?apepart ?apemat ?name ('"+a+"' as ?titulo)  ('"+a+"' as ?publ) ('"+a+"' as ?cv)" +
  "  WHERE { GRAPH <http://verdata.cl/graphs/computacion/>  " +
   "{ ?alu a u:Alumno. "+ 
    "  ?alu u:apellidoMaterno ?apemat . "+
     "?alu u:apellidoPaterno ?apepart. "+
      "?alu u:nombre ?name. "+
      "FILTER(regex(?apepart, '"+alpha+"' )).}} " +
      "}} " 
      
   limpiar();

   sparql(
    nom     
 ,

    // Acción
function Carga(data) {
  $('nav#listaUniv').append(
    $('<ul>'));
  $.each(data.results.bindings, function(index, value) {
    if((value.tipo.value=="Academico"))
    {
      $('nav#listaUniv ul').append(
          $('<li> <h1>').text(utf8_decode(value.apepart.value)+" "+utf8_decode(value.apemat.value)+", "+utf8_decode(value.name.value)+ " [Academico]")
          .append($('<li>').text("Titulo:"+utf8_decode(value.titulo.value)) )
           .append($('<li>').text("Web Site:").append($('<a>').attr('href',value.cv.value).attr('target',"_blank").text(value.cv.value)))
           .append($('<li>').text("Publicaciones:").append($('<a>').attr('href',value.publ.value).attr('target',"_blank").text(value.publ.value)))
          .append($('<p>'))
      );
    }
    else
    {
          $('nav#listaUniv ul').append(
          $('<li> <h1>').text(utf8_decode(value.apepart.value)+" "+utf8_decode(value.apemat.value)+", "+utf8_decode(value.name.value)+ " [Alumno]")
          .append($('<p>'))
      );
    }
  });
    });
  function limpiar()
 {
    $('nav#listaUniv ul').remove();
     $('#grafico').remove();
 }


}
/* Aquí va el script para generar la visualización. */
function listaTituloPerson(titulo){

  nom="prefix u: <http://verdata.cl/graphs/computacion#> " +
"prefix e: <http://verdata.cl/graphs/escuela/> " +
 "   SELECT ?apepart ?apemat ?name ?sexo ?titulo ?publ ?cv" +
  "  WHERE { GRAPH <http://verdata.cl/graphs/computacion/>  " +
    "{ ?acad a u:Academico. " +
    "  ?acad u:TituloGrado ?titulo. " +
     " ?acad u:apellidoMaterno ?apemat . " +
      "?acad u:apellidoPaterno ?apepart. " +
      "?acad u:nombre ?name.  " +
      "?acad u:sexo ?sexo. "+
      "?acad u:ePublicacion ?publ. "+
      "?acad u:eCurriculum ?cv . "+

      "FILTER(regex(?titulo, '"+titulo+"','i' )) }} " +
     "order by desc(?titulo)"; 


   limpiar();

   sparql(
    nom     
 ,

    // Acción
function Carga(data) {
  $('nav#listaUniv').append(
    $('<ul>'));
  $.each(data.results.bindings, function(index, value) {
      $('nav#listaUniv ul').append(
          $('<li> <h1>').text(utf8_decode(value.apepart.value)+" "+utf8_decode(value.apemat.value)+", "+utf8_decode(value.name.value))
          .append($('<li>').text("Titulo:"+utf8_decode(value.titulo.value)) )
           .append($('<li>').text("Web Site:").append($('<a>').attr('href',value.cv.value).attr('target',"_blank").text(value.cv.value)))
           .append($('<li>').text("Publicaciones:").append($('<a>').attr('href',value.publ.value).attr('target',"_blank").text(value.publ.value)))
          .append($('<p>'))
      );
  });
    });
  function limpiar()
 {
    $('nav#listaUniv ul').remove(); 
    $('#grafico').remove();
 }


} 
google.load('visualization', '1.0', {packages:['table','corechart']});
 
    // Consulta
    function mostrargrafico(){
  rem="prefix u: <http://verdata.cl/graphs/computacion#> " +
   "SELECT ?sexo (count(*) as ?cant) " +
   " WHERE { GRAPH <http://verdata.cl/graphs/computacion/> " +
   "{ ?acad a u:Academico. " +
   " ?acad u:sexo ?sexo.  }} " +
   "group by (?sexo)"  ;

   sparql(
    rem   ,
    // Acción
  function (dataU) 
  {
    UPP(dataU);
  }
  ); 
} 
function UPP(dataU) 
  {   
      var options = {'width':500,'height':500 ,'backgroundColor':'transparent',  is3D: true, legend: {position: 'none', textStyle: {color: 'white', fontSize: 10}}};
     var chart = new google.visualization.PieChart(document.getElementById('grafico'));
     datax =  new google.visualization.DataTable();
      datax.addColumn('string', 'T1');
      datax.addColumn('number', 'T2');
      datax.addRows(dataU.results.bindings.length);
      for (i = 0; i < dataU.results.bindings.length; i++)
      { var tipe
        if(dataU.results.bindings[i].sexo.value=="M")
        {
          tipe="Hombres"
        }
        else
          {tipe="Mujeres"}
        datax.setValue(i, 0, tipe);
        datax.setValue(i, 1, dataU.results.bindings[i].cant.value);
      } 
      chart.draw(datax, options);
    };
