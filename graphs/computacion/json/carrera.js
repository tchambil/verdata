/* Aquí va el script para generar la visualización. */
sparql(
    // Consulta
      
"prefix u: <http://verdata.cl/graphs/computacion#> " +
"prefix e: <http://verdata.cl/graphs/escuela/> " +
 "   SELECT distinct ?nombre   " +
  "  WHERE { GRAPH <http://verdata.cl/graphs/computacion/> " +
   " { ?esc a u:EscuelaProfesional." +
    "  ?esc u:nombre ?nombre.  " +
     " ?esc u:escuelaCurso ?cur." +
     "?cur u:nombre ?curname.   }}",

    // Acción
function Carga(data) {
  $('nav#listaUniv1').append(
    $('<ul>'));
  $.each(data.results.bindings, function(index, value) {
    if(!(utf8_decode(value.nombre.value) ==""))
    {
        $('nav#listaUniv1 ul').append(
          $('<li> <h1>').append($('<a>').attr('href',"javascript:listaCarrera('"+value.nombre.value+"')").text(utf8_decode(value.nombre.value) ))
    );
        }
  });
    });