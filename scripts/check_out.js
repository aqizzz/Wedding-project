
'use strict';


window.addEventListener('load',startup, false);
/**
 * 
 */
function startup() {

    //displays the current date
    document.getElementById('second').innerHTML=  today();
    document.getElementById('txtDateNow').value = today();

    // via local storage 
    document.getElementById("amount").value = Number(localStorage.getItem('estimated_total'));

    document.getElementById("customer-amount").innerHTML = '$ '+document.getElementById("amount").value+' CAD';
    document.getElementById("customer-newPoints").innerHTML = Math.floor(Number(document.getElementById("amount").value) /5);
    document.getElementById("customer-PointsAfterPayment").innerHTML = document.getElementById("customer-newPoints").innerHTML + document.getElementById("points").innerHTML;
    
    
    document.getElementById('form3').onsubmit = store;

}// end function startup

function store() {
  let key = new Date(); 
    if (validateForm()) {
      
        window.localStorage.setItem(key, JSON.stringify(payment)); // converting object to string
    }
} // end function store 


/**
 * returns the current date
 */
function today() {
     // create an instance of the Date object
     let currentDate = new Date();
     //alert(currentDate);

     // extract date, month, and year from the current date variable
     let thisDate = currentDate.getDate();
     let thisMonth = currentDate.getMonth() +1;
     let thisYear = currentDate.getFullYear();

     // return the current date in the format mm/dd/yyyy
     let todayDate = thisMonth + '/' + thisDate + '/' + thisYear;
     return todayDate;
}// end function today

function sendEmailInvoice() { 
    if (validateForm()){
        
    document.getElementById("email-sent").innerHTML = 
        "<br> The invoice was sent to your email";
    }
}

function handleSubmit() {
    
    const cust_amount = document.getElementById('estimated_total').value;
    
    // set the estimated_total into the local storage 
    localStorage.setItem('Amount', cust_amount);
   
    return;
}
/**
 * validate user data entry
 */
function validateForm() {
   if (document.getElementById("name").value === "") {
    
    window.alert('You must enter your name.');
    document.getElementById("name").focus();
    return false;
    } 
   else if (document.getElementById("email").value === "") {
    
        window.alert('You must enter your email.');
        document.getElementById("email").focus();
        return false;
    }
   else if (document.getElementById("phone").value === "") {
    
    window.alert('You must enter your phone.');
    document.getElementById("phone").focus();
    return false;
    }
   else if (document.getElementById("address").value === "") {
        
            window.alert('You must enter your address.');
            document.getElementById("address").focus();
            return false;
    }
   else if (document.getElementById("state").value === "") {
        
    window.alert('You must enter your state.');
    document.getElementById("state").focus();
    return false;
    }
    else if (document.getElementById("city").value === "") {
        
    window.alert('You must enter your city.');
    document.getElementById("city").focus();
    return false;
    }
   else if (document.getElementById("zip").value === "") {
            
                window.alert('You must enter your postal code.');
                document.getElementById("zip").focus();
                return false;
    }
   else if (document.getElementById("cardNumber").value === "") {
                
                    window.alert('You must enter your card number.');
                    document.getElementById("cardNumber").focus();
                    return false;
    }
    else if (document.getElementById("nameOnCard").value === "") {
                    
                        window.alert('You must enter your name on card.');
                        document.getElementById("nameOnCard").focus();
                        return false;
    }
    else if (document.getElementById("cvc").value === "") {
                        
                            window.alert('You must enter your card CVC / CVV.');
                            document.getElementById("cvc").focus();
                            return false;
    }
    else if (document.getElementById("expiryM").value === "") {
                            
                                window.alert('You must enter your card expiry month');
                                document.getElementById("expiryM").focus();
                                return false;
    }
    else if (document.getElementById("expiryY").value === "") {
                                
         window.alert('You must enter your card expiry year');
         document.getElementById("expiryY").focus();
         return false;                                                      
    }

    document.getElementById("PaymentPaid").innerHTML = 
            "<br> Thank you  <br>Your payment has been processed <br>";
    return true;
   
   }// end function validateForm

function chooseLevel() {
    let levelImg='';
    let hisPoints = document.getElementById('points').value;
    let subTotal = Number(document.getElementById('amount').value) ;
    let discount = 0;

    document.getElementById('level').innerHTML =" &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp";

     if ( hisPoints > 25000 && hisPoints < 50000){// silver account
         discount = 0.1;
         levelImg ='<img src="/images/check_out/sponsor_silver.png" width="100px" style=" text-align: right;">'
                    +"<br>10% Discount = $" + (subTotal * discount).toFixed(2) + " CAD";
            document.getElementById('customer-discount').innerHTML = "10% Discount = $ " + (subTotal * discount).toFixed(2) + " CAD";
        
         subTotal = subTotal - (subTotal * discount);
    } else if ((hisPoints >= 50000) && (hisPoints < 100000)) {// golden account
        discount = 0.2;
        levelImg = '<img src="/images/check_out/sponsor_gold.png" width="100px" style=" text-align: right;">'
                    +"<br>20% Discount = $" + (subTotal * discount).toFixed(2) + " CAD";
        document.getElementById('customer-discount').innerHTML = "20% Discount = $ " + (subTotal * discount).toFixed(2) + " CAD";
      
                    subTotal = subTotal - (subTotal * discount);
    }else if (hisPoints >= 100000){// diamond account
        discount = 0.3;
        levelImg = '<img src="/images/check_out/diamond-level.png" width="100px" style=" text-align: right;">'
                    +"<br>30% Discount = $" + (subTotal * discount).toFixed(2) + " CAD";
        document.getElementById('customer-discount').innerHTML = "30% Discount = $ " + (subTotal * discount).toFixed(2) + " CAD";
        
                    subTotal = subTotal - (subTotal * discount);
    }else{
        document.getElementById('customer-discount').innerHTML = "";
        
    };

    let tax = subTotal * 0.05;
    let total = subTotal + tax;
    document.getElementById('level').innerHTML += levelImg 
            +"<br><br>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Sub Total = $"+ subTotal.toFixed(2) + " CAD"
           +"<br>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Tax = $" + tax.toFixed(2) + " CAD"
           +"<br>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Total = $" + total.toFixed(2) + " CAD";
    document.getElementById('customer-subTotal').innerHTML = " $"+ subTotal.toFixed(2) + " CAD";
    document.getElementById('customer-tax').innerHTML = " $"+ tax.toFixed(2) + " CAD";
    document.getElementById('customer-total').innerHTML = " $"+ total.toFixed(2) + " CAD";
}// end chooseLevel

const dialog = document.getElementById("myDialog");

let payment = {
        date: "",
        custName: "name",
        email : "email",
        phone : "phone",
        address : "address",
        state : "state",
        city : "city",
        zip : "zip",
        amount : 0,
        points : 0,
        cardNumber : "cardNumber",
        nameOnCard : "nameOnCard",
        cvc : "cvc",
        expiryM : 0,
        expiryY : 23
};

function fillInfo(fieldName){

    payment.date = new Date();

    if (fieldName == "name"){
        payment.custName = document.getElementById("name").value;
        document.getElementById("customer-name").innerHTML = document.getElementById("name").value;

    }else  if (fieldName == "email"){
        payment.email = document.getElementById("email").value;
        document.getElementById("customer-email").innerHTML = document.getElementById("email").value;
    
    }else  if (fieldName == "phone"){
        payment.email = document.getElementById("phone").value;
        document.getElementById("customer-phone").innerHTML = document.getElementById("phone").value;

    }else if (fieldName == "address"){
        payment.country = document.getElementById("address").value;
        document.getElementById("customer-address").innerHTML = document.getElementById("address").value;
    
    }else if (fieldName == "state"){
        payment.country = document.getElementById("state").value;
        document.getElementById("customer-state").innerHTML = document.getElementById("state").value;
        
    }else if (fieldName == "city"){
        payment.country = document.getElementById("city").value;
        document.getElementById("customer-city").innerHTML = document.getElementById("city").value;
        
    }else if (fieldName == "zip"){
        payment.zip = document.getElementById("zip").value;
        document.getElementById("customer-zip").innerHTML = document.getElementById("zip").value;

    }else if (fieldName == "amount"){
        payment.amount = document.getElementById("amount").value;
        document.getElementById("customer-amount").innerHTML = '$ '+document.getElementById("amount").value+' CAD';
        document.getElementById("customer-newPoints").innerHTML = Math.floor(Number(document.getElementById("amount").value) /5);

        document.getElementById("customer-PointsAfterPayment").innerHTML = Number(document.getElementById("customer-newPoints").innerHTML) + Number(document.getElementById("points").value);

        
    }else if (fieldName == "points"){
        payment.points = document.getElementById("points").value;
        document.getElementById("customer-points").innerHTML = document.getElementById("points").value;
        document.getElementById("customer-PointsAfterPayment").innerHTML = Number(document.getElementById("customer-newPoints").innerHTML) + Number(document.getElementById("points").value);

        chooseLevel();
    
    }else if (fieldName == "cardNumber"){
        payment.cardNumber = document.getElementById("cardNumber").value;
        document.getElementById("customer-cardNumber").innerHTML = document.getElementById("cardNumber").value;

    }else if (fieldName == "nameOnCard"){
        payment.nameOnCard = document.getElementById("nameOnCard").value;
        document.getElementById("customer-nameOnCard").innerHTML = document.getElementById("nameOnCard").value;

    }else if (fieldName == "cvc"){
        payment.cvc = document.getElementById("cvc").value;
        document.getElementById("customer-cvc").innerHTML = document.getElementById("cvc").value;

    }else if (fieldName == "expiryM"){
        payment.expiryM = document.getElementById("expiryM").value;

        if (document.getElementById("expiryM").value < 10) {
            document.getElementById("customer-expiry").innerHTML = '0'+document.getElementById("expiryM").value + '/' +document.getElementById("expiryY").value ;
        }else {
            document.getElementById("customer-expiry").innerHTML = document.getElementById("expiryM").value + '/' +document.getElementById("expiryY").value ;
        }
            
    }else if (fieldName == "expiryY"){
        payment.expiryY = document.getElementById("expiryY").value;
        
        if (document.getElementById("expiryM").value < 10) {
            document.getElementById("customer-expiry").innerHTML = '0'+document.getElementById("expiryM").value + '/' +document.getElementById("expiryY").value ;
        }else {
            document.getElementById("customer-expiry").innerHTML = document.getElementById("expiryM").value + '/' +document.getElementById("expiryY").value ;
        }
    }
}
                
