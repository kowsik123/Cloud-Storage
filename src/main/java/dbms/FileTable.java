package dbms;

import java.io.File;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import jcloud.ServerPage;
import static jcloud.ServerPage.fpath;
import static jcloud.ServerPage.getExt;

public class FileTable extends Dbms {
    public static UserTable ut=new UserTable();

    public void createTable() {
        System.out.println(query("create table files("
                + "id int primary key auto_increment,"
                + "fname varchar(100),"
                + "ext varchar(50),"
                + "parent int,"
                + "fsize int);"));
    }

    public void deleteTable() {
        System.out.println("drop table files");
    }

    public int createFile(String name, String ext, int parent, long size,HttpServletRequest req) {
        try {
            PreparedStatement ps = getPs("insert into files (fname,ext,parent,fsize) values(?,?,?,?)");
            ps.setString(1, name);
            ps.setString(2, ext);
            ps.setInt(3, parent);
            ps.setLong(4, size);
            ps.execute();
            PreparedStatement pss = getPs("select last_insert_id();");
            ResultSet rs = pss.executeQuery();
            if (rs.next()) {
                 ut.updateSize(size, req);
                return rs.getInt("last_insert_id()");
            } else {
                return -1;
            }
           

        } catch (Exception e) {
            e.printStackTrace();
        }

        return -1;
    }
    public boolean deleteFile(int id,HttpServletRequest req){
        try{
            long size=getSize(id);
            
            File f=new File(ServerPage.fpath+id+"."+getExt(id));
            
            PreparedStatement ps=getPs("delete from files where id=?");
            ps.setInt(1, id);
            ut.updateSize(-size,req);
            ps.execute();
            return f.delete();
        }catch(Exception e){
            e.printStackTrace();
            
        }return false;
    }
    
    public boolean renameFile(int id,String newname){
        try {
            String ext=getExt(id);
            PreparedStatement ps=getPs("update files set fname=?,ext=? where id=?");
            ps.setString(1, newname);
            ps.setString(2, ServerPage.getExt(newname));
            ps.setInt(3, id);
            
            ps.execute();
            File f=new File(fpath+id+"."+ext);
            
            f.renameTo(new File(fpath+id+"."+getExt(id)) );

            
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
    
    public ArrayList<SqlFile> getFileList(int parentid) {
        try {
            ArrayList<SqlFile> sqlfile = new ArrayList<>();
            PreparedStatement ps = getPs("select id,fname from files where parent=?");
            ps.setInt(1, parentid);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                sqlfile.add(SqlFile.getFile(rs.getString("fname"), rs.getInt("id")));
            }
            return sqlfile;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public long getSize(int fid) {
        try {
            PreparedStatement ps = getPs("select fsize from files where id=?");
            ps.setInt(1, fid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getLong("fsize");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }
    
    public String getExt(int id){
        try{
            PreparedStatement ps=getPs("select ext from files where id=?");
            ps.setInt(1, id);
            ResultSet rs=ps.executeQuery();
            if(rs.next()) return rs.getString("ext");
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public static void main(String[] args) {
        new FileTable().createTable();
    }
//    public static void main(String[] args) {
//        File f=new File("/home/kowsik/Documents/Netbeans/jcloud_linux/src/main/java/data/files/2.pdf");
//        f.renameTo(new File(ServerPage.fpath+"2.doc") );
//    }
}
