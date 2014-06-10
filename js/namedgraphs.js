
sparql(
    // Consulta
    "SELECT distinct ?g (count(*) as ?q) " +
    "WHERE { GRAPH ?g { ?s ?p ?o } } " +
    "GROUP BY ?g " +
    "ORDER BY DESC(?q)",
    // Acción
    function(data) {
	$.each(data.results.bindings, function(index, value) {
	    $('table#named-graph-list').append(
		$('<tr>')
		    .append($('<td>').append(
			$('<a>')
			    .attr('href',value.g.value.replace('http://verdata.cl/','') + 'index.html')
			    .text(value.g.value)))
		    .append($('<td>').text(value.q.value))
	    );
	});
    });
