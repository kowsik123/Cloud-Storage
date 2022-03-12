package jcloud;

import java.util.HashMap;

public class OTPManager {
    HashMap<String,String> otps=new HashMap<String,String>();
    
    public boolean checkOTP(String email,String otp){
        return otps.get(email).equals(otp);
    }
    public void deleteEntry(String email){
        otps.remove(email);
    }
    private String generateOTP(){
        int otp1=(int)(Math.random()*10);
        int otp2=(int)(Math.random()*10);
        int otp3=(int)(Math.random()*10);
        int otp4=(int)(Math.random()*10);
        return otp1+""+otp2+""+otp3+""+otp4;
    }
    public boolean sendOTP(String email){
        String otp=generateOTP();
        otps.put(email, otp);
        String html="<body style=\"margin: 0; height: 520px; background-color: rgb(255, 255, 255);\">\r\n"
					+ "    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\r\n"
					+ "    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\r\n"
					+ "    <link href=\"https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap\" rel=\"stylesheet\">\r\n"
					+ "    <div id=\"holder\" style=\"margin: 10px;height: 300px;width: calc(100% - 20px);background-color: rgb(255, 255, 255);margin-top: 75px;\">\r\n"
					+ "        <div id=\"box\" style=\"padding-top: 5px; background-color: rgb(238, 238, 255);height: 150px;width: 300px;border-radius: 10px;margin: auto;\">\r\n"
					+ "            <div id=\"title\" style=\"width: 100%;font-size: x-large;font-family: 'Open Sans', sans-serif;text-align: center;margin-top: 20px;color: rgb(128, 20, 77);\">verification code</div>\r\n"
					+ "            <div id=\"otp\" style=\"width: fit-content;margin: auto; margin-top: 14px;\">\r\n"
					+ "                <div style=\"height: 30px;width: 25px;border-radius: 5px;background-color: rgb(221, 221, 221);margin: 5px;text-align: center;font-size: x-large;color: rgb(73, 73, 73);float: left;\">"+otp.charAt(0)+"</div>\r\n"
					+ "                <div style=\"height: 30px;width: 25px;border-radius: 5px;background-color: rgb(221, 221, 221);margin: 5px;text-align: center;font-size: x-large;color: rgb(73, 73, 73);float: left;\">"+otp.charAt(1)+"</div>\r\n"
					+ "                <div style=\"height: 30px;width: 25px;border-radius: 5px;background-color: rgb(221, 221, 221);margin: 5px;text-align: center;font-size: x-large;color: rgb(73, 73, 73);float: left;\">"+otp.charAt(2)+"</div>\r\n"
					+ "                <div style=\"height: 30px;width: 25px;border-radius: 5px;background-color: rgb(221, 221, 221);margin: 5px;text-align: center;font-size: x-large;color: rgb(73, 73, 73);float: left;\">"+otp.charAt(3)+"</div>\r\n"
					+ "            </div>\r\n"
					+ "        </div>\r\n"
					+ "    </div>\r\n"
					+ "</body>";
        return MailSender.sendMail(html, email);
    }
    public static void main(String[] args) {
        System.out.println(new OTPManager().generateOTP());
    }
}
