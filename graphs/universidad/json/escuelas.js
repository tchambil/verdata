/* Aquí va el script para generar la visualización. */
sparql(
    // Consulta
      
    "prefix u: <http://verdata.cl/graphs/computacion#> "+
    "prefix e: <http://verdata.cl/graphs/escuela/> "+
    "SELECT distinct ?nombre ?url "+
    "WHERE { GRAPH <http://verdata.cl/graphs/computacion/> "+
    "{ ?esc a u:EscuelaProfesional. "+
    "  ?esc u:nombre ?nombre. "+
    "?esc u:eResena ?url.}} "+
    "LIMIT 17",

    // Acción
function Carga(data) {
	$.each(data.results.bindings, function(index, value) {
	    $('nav#listaUniv').append(
		$('<ul">')
        .append($('<li>').append($('<a>').attr('href',value.url.value).attr('target',"_blank").text(value.nombre.value)))
		  );
	});
    });

