function validateRegister(){
    let phone = $("#registerNum").val();
    let name = $("#registerName").val();
    let email = $("#registerEmail").val();
    let password = $("#registerPassword").val();
    let retypePswd = $("#registerRetypePassword").val();

    if(email==""){
        alert("Enter Email !");
        return "";
    }
    if(name==""){
        alert("Enter Name !");
        return "";
    }
    if(phone==""){
        alert("Enter Phone Number !");
        return "";
    }
    if(password==""){
        alert("Enter Password !");
        return "";
    }
    
    if(password.length<8){
        alert("Password should contain atleast 8 characters !");
        $("#registerPassword").val("");
        return "";
    }

    if(password!==retypePswd){
        alert("Password not matching !");
        $("#registerRetypePswd").val("");
        return "";
    }

    if(isEmailExist(email)){
        alert("E-mail already registered !");
        resetRegisterFields();
        $("#registerEmail").focus();
        return "";
    }

    if(isPhoneExist(phone)){
        alert("Phone already registered !");
        resetRegisterFields();
        $("#registerEmail").focus();
        return "";
    }

    let jsonStr = {
        "name": name,
        "email": email,
        "phone": phone,
        "password": password
    }
    let req = createPUTRequest(token, JSON.stringify(jsonStr), db, "UserRel");
    return req;
}

function registerAdmin(){
    let req = validateRegister();

    if(req==="")
        return;

    $.ajaxSetup({async: false});
    let res = executeCommandAt(baseURL, iml, req);
    $.ajaxSetup({async: true});

    if(res.status==200){
        alert("You have registered Successfully!");
        window.location.replace("login.html");
    }
    else{
        console.log("Error! while login");
    }
}

function resetRegisterFields(){
    $("#registerNum").val("");
    $("#registerName").val("");
    $("#registerEmail").val("");
    $("#registerPassword").val("");
    $("#registerRetypePassword").val("");
}

function isEmailExist(email){
    jsonStr= {
        "email": email
    }
    let req = createGET_BY_KEYRequest(token, db, "UserRel", JSON.stringify(jsonStr));

    $.ajaxSetup({async: false});
    let res = executeCommandAt(baseURL, irl, req);
    $.ajaxSetup({async: true});

    if(res.status==200)
        return true;
    else
        return false;
}

function isPhoneExist(phone){
    jsonStr= {
        "phone": phone
    }
    let req = createGET_BY_KEYRequest(token, db, "UserRel", JSON.stringify(jsonStr));

    $.ajaxSetup({async: false});
    let res = executeCommandAt(baseURL, irl, req);
    $.ajaxSetup({async: true});
    
    if(res.status==200)
        return true;
    else
        return false;
}