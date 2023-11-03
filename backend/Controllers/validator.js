const isValid=function(value){ //checking if value is empty
    if(typeof value==="undefined" || value===null) return false;
    if(typeof value==="string" && value.trim().length===0) return false;
    if(typeof value===Number && value.trim().length===0) return false;
    return true;
};

//checking if body is valid
let isValidBody=function(body){
    return Object.keys(body).length>0;
};

//checking if name is valid
let isValidName=/^[a-zA-Z ]*$/;
//checking if email is valid
let isValidEmail=/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

//exporting function
module.exports={isValid,isValidBody,isValidName,isValidEmail};