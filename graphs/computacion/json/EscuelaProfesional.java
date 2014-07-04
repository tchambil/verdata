package Universidad;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

public class EscuelaProfesional {
	private String service = null;
	private String apikey = null;
	public EscuelaProfesional(String service, String apikey) 
	{
		this.service = service;this.apikey = apikey;
	}
	public String executeQuery(String queryText, String acceptFormat) throws Exception {
		String httpQueryString = String.format("query=%s&apikey=%s", 
			     URLEncoder.encode(queryText, "UTF-8"), 
			     URLEncoder.encode(this.apikey, "UTF-8"));

		URL url = new URL(this.service + "?" + httpQueryString);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Accept", acceptFormat);

		conn.connect();
		InputStream in = conn.getInputStream();
		BufferedReader reader = new BufferedReader(new InputStreamReader(in));
		StringBuilder buff = new StringBuilder();
		String line = null;
		while ((line = reader.readLine())!=null) {
			buff.append(line);
			buff.append("\n");
		}
		conn.disconnect();
		return buff.toString();
	}
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		//url EndPoint
		String sparqlService = "http://sparql.verdata.cl/verdata/sparql";
		String apikey = "YOUR API KEY HERE";
		//Query 
    	String query = "prefix u: <http://verdata.cl/graphs/computacion#> " +
		    "SELECT ?url ?name "+
		    "WHERE { GRAPH <http://example/computacion> " +
		    "{ ?uni u:nombre ?name; "+
		     "    a u:Universidad. "+
		    "?uni    u:eUniversidad ?url. "+
		    "?uni    u:sede ?sede. }} ";
		EscuelaProfesional test = new EscuelaProfesional(sparqlService, apikey);
 		String response = null;
		try {
			response = test.executeQuery(query,"text/tab-separated-values");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(response);

	}

}
