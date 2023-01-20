function getOldPassword(){
    let jsonStr = {
        "email": localStorage.getItem("userID")
    }

    let req = createGET_BY_KEYRequest(token, db, "UserRel", JSON.stringify(jsonStr));

    $.ajaxSetup({async: false});
    let res = executeCommandAt(baseURL, irl, req);
    $.ajaxSetup({async: true});

    if(res.status==200){
        let data = JSON.parse(res.data).record;
        let old = data.password;
        return old;
    }
    else{
        console.log("Error ! In detecting old password");
        return "";
    }
}

function resetPswdFields(){
    $("#oldPassword").val("");
    $("#newPassword").val("");
    $("#retypePassword").val("");
    $("#oldPassword").focus();
}

function validatePswd(){
    let old = getOldPassword();
    if(old==""){
        return;
    }

    let oldPswd = $("#oldPassword").val();
    let newPswd = $("#newPassword").val();
    let retypePswd = $("#retypePassword").val();

    if(oldPswd!==old){
        alert("Your Password is Incorrect !");
        resetPswdFields();
        return "";
    }

    if(newPswd.length<8){
        alert("Atleast 8 characters required !");
        return "";
    }

    if(newPswd!==retypePswd){
        alert("Password Entered Not matching !");
        return "";
    }

    let jsonStr = {
        "password": newPswd
    }

    let req = createUPDATERecordRequest(token, JSON.stringify(jsonStr) , db, "UserRel", localStorage.getItem("profile_rec_no"));

    return req;
}

function changePassword(){
    req = validatePswd();

    if(req=="")
        return;

    $.ajaxSetup({async: false});
    let res = executeCommandAt(baseURL, iml, req);
    $.ajaxSetup({async: true});

    if(res.status==200){
        alert("Password changed Successfully !");
    }
    else{
        console.log("Error in saving password");
    }
    resetPswdFields();
}