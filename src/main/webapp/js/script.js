var storage;

class Shower{
    static is_shown=false;
    static is_filter_shown=false;

    static set_back(){
        var ele=document.createElement("div")
        ele.id="back"
        ele.addEventListener("click",()=>{
            ele.remove()
            document.getElementById("front").remove()
        })
        document.body.append(ele)
    }

    static remove_back(){
        document.getElementById("back").remove()
        document.getElementById("front").remove()
    }

    static set_theme(v){
        var root=document.querySelector(':root').style
        switch (v) {
            case 2:
                root.setProperty('--dark','rgb(194, 151, 100)')
                root.setProperty('--theme','rgb(255, 199, 130)')
                root.setProperty('--light','rgb(255, 228, 196)')
                root.setProperty('--lighter','rgb(255, 246, 235)')
                break;
            case 3:
                root.setProperty('--dark','rgb(88, 22, 150)')
                root.setProperty('--theme','rgb(138, 43, 226)')
                root.setProperty('--light','rgb(213, 168, 255)')
                root.setProperty('--lighter','rgb(248, 242, 255)')
                break;
            case 4:
                root.setProperty('--dark','rgb(134, 22, 22)')
                root.setProperty('--theme','rgb(187, 52, 52)')
                root.setProperty('--light','rgb(214, 103, 103)')
                root.setProperty('--lighter','rgb(248, 237, 237)')
                break;
            case 5:
                root.setProperty('--dark','rgb(100, 100, 100)')
                root.setProperty('--theme','rgb(158, 158, 158)')
                root.setProperty('--light','rgb(201, 201, 201)')
                root.setProperty('--lighter','rgb(240, 240, 240)')
                break;
            case 6:
                root.setProperty('--dark','rgb(184, 0, 0)')
                root.setProperty('--theme','rgb(255, 0, 0)')
                root.setProperty('--light','rgb(255, 122, 122)')
                root.setProperty('--lighter','rgb(255, 238, 238)')
                break;
            case 7:
                root.setProperty('--dark','rgb(0, 0, 129)')
                root.setProperty('--theme','rgb(0, 0, 180)')
                root.setProperty('--light','rgb(0, 0, 255)')
                root.setProperty('--lighter','rgb(235, 235, 255)')
                break;
            case 8:
                root.setProperty('--dark','rgb(0, 128, 0)')
                root.setProperty('--theme','rgb(0, 167, 0)')
                root.setProperty('--light','rgb(122, 240, 122)')
                root.setProperty('--lighter','rgb(232, 255, 232)')
                break;
            case 9:
                root.setProperty('--dark','rgb(207, 207, 0)')
                root.setProperty('--theme','rgb(243, 243, 0)')
                root.setProperty('--light','rgb(255, 255, 160)')
                root.setProperty('--lighter','rgb(255, 255, 227)')
                break;
            case 10:
                root.setProperty('--dark','rgb(51, 51, 51)')
                root.setProperty('--theme','rgb(77, 77, 77)')
                root.setProperty('--light','rgb(116, 116, 116)')
                root.setProperty('--lighter','rgb(233, 233, 233)')
                break;
            case 11:
                root.setProperty('--dark','rgb(0, 127, 212)')
                root.setProperty('--theme','rgb(0, 195, 255)')
                root.setProperty('--light','rgb(143, 229, 255)')
                root.setProperty('--lighter','rgb(235, 250, 255)')
                break;
            case 12:
                root.setProperty('--dark','rgb(209, 118, 0)')
                root.setProperty('--theme','rgb(255, 161, 37)')
                root.setProperty('--light','rgb(255, 194, 159)')
                root.setProperty('--lighter','rgb(255, 245, 239)')
                break;
            case 13:
                root.setProperty('--dark','rgb(168, 0, 173)')
                root.setProperty('--theme','rgb(224, 1, 224)')
                root.setProperty('--light','rgb(255, 173, 251)')
                root.setProperty('--lighter','rgb(254, 239, 255)')
                break;
            case 14:
                root.setProperty('--dark','rgb(118, 182, 0)')
                root.setProperty('--theme','rgb(141, 218, 0)')
                root.setProperty('--light','rgb(182, 255, 47)')
                root.setProperty('--lighter','rgb(247, 255, 231)')
                break;
            case 15:
                root.setProperty('--dark','rgb(255, 225, 104)')
                root.setProperty('--theme','rgb(255, 232, 138)')
                root.setProperty('--light','rgb(255, 243, 195)')
                root.setProperty('--lighter','rgb(255, 253, 246)')
                break;
            default:
                root.setProperty('--dark','rgb(56, 143, 114)')
                root.setProperty('--theme','rgb(85, 211, 169)')
                root.setProperty('--light','rgb(160, 231, 207)')
                root.setProperty('--lighter','rgb(236, 255, 249)')
                break;
        }
    }
    static show_theme(){
        this.set_back()
        var ele=document.createElement("div")
        ele.id="front"
        ele.innerHTML=`<div style="margin: 10px auto;width: fit-content;height: 40px;margin-top: 30px;">Select Theme Color</div>
        <div style="margin: 10px auto;width: 75%;height: fit-content;" id="color_cont">
            <div onclick="Shower.set_theme(1);" class="color" style="background-color: rgb(85, 211, 169);"></div>
            <div onclick="Shower.set_theme(2);" class="color" style="background-color: rgb(255, 199, 130);"></div>
            <div onclick="Shower.set_theme(3);" class="color" style="background-color: rgb(138, 43, 226);"></div>
            <div onclick="Shower.set_theme(4);" class="color" style="background-color: rgb(187, 52, 52);"></div>
            <div onclick="Shower.set_theme(5);" class="color" style="background-color: rgb(158, 158, 158);"></div>
            <div onclick="Shower.set_theme(6);" class="color" style="background-color: rgb(255, 0, 0);"></div>
            <div onclick="Shower.set_theme(7);" class="color" style="background-color: rgb(0, 0, 180);"></div>
            <div onclick="Shower.set_theme(8);" class="color" style="background-color: rgb(0, 167, 0);"></div>
            <div onclick="Shower.set_theme(9);" class="color" style="background-color: rgb(243, 243, 0);"></div>
            <div onclick="Shower.set_theme(10);" class="color" style="background-color: rgb(77, 77, 77);"></div>
            <div onclick="Shower.set_theme(11);" class="color" style="background-color: rgb(0, 195, 255);"></div>
            <div onclick="Shower.set_theme(12);" class="color" style="background-color: rgb(255, 161, 37);"></div>
            <div onclick="Shower.set_theme(13);" class="color" style="background-color: rgb(224, 1, 224);"></div>
            <div onclick="Shower.set_theme(14);" class="color" style="background-color: rgb(141, 218, 0);"></div>
            <div onclick="Shower.set_theme(15);" class="color" style="background-color: rgb(255, 232, 138);"></div>
        </div>`
        document.body.append(ele)
    }
    static show_profile_menu(){
        if(Shower.is_shown){
            document.getElementById("profile_menu").style.display="none";
            Shower.is_shown=false;
        }
        else {
            document.getElementById("profile_menu").style.display="block";
            Shower.is_shown=true;
        }
    }
    static show_filter(){
        if (Shower.is_filter_shown) {
            document.getElementById("filter_menu").style.display="none"
            Shower.is_filter_shown=false;
        }
        else{
            document.getElementById("filter_menu").style.display="block"
            Shower.is_filter_shown=true;
        }
    }
    static show_folder_renamer(id,name){
        this.set_back()
        var ele=document.createElement("div")
        ele.id="front"
        ele.style.width='300px'
        ele.style.height='200px'
        ele.innerHTML=`<input type="text" placeholder="Enter New Folder Name" class="input" style="margin-top: 40px;" value="`+name+`">
        <div class="menu" style="width: 180px;text-align: center; margin-top: 20px;" onclick="FolderManager.renameFolder($('#front input').val(),`+id+`);">Rename</div>`
        document.body.append(ele)
    }
    static show_folder_creater(){
        this.set_back()
        var ele=document.createElement("div")
        ele.id="front"
        ele.style.width='350px'
        ele.style.height='250px'
        ele.innerHTML=
        `<div style="width: fit-content; margin: 20px auto; height: 30px; font-size: 20px; margin-top: 40px;" >Create A New Folder</div>
        <input type="text" pattern=".+" class="input" style="width: 240px;" placeholder="Folder Name">
        <div class="menu box_shadow" style="width: 180px; text-align: center; margin-top: 20px; " onclick="FolderManager.createFolder()">Create Folder</div>`
        document.body.append(ele)
    }
    static show_profile_renamer(){
        this.set_back()
        var ele=document.createElement("div")
        ele.id="front"
        ele.style.width='350px'
        ele.style.height='250px'
        ele.innerHTML=
        `<div style="width: fit-content; margin: 20px auto; height: 30px; font-size: 20px; margin-top: 40px;" >Change Your Profile Name</div>
        <input type="text" pattern=".+" class="input" style="width: 240px;" placeholder="Enter Your Name">
        <div class="menu box_shadow" style="width: 180px; text-align: center; margin-top: 20px; " onclick="ProfileManager.changeName();">Change</div>`
        document.body.append(ele)
    }
    static show_file_renamer(id,name){
        this.set_back()
        var ele=document.createElement("div")
        ele.id="front"
        ele.style.width='300px'
        ele.style.height='200px'
        ele.innerHTML=`<input type="text" placeholder="Enter New File Name" class="input" style="margin-top: 40px;" value="`+name+`">
        <div class="menu" style="width: 180px;text-align: center; margin-top: 20px;" onclick="FileManager.renameFile($('#front input').val(),`+id+`);">Rename</div>`
        document.body.append(ele)
    }
    static show_folder_details(name,id){
        this.set_back()
        var f=storage.getFolderById(id,storage.currentFolder)
        var ele=document.createElement("div")
        ele.id="front"
        ele.style.width='400px'
        ele.style.height='300px'
        ele.innerHTML=
        `<div style="margin: 25px auto; width: fit-content; font-size: 25px;">Details</div>
        <div class="property_cont">
            <div class="key">Name:</div>
            <div class="value">`+name+`</div>
        </div>
        <div class="property_cont">
            <div class="key">Type:</div>
            <div class="value"><i class="bi bi-folder-fill"></i>Folder</div>
        </div>
        <div class="property_cont">
            <div class="key">Items:</div>
            <div class="value"></div>
        </div>
        <div class="property_cont">
            <div class="key">Size:</div>
            <div class="value"></div>
        </div>
        <div class="property_cont">
            <div class="key">Path:</div>
            <div class="value">`+PathLoader.getPath()+`</div>
        </div>`
        document.body.append(ele)
        if(storage.loadedIds.includes(id)) {
            $('.value')[2].innerText=(f.files.length+f.folders.length)
        }
        else{
            storage.setFolder(f,()=>{
                $('.value')[2].innerText=(f.files.length+f.folders.length)
            })
        }
        FolderManager.loadFolderSize(id)

    }
    static show_file_details(id,name){
        this.set_back()
        var ele=document.createElement("div")
        ele.id="front"
        ele.style.width='400px'
        ele.style.height='300px'
        ele.innerHTML=
        `<div style="margin: 25px auto; width: fit-content; font-size: 25px;">Details</div>
        <div class="property_cont">
            <div class="key">Name:</div>
            <div class="value">`+name+`</div>
        </div>
        <div class="property_cont">
            <div class="key">Type:</div>
            <div class="value"><i class="bi `+CloudFile.ext_map[CloudFile.getExt(name)]+`"></i>`+CloudFile.getExt(name)+`</div>
        </div>
        <div class="property_cont">
            <div class="key">Size:</div>
            <div class="value"></div>
        </div>
        <div class="property_cont">
            <div class="key">Last Modified:</div>
            <div class="value"></div>
        </div>
        <div class="property_cont">
            <div class="key">Path:</div>
            <div class="value">`+PathLoader.getPath()+`</div>
        </div>`
        document.body.append(ele)
        FileManager.loadInfos(id,name);
    }
}

class ProfileManager{
    static changeName(){
        document.body.style.cursor='wait'
        $.ajax({
            type: "POST",
            url: "ServerPage",
            data: { "type" : "UPDATE FULLNAME", "name": $('#front input').val() },
             
            success: (json)=>{
                document.body.style.cursor='default'
                $('#profile_name').text($('#front input').val())
                
            },
            error: (e)=>{
                document.body.style.cursor='default'
            }
        })
    }
}

class CloudFile{
    static ext_map={
        "jpg": "bi-file-earmark-image",
        "jpeg": "bi-file-earmark-image",
        "png": "bi-file-earmark-image",
        "gif": "bi-file-earmark-image",
        "svg": "bi-file-earmark-image",
        "mp4": "bi-file-earmark-play-fill",
        "mpeg4": "bi-file-earmark-play-fill",
        "avi": "bi-file-earmark-play-fill",
        "mov": "bi-file-earmark-play-fill",
        "mpeg2": "bi-file-earmark-play-fill",
        "pdf": "bi-file-earmark-pdf-fill",
        "doc": "bi-file-earmark-word-fill",
        "docx": "bi-file-earmark-word-fill",
        "txt": "bi-file-earmark-text-fill",
        "html": "bi-file-earmark-code-fill",
        "css": "bi-file-earmark-code-fill",
        "js": "bi-file-earmark-code-fill",
        "py": "bi-file-earmark-code-fill",
        "java": "bi-file-earmark-code-fill",
        "pyc": "bi-file-earmark-binary-fill",
        "class": "bi-file-earmark-binary-fill",
        "c": "bi-file-earmark-code-fill",
        "go": "bi-file-earmark-code-fill",
        "cpp": "bi-file-earmark-code-fill",
        "zip": "bi-file-earmark-zip-fill",
        "jar": "bi-file-earmark-zip-fill",
        "rar": "bi-file-earmark-zip-fill",
        "tar": "bi-file-earmark-zip-fill",
        "ppt": "bi-file-earmark-slides-fill",
        "xls": "bi-file-earmark-spreadsheet-fill",
        "xlsx": "bi-file-earmark-spreadsheet-fill",
        "csv": "bi-file-earmark-spreadsheet-fill",
        "mp3": "bi-file-earmark-music-fill",
        "wav": "bi-file-earmark-music-fill",
        "other": "bi-file-earmark-fill"
    }

    static uploadFile(){
        var ele=document.createElement('input')
        ele.type='file' 
        ele.setAttribute("multiple","")
        ele.click()
        ele.addEventListener("change",()=>{
            var arr=ele.files;
            for(let i of arr){
                FileManager.uploadFile(i)
            }
        })
    }

    static getExt(name){
        var arr=name.split(".")
        return arr[arr.length-1]
    }
    static addFile(id,name){
        var ext=this.getExt(name)
        if(!(ext in this.ext_map)) ext="other"
        var ele=document.createElement("div")
        ele.id=id+"_file"
        ele.setAttribute("name",name)
        ele.setAttribute("f_type","file")
        ele.classList.add("f_cont")
        ele.addEventListener("click",()=>{
            this.setActive(ele)
        })
        ele.innerHTML=`<div class="f_inner_cont">
            <div class="f_icon"><i class="bi `+this.ext_map[ext]+`"></i></div>
            <div class="f_name">`+name+`</div>
        </div>`
        document.getElementById("file_explorer").append(ele)
        return ele;
    }
    static addFolder(id,name){
        var ele=document.createElement("div")
        ele.id=id+"_folder"
        ele.setAttribute("name",name)
        ele.setAttribute("f_type","folder")
        ele.classList.add("f_cont")
        ele.addEventListener("click",()=>{
            this.setActive(ele)
        })
        ele.addEventListener("dblclick",()=>{
            storage.loadFolder(storage.getFolderById(id,storage.storage))
        })
        ele.innerHTML=`<div class="f_inner_cont">
            <div class="f_icon"><i class="bi bi-folder-fill"></i></div>
            <div class="f_name">`+name+`</div>
        </div>`
        document.getElementById("file_explorer").append(ele)
        return ele;
    }
    static removeFile(data){
        var ele=data
        if(typeof data === 'string' || typeof data === 'number'){
            ele=document.getElementById(data+"_file")
        }
        ele.remove()
    }
    static removeFolder(data){
        var ele=data
        if(typeof data === 'string' || typeof data === 'number'){
            ele=document.getElementById(data+"_folder")
        }
        ele.remove()
    }
    static clear(){
        document.getElementById("file_explorer").innerHTML=""
        document.getElementById("menu_selected").innerHTML=""
    }
    static setActive(ele){
        var id=ele.id.split('_')[0];
        var root=document.getElementsByClassName("f_selected")
        for(let i=0;i<root.length;i++){
            root[i].classList.remove("f_selected")
        }
        ele.classList.toggle("f_selected")
        if(ele.getAttribute("f_type")=='folder'){
            document.getElementById("menu_selected").innerHTML=
        `<div class="menu" onclick="storage.loadFolder(storage.getFolderById(`+id+`,storage.storage))">
            <i class="bi bi-folder-symlink"></i>
            <span>Open Folder</span>
        </div>
        <div class="menu" onclick='Shower.show_folder_renamer(`+id+`,"`+ele.getAttribute('name')+`")'>
            <i class="bi bi-pencil-square"></i>
            <span>Rename Folder</span>
        </div>
        <div class="menu" onclick='FolderManager.deleteFolder(`+id+`)'>
            <i class="bi bi-trash"></i>
            <span>Delete Folder</span>
        </div>
        <div class="menu" onclick='Shower.show_folder_details("`+ele.getAttribute('name')+`",`+id+`)'>
            <i class="bi bi-info-circle"></i>
            <span>Details</span>
        </div>`
        }
        else{
            document.getElementById("menu_selected").innerHTML=`<div class="menu" onclick='FileManager.openFile(`+id+`)'>
            <i class="bi bi-file-earmark"></i>
            <span>Open File</span>
        </div>
        <div class="menu" onclick='Shower.show_file_renamer(`+id+`,"`+ele.getAttribute('name')+`")'>
            <i class="bi bi-pencil-square"></i>
            <span>Rename File</span>
        </div>
        <div class="menu" onclick='FileManager.deleteFile(`+id+`)'>
            <i class="bi bi-trash"></i>
            <span>Delete File</span>
        </div>
        <div class="menu" onclick='FileManager.downloadFile(`+id+`)'>
            <i class="bi bi-download"></i>
            <span>Download File</span>
        </div>
        <div class="menu" onclick='FileManager.copyFileUrl(`+id+`)'>
            <i class="bi bi-link"></i>
            <span>Copy Link</span>
        </div>
        <div class="menu" onclick='Shower.show_file_details(`+id+`,"`+ele.getAttribute('name')+`")'>
            <i class="bi bi-info-circle"></i>
            <span>Details</span>
        </div>`
        }
    }
}

class FileLoader{
    storage={}
    currentFolder={};
    loadedIds=[]
    constructor(root){
        this.storage.id=root
        this.storage.name="home"
        this.storage.folders=[]
        this.storage.files=[]
        document.body.style.cursor='wait'
        $.ajax({
            type: "post",
            url: "ServerPage",
            data: {"type":"FOLDER INFO","id":root},
            success: (json)=>{
                document.body.style.cursor='dufault'
                this.storage.folders=json.folders;
                this.storage.files=json.files;
                this.loadedIds.push(root);
                this.loadFolder(this.storage);
                PathLoader.addHome();
            },
            error: (err)=>{
                document.body.style.cursor='default';
                console.log(err);
                alert("server error fileloader constructor");
            }
        })
    }
    getFileById(id,folder){
        var arr=folder.files;
        for(let i=0;i<arr.length;i++){
            if(arr[i].id==id) return arr[i];
        }
        arr=folder.folders;
        for(let i=0;i<arr.length;i++){
            var fol= this.getFileById(id,arr[i])
            if(fol!=null) return fol;
        }
        return null;
    }
    getFolderById(id,folder){
        if(folder.id==id) return folder;

        var arr=folder.folders;

        for(let i=0;i<arr.length;i++){
            var fol= this.getFolderById(id,arr[i])
            if(fol!=null) return fol;
        }
        return null;
    }
    loadFolder(folder){
        if(!this.loadedIds.includes(folder.id)) {
            this.setFolder(folder,()=>{this.loadFolder(folder)})
        }
        else{
            this.currentFolder=folder
            CloudFile.clear()
            if(this.storage!=folder) PathLoader.addFolder(folder.id,folder.name)
            var arr=folder.folders;
            for(let i=0;i<arr.length;i++){
                CloudFile.addFolder(arr[i].id,arr[i].name)
            }
            arr=folder.files;
            for(let i=0;i<arr.length;i++){
                CloudFile.addFile(arr[i].id,arr[i].name)
            }
        }
    }
    setFolder(folder,then){
        var id=folder.id
        document.body.style.cursor='wait'
        $.ajax({
            type: "POST",
            url: "ServerPage",
            data: {"type":"FOLDER INFO","id":id},
             
            success: (json)=>{
                document.body.style.cursor='default'
                folder.folders=json.folders;
                folder.files=json.files;
                this.loadedIds.push(id)
                if(then!=undefined) then()
            },
            error: (e)=>{
                document.body.style.cursor='default'
                alert("server error");
            }
        })
    }
}

class FolderManager{
    static loadFolderSize(id){
        document.body.style.cursor='wait'
        $.ajax({
            type: "post",
            url: "ServerPage",
            data: {"type":"FOLDER SIZE","id":id},
             
            success: (json)=>{
                document.body.style.cursor='default'
                $('.value')[3].innerText=FileManager.getRelativeSize(json.size)
            },
            error: ()=>{
                document.body.style.cursor='default'
                alert("server error");
            }
        })
    }
    static loadStorage(){
        $.ajax({
            type: "post",
            url: "ServerPage",
            data: { "type" : "FOLDER SIZE" , "id" : storage.storage.id },
             
            success: (json)=>{
                document.body.style.cursor='default'
                var p=json.size/(2*1024*1024*10);
                $('#storage_value')[0].style.width=p+"%";
                $('#relative_storage').text(FileManager.getRelativeSize(json.size)+" OF 2 GB");
            },
            error: ()=>{
                document.body.style.cursor='default'
                alert("server error");
            }
        })
    }
    static createFolder(){
        var name=$('#front input').val()
        var parent=storage.currentFolder.id
        if(name.length<1) {return;}
        document.body.style.cursor='wait'
        $.ajax({
            type: "post",
            url: "ServerPage",
            data: {"type":"FOLDER CREATE","name":name,"parent":parent},
             
            success: (json)=>{
                document.body.style.cursor='default'
                
                    storage.currentFolder.folders.push(json.folder)
                    storage.loadFolder(storage.currentFolder)
                
                Shower.remove_back()
            },
            error: ()=>{
                document.body.style.cursor='default'
                alert("server error");
            }
        })
    }
    static renameFolder(name,id){
        document.body.style.cursor='wait'
        $.ajax({
            type: "post",
            url: "ServerPage",
            data: {"type":"FOLDER RENAME","name":name,"id":id},
             
            success: (json)=>{
                document.body.style.cursor='default'
                
                    storage.getFolderById(id,storage.storage).name=name
                    storage.loadFolder(storage.currentFolder)
                    Shower.remove_back()
                
            },
            error: ()=>{
                document.body.style.cursor='default'
                alert("server error");
                Shower.remove_back()
            }
        })
    }
    static deleteFolder(id){
        document.body.style.cursor='wait'
        $.ajax({
            type: "post",
            url: "ServerPage",
            data: {"type":"FOLDER DELETE","id":id},
             
            success: (json)=>{
                document.body.style.cursor='default'
                
                    var f=storage.getFolderById(id,storage.storage)
                    storage.currentFolder.folders.splice(storage.currentFolder.folders.indexOf(f),1)
                    storage.loadFolder(storage.currentFolder)
                
            },
            error: ()=>{
                document.body.style.cursor='default'
                alert("server error");
            }
        })
    }
    static putFolderDetails(id){
        document.body.style.cursor='wait'
        $.ajax({
            type: "post",
            url: "ServerPage",
            data: {"type":"FOLDER SIZE","id":id},
             
            success: (json)=>{
                document.body.style.cursor='default'
                
                    ele.innerText=json.size
                
            },
            error: ()=>{
                document.body.style.cursor='default'
                alert("server error");
            }
        })
    }
}

class FileManager{
    static getRelativeSize(bytes){
        if(bytes<1024) return bytes+" bytes"
        else if(bytes/1024 < 1024) return (bytes/1024).toFixed(0) + " KB"
        else if(bytes/(1024*1024) < 1024) return (bytes/(1024*1024)).toFixed(1) + " MB"
        else if(bytes/(1024*1024*1024) < 1024) return (bytes/(1024*1024*1024)).toFixed(2) + " GB"
        else return "unknown"
    }
    static uploadFile(ufile){
        document.body.style.cursor='wait'
        var fd=new FormData()
        fd.append("file",ufile)
        fd.append("type","FILE UPLOAD")
        fd.append("parent",storage.currentFolder.id)
        $.ajax({
            type: "post",
            url: "ServerPage",
            processData: false, 
            contentType: false,
            data: fd,
            success: (json)=>{
                document.body.style.cursor='default'
                if(json.status){
                    storage.currentFolder.files.push(json.file)
                    storage.loadFolder(storage.currentFolder)
                    FolderManager.loadStorage()
                }
                else{
                    alert("storage full");
                }
            },
            error: (err)=>{
                document.body.style.cursor='default'
                var json=err.responseText;
                if(json.status){
                    
                    storage.currentFolder.files.push(json.file)
                    storage.loadFolder(storage.currentFolder)
                }
                else{
                    alert("storage full");
                }
            }
        })
    }
    static loadInfos(id,name){
        document.body.style.cursor='wait'
        $.ajax({
            type: "post",
            url: "ServerPage",
            data: {"type":"FILE INFO","id":id,"name":name},
             
            success: (json)=>{
                document.body.style.cursor='default'

                    $('.value')[2].innerText=FileManager.getRelativeSize(json.size)
                    $('.value')[3].innerText=json.lastmodified

            },
            error: ()=>{
                document.body.style.cursor='default'
                alert("server error");
            }
        })
    }

    static deleteFile(id){
        document.body.style.cursor='wait'
        $.ajax({
            type: "post",
            url: "ServerPage",
            data: {"type":"FILE DELETE","id":id},
             
            success: (json)=>{
                document.body.style.cursor='default'
                    var f=storage.getFileById(id,storage.storage)
                    storage.currentFolder.files.splice(storage.currentFolder.files.indexOf(f),1)
                    storage.loadFolder(storage.currentFolder)
                    FolderManager.loadStorage();
            },
            error: ()=>{
                document.body.style.cursor='default'
                alert("server error");
            }
        })
    }
    static getFileUrl(id,download){
        var url=new URL("http://localhost:7060/fileurl");
        url.searchParams.append('id',id)
        if(download) url.searchParams.append('download',true)
        return url.href
    }
    static copyFileUrl(id){
        navigator.clipboard.writeText(this.getFileUrl(id))
    }
    static downloadFile(id){
        window.open(this.getFileUrl(id,true))
    }
    static openFile(id){
        window.open(this.getFileUrl(id))
    }
    
    static renameFile(name,id){
        document.body.style.cursor='wait'
        $.ajax({
            type: "post",
            url: "ServerPage",
            data: {"type":"FILE RENAME","id":id,"name":name},
            success: (json)=>{
                document.body.style.cursor='default'
                console.log(json.status)
                storage.getFileById(id,storage.storage).name=name
                storage.loadFolder(storage.currentFolder)
                Shower.remove_back()
            },
            error: ()=>{
                document.body.style.cursor='default'
                alert("server error");
                Shower.remove_back();
            }
        })
    }
}

class PathLoader{
    static addHome(){
        document.getElementById("path_cont").innerHTML='<div id="home" class="folder_path"><i class="bi bi-house"></i><span>Home</span></div>'
        document.getElementById("home").addEventListener("click",()=>{
            storage.loadFolder(storage.storage)
            this.addHome()
        })
    }
    static addFolder(id,name){
        if($("#"+id+"_path").length!=0) return;
        var ele=document.createElement("div")
        ele.classList.add("folder_path")
        ele.id=id+"_path"
        ele.addEventListener("click",()=>{
            this.remove(id)
            storage.loadFolder(storage.getFolderById(id,storage.storage))
        })
        ele.innerHTML='<span>'+name+'</span>'
        document.getElementById("path_cont").append(ele)
    }
    static remove(id){
        var ele= document.getElementById(id+"_path")
        for(let i=document.getElementById("path_cont").childElementCount-1;i>=0;i--){
            if(document.getElementById("path_cont").children[i]==ele) break;
            document.getElementById("path_cont").children[i].remove()
        }
        ele.remove()
    }
    static getPath(){
        return document.getElementById("path_cont").innerText.replaceAll('\n','\\');
    }
}

window.getCookie = function(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

document.addEventListener("DOMContentLoaded",()=>{
    document.body.style.cursor='default';
      document.getElementById("file_explorer").addEventListener("dragenter",(evt)=>{
                evt.preventDefault();
        })
        document.getElementById("file_explorer").addEventListener("dragover",(evt)=>{
                evt.preventDefault();
        })
        document.getElementById("file_explorer").addEventListener("drop",(e)=>{
            var files = (e.dataTransfer.files);
            for(let i of files){
                FileManager.uploadFile(i)
            }
            window.filed=files
        e.preventDefault();        })

})
