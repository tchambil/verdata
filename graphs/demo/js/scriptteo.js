/* Aquí va el script para generar la visualización. */

sparql(
    // Consulta
    "SELECT distinct ?s ?p ?o " +
    "WHERE { GRAPH <http://verdata.cl/graphs/demo/> { ?s ?p ?o } } ",
    // Acción
    function teo(data) {
	$.each(data.results.bindings, function(index, value) {
	    $('table#named-graph-list').append(
		$('<tr>')
		    .append($('<td>').text(value.s.value))
		    .append($('<td>').text(value.p.value))
		    .append($('<td>').text(value.o.value))
	    );
	});
    });

