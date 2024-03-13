'use strict;'

const items = [];
    const pinfo = document.querySelector('.pinfo');
    const pqtn = document.querySelector('.pqtn');
    const stard = document.querySelector('.startd');
    const endd = document.querySelector('.endd');
    const res = document.querySelector('.res');
    const add = document.querySelector('.add');
    const iList = document.querySelector('.iList');
    const promptu = document.querySelector('.promptu');
    const promptd = document.querySelector('.promptd');
    // console.log(promptd);
    

    const today = Date.now();

    const cinfo = document.querySelector('.cinfo');
    const cpqtn = document.querySelector('.cpqtn');
    const cstard = document.querySelector('.cstartd');
    const cendd = document.querySelector('.cendd');
    const cadd = document.querySelector('.cadd');
    // console.log(cadd);

    const empty = document.querySelector('.empty');
    const emptyinfo = document.querySelector('.emptyinfo');

    const dia = document.querySelector('.dia');
    const close = document.querySelector('.dia .close');
    // console.log(close);

    const guest = document.querySelector('.guest');
    const login = document.querySelector('.login');
    const ele = document.querySelector('target');
    

  //  console.log(guest);
    

    let deldef;
    let estotal = 0;
    let estotalsh;

    

    pqtn.addEventListener('click',function(){
      if(promptu.innerText === 'Please enter the quantity!' || promptu.innerText === 'Please enter a positive integer!'){
         promptu.style.display = 'none';
      }
      
    });

    stard.addEventListener('click',function(){
      if(promptu.innerText === 'Please enter the start date!' || promptu.innerText === 'Please enter a date after today!'){
         promptu.style.display = 'none';
      }
      
    });

    endd.addEventListener('click',function(){
      if(promptu.innerText === 'Please enter the end date!' || promptu.innerText === 'End date should be after the start date!'){
         promptu.style.display = 'none';
      }
      
    });


    cpqtn.addEventListener('click',function(){
      if(promptd.innerText === 'Please enter the quantity!' || promptu.innerText === 'Please enter a positive integer!'){
         promptd.style.display = 'none';
      }
      
    });

    cstard.addEventListener('click',function(){
      if(promptd.innerText === 'Please enter the start date!' || promptd.innerText === 'Please enter a date after today!'){
         promptd.style.display = 'none';
      }
      
    });

    cendd.addEventListener('click',function(){
      if(promptd.innerText === 'Please enter the end date!' || promptd.innerText === 'End date should be after the start date!'){
         promptd.style.display = 'none';
      }
      
    });


  

    add.addEventListener('click', function(e){

      e.preventDefault();

    

      let dur = getDaysBetween(stard.value, endd.value);
      const dateS = new Date(stard.value);

      if(pqtn.value === '') {
        promptu.innerHTML = 'Please enter the quantity!';
        promptu.style.display = 'block';
        return;
      }

      if(+pqtn.value <=0) {
        promptu.innerHTML = 'Please enter a positive integer!';
        promptu.style.display = 'block';
        return;
      }

      if(stard.value === '') {
        promptu.innerHTML = 'Please enter the start date!';
        promptu.style.display = 'block';
        return;
      }

      if((today-dateS)>=0) {
        promptu.innerHTML = 'Please enter a date after today!';
        promptu.style.display = 'block';
        return;
      }


      if(endd.value === '') {
        promptu.innerHTML = 'Please enter the end date!';
        promptu.style.display = 'block';
        return;
      }

      if(dur<=0) {
        promptu.innerHTML = 'End date should be after the start date!';
        promptu.style.display = 'block';
        return;
      }

      const obj = {
        pid: items.length+1,
        pname: pinfo.value.split("-")[0].trim(),
        pqtn: pqtn.value.trim(),
        pprice: (pinfo.value.split("-")[1].trim()*pqtn.value.trim()*dur).toFixed(2),
        stard: stard.value,
        endd: endd.value,
        duration: dur
      }

      
     items.push(obj);
     res.reset();
     render();


    });



    cadd.addEventListener('click', function(e){

    e.preventDefault();


    let dur = getDaysBetween(cstard.value, cendd.value);
    const dateS = new Date(cstard.value);

    if(cpqtn.value === '') {
        promptd.innerHTML = 'Please enter the quantity!';
        promptd.style.display = 'block';
        return;
      }

      if(+cpqtn.value <=0) {
        promptu.innerHTML = 'Please enter a positive integer!';
        promptu.style.display = 'block';
        return;
      }

      if(cstard.value === '') {
        promptd.innerHTML = 'Please enter the start date!';
        promptd.style.display = 'block';
        return;
      }

      if((today-dateS)>=0) {
        promptd.innerHTML = 'Please enter a date after today!';
        promptd.style.display = 'block';
        return;
      }


      if(cendd.value === '') {
        promptd.innerHTML = 'Please enter the end date!';
        promptd.style.display = 'block';
        return;
      }

      if(dur<=0) {
        promptd.innerHTML = 'End date should be after the start date!';
        promptd.style.display = 'block';
        return;
      }




    const obj = {
      pid: items.length+1,
      pname: cinfo.value.split("-")[0].trim(),
      pqtn: cpqtn.value.trim(),
      pprice: (cinfo.value.split("-")[1].trim()*cpqtn.value.trim()*dur).toFixed(2),
      stard: cstard.value,
      endd: cendd.value,
      duration: dur
    }


    items.push(obj);
    
    res.reset();
    render();


    });

    function render(){
      let estotal = 0;
      let estotalsh;

      localStorage.setItem('reservation_list', JSON.stringify(items));

      if(items.length===1){
        empty.style.display = 'none';
        iList.style.display = 'block';
      
      }

      if(items.length===0){
        empty.style.display = 'block';
        iList.style.display = 'none';
      }

      
      document.querySelector('.iList').innerHTML='';

      const h = document.createElement('h3');
      h.innerText = `Reservation Summary`;

      iList.appendChild(h);

      const th = document.createElement('tr');
      th.innerHTML = `
          <td>&nbsp;&nbsp;&nbsp;No.</td>
          <td>Name</td>
          <td>Quantity</td>
          <td>Start Date</td>
          <td>End Date</td>
          <td>Duration&nbsp;Days</td>
          <td>Price</td>
          <td>Remove</td>
      `;

      iList.appendChild(th);
      

      for (let i=0; i<items.length; i++){
        const tr = document.createElement('tr');
        tr.innerHTML=`
          <td>${i+1}</td>
          <td>${items[i].pname}</td>
          <td>${items[i].pqtn}</td>
          <td>${items[i].stard}</td>
          <td>${items[i].endd}</td>
          <td>${items[i].duration}</td>
          <td>$${items[i].pprice}</td>
          <td><a href="" class="material-symbols-outlined" data-id=${i}>delete</a></td>
        `;

        iList.appendChild(tr);
        estotal = (+estotal) + (+items[i].pprice);
        localStorage.setItem('estimated_total', estotal);
        estotalsh = estotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

      }

      const esTo = document.createElement('div');
      esTo.innerHTML =`Estimated Total&nbsp;:&nbsp;&nbsp;${estotalsh}`;
      esTo.className = 'esto';
      iList.appendChild(esTo);

      // console.log(esTo);

      const subB = document.createElement('div');
      subB.innerHTML = `
      <input type="submit" name="submit" value="Check Out" onclick="subform()">
      `;
      iList.appendChild(subB);
      // deldef = document.querySelector('input[type=submit]');
      // deldef.addEventListener('click', function(e){
      //   iList.removeEventListener('click', del);
      // });
      
    }

    function getDaysBetween(date1, date2) {
      let time1 = new Date(date1).getTime();
      let time2 = new Date(date2).getTime();
      var days = Math.ceil((time2 - time1) / (1000 * 3600 * 24));
      return days;
    }

    function del(e) {
      e.preventDefault();
      if (e.target.tagName === 'A') {
        items.splice(e.target.dataset.id, 1);
        render()
      }
    }

    iList.addEventListener('click', del);

    function subform() {
      const sub = document.querySelector('.iList div input');
      dia.style.display='block';
      guest.addEventListener('click', function(e){
        e.preventDefault();
        iList.removeEventListener('click', del);
        sub.click();
      });
    
      
    }

    close.addEventListener('click', function(e){
      e.preventDefault();
      dia.style.display = 'none';
    });