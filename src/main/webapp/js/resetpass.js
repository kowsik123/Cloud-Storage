
var file_in;

function swap(self) {
    if(self.id=='reset_password'){
        self.style.opacity="0"
        document.getElementById('send_otp').style.opacity="1"
        setTimeout(()=>{
            document.getElementById('send_otp').style.zIndex=1
            self.style.zIndex=0
        },1000)
    }
    else{
        self.style.opacity="0"
        document.getElementById('reset_password').style.opacity="1"
        setTimeout(()=>{
            document.getElementById('reset_password').style.zIndex=1
            self.style.zIndex=0
        },1000)
    }
}


function sendOtp() {
    var e=$("#email_in input")
    if(e.val().length>0){
        $.ajax({
            type: "POST",
            url: "ServerPage",
            data: {
                type: "FORGOT_PASSWORD SEND_OTP",
                email: e.val()
            },
            success: (json)=>{
                console.log(json)
                if(json.status=="FORGOT_PASSWORD OTP_SENT") {
                    swap(document.getElementById("send_otp"));
                }
            }
        })
    }

}

function reset(){
    var f=$("#fullname input"), e=$("#email input"),p=$("#password input")
    if(e.val().length>0 && p.val().length>0 && f.val().length>0 ){
        $.ajax({
            type: "POST",
            url: "ServerPage",
            data: {  "otp":f.val(),
            "type":'FORGOT_PASSWORD RESET',
            "password":e.val()},

            success: (json)=>{
                console.log(json)
                if(json.status=="FORGOT_PASSWORD SUCCESS") {
                    window.location.href='index.jsp';
                }
            },
            error:(e)=>{
              console.log(e);
            }
        })
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    //code
})