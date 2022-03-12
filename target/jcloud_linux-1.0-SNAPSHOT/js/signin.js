var file_in;

function swap(self) {
    if(self.id=='signup'){
        self.style.opacity="0"
        document.getElementById("signin").style.opacity="1"
        setTimeout(()=>{
            document.getElementById("signin").style.zIndex=1
            self.style.zIndex=0
        },1000)
    }
    else{
        self.style.opacity="0"
        document.getElementById("signup").style.opacity="1"
        setTimeout(()=>{
            document.getElementById("signup").style.zIndex=1
            self.style.zIndex=0
        },1000)
    }
}

function upload_img(){
    file_in = document.createElement('input')
    file_in.type='file'
    file_in.accept='image/*'
    file_in.click()
    file_in.addEventListener('change',function(ev){
        console.log(this.files)
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#profile_pic_img").attr('src', e.target.result);
                document.querySelector(":root").style.setProperty("--ppstatus","green");
            }
            reader.readAsDataURL(this.files[0]);
        }
        else{
            document.querySelector(":root").style.setProperty("--ppstatus","red");
        }
    })
}

function sign_in() {
    var e=$("#email_in input"),p=$("#password_in input")
    if(ValidateEmail(e.val()) && p.val().length>0){
        $.ajax({
            type: "POST",
            url: "ServerPage",
            data: {
                type: "SIGNIN",
                email: e.val(),
                password: p.val()
            },
            success: (json)=>{
                console.log(json)
                if(json.status=="SIGNIN SUCCESS") {
                    window.location.href='index.jsp';
                }
            }
        })
    }
}

function sign_up(){
    var f=$("#fullname input"), e=$("#email input"),p=$("#password input")
    if(ValidateEmail(e.val()) && p.val().length>0 && f.val().length>0 && file_in.files.length>0){
        var d=new FormData();
        d.append("img",file_in.files[0])
        d.append("fullname",f.val())
        d.append("type","SIGNUP")
        d.append("email",e.val())
        d.append("password",p.val())
        $.ajax({
            type: "POST",
            url: "ServerPage",
            dataType: "text/json",
            processData: false,
            contentType: false,
            data: d,
            success: (json)=>{
                console.log(json)
                if(json.status=="SIGNUP SUCCESS") {
                    window.location.href='index.jsp';
                }
            },
            error:(e)=>{
                  window.location.href='index.jsp';
            }
        })
    }
}
document.addEventListener("DOMContentLoaded",()=>{
    $("#email_in input")[0].addEventListener("input",()=>{
        var email=($("#email_in input").val());
        if(ValidateEmail(email)){
            document.querySelector(":root").style.setProperty("--estatus","green");
        }else{
            document.querySelector(":root").style.setProperty("--estatus","red");
        }

    })
    $("#password_in input")[0].addEventListener("input",()=>{
        var pass=($("#password_in input").val());
        if(pass.length){
            document.querySelector(":root").style.setProperty("--pstatus","green");
        }else{
            document.querySelector(":root").style.setProperty("--pstatus","red");
        }

    })
    $("#email input")[0].addEventListener("input",()=>{
        var email=($("#email input").val());
        if(ValidateEmail(email)){
            document.querySelector(":root").style.setProperty("--e2status","green");
        }else{
            document.querySelector(":root").style.setProperty("--e2status","red");
        }

    })
    $("#password input")[0].addEventListener("input",()=>{
        var pass=($("#password input").val());
        if(pass.length){
            document.querySelector(":root").style.setProperty("--p2status","green");
        }else{
            document.querySelector(":root").style.setProperty("--p2status","red");
        }

    })
    $("#fullname input")[0].addEventListener("input",()=>{
        var fn=($("#fullname input").val());
        if(fn.length){
            document.querySelector(":root").style.setProperty("--fnstatus","green");
        }else{
            document.querySelector(":root").style.setProperty("--fnstatus","red");
        }

    })
})
function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }

    return (false)
}






