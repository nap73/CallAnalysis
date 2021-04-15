let fs = require("fs");

let obj = require('mongoose') ;
obj.Promise = global.Promise ;
let url = "mongodb://localhost:27017/CallRecord" ;

// reading raw data from json file
let rawdata = fs.readFileSync('calldata.json');
let callData = JSON.parse(rawdata);

const mongooseDBoptions = {
     useNewUrlParser: true,
     useUnifiedTopology: true   
}

// ready to connect  
obj.connect(url, mongooseDBoptions) ;   
let db = obj.connection ;   // ..connected to database 

db.on("error" , (err) => console.log(err)) ;
console.log('DB CONNECTED');

db.once("open" , () => {
       
    // Define Schema 
    let CallSchema = obj.Schema({
    
            _id : Number , 
            source : String , 
            destination: String, 
            sourceLocation: String, 
            destinationLocation: String, 
            callDuration: String, 
            roaming: String, 
            callCharge: String
    
    }) ;

   // Creating Model 
    let Call = obj.model("" , CallSchema , "CallAnalysis")  ;

   //  Creating Reference using this model
    for(item of callData) {

    let p1 = new Call({
        _id : item._id , 
        source  : item.source , 
        destination : item.destination ,
        sourceLocation : item.sourceLocation ,
        destinationLocation : item.destinationLocation ,
        callDuration : item.callDuration ,
        roaming : item.roaming ,
        callCharge : item.callCharge    
    
    }) ;

    p1.save((err,result) => {
        if(!err) {
            console.log("Record Inserted" +result) ;
        }
        else{
            console.log(err) ;
        }

    }) ; 
}

console.log('DB Insertion Completed Successfully ') ;
    
});