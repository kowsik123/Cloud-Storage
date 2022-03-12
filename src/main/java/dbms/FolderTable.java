package dbms;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;

public class FolderTable extends Dbms {

    public static FileTable fit = new FileTable();

    public void createTable() {
        System.out.println(query("create table folders("
                + "id int primary key auto_increment,"
                + "fname varchar(100),"
                + "parent int);"));
    }

    public void deleteTable() {
        System.out.println(query("drop table folders;"));
    }

    public int createFolder(String fname, int parent) {
        try {
            PreparedStatement ps = getPs("insert into folders (fname,parent) values(?,?)");
            ps.setString(1, fname);
            ps.setInt(2, parent);
            ps.execute();
            PreparedStatement pss = getPs("select last_insert_id();");

            ResultSet rs = pss.executeQuery();
            if (rs.next()) {
                return rs.getInt("last_insert_id()");
            } else {
                return -1;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;
    }

    public boolean deleteFolder(int fid, HttpServletRequest req) {
        if (new UserTable().getRootId(req) == fid) {
            return false;
        }
        try {
            PreparedStatement ps = getPs("delete from folders where id=?");
            ps.setInt(1, fid);
            if(ps.execute()) deleteInnerFolder(fid, req);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
    
    
    public void deleteInnerFolder(int parentid,HttpServletRequest req){
        
         ArrayList<SqlFile> sf = getFolderList(parentid);
        ArrayList<SqlFile> sfi = fit.getFileList(parentid);
         for (SqlFile i : sfi) {
            fit.deleteFile(i.getId(), req);
            
        }
          if (sf.size() < 1) {
            return;
        }

        for (SqlFile i : sf) {
            deleteInnerFolder(i.getId(), req);
            try {
                PreparedStatement ps = getPs("delete from folders where id=?");
                ps.setInt(1, i.getId());
                ps.execute();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return;
        
    }

    public boolean renameFolder(String fname, int id) {
        try {
            PreparedStatement ps = getPs("update folders set fname=? where id=?");
            ps.setString(1, fname);
            ps.setInt(2, id);
            return ps.execute();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public ArrayList<SqlFile> getFolderList(int parentid) {
        try {
            ArrayList<SqlFile> sqlfile = new ArrayList<>();
            PreparedStatement ps = getPs("select id,fname from folders where parent=?");
            ps.setInt(1, parentid);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                sqlfile.add(SqlFile.getFolder(rs.getString("fname"), rs.getInt("id")));
            }
            return sqlfile;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public long getFolderSize(int parentid) {
        ArrayList<SqlFile> sf = getFolderList(parentid);
        ArrayList<SqlFile> sfi = fit.getFileList(parentid);
        long totalsize = 0;
        for (SqlFile i : sfi) {
            totalsize += fit.getSize(i.getId());
        }

        if (sf.size() < 1) {
            return totalsize;
        }

        long Totsize = 0;
        for (SqlFile i : sf) {
            Totsize += getFolderSize(i.getId());
        }
        return totalsize + Totsize;
    }
    
    public String getName(int id){
        try {
            PreparedStatement ps=getPs("select fname from folders where id=?");
            ps.setInt(1,id);
            ResultSet rs=ps.executeQuery();
            if(rs.next()) {
                return rs.getString("fname");
            }
            else{
                System.out.println("no records");
            }
        } catch (Exception e) {
            System.out.println("error:");
            e.printStackTrace();
        }
        return null;
    }
    
    public static void main(String[] args) {
        new FolderTable().createTable();
    }

}
