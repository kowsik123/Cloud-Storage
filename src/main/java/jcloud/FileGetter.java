package jcloud;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Arrays;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet(name = "FileGetter", urlPatterns = {"/fileurl"})
public class FileGetter extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if(ServerPage.auth(req)){
            File f=new File(ServerPage.fpath+req.getParameter("id")+"."+ServerPage.fit.getExt(Integer.parseInt(req.getParameter("id"))) );
            String respType="";
            if(req.getParameter("download")!=null) respType="attachment; ";
            else respType="inline; ";
            
            resp.setHeader("Content-disposition",respType+"filename="+f.getName());

            FileInputStream fis= new FileInputStream(f);

            OutputStream out = resp.getOutputStream();
            byte[] buffer = new byte[4096];
            int length;
            while ((length = fis.read(buffer)) > 0){
                out.write(buffer, 0, length);
            }
            fis.close();
            out.flush();
        }
    }
    
}