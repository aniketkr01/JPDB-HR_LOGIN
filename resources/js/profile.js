function profileData(){
    jsonStr = {
        "email" : localStorage.getItem("userID")
    }
    let req = createGET_BY_KEYRequest(token,db,"UserRel",JSON.stringify(jsonStr),true,true);
    $.ajaxSetup({async: false});
    res = executeCommandAt(baseURL, irl, req);
    $.ajaxSetup({async: true});

    console.log(res);
    if(res.status==400)
        removeSession();
    else{
        profileFill(JSON.parse(res.data).record);
    }
}

function activeProfile(swt){
    swt = !swt;
    $("#profileName").prop("disabled",swt)
    $("#profileEmail").prop("disabled", swt);
    $("#profileNum").prop("disabled", swt);
    $("#profileSave").prop("disabled", swt);
    $("#profileEdit").prop("disabled", swt);
}

function profileFill(data){
    $("#profileName").val(data.name);
    $("#profileEmail").val(data.email);
    $("#profileNum").val(data.phone);
    activeProfile(false);
    $("#profileEdit").prop("disabled", false);
}

function profileEditor(){
    activeProfile(true);
    $("#profileEdit").prop("disabled", true);
    $("#profileEmail").prop("disabled", true);
}

function validateProfile(){
    let name = $("#profileName").val();
    if(name==""){
        alert("Name Missing !");
        return false;
    }

    let phone = $("#profileNum").val();
    if(phone==""){
        alert("Number Missing !");
        return false;
    }

    let jsonStr = {
        "name": name,
        "phone": phone
    }
    
    req = createUPDATERecordRequest(token, JSON.stringify(jsonStr) , db, "UserRel", localStorage.getItem("profile_rec_no"));
    return req;
}

function profileSaver(){
    let req = validateProfile();

    if(req===false){
        return;
    }

    $.ajaxSetup({async: false});
    let res = executeCommandAt(baseURL, iml, req);
    $.ajaxSetup({async: true});

    console.log(res);
    if(res.status==200){
        profileData();
    }
    else{
        console.log("Error ! while saving");
    }
}
