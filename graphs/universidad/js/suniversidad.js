

google.load('visualization', '1.0', {packages:['table','corechart']});
sparql(
    // Consulta
    "SELECT distinct ?p (count(*) as ?t) " +
    "WHERE { GRAPH <http://verdata.cl/graphs/demo/> { ?s ?p ?a } } "+
    "GROUP BY ?p",
    // Acción
  function (data) 
	{
	  draChart(data);
	}
 	);
google.setOnLoadCallback(draChart);
function draChart(data) 
	{   
      var options = {'title':'WEB DE DATOS','width':400,'height':300 };
     // var chart = new google.visualization.PieChart(document.getElementById('graficos'));
     // var table = new google.visualization.Table(document.getElementById('grafic1'));
      var bar = new google.visualization.BarChart(document.getElementById('graficos'));
      datax =  new google.visualization.DataTable();
      datax.addColumn('string', 'T1');
      datax.addColumn('number', 'T2');
      datax.addRows(data.results.bindings.length);
      for (i = 0; i < data.results.bindings.length; i++)
      {
        datax.setValue(i, 0, data.results.bindings[i].p.value);
        datax.setValue(i, 1, data.results.bindings[i].t.value);
      } 
      //chart.draw(datax, options);
      //table.draw(datax);
    bar.draw(datax);
  }

