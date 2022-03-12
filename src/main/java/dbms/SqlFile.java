package dbms;

import java.io.File;
import jcloud.ServerPage;

public class SqlFile {
    private String name;
    private int id;
    private boolean flag;
    private SqlFile(){}
    public boolean isFile(){return !flag;}
    public boolean isFolder(){return flag;}
    public String getName(){return name;}
    public int getId(){return id;}
    public static SqlFile getFile(String name,int id){
        SqlFile fi=new SqlFile();
        fi.flag=false;
        fi.name=name;
        fi.id=id;
        return fi;
    }
    public static SqlFile getFolder(String name,int id){
        SqlFile fi=new SqlFile();
        fi.flag=true;
        fi.name=name;
        fi.id=id;
        return fi;
    }
    @Override
    public String toString(){
        if(isFolder()) return "{\"name\" : \""+name+"\", \"id\" : "+id+", \"folders\": [], \"files\": []}";
        else return "{\"name\" : \""+name+"\", \"id\" : "+id+"}";
    }
}