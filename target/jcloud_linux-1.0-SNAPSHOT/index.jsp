<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="jcloud.ServerPage" %>
<%@page import="dbms.UserTable" %>
<%@page import="dbms.Dbms" %>
<%
    if(!ServerPage.auth(request)) response.sendRedirect("login.jsp");
    UserTable ut=new UserTable();
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JCloud</title>
    <link rel="icon" href="img/spider.jpg"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/script.js"></script>
</head>
<body>
    <div id="nav_bar">
        <div id="left_cont">
            <div id="logo"><i class="bi bi-cloud-fog2"></i></div>
            <div id="logo_name">JCloud</div>
        </div>
        <div id="search_cont">
            <div id="search_box">
                <div id="search_button" aria-label="search"><i class="bi bi-search"></i></div>
                <input id="search_input" type="text">
                <div id="filter_button" onclick="Shower.show_filter();"><i class="bi bi-funnel"></i></div>
                <div id="filter_menu"></div>
            </div>
        </div>
        <div id="right_cont">
            <div id="theme_cont">
                <div id="theme" onclick="Shower.show_theme();"><i class="bi bi-palette"></i></div>
            </div>
            <div id="profile_cont">
                <div id="profile" onclick="Shower.show_profile_menu();"><img src="ServerPage?type=PROFILE%20PICTURE"></div>
                <div id="profile_menu">
                    <img id="profile_img" src="ServerPage?type=PROFILE%20PICTURE">
                    <div id="profile_name"><%= ut.getName(request) %></div>
                    <div id="profile_email"><%= Dbms.getCookieValue("email", request) %></div>
                    <div id="edit_name" class="menu" onclick="Shower.show_profile_renamer();">
                        <i class="bi bi-folder-plus"></i>
                        <span>Edit Name</span>
                    </div>
                    <div id="reset_password" class="menu" onclick='document.cookie="email=";document.cookie="password=";window.location.reload();'>
                        <i class="bi bi-box-arrow-right"></i>
                        <span>Sign Out</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="path">
        <div id="path_cont">
        </div>
    </div>
    <div id="container">
        <div id="menu">
            <div id="create_folder" class="menu" onclick="Shower.show_folder_creater();">
                <i class="bi bi-folder-plus"></i>
                <span>Create Folder</span>
            </div>
            <div id="upload_file" class="menu" onclick="CloudFile.uploadFile()">
                <i class="bi bi-file-earmark-plus"></i>
                <span>Upload File</span>
            </div>
            <hr>
            <div id="menu_selected">
            </div>

            <div id="storage_cont">
                <hr>
                <div id="storage_title">
                    <i class="bi bi-cloud"></i>
                    <div id="storage_word">Storage</div>
                </div>
                <div id="storage"><div id="storage_value" style="width: <%= ut.getStoragePercent(request) %>%;"></div></div>
                <div id="relative_storage" onclick="FolderManager.loadStorage();"></div>
                <hr>
            </div>
        </div>
        <div id="file_explorer">
        </div>
    </div>
    <script>
        storage=new FileLoader( <%= ut.getRootId(request) %> );
        $('#relative_storage').text( FileManager.getRelativeSize( <%= ut.getStorage(request) %>) +" OF 2 GB" );
    </script>
</body>
</html>