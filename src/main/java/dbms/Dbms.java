package dbms;

import java.sql.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

public class Dbms {

    Connection con;
    Statement st;

    public Dbms() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/cloud","mysql_user", "mysql_password");
            con.setAutoCommit(true);
            st = con.createStatement();
        } catch (ClassNotFoundException | SQLException e) {
            System.out.println(e);
        }
    }

    public boolean query(String s) {
        try {
            st.executeUpdate(s);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public PreparedStatement getPs(String query) {
        try {
            return con.prepareStatement(query);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public void close() {
        try {
            con.close();
        } catch (Exception e) {
        }
    }
    
    public static String getCookieValue(String key,HttpServletRequest req){
        Cookie[] arr= req.getCookies();
        if(arr==null) return null;
        for(Cookie i : arr){
            if(i.getName().equals(key)) return i.getValue();
        }
        return null;
    }
    
    public static void main(String[] args) throws Exception{
        new Dbms(  );
    }

}