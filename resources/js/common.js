var token = "90937649|-31949273829306772|90952684";
var db = "HR-DEPT-DB";
var relName = "EMP-Rel";
var userRel = "UserRel";
var baseURL = "http://api.login2explore.com:5577";
var iml = "/api/iml";
var irl = "/api/irl";

function executeCommandAt(base, end, req){
    let url = base+end;
    let responseData;
    $.post(url, req, function(data,status){
        responseData = data;
    }).fail(function(data){
        responseData = data;
    });

    if(responseData!==undefined){
        return JSON.parse(responseData);
    }
}
var myStatus;

function checkSession(){
    var sessionStatus = isJpdbSessionTokenExists(token, db, userRel);
    if(sessionStatus==400){
        if(myStatus=="in"){
            window.location.href = "login.html";
        }
        else{
            return;
        }
    }
    else{
        if(myStatus=="out"){
            window.location.href = "home.html";
        }
        else
            return;
    }
}

function removeSession(){
    var delStatus = removeSessionTokenFromJPDB(token, db, userRel);
    if(delStatus==200){
        console.log("Session deleted !");
        localStorage.removeItem("rec_no");
        localStorage.removeItem("profile_rec_no");
        localStorage.removeItem("currRec");
        localStorage.removeItem("lastRec");
        localStorage.removeItem("firstRec");
        localStorage.removeItem("recordNo");
        window.location.replace("login.html");
    }
    else
        return;
}

function loadHeader(id){
    $(".EmbedHeader").load("resources/header.html");
    $().ready(
        function (){
            $(id).addClass("active");
            $("#loginId").append(localStorage.getItem("userID"));
        }
    );
}

function loadLoginHeader(){
    $(".EmbedHeader").load("resources/loginHeader.html");
}

function loadFooter(){
    $(".EmbedFooter").load("resources/footer.html");
}