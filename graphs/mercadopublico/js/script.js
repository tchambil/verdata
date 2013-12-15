/* Aquí va el script para generar la visualización. */

sparql(
    // Consulta
    "SELECT ?id ?type ?name ?desc ?inst ?region ?pd ?cd ?pos ?onu ?unit ?q ?generic ?lvl1 ?lvl2 ?lvl3" +
    "WHERE { GRAPH <http://verdata.cl/graphs/mercadopublico>" +
	"{?s  <http://examples.org/mp#InstitutionName> ?name."+
	"?s  <http://examples.org/mp#Description> ?desc."+
	"?s  <http://examples.org/mp#Institution> ?inst."+
	"?s <http://examples.org/mp#Region> 'Región del Maule ' ."+
	"?s  <http://examples.org/mp#Region> ?region."+
	"?s  <http://examples.org/mp#PublicationDate> ?pd."+
	"?s  <http://examples.org/mp#ClosingDate> ?cd."+
	"?s  <http://examples.org/mp#ProductOrService> ?pos."+
	"?s  <http://examples.org/mp#Quantity> ?q."+
	"FILTER( ?pd >= ('01-DIC-2013'))."+
	"} } ORDER BY DESC(?pd) ",
	
    // Acción
    function(data) {
        $.each(data.results.bindings, function(index, value) {
            $('#data').append(
                $('<tr>')
                    .append($('<td>').text(value.name.value))
					.append($('<td>').text(value.desc.value))
					.append($('<td>').text(value.inst.value))
					.append($('<td>').text(value.region.value))
					.append($('<td>').text(value.pd.value))
					.append($('<td>').text(value.cd.value))
					.append($('<td>').text(value.pos.value))
					.append($('<td>').text(value.q.value))
            );
        });
    });