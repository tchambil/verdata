/* Aquí va el script para generar la visualización. */

sparql(
    // Consulta
    "SELECT ?id ?type ?name ?desc ?inst ?region ?pd ?cd ?pos ?onu ?unit ?q ?generic ?lvl1 ?lvl2 ?lvl3" +
    "WHERE { GRAPH <http://verdata.cl/graphs/mercadopublico>" +
	"{?s  <http://examples.org/mp#IDs> ?id."+
	"?s  <http://examples.org/mp#Type> ?type."+
	"?s  <http://examples.org/mp#InstitutionName> ?name."+
	"?s  <http://examples.org/mp#Description> ?desc."+
	"?s  <http://examples.org/mp#Institution> ?inst."+
	"?s  <http://examples.org/mp#Region> ?region."+
	"?s  <http://examples.org/mp#PublicationDate> ?pd."+
	"?s  <http://examples.org/mp#ClosingDate> ?cd."+
	"?s  <http://examples.org/mp#ProductOrService> ?pos."+
	"?s  <http://examples.org/mp#ONU> ?onu."+
	"?s  <http://examples.org/mp#Unit> ?unit."+
	"?s  <http://examples.org/mp#Quantity> ?q."+
	"?s  <http://examples.org/mp#Generic> ?generic."+
	"?s  <http://examples.org/mp#Level1> ?lvl1."+
	"?s  <http://examples.org/mp#Level2> ?lvl2."+
	"?s  <http://examples.org/mp#Level3> ?lvl3."+
	"} } ",
	
    // Acción
    function(data) {
        $.each(data.results.bindings, function(index, value) {
            $('table#named-graph-list').append(
                $('<tr>')
                    .append($('<td>').text(value.id.value))
                    .append($('<td>').text(value.type.value))
                    .append($('<td>').text(value.name.value))
					.append($('<td>').text(value.desc.value))
					.append($('<td>').text(value.inst.value))
					.append($('<td>').text(value.region.value))
					.append($('<td>').text(value.pd.value))
					.append($('<td>').text(value.cd.value))
					.append($('<td>').text(value.pos.value))
					.append($('<td>').text(value.onu.value))
					.append($('<td>').text(value.unit.value))
					.append($('<td>').text(value.q.value))
					.append($('<td>').text(value.lvl1.value))
					.append($('<td>').text(value.lvl2.value))
					.append($('<td>').text(value.lvl3.value))
            );
        });
    });