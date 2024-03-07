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

let clientInfo = 
    {
        userID: 1,
        userName: 'isabella123',
        fullName: 'Isabella Thompson',
        phoneNumber: '123-456-7890',
        emailAddress: 'me@email.com',
        street: '50 Red Street',
        city: 'Montreal',
        province: 'QC',
        postalCode: 'P9K 0J7',
        isHavingWedding: true,
        eventDate: '2024-11-30',
    };

let weddingDetails =
    {
        userID: 1,
        weddingDate: '2025-03-05 17:00',
        servicesChosen: ['Photography', 'Videography', 'Wedding Planning', 'Hairstylist'],
    };

let orderHistory = [
    {
        userID: 1,
        orderNumber: 100,
        orderDate: '2024-03-11',
        orderAmount: 2000,
        pointsEarned: 10000,
    },
    {
        userID: 1,
        orderNumber: 210,
        orderDate: '2024-04-11',
        orderAmount: 200,
        pointsEarned: 1000,
    }
];


window.addEventListener('load', startup);

/**
 * function to retrieve data from the arrays above about the user, their wedding (if applicable), and their order history
 * and prints the information in their respective section.
 */
function startup() {
    getPersonalInfo();

    getWeddingDetails();

    getOrderHistory();
}

/**
 * retrieves and prints the user's personal information into their respective input boxes from the array.
 * User is then unable to edit the information due to the disabled attribute.
 */
function getPersonalInfo() {
    document.getElementById('fullName').value = clientInfo.fullName;
    document.getElementById('phoneNumber').value = clientInfo.phoneNumber;
    document.getElementById('emailAddress').value = clientInfo.emailAddress;
    document.getElementById('street').value = clientInfo.street;
    document.getElementById('city').value = clientInfo.city;
    document.getElementById('province').value = clientInfo.province;
    document.getElementById('postalCode').value = clientInfo.postalCode;
    setDisabledAttribute();
}

/**
 * allows the user to edit their personal information
 */
function editInfo() {
    removeDisabledAttribute();
    let elements = document.querySelectorAll('#personalInfo td input');
    for (let elem of elements) {
        elem.style.backgroundColor = '#e1a8b1';
    }
    document.getElementById('editBtn').value = 'Save';
    document.getElementById('editBtn').addEventListener('click', saveInfo);
}

/**
 * Sets the disabled attribute so the user cannot enter or change data in the input boxes
 */
function setDisabledAttribute() {
    document.getElementById('fullName').setAttribute("disabled", "disabled");
    document.getElementById('phoneNumber').setAttribute("disabled", "disabled");
    document.getElementById('emailAddress').setAttribute("disabled", "disabled");
    document.getElementById('street').setAttribute("disabled", "disabled");
    document.getElementById('city').setAttribute("disabled", "disabled");
    document.getElementById('province').setAttribute("disabled", "disabled");
    document.getElementById('postalCode').setAttribute("disabled", "disabled");
}

/**
 * Removes the disabled attribute so the user can enter data in the input boxes
 */
function removeDisabledAttribute() {
    document.getElementById('fullName').removeAttribute("disabled");
    document.getElementById('phoneNumber').removeAttribute("disabled");
    document.getElementById('emailAddress').removeAttribute("disabled");
    document.getElementById('street').removeAttribute("disabled");
    document.getElementById('city').removeAttribute("disabled");
    document.getElementById('province').removeAttribute("disabled");
    document.getElementById('postalCode').removeAttribute("disabled");
}

/**
 * updates the existing array with the new data from the user.
 */
function saveInfo() {
    clientInfo.fullName = document.getElementById('fullName').value;
    clientInfo.phoneNumber = document.getElementById('phoneNumber').value;
    clientInfo.emailAddress = document.getElementById('emailAddress').value;
    clientInfo.street = document.getElementById('street').value;
    clientInfo.city = document.getElementById('city').value;
    clientInfo.province = document.getElementById('province').value;
    clientInfo.postalCode = document.getElementById('postalCode').value;
    setDisabledAttribute();
    let elements = document.querySelectorAll('#personalInfo td input');
    for (let elem of elements) {
        elem.style.backgroundColor = 'white';
    }
    document.getElementById('editBtn').value = 'Edit';
    document.getElementById('editBtn').addEventListener('click', editInfo);
    alert('Your information has been saved.');
    // location.reload();
}

/**
 * retrieves the user's wedding details (if applicable) including their wedding date, 
 * and services required during their wedding.
 */
function getWeddingDetails() {
    if (clientInfo.isHavingWedding === true) {    
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
    } else {
        document.getElementById('wedding').style.display = 'none';
    }
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
            HTMLCode += `<td>$${item.orderAmount}</td>`;
            HTMLCode += `<td>${item.pointsEarned}</td></tr>`;   
        }
        HTMLCode += '<tr><td colspan="3" style="text-align: center;">Total Points ';
        if (totalPoints >= DIAMOND) {
            HTMLCode += '(Congratulations, you are a diamond client!)</td>';
        } else {
            if (totalPoints >= GOLD) {
                HTMLCode += `(${DIAMOND-totalPoints} points away from DIAMOND)</td>`;
            } else if (totalPoints >= SILVER){
                HTMLCode += `(${GOLD-totalPoints} points away from GOLD)</td>`;
            }  else {
                HTMLCode += `(${SILVER-totalPoints} points away from SILVER)</td>`;
            }
        }
        
        HTMLCode += `<td>${totalPoints}</td></tr>`
        document.getElementById('history').innerHTML = HTMLCode;
    
    } 
}


    