var connToken = "90937649|-31949273829306772|90952684";
var db = "HR-DEPT-DB";
var rel = "EMP-Rel";
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

    //console.log(responseData);
    if(responseData!==undefined){
        return JSON.parse(responseData);
    }
}

function setFirstRec(rec){
    localStorage.setItem("firstRec", rec);
}

function setLastRec(rec){
    localStorage.setItem("lastRec", rec);
}

function setCurrRec(rec){
    localStorage.setItem("currRec",rec);
}

function getFirstRec(){
    return localStorage.getItem("firstRec");
}

function getLastRec(){
    return localStorage.getItem("lastRec");
}

function getCurrRec(){
    return localStorage.getItem("currRec");
}

function initForm(){
    localStorage.removeItem("firstRec");
    localStorage.removeItem("lastRec");
}

function setFirst(){
    let req = createFIRST_RECORDRequest(connToken, db, rel);

    jQuery.ajaxSetup({async: false});
    let response = executeCommandAt(baseURL, irl, req);
    jQuery.ajaxSetup({asysn: true});

    if(response.status===200){
        let data = JSON.parse(response.data);
        setFirstRec(data.rec_no);
    }
    else{
       // console.log("Error first rec !");
    }
}

function setLast(){
    let req = createLAST_RECORDRequest(connToken, db, rel, getCurrRec());

    jQuery.ajaxSetup({async: false});
    let response = executeCommandAt(baseURL, irl, req);
    jQuery.ajaxSetup({asysn: true});

    if(response.status==200){
        let data = JSON.parse(response.data);
        setLastRec(data.rec_no);
    }
    else{
        //console.log("Error in last rec !");
    }
}

function setNext(){
    let req = createNEXT_RECORDRequest(connToken, db, rel, getCurrRec());

    jQuery.ajaxSetup({async: false});
    let response = executeCommandAt(baseURL, irl, req);
    jQuery.ajaxSetup({asysn: true});

    if(response.status==200){
        let data = JSON.parse(response.data);
        setCurrRec(data.rec_no);
    }
    else{
       // console.log("No next data !");
    }
}

function setPrev(){
    let req = createPREV_RECORDRequest(connToken, db, rel, getCurrRec());

    jQuery.ajaxSetup({async: false});
    let response = executeCommandAt(baseURL, irl, req);
    jQuery.ajaxSetup({asysn: true});

    if(response.status==200){
        let data = JSON.parse(response.data);
        setCurrRec(data.rec_no);
    }
    else{
       // console.log("Error prev data !");
    }
}

function check0(){
    disableButton(true);
    disableInput(true);
    disableNav(true);
    if(getFirstRec()===null){
        $("#new").prop("disabled", false);
        return ;
    }
    else{
        resetData();
    }
}

function disableInput(off){
    $("#empId").prop("disabled", off);
    $("#empName").prop("disabled", off);
    $("#salary").prop("disabled", off);
    $("#hra").prop("disabled", off);
    $("#da").prop("disabled", off);
    $("#deduction").prop("disabled", off);
}

function disableButton(off){
    $("#new").prop("disabled", off);
    $("#save").prop("disabled", off);
    $("#edit").prop("disabled", off);
    $("#changed").prop("disabled", off);
    $("#reset").prop("disabled", off);
}

function disableNav(off){
    $("#first").prop("disabled", off);
    $("#prev").prop("disabled", off);
    $("#next").prop("disabled", off);
    $("#last").prop("disabled", off);
}

function validateData(){
    let empId = $("#empId").val();
    if(empId===""){
        alert("Enter Employee ID !");
        $("empId").focus();
        return "";
    }
    let empName = $("#empName").val();
    if(empName===""){
        alert("Enter Employee Name !");
        $("#empName").focus();
        return "";
    }
    let salary = $("#salary").val();
    if(salary===""){
        alert("Enter Employee Salary !");
        $("#salary").focus();
        return "";
    }
    let da = $("#da").val();
    if(da===""){
        alert("Enter DA !");
        $("#da").focus();
        return "";
    }
    let hra = $("#hra").val();
    if(hra===""){
        alert("Enter HRA !");
        $("#hra").focus();
        return "";
    }
    let deduc = $("#deduction").val();
    if(deduc===""){
        alert("Enter Deduction !");
        $("#deduction").focus();
        return "";
    }

    const json = {
        "id": empId,
        "name": empName,
        "salary": salary,
        "hra": hra,
        "da": da,
        "deduction": deduc
    }

    return json;
}

function resetData(){
    if(getCurrRec()===null && getLastRec()!==null){
        localStorage.setItem("currRec", getLastRec());
    }
    if(getCurrRec()===null){
        console.log("No data !");
    }
    else {
        fillData();
    }
}

function fillData(){
    let req = createGET_BY_RECORDRequest(connToken, db, rel, getCurrRec());
    
    jQuery.ajaxSetup({async: false});
    let response  = executeCommandAt(baseURL, irl, req);
    jQuery.ajaxSetup({async: true});

    if(response.status==200){
        let data = JSON.parse(response.data);
        let record = data.record
        $("#empId").val(record.id);
        $("#empName").val(record.name);
        $("#salary").val(record.salary);
        $("#hra").val(record.hra);
        $("#da").val(record.da);
        $("#deduction").val(record.deduction);
        
        disableInput(true);
        disableNav(true);
        disableButton(true);

        $("#new").prop("disabled", false);
        $("#edit").prop("disabled", false);

        navSetting();
    }
    else{
        disableButton(true);
        disableInput(true);
        disableNav(true);
        $("#new").prop("disabled", false);
    } 
}

function navSetting(){
    if(getLastRec()!==getFirstRec()){
        if(getCurrRec()===getFirstRec()){
            $("#next").prop("disabled", false);
            $("#last").prop("disabled", false);
        }
        else if(getCurrRec()===getLastRec()){
            $("#first").prop("disabled", false);
            $("#prev").prop("disabled", false);
        }
        else{
            disableNav(false);
        }
    }
}

function newData(){
    $("#empId").val("");
    $("#empName").val("");
    $("#salary").val("");
    $("#hra").val("");
    $("#da").val("");
    $("#deduction").val("");
    
    disableButton(true);
    disableInput(false);
    disableNav(true);

    $("#save").prop("disabled", false);
    $("#reset").prop("disabled", false);
}

function editData(){
    disableInput(false);
    disableButton(true);
    disableNav(true);

    $("#empId").prop("disabled", true);
    
    $("#changed").prop("disabled", false);
    $("#reset").prop("disabled", false);
}

function saveData(){
    let json = validateData();

    if(json==="")
        return ;

    jsonStr = JSON.stringify(json);

    let req = createPUTRequest(connToken, jsonStr, db, rel);

    jQuery.ajaxSetup({async: false});
    let response = executeCommandAt(baseURL, iml, req);
    jQuery.ajaxSetup({async: true});

    if(response.status==200){
        let data = JSON.parse(response.data);
        if(getFirstRec()==null){
            setFirstRec(data.rec_no);
        }
        setCurrRec(data.rec_no);
        setLastRec(data.rec_no);
        resetData();
    }
    else{
        alert("Error !");
    }
}

function changeData(){
    let json = validateData();

    if(json==="")
        return ;

    jsonStr = JSON.stringify(json);

    let req = createUPDATERecordRequest(connToken, jsonStr, db, rel, getCurrRec());

    jQuery.ajaxSetup({async: false});
    executeCommandAt(baseURL, iml, req);
    jQuery.ajaxSetup({async: true});

    resetData();
}

function getFirst(){
    setCurrRec(getFirstRec());
    fillData();
}

function getLast(){
    setCurrRec(getLastRec());
    fillData();
}

function getNext(){
    setNext();
    fillData();
}

function getPrev(){
    setPrev();
    fillData();
}

initForm();
setFirst();
setLast();
check0();
resetData();