var execProcess = require(__dirname + "/framework_version_process.js");

execProcess.result("sh " + __dirname + "/framework_version_script.sh", function(err, response){
    if(!err){
        console.log(response);
    }else {
        console.log(err);
    }
});