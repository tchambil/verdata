/* Aquí va el script para generar la visualización. */
var xlugar='Lima';
sparql(
    // Consulta
      
     "prefix u: <http://verdata.cl/graphs/computacion#> " +
    "SELECT ?url ?name "+
    "WHERE { GRAPH <http://example/computacion> " +
    "{ ?uni u:nombre ?name; "+
     "    a u:Universidad. "+
    "?uni    u:eUniversidad ?url. "+
    "?uni    u:sede ?sede. "+
   //"FILTER(regex(?sede, "+document.getElementById('lima').href += Lima+)). }} ",
    "FILTER(regex(?sede, '"+xlugar+"')). }} ",
    // Acción
function Carga(data) {
	$.each(data.results.bindings, function(index, value) {
	    $('nav#listaUniv').append(
		$('<ul">')
        .append($('<li>').append($('<a>').attr('href','http://'+value.url.value).attr('target',"_blank").text(value.name.value)))
		  );
	});
    });

