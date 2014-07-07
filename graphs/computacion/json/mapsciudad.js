google.load('visualization', '1', {packages:['map']});
sparql(
    // Consulta
  "prefix u: <http://verdata.cl/graphs/computacion#> " +
 "SELECT ?nombre ?url ?lat ?lon "+
  "  WHERE { GRAPH <http://verdata.cl/graphs/computacion/> "+
   " { ?esc a u:EscuelaProfesional. "+
    "  ?esc u:eResena ?url. "+
     " ?esc u:pertenece ?per. "+
      "?per u:nombre ?nombre. "  +
      "?per u:sede ?sede. "+
     "?per u:corx ?lat. "+
    "?per u:cory ?lon. }}",
    // Acción
  function (dataU) 
	{
	  UPP(dataU);
	}
 	);
google.setOnLoadCallback(UPP);
function UPP(dataU) 
	{   
     var options = { showTip: true, mapType: 'normal',  };
     var chart = new google.visualization.Map(document.getElementById('chart_div'));
      
     var  t=new Array();
     t[0]=['Lat', 'Long', 'Name'];
      for (i = 1; i <= dataU.results.bindings.length; i++)
      {
        t[i]=[parseFloat(dataU.results.bindings[i-1].lat.value),parseFloat(dataU.results.bindings[i-1].lon.value)," <a href='"+dataU.results.bindings[i-1].url.value+"' target='_brank'> "+utf8_decode(dataU.results.bindings[i-1].nombre.value)+"</a>"];        
      } 

     var data = google.visualization.arrayToDataTable(t);
 
      chart.draw(data, options);
    };

 