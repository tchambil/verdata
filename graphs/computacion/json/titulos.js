/* Aquí va el script para generar la visualización. */
sparql(
    // Consulta
      
"prefix u: <http://verdata.cl/graphs/computacion#>"  +
"prefix e: <http://verdata.cl/graphs/escuela/> " +
 "   SELECT DISTINCT ?titulo (count(*) as ?c)"+
  "  WHERE { GRAPH <http://verdata.cl/graphs/computacion/> " +
   " { ?acad a u:Academico. " +
    "  ?acad u:TituloGrado ?titulo.  }}" +
"group by (?titulo)" +
"order by asc(?titulo)",

    // Acción
function Carga(data) {
  $('nav#listaUniv1').append(
    $('<ul>'));
  $.each(data.results.bindings, function(index, value) {
    if(!(utf8_decode(value.titulo.value) ==""))
    {
        $('nav#listaUniv1 ul').append(
          $('<li> <h1>').append($('<a>').attr('href',"javascript:listaTituloPerson('"+value.titulo.value+"')").text(utf8_decode(value.titulo.value)+" ("+ value.c.value+")" ))
    );
        }
  });
    });