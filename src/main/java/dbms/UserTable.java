package dbms;

import java.io.File;
import java.math.BigDecimal;
import java.sql.*;
import javax.crypto.*;
import javax.crypto.spec.*;
import java.security.spec.*;
import java.util.*;
import javax.servlet.http.HttpServletRequest;

public class UserTable extends Dbms {

    public void createTable() {
        System.out.println(query("create table users("
                + "id int primary key auto_increment,"
                + "full_name varchar(100),"
                + "email varchar(200) unique,"
                + "pwd varchar(100),"
                + "root int,"
                + "storage_space int);"));

    }

    public void deleteTable() {
        System.out.println(query("drop table users;"));
    }

    public boolean isEmailThere(String email) {
        return (getUserId(email) != -1);
    }

    public String signUp(String fullname, String email, String password, String imgPath) {
        try {
            File img = new File(imgPath);
            if (img.length() > 15000000) {
                return "SIGNUP LARGE_IMAGE_SIZE";
            }
            if (getUserId(email) != -1) {
                return "SIGNUP EMAIL_EXISTS";
            }
            if (fullname.length() < 1 && password.length() < 1) {
                return "SIGNUP ZERO_LENGTH";
            }

            PreparedStatement ps = getPs("insert into users(full_name,email,pwd,root) values(?,?,?,?)");
            ps.setString(1, fullname);
            ps.setString(2, email);
            ps.setString(3, hashp(password));

            int rootid = new FolderTable().createFolder("root", -1);
            if (rootid == -1) {
                return "SIGNUP FAILED";
            }

            ps.setInt(4, rootid);
            ps.execute();
            return "SIGNUP SUCCESS";

        } catch (Exception e) {
            e.printStackTrace();
        }
        return "SIGNUP FAILED";
    }

    public String signIn(String email, String password) {

        try {
            PreparedStatement ps = getPs("select id from users where id=? and pwd=?");
            int userId = getUserId(email);
            if (userId == -1) {
                return "SIGNIN EMIAL_NOT_FOUND";
            }
            ps.setInt(1, userId);
            ps.setString(2, hashp(password));
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return "SIGNIN SUCCESS";
            } else {
                return "SIGNIN INCORRECT_PASSWORD";
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "SIGNIN FAILED";
    }

    public String updateName(HttpServletRequest req, String newName) {
        try {
            if (newName.length() < 1) {
                return "UPDATE ZERO_LENGTH";
            }
            PreparedStatement ps = getPs("update users set full_name=? where email=?");
            ps.setString(1, newName);
            ps.setString(2, getCookieValue("email", req));
            if (ps.execute()) {
                return "UPDATE SUCCESS";
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "UPDATE FAILED";
    }

    public String updatePassword(HttpServletRequest req, String newPassword) {
        try {
            if (newPassword.length() < 1) {
                return "FORGOT_PASSWORD ZERO_LENGTH";
            }
            PreparedStatement ps = getPs("update users set pwd=? where email=?");

            ps.setString(1, hashp(newPassword));

            ps.setString(2, getCookieValue("email", req));
            ps.execute();
            return "FORGOT_PASSWORD SUCCESS";

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "FORGOT_PASSWORD FAILED";
    }

    public boolean updateSize(long size, HttpServletRequest req) {
        try {
            PreparedStatement ps = getPs("update users set storage_space=? where email=?");
            ps.setLong(1, getStorage(req) + size);
            ps.setString(2, getCookieValue("email", req));
            return ps.execute();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public String getName(HttpServletRequest req) {
        try {
            PreparedStatement ps = getPs("select full_name from users where email=?");
            ps.setString(1, getCookieValue("email", req));
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getString("full_name");
            }
        } catch (Exception e) {
        }
        return null;
    }

    public long getStorage(HttpServletRequest req) {
        try {
            PreparedStatement ps = getPs("select storage_space from users where email=?");
            ps.setString(1, getCookieValue("email", req));
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getLong("storage_space");
            }
        } catch (Exception e) {
        }
        return -1;
    }

    public float getStoragePercent(HttpServletRequest req) {
        long st = getStorage(req);
        BigDecimal max = new BigDecimal(st + "");
        float p = max.divide(new BigDecimal("2147483648")).multiply(new BigDecimal("100")).floatValue();
        System.out.println(p);
        return p;
    }

    public int getRootId(HttpServletRequest req) {
        try {
            PreparedStatement ps = getPs("select root from users where email=?");
            ps.setString(1, getCookieValue("email", req));
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt("root");
            }
        } catch (Exception e) {
        }
        return -1;
    }

    private int getUserId(String email) {
        try {
            PreparedStatement ps = getPs("select id from users where email=?");
            ps.setString(1, email);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt("id");
            } else {
                return -1;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    private String hashp(String s) {
        byte[] salt = {95, 80, 32, 93, 22, -33, 45, -38, -73, 98, 60, -91, -117, -11, 52, 29};
        KeySpec spec = new PBEKeySpec(s.toCharArray(), salt, 65536, 128);
        SecretKeyFactory f;
        byte[] hash = null;
        try {
            f = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
            hash = f.generateSecret(spec).getEncoded();
        } catch (Exception e) {
            e.printStackTrace();
        }
        Base64.Encoder enc = Base64.getEncoder();
        return enc.encodeToString(hash);
    }

    public static void main(String[] args) {
    }

}
