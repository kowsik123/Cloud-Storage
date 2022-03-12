package jcloud;

import dbms.SqlFile;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.http.HttpServletResponse;

public class JSONWriter{
	PrintWriter out=null;
	HashMap<String, String> map=null;
	public JSONWriter(HttpServletResponse response) {
		try {
			response.setContentType("text/json");
			out=response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public void setObjectValue(String key,Object value){
		if(map==null) map=new HashMap<String,String>();
		if(value instanceof String) map.put("\""+key+"\"", "\""+value.toString()+"\"");
		else map.put("\""+key+"\"", value.toString());
	}
	public void setContent(Object value){
		out.print(value.toString());
	}
	public void close(){
		if(map!=null) out.print(map.toString().replaceAll("=", ":") );
		out.close();
	}
}