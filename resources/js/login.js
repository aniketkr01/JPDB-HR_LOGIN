function checkUser(){
    let email = $("#email").val();
    let password = $("#password").val();
    let jsonStr = {
        "email" : email,
        "password": password
    };
    req = createGET_BY_KEYRequest(token, db, "UserRel", JSON.stringify(jsonStr));
    $.ajaxSetup({async: false});
    res = executeCommandAt(baseURL, irl, req);
    $.ajaxSetup({asysnc: true});

    if(res.status===200){
        let data = JSON.parse(res.data);
        console.log(res);
        localStorage.setItem("profile_rec_no",data.rec_no);
        console.log("Success");
        createSession(email);
    }
    else{
        console.log("Error");
        alert("Record Doesn't Exist !");
    }
}

function createSession(email){
    sessionStatus = createJpdbSessionToken(token, 1, db, "UserRel", email);
    if(sessionStatus == 200){
        window.location.replace("home.html");
    }
    else{
        $("#email").val("");
        $("#password").val("");
        return;
    }
}