

google.load('visualization', '1.0', {packages:['table','corechart']});
sparql(
    // Consulta
       "prefix r: <http://verdata.cl/graphs/computacion#> " +
    "SELECT ?sede  (count(?sede) as ?cant) "+
    "WHERE   {graph <http://example/computacion> "+
    " { ?uni a  r:Universidad. "+
    "?uni r:sede ?sede."+
    "?uni r:nombre ?nombre.} } "+
    "group by ?sede "+
    "order by asc(?sede)",
    // Acción
  function (data) 
	{
	  draChart(data);
	}
 	);
google.setOnLoadCallback(draChart);
function draChart(data) 
	{   
      var options = {'width':400,'height':400 ,'backgroundColor':'transparent',legend: {position: 'left', textStyle: {color: 'white', fontSize: 10}}};
     var chart = new google.visualization.PieChart(document.getElementById('graficos'));
     // var table = new google.visualization.Table(document.getElementById('grafic1'));
     // var bar = new google.visualization.BarChart(document.getElementById('graficos'));
      datax =  new google.visualization.DataTable();
      datax.addColumn('string', 'T1');
      datax.addColumn('number', 'T2');
      datax.addRows(data.results.bindings.length);
      for (i = 0; i < data.results.bindings.length; i++)
      {
        datax.setValue(i, 0, data.results.bindings[i].sede.value);
        datax.setValue(i, 1, data.results.bindings[i].cant.value);
      } 
      chart.draw(datax, options);
      //table.draw(datax);
   // bar.draw(datax);
  };
function muestraMensaje(date) {

  alert('Gracias por pinchar'+ date );
  
}
  function fondoAzul()
  {
  window.moveTo(0,0);
    if (document.all) {
    top.window.resizeTo(screen.availWidth,screen.availHeight);
    }
    else if (document.layers||document.getElementById) {
    if (top.window.outerHeight<screen.availHeight||top.window.outerWidth<screen.availWidth){
    top.window.outerHeight = screen.availHeight;
    top.window.outerWidth = screen.availWidth;
    }
    } 
}
