package jcloud;

import dbms.*;
import java.io.*;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet(name = "ServerPage", urlPatterns = {"/ServerPage"})

@MultipartConfig(
  fileSizeThreshold = 1024 * 1024 * 1,
  maxFileSize = 1024 * 1024 * 20,
  maxRequestSize = 1024 * 1024 * 100
)

public class ServerPage extends HttpServlet {
    
    public static String pppath="/home/kowsik/Documents/Netbeans/jcloud_linux/src/main/java/data/profile_pic/";
    public static String fpath="/home/kowsik/Documents/Netbeans/jcloud_linux/src/main/java/data/files/";
    
    public static UserTable ut=new UserTable();
    public static FolderTable fot=new FolderTable();
    public static FileTable fit=new FileTable();
    
    public static OTPManager mm=new OTPManager();
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if(req.getParameter("type")==null) return;
        
        if(req.getParameter("type").equals("SIGNIN")){
            
            String email=req.getParameter("email");
            String password=req.getParameter("password");
            
            // dbms process
            
            String status=ut.signIn(email,password);
            if(status.equals("SIGNIN SUCCESS")){
                resp.addCookie(new Cookie("email",email));
                resp.addCookie(new Cookie("password",password));
            }
            
            // json response
            
            JSONWriter out=new JSONWriter(resp);
            out.setObjectValue("status", status);
            out.close();
        }
        else if(req.getParameter("type").contains("SIGNUP")){
            
            String email=req.getParameter("email");
            String password=req.getParameter("password");
            
            // profile picture upload
            
            Part p=req.getPart("img");
            File f=new File(pppath+email);
            if(!f.exists()) f.mkdir();
            InputStream pi=p.getInputStream();
            FileOutputStream foss=new FileOutputStream(pppath+email+"/"+p.getSubmittedFileName() );
            byte[] buffer = new byte[4096];
            int length;
            while((length = pi.read(buffer)) > 0) foss.write(buffer, 0, length);
            
            // dbms process
            
            String status=ut.signUp(req.getParameter("fullname"),email,password,"");
            if(status.equals("SIGNUP SUCCESS")){
                resp.addCookie(new Cookie("email",email));
                resp.addCookie(new Cookie("password",password));
            }
            
            // json response
            
            JSONWriter out=new JSONWriter(resp);
            out.setObjectValue("status", status);
            out.close();
        }
        
        else if(req.getParameter("type").contains("PROFILE INFO")){
            if(auth(req)){ // authentication from cookies
                
                // writing json response
                
                JSONWriter out=new JSONWriter(resp);
                out.setObjectValue("status", true);
                out.setObjectValue("fullname", ut.getName(req));
                out.setObjectValue("storage", ut.getStorage(req));
                out.setObjectValue("root",ut.getRootId(req));
                out.close();
                
            }
        }
        else if(req.getParameter("type").contains("FORGOT_PASSWORD RESET")){
            
            JSONWriter out=new JSONWriter(resp);
            System.out.println(req.getParameter("otp")+" "+req.getParameter("password"));
            
            // checking otp
            if(mm.checkOTP(Dbms.getCookieValue("email",req), req.getParameter("otp"))) {
                
                String status=ut.updatePassword(req, req.getParameter("password"));
                
                if(status.equals("FORGOT_PASSWORD SUCCESS")) {
                    resp.addCookie(new Cookie("password",req.getParameter("password")));
                    mm.deleteEntry(Dbms.getCookieValue("email",req));
                }
                
                out.setObjectValue("status", status);
            }
            else
                out.setObjectValue("status", "FORGOT_PASSWORD WRONG_OTP");
            
            out.close();
        }
        
        else if(req.getParameter("type").contains("FORGOT_PASSWORD SEND_OTP")){
            
            JSONWriter out=new JSONWriter(resp);
            String status="FORGOT_PASSWORD FAILED";
            
            // sending otp to user mail id
            if(ut.isEmailThere(req.getParameter("email"))){
                if(mm.sendOTP(req.getParameter("email"))){
                    status="FORGOT_PASSWORD OTP_SENT";
                    resp.addCookie(new Cookie("email",req.getParameter("email")));
                }
            }
            else status="FORGOT_PASSWORD EMAIL_NOT_FOUND";
            out.setObjectValue("status", status);
            out.close();
            
        }
        
        else if(req.getParameter("type").contains("UPDATE FULLNAME")){
            
            if(auth(req)){
                // writing json response
                JSONWriter out=new JSONWriter(resp);
                out.setObjectValue("status", ut.updateName(req, req.getParameter("name")));
                out.close();
                
            }
            
        }
        
        else if(req.getParameter("type").contains("FOLDER INFO")){
            if(auth(req)){
                int id=Integer.parseInt(req.getParameter("id"));
                String name=fot.getName(id);
                
                // file and folder list inside given folder
                ArrayList<SqlFile> childfiles=fit.getFileList(id);
                ArrayList<SqlFile> childfolders=fot.getFolderList(id);
                
                // writing json response
                JSONWriter out=new JSONWriter(resp);
                out.setObjectValue("name", name);
                out.setObjectValue("id", id);
                out.setObjectValue("folders", childfolders);
                out.setObjectValue("files", childfiles);
                out.close();
                
            }
        }
        
        else if(req.getParameter("type").contains("FILE UPLOAD")){
            if(auth(req)){
                
                JSONWriter out=new JSONWriter(resp);
                Part p=req.getPart("file");
                
                // ensure storage space
                BigInteger max = new BigInteger("2147483648");
                BigInteger curr = new BigInteger((ut.getStorage(req)+p.getSize())+"");
                if(  max.compareTo(curr)!=-1 ){
                    String fileName=p.getSubmittedFileName();
                    int id=fit.createFile(p.getSubmittedFileName(),getExt(fileName), Integer.parseInt(req.getParameter("parent")),p.getSize(),req);
                    if(id!=-1){
                        p.write(fpath+ id+"."+getExt(fileName));
                        out.setObjectValue("status", true);
                        out.setObjectValue("file",SqlFile.getFile(fileName, id) );
                    }
                    else out.setObjectValue("status", false);
                }

                else out.setObjectValue("status", false);
                out.close();
                
            }
        }
        
        else if(req.getParameter("type").contains("FILE RENAME")){
            if(auth(req)){
                
                JSONWriter out=new JSONWriter(resp);
                out.setObjectValue("status", fit.renameFile(Integer.parseInt(req.getParameter("id")),req.getParameter("name") ));
                out.close();
                
            }
        }  
        
        else if(req.getParameter("type").contains("FILE DELETE")){
            if(auth(req)){
                
                JSONWriter out=new JSONWriter(resp);
                out.setObjectValue("status", fit.deleteFile(Integer.parseInt(req.getParameter("id")), req));
                out.close();
                
            }
        }
        
        else if(req.getParameter("type").contains("FILE INFO")){
            if(auth(req)){
                // writing size and last modified infos
                JSONWriter out=new JSONWriter(resp);
                
                File f=new File(fpath+req.getParameter("id")+"."+getExt(req.getParameter("name")));
                out.setObjectValue("status", true);
                out.setObjectValue("size", f.length());
                
                SimpleDateFormat sdf = new SimpleDateFormat("MM-dd-yyyy HH:mm:ss");
                out.setObjectValue("lastmodified", sdf.format(f.lastModified()) );
                out.close();
                
            }
        }
        
        else if(req.getParameter("type").contains("FOLDER CREATE")){
            if(auth(req)){
                
                JSONWriter out=new JSONWriter(resp);
                int id=fot.createFolder(req.getParameter("name"), Integer.parseInt(req.getParameter("parent")));
                out.setObjectValue("status", (id!=-1) );
                out.setObjectValue("folder", SqlFile.getFolder(req.getParameter("name"), id));
                out.close();
                
            }
        }
        
        else if(req.getParameter("type").contains("FOLDER DELETE")){
            if(auth(req)){
                
                JSONWriter out=new JSONWriter(resp);
                out.setObjectValue("status", fot.deleteFolder(Integer.parseInt(req.getParameter("id")), req));
                out.close();
                
            }
        }
        
        else if(req.getParameter("type").contains("FOLDER RENAME")){
            if(auth(req)){
                
                JSONWriter out=new JSONWriter(resp);
                out.setObjectValue("status", fot.renameFolder(req.getParameter("name"),Integer.parseInt( req.getParameter("id"))));
                out.close();
                
            }
        }
        else if(req.getParameter("type").contains("FOLDER SIZE")){
            if(auth(req)){
                
                JSONWriter out=new JSONWriter(resp);
                out.setObjectValue("status", true);
                out.setObjectValue("size", fot.getFolderSize(Integer.parseInt(req.getParameter("id"))));
                out.close();
                
            }
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if(req.getParameter("type")==null) return;
        
        if(req.getParameter("type").contains("PROFILE PICTURE")){
            if(auth(req)){
                
                // profile picture response
                
                File f=new File(pppath+Dbms.getCookieValue("email", req)).listFiles()[0];
                ServletContext cntx= req.getServletContext();
                String mime = cntx.getMimeType(f.getName());
                if (mime == null) return;

                resp.setContentType(mime);
                resp.setHeader("Content-disposition","inline; filename="+f.getName());

                FileInputStream fis= new FileInputStream(f);
                OutputStream out = resp.getOutputStream();
                byte[] buffer = new byte[4096];
                int length;
                while ((length = fis.read(buffer)) > 0) out.write(buffer, 0, length);
                fis.close();
                out.flush();
            }
        }
    }
    
    public static boolean auth(HttpServletRequest req){
        String email=null;
        String password=null;
        Cookie[] arr= req.getCookies();
        if(arr==null) return false;
        for(Cookie i: arr){
            if(i.getName().equals("email")) email=i.getValue();
            else if(i.getName().equals("password")) password=i.getValue();
        }
        if(ut.signIn(email,password).equals("SIGNIN SUCCESS")) return true;
        return false;
    }
    
    public static String getExt(String filename){
        String[] arr=filename.split("[.]");
        return arr[arr.length-1];
    }
    
}