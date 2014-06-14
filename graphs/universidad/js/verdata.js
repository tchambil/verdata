
function sparql(query, fun) {
    $.ajax({
	url: "http://sparql.verdata.cl/verdata/query",
	dataType: "jsonp",
	data: { query: query, output: "json" }
    }).done(fun);
}
