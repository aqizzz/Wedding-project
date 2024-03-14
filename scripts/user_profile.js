/* User can see all their information. User can change everything: 
Name, email, phone number, address 
These cannot change by user: wedding package, order history 
and order history would have the amount of points they got, current points.
Inside wedding package, they can only see information. Any changes
would have to go through appointment with us. After discussion about
prices, the admin would add the wedding points to the user current points.
Order history would be on a new window.*/

const DIAMOND = 100000;
const GOLD = 50000;
const SILVER = 25000;

var clientInfo = {};
var weddingDetails = {};
var orderHistory = {};
let storageKey = "userInfo";

window.addEventListener('load', loadData);

/**
 * function to load all the data for clients, wedding details, and order history
 */
function loadData() {
    if(userName) {
        loadClientData();
        loadWeddingData();
        loadOrderData();
    }
}

/**
 * loads client data from clients.json file
 */
function loadClientData() {
    let xhr = new XMLHttpRequest();
    if (xhr) {
        xhr.open("get", 'data/clients.json');

        // passing data to the server
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let json = xhr.responseText;
                const obj = JSON.parse(json);
                let filteredData = obj.filter(function(i) {
                    return i.userName === userName;
                });
                let storedData = window.localStorage.getItem(storageKey);
                if (storedData === null) {
                    window.localStorage.setItem(storageKey, JSON.stringify(filteredData[0]));
                    storedData = window.localStorage.getItem(storageKey);
                }
                clientInfo = JSON.parse(storedData);
                getPersonalInfo();
            }
        }

        // sending the request
        xhr.send();
    }
}

/**
 * loads wedding details from weddingDetails.json file
 */
function loadWeddingData() {
    let xhr = new XMLHttpRequest();
    if (xhr) {
        xhr.open("get", 'data/weddingDetails.json');

        // passing data to the server
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let json = xhr.responseText;
                const obj = JSON.parse(json);
                let filteredData = obj.filter(function(i) {
                    return i.userID === clientInfo.userID;
                });
                if (!filteredData.length == 0) {
                    weddingDetails = filteredData[0];
                    getWeddingDetails();
                }
            }
        }

        // sending the request
        xhr.send();
    }
}

/**
 * loads order history from orderHistory.json file
 */
function loadOrderData() {
    let xhr = new XMLHttpRequest();
    if (xhr) {
        xhr.open("get", 'data/orderHistory.json');

        // passing data to the server
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let json = xhr.responseText;
                const obj = JSON.parse(json);
                let filteredData = obj.filter(function(i) {
                    return i.userID === clientInfo.userID;
                });
                orderHistory = filteredData;
                getOrderHistory();
            }
        }

        // sending the request
        xhr.send();
    }
}

/**
 * retrieves and prints the user's personal information into their respective input boxes from the array.
 */
function getPersonalInfo() {
    document.getElementById('fullName').value = clientInfo.fullName;
    document.getElementById('phoneNumber').value = clientInfo.phoneNumber;
    document.getElementById('emailAddress').value = clientInfo.emailAddress;
    document.getElementById('street').value = clientInfo.street;
    document.getElementById('city').value = clientInfo.city;
    document.getElementById('province').value = clientInfo.province;
    document.getElementById('postalCode').value = clientInfo.postalCode;
}

/**
 * populate edit modal information
 */
function editInfo() {
    document.getElementById('fullNameEdit').value = clientInfo.fullName;
    document.getElementById('phoneNumberEdit').value = clientInfo.phoneNumber;
    document.getElementById('emailAddressEdit').value = clientInfo.emailAddress;
    document.getElementById('streetEdit').value = clientInfo.street;
    document.getElementById('cityEdit').value = clientInfo.city;
    document.getElementById('provinceEdit').value = clientInfo.province;
    document.getElementById('postalCodeEdit').value = clientInfo.postalCode;
}

/**
 * update file with new client information
 */
function updateInfo() {
    clientInfo.fullName = document.getElementById('fullNameEdit').value;
    clientInfo.phoneNumber = document.getElementById('phoneNumberEdit').value;
    clientInfo.emailAddress = document.getElementById('emailAddressEdit').value;
    clientInfo.street = document.getElementById('streetEdit').value;
    clientInfo.city = document.getElementById('cityEdit').value;
    clientInfo.province = document.getElementById('provinceEdit').value;
    clientInfo.postalCode = document.getElementById('postalCodeEdit').value;
    window.localStorage.removeItem(storageKey);
    window.localStorage.setItem(storageKey, JSON.stringify(clientInfo));
}

/**
 * validation for the personal information form. If true, update information
 */
function validateClientInfo() {
    // declare and initialize variables
    (() => {
        'use strict'
      
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')
      
        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
          form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
            
            form.classList.add('was-validated')
            updateInfo();
          }, false)
        })
      })()
    
}

/**
 * retrieves the user's wedding details (if applicable) including their wedding date, 
 * and services required during their wedding.
 */
function getWeddingDetails() {
    setInterval('getCountdown()', 1000);     
    document.getElementById('wedding').style.display = 'block';
    let weddingDateOnly = weddingDetails.weddingDate.substring(0, 11);
    let hourInWeddingDate = parseInt(weddingDetails.weddingDate.substring(11, 13));
    let minutesInWeddingDate = weddingDetails.weddingDate.substring(13, 16);
    let ampm = 'AM';
    if (hourInWeddingDate >= 12) {
        if (hourInWeddingDate > 12) {
            hourInWeddingDate = hourInWeddingDate - 12;
        }
        ampm = 'PM';
    }
    document.getElementById('weddingDate').innerHTML = `${weddingDateOnly} ${hourInWeddingDate}${minutesInWeddingDate} ${ampm}`;
    document.getElementById('servicesChosen').innerHTML = `${weddingDetails.servicesChosen}`;
}

/**
 * calculates the days, hours, minutes, and seconds between the currrent date and the date of the wedding.
 */
function getCountdown() {
    let currentDate = new Date();
    let weddingDate = new Date(weddingDetails.weddingDate);
    let numberOfDays = (weddingDate - currentDate) / (1000 *60 * 60 * 24);
    document.getElementById('days').value = (numberOfDays < 10) ? '0' + Math.floor(numberOfDays) : Math.floor(numberOfDays);
    let hours = (numberOfDays - Math.floor(numberOfDays)) * 24;
    document.getElementById('hours').value = (hours < 10) ? '0' + Math.floor(hours) : Math.floor(hours);
    let minutes = (hours - Math.floor(hours)) * 60;
    document.getElementById('minutes').value = (minutes < 10) ? '0' + Math.floor(minutes) : Math.floor(minutes);
    let seconds = (minutes - Math.floor(minutes)) * 60;
    document.getElementById('seconds').value = (seconds < 10) ? '0' + Math.floor(seconds) : Math.floor(seconds);
}

/**
 * prints an alert message letting the user know that if they wish to change anything regarding their wedding,
 * they must contact us.
 */
function alertMsg() {
    alert('If you would like to edit anything about your wedding, please contact us.')
}

/**
 * retrieves data about the user's order history. Calculates the users totalPoints and lets them know 
 * how many points until the next level.
 */
function getOrderHistory() {
    if (orderHistory.length > 0) {
        let HTMLCode = `<thead><th colspan="4">Order History</th></thead>`;
        HTMLCode += '<tr><td class="header">Order Number</td>';
        HTMLCode += '<td class="header">Order Date</td>';
        HTMLCode += '<td class="header">Order Amount</td>';
        HTMLCode += '<td class="header">Points Earned</td></tr>';
        let totalPoints = 0;
        for (let item of orderHistory) {
            totalPoints += item.pointsEarned;
            HTMLCode += `<tr><td>${item.orderNumber}</td>`;
            HTMLCode += `<td>${item.orderDate}</td>`;
            HTMLCode += `<td>$${item.orderAmount.toLocaleString('en-US')}</td>`;
            HTMLCode += `<td>${item.pointsEarned.toLocaleString('en-US')}</td></tr>`;   
        }
        HTMLCode += '<tr><td colspan="3" style="text-align: center;">Total Points ';
        if (totalPoints >= DIAMOND) {
            HTMLCode += '(Congratulations, you are a diamond client!)</td>';
        } else {
            if (totalPoints >= GOLD) {
                HTMLCode += `(${(DIAMOND-totalPoints).toLocaleString('en-US')} points away from DIAMOND)</td>`;
            } else if (totalPoints >= SILVER){
                HTMLCode += `(${(GOLD-totalPoints).toLocaleString('en-US')} points away from GOLD)</td>`;
            }  else {
                HTMLCode += `(${(SILVER-totalPoints).toLocaleString('en-US')} points away from SILVER)</td>`;
            }
        }
        
        HTMLCode += `<td>${totalPoints.toLocaleString('en-US')}</td></tr>`
        document.getElementById('history').innerHTML = HTMLCode;
    
    } 
}


    