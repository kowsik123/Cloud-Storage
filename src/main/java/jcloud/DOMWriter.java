package jcloud;

import java.io.*;
import java.util.*;
import javax.servlet.http.HttpServletResponse;

public class DOMWriter{
	private PrintWriter out;
	private String data;
	public DOMWriter(HttpServletResponse res,String path) throws IOException {
		res.setContentType("text/html");
		out=res.getWriter();
		File f=new File(path);
		Scanner scan=new Scanner(f);
		data="";
		while(scan.hasNext()) data+=scan.nextLine()+"\r\n";
	}
	public DOMWriter(String s){
		data=s;
	}
	public void setValue(String name,Object value){
		String val;
		
		if(value instanceof int[]) val=Arrays.toString((int[])value);
		else if(value instanceof Object[]) val=Arrays.toString((Object[])value);
		else if(value instanceof float[]) val=Arrays.toString((float[])value);
		else val=value.toString();
		
		data=data.replace("{{"+name+"}}",val);
	}
	public void close(){
		data=data.replaceAll("[{][{].*[}][}]", "");
		out.print(data);
		out.close();
	}
	public String toString(){
		return data.replaceAll("[{][{].*[}][}]", "");
	}
}