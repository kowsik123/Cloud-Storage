<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="jcloud.ServerPage" %>

<%
    if(ServerPage.auth(request)) response.sendRedirect("index.jsp");
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <link rel="stylesheet" href="css/resetpass.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="js/resetpass.js"></script>
</head>
<body>
    <div id="send_otp">
        <div id="title"><hr>Send OTP<hr></div>
        <form method="post" name="signin" action="/">
            <div id="email_in"><i class="bi bi-envelope"></i><input type="text" placeholder="Email">
            </div>
        </form>
        <div id="button_cont">
            <div id="send_otp_button" onclick="sendOtp();">Send OTP</div>
            <div id="reset_password_button" onclick="swap(document.getElementById('send_otp'));">Reset</div>
        </div>
    </div>
    <div id="reset_password">
        <div id="title"><hr>Reset Password<hr></div>
      
        <form method="post" name="signup" action="/">
            <div id="fullname"><i class="bi bi-chat-right-dots"></i><input type="text" placeholder="OTP"></div>
            <div id="email"><i class="bi bi-key"></i><input type="password" placeholder="New Password"></div>
            <div id="password"><i class="bi bi-check2-circle"></i><input type="password" placeholder="Re-type Password"></div>
        </form>
        <div id="button_cont">
            <div id="send_otp_button" onclick="swap(document.getElementById('reset_password'));">Send OTP</div>
            <div id="reset_password_button" onclick="reset();">Reset</div>
        </div>
    </div>
    
</body>
</html>