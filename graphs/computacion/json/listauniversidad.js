/* Aquí va el script para generar la visualización. */
google.load('visualization', '1.0', {packages:['table','corechart']});
sparql(
    // Consulta
   "prefix u: <http://verdata.cl/graphs/computacion#> " +
" prefix u: <http://verdata.cl/graphs/computacion#> " +
 "SELECT ?universidad ?url ?nombre ?urle"+
   " WHERE { GRAPH <http://verdata.cl/graphs/computacion/> "+
    "{ ?esc a u:EscuelaProfesional." +
     "?esc u:nombre ?nombre.  " +
      "?esc u:pertenece ?per. "+
      "?per u:nombre ?universidad. "+
      "?per u:eUniversidad ?url. "+
      "?per u:sede ?sede. "+
      " ?esc u:eResena ?urle. "+
   "FILTER(regex(?sede, '"+Lugar+"')). }}",

    // Acción
  function (dataU) 
  {
    UPP(dataU);
  }
  ); 
function UPP(dataU) 
  {   
      var options = {'width':900,'height':400,'allowHtml': true};
     var chart = new google.visualization.Table(document.getElementById('chart_div'));
     datax =  new google.visualization.DataTable();
      datax.addColumn('string', 'Universidad');
      datax.addColumn('string', 'Web Site');
      datax.addColumn('string', 'Escuela Profesional');

      datax.addRows(dataU.results.bindings.length);
      for (i = 0; i < dataU.results.bindings.length; i++)
      {  
        datax.setValue(i, 0, utf8_decode(dataU.results.bindings[i].universidad.value));
        datax.setValue(i, 1, '<a href=http://'+utf8_decode(dataU.results.bindings[i].url.value)+'>'+utf8_decode(dataU.results.bindings[i].url.value)+ '</a>');
        datax.setValue(i, 2, '<a href='+utf8_decode(dataU.results.bindings[i].urle.value)+'>'+utf8_decode(dataU.results.bindings[i].nombre.value)+ '</a>');
     
      } 
      chart.draw(datax, options);
    };
