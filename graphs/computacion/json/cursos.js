/* Aquí va el script para generar la visualización. */
function listaCurso(alpha){
var a="a";
  nom="prefix u: <http://verdata.cl/graphs/computacion#> " +
  "prefix e: <http://verdata.cl/graphs/escuela/> " +
  "SELECT ?uni ?curname " +
  "WHERE { GRAPH <http://verdata.cl/graphs/computacion/> " +
  "{ ?esc a u:EscuelaProfesional. " +
  "  ?esc u:nombre ?nombre.  " +
  "  ?esc u:escuelaCurso ?cur." +
  " ?cur u:nombre ?curname." +
   " ?esc u:pertenece ?per. "+
    "  ?per u:nombre ?uni. "+
  "FILTER(regex(?curname, '"+alpha+"' )). }}"
      
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
          $('<li> <h2>').text(utf8_decode(value.curname.value))
            .append($('<li>').text("Universidad:"+utf8_decode(value.uni.value)) )
          .append($('<p>'))
      );
    });
    });
  function limpiar()
 {
    $('nav#listaUniv ul').remove();
 }


}
/* Aquí va el script para generar la visualización. */
function listaCarrera(titulo){

  nom="prefix u: <http://verdata.cl/graphs/computacion#> " +
"prefix e: <http://verdata.cl/graphs/escuela/> " +
 "   SELECT ?uni ?curname " +
  "  WHERE { GRAPH <http://verdata.cl/graphs/computacion/>  " +
    "{ ?esc a u:EscuelaProfesional. " +
      "?esc u:nombre ?nombre. "  +
      "?esc u:escuelaCurso ?cur. " +
     "?cur u:nombre ?curname.  " +
      " ?esc u:pertenece ?per. "+
    "  ?per u:nombre ?uni. "+
      "FILTER(regex(?nombre, '"+titulo+"','i' )) }} " +
     "order by desc(?nombre)"; 

 
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
          $('<li> <h1>').text(utf8_decode(value.curname.value)) 
           .append($('<li>').text("Universidad:"+utf8_decode(value.uni.value)) )
          .append($('<p>'))
      );
  });
    });
  function limpiar()
 {
    $('nav#listaUniv ul').remove();
 }


}
 