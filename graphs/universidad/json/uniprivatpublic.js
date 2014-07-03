

google.load('visualization', '1.0', {packages:['table','corechart']});
sparql(
    // Consulta
    "prefix r: <http://verdata.cl/graphs/computacion#>"+ 
    "SELECT ?tipo (count(?tipo) as ?cant)  "+
    "WHERE   {graph <http://verdata.cl/graphs/computacion/>"+ 
    " { ?uni a  r:Universidad. " + 
    "?uni r:tipoU  ?tipo. } }  "+
    "group by ?tipo "+
    "order by asc(?tipo)",

    // Acción
  function (dataU) 
	{
	  UPP(dataU);
	}
 	);
google.setOnLoadCallback(draChart);
function UPP(dataU) 
	{   
      var options = {'width':150,'height':150 ,'backgroundColor':'transparent',  is3D: true, legend: {position: 'none', textStyle: {color: 'white', fontSize: 10}}};
     var chart = new google.visualization.PieChart(document.getElementById('privatepublic'));
     datax =  new google.visualization.DataTable();
      datax.addColumn('string', 'T1');
      datax.addColumn('number', 'T2');
      datax.addRows(dataU.results.bindings.length);
      for (i = 0; i < dataU.results.bindings.length; i++)
      {
        datax.setValue(i, 0, dataU.results.bindings[i].tipo.value);
        datax.setValue(i, 1, dataU.results.bindings[i].cant.value);
      } 
      chart.draw(datax, options);
    };
  
 