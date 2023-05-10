
var laoding = `
                <ul class="loadingMSG">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>`;



async function getContact(){

    let myContacts = new Promise((resolve, reject)=>{

            let XmlHTTP = new XMLHttpRequest();
            XmlHTTP.open('GET' , "js/data.json");
            XmlHTTP.send();
            XmlHTTP.onload = function(){
                if(this.status === 200 && this.readyState === 4){
                    resolve(this.responseText);
                }
                else
                {
                    reject(Error('No Data Found !!'));
                }
            }

    });
    const res = await myContacts;
    let contacts = JSON.parse(res);
    contacts.forEach(contact => {
        createContact(contact);
    });
    addClickerOnUser();

    propMembers(contacts);// this function for add propably members in list create "new group"  
    
    filterContact(contacts);
}


// get data from server and use createContact() function to create contactes in the left menu
getContact(); 


function addClickerOnUser(){

    let msgArea = document.querySelector('.msg-area');
    let contactlist = document.querySelectorAll('.boxs .box')
    contactlist.forEach((element, i) =>{
        
        element.addEventListener('click', async function(){

            contactlist.forEach(box =>{box.classList.remove('active')});
            element.classList.add('active');

            let userId = element.getAttribute('data-id');// data id for  get all messages from database the id have unique 
            
            
            document.getElementById('messageHeader').innerHTML ='' //clean the header 
            msgArea.innerHTML = laoding;// clean the area of message and set loading object
            
            mailer(0) // show input field and audio and file updater in the page

            const data = new Promise((resolve , reject)=>{
                // setTimeout(() => {
                    
                
                const xmlhttp = new XMLHttpRequest();
                xmlhttp.open('GET' , 'js/messages.json');
                xmlhttp.send();
                xmlhttp.onload = function(){
                    if(this.readyState === 4 && this.status === 200){
                        resolve(this.responseText);
                    }else{
                        reject(Error('no data found'));
                    }
                }
                // }, 3000);
            });

            let res = await data;

            mailer(1) // show input field and audio and file updater in the page

            const msgsJson =  JSON.parse(res);

            msgArea.innerHTML = '';// clean the area of message

            setNameInHeader(msgsJson)// this function will add the name and last name in the header

            msgsJson.allMessages.forEach(function (_msg) {
                addMsg(_msg);
                });
        });
    });
}

function createContact(obj){
    let check;
    let Nmsg;
    let contactName;
    if(obj.type === 'group'){
        contactName = `${obj.name}`;
    } else {
        contactName = `${obj.fname} ${obj.lname}`;
    }
    if(obj.lastMSG.from === 'him'){
        check = '';
        if(obj.msgNotRead > 0 ){
            Nmsg = `<span>${obj.msgNotRead}</span>`;
        }
        else
        {
            Nmsg ='';
        }
    }
    else if(obj.lastMSG.from === 'me')
    {
        Nmsg ='';
        if(obj.lastMSG.msgState === -1)// -1 mean the message is gane
        { 
            check = `<i class="fa-solid fa-check"></i>`;
        } else if(obj.lastMSG.msgState === 0)// 0 The message went and arrived and not open
        {
            check = `<i class="fa-solid fa-check-double"></i>`;
        }
        else if(obj.lastMSG.msgState === 1)// 0 The message went and arrived and not open
        {
            check = `<i class="fa-solid fa-check-double" style="color:var(--main-color)"></i>`;
        }
    }
    let htmlForm = `
    <div class="box" data-id='${obj.id}'>
    <img src="${obj.image}" alt="">
    <div class="desc">
        <div class="title">
            <h4>${contactName}</h4>
            <span>${obj.lastMSG.datetime}</span>
        </div>
        <div class="msg">
            ${check}
            <p>${obj.lastMSG.msg}</p> 
            ${Nmsg}
        </div>
    </div>
    </div>
    `;
    document.querySelector('.boxs').innerHTML += htmlForm;
}




function addMsg(M){
    let msgArea = document.querySelector('.msg-area');
    // console.log()
    if(M.type === 'text'){
        msgArea.innerHTML+=  `<div class="${M.from}">
                        <div>
                            <p>${M.msg}</p>
                            <span>${M.datetime}</span>
                        </div>
                    </div>
                    `;
    }
    else if(M.type === 'image'){
        msgArea.innerHTML += `<div class="${M.from}">
                        <div>
                            <img src="${M.image}" alt="">
                            <span>${M.datetime}</span>
                        </div>
                    </div>
        `;
    }else if(M.type === 'video'){
        msgArea.innerHTML += `<div class="${M.from}">
                        <div>
                            <video src="${M.video}" controls></video>
                            <span>${M.datetime}</span>
                        </div>
                    </div>
        `;
    }
    else if(M.type === 'audio'){
        msgArea.innerHTML += `<div class="${M.from}">
                        <div>
                        <audio src="${M.audio}" controls></audio>
                            <span>${M.datetime}</span>
                        </div>
                    </div>
        `;
    }

}



function setNameInHeader(obj){
    let messageHeader = document.getElementById('messageHeader');
    messageHeader.innerHTML = `
                        <div class="nav">
                        <div class="img-name">
                            <img src="${obj.image}" alt="">
                            <h3>${obj.fname} ${obj.lname}</h3>
                        </div>
                        <ul>
                            <li><i class="fa-solid fa-phone"></i></li>
                            <li><i class="fa-solid fa-video"></i></li>
                            <li id='contactControl'><i class="fa-solid fa-ellipsis-vertical"></i>
                                <div>
                                    <a href='#' >view profile </a>
                                    <a href='#' >block </a>
                                    <a href='#' >delete</a>
                                </div>
                                <span></span>
                                
                            </li>
                        </ul>
                    </div>
    `;
    userSetting();
}

// setNameInHeader(8)
function userSetting(){
    let contactControl = document.getElementById('contactControl');
    let btn3p = document.querySelector('#contactControl i');
    let btnOpt = document.querySelector('#contactControl div');
    let backBtn = document.querySelector('#contactControl span');

    btn3p.addEventListener('click' , ()=>{
        btnOpt.style['display'] = 'block';
        backBtn.style['display'] = 'block';
        
    });
    backBtn.addEventListener('click' , ()=>{
        btnOpt.style['display'] = 'none';
        backBtn.style['display'] = 'none';
        
    });
}





/*======================== */


let new_cg_div = document.querySelector('.new-cg div');
let btnI = document.querySelector('.new-cg i');
let hiddenbtn = document.querySelector('.hiddenbtn');

btnI.addEventListener('click' , ()=>{
    
        new_cg_div.style.display = 'block';
        hiddenbtn.style.display = 'block';
        btnI.classList.add('active');
    
});
hiddenbtn.addEventListener('click' , ()=>{
 
        new_cg_div.style.display = 'none';
        hiddenbtn.style.display = 'none';
        btnI.classList.remove('active')
   
});
let filters = document.querySelector('.filter');
let newContact = document.querySelector('.new-contact');
let newGroup = document.querySelector('.new-group');
let filtersBtn = document.querySelector('.filter .opt');
let newContactBtn = document.querySelector('.new-contact .opt');
let newGroupBtn = document.querySelector('.new-group .opt');
let filterArow = document.getElementById('filterArow');
let NContactArow = document.getElementById('NContactArow');
let NGroupArow = document.getElementById('NGroupArow');


let listFNNBtn = [filtersBtn , newContactBtn , newGroupBtn];
let listFNN = [filters , newContact , newGroup];
let arrows  = [filterArow , NContactArow ,  NGroupArow];


listFNNBtn.forEach((element , i) => {
    element.addEventListener('click' , ()=>{
        if(listFNN[i].getAttribute('class').split(' ').indexOf('active') != -1){
            arrows[i].style['transform'] = 'rotate(0deg)';
            listFNN.forEach(el =>{el.style.display = 'block'});
            listFNN[i].classList.remove('active');
        }else{
            listFNN.forEach(el =>{el.style.display = 'none'});
            listFNN[i].style.display = 'block';
            listFNN[i].classList.add('active');
            arrows[i].style['transform'] = 'rotate(90deg)';
        }
    });
});





function propMembers(listMembers){
    let membersContainer = document.querySelector('.membersContainer');
    let groupName = document.querySelectorAll('.group-name input')[0];
    let btnSubmit = document.querySelectorAll('.group-name input')[1];
    let numberOfmembers =document.getElementById('numberOfmembers');

    listMembers.forEach(member => {
        if(member.type != 'group'){

            membersContainer.innerHTML += `
                                            <label class="contact" >
                                            <img src="${member.image}" alt="">
                                            <h3>${member.fname} ${member.lname}</h3>
                                            <input type="checkbox" value="${member.id}">
                                            </label>
                                        `;
                                    
                                    
                                    }

            });
            
        let _group_ = {
            "name":"",
            "memersID":[]
        };
        document.querySelectorAll('.membersContainer input').forEach(btnCheck =>{

            btnCheck.addEventListener('change' , ()=>{
                if(btnCheck.checked){

                    _group_.memersID.push(btnCheck.value);

                }
                else
                {
               
                    let x = _group_.memersID.indexOf(btnCheck.value);

                    _group_.memersID.splice(x ,1 );

                }
                
                console.log(_group_.memersID)

                numberOfmembers.innerHTML = `(${_group_.memersID.length})`;

            });
        });

        groupName.addEventListener('change' , ()=>{
            _group_.name = groupName.value;
            console.log(_group_.name);
        });

        btnSubmit.addEventListener('click' , ()=>{
            if(_group_.name.trim().length >=2 && _group_.memersID.length >= 1){
                console.log('group name : ' + _group_.name)
                console.log('group members : ' + _group_.memersID)

                groupName.style["border-color"] = 'var(--main-color)';
                numberOfmembers.style['color'] = 'white';

            }
            else
            {
                if(_group_.name.trim().length <=2){
                    groupName.style["border-color"] = 'red';
                }
                if(_group_.memersID.length == 0){
                    numberOfmembers.innerHTML = `(${0})`;
                    numberOfmembers.style['color'] = 'red';
                }
            }
        });


}



let container_audio = document.querySelector('.container_audio');
let btn_audio_record = document.getElementById('btn_audio_record');
let btn__send = document.getElementById('btn__send');
let getText = document.getElementById('getText');
let ul = document.querySelector('.container_audio ul');

function mailer(n){
    let formForSend = document.getElementById('formForSend');
    if(n === 1){
        formForSend.style['display'] = 'flex';
        
    getText.addEventListener('input', ()=>{
        if(getText.value.trim() != ''){
            
            btn_audio_record.style['display'] = 'none';
            btn__send.style['display'] = 'block';

        }else{
            btn_audio_record.style['display'] = 'block';
            btn__send.style['display'] = 'none';
        }
       
    });

    btn_audio_record.addEventListener('click',()=>{
        console.log('btn_audio_record');
        getText.style['display'] = 'none';
        container_audio.style['display'] = 'flex';
        btn_audio_record.style['display'] = 'none';
        btn__send.style['display'] = 'block';
        ul.classList.add('start_anim_record');
        
            audioRecord()
    });

    
    }else{
        formForSend.style['display'] = 'none';
    }
    


}


function filterContact(listContact){
    let notRead    = document.getElementById('notRead');
    let groups     = document.getElementById('groups');
    let allContact = document.getElementById('allContact');
    let searchContact = document.getElementById('searchContact');
    let btnSearchContact = document.getElementById('btnSearchContact');
    



    searchContact.addEventListener('change' , ()=>{
        document.querySelector('.boxs').innerHTML = '';
        document.getElementById('goBack').style['display']='block';
        listContact.forEach(contact =>{
            let name = '';
            if(contact.type === 'contact'){
                name = `${contact.fname} ${contact.lname}`;
            }else{
                name = contact.name;
            }
            if(name.indexOf(searchContact.value) != -1){
                createContact(contact);
                addClickerOnUser();
            }
        });
    });


    // 
    notRead.addEventListener('click' , ()=>{
        document.querySelector('.boxs').innerHTML = '';
        document.getElementById('goBack').style['display']='block';
        
        listContact.forEach(contact =>{
            if(contact.msgNotRead > 0){
                createContact(contact);
                addClickerOnUser();
            }
        });
    });

    groups.addEventListener('click' , ()=>{
        document.querySelector('.boxs').innerHTML = '';
        document.getElementById('goBack').style['display']='block';
        listContact.forEach(contact =>{
            if(contact.type === 'group'){
                createContact(contact);
                addClickerOnUser();
            }
        });
    });

    allContact.addEventListener('click' , ()=>{
        document.querySelector('.boxs').innerHTML = '';
        document.getElementById('goBack').style['display']='none';
        listContact.forEach(contact =>{
                createContact(contact);
                addClickerOnUser();
        });
    });
    document.getElementById('goBack').addEventListener('click', ()=>{allContact.click()})

}


// ======== AUDIO ===============


function audioRecord(){
    let btn__pause__resume = document.getElementById('btn__pause__resume');
    let audio_del = document.getElementById('audio_del');
    let timeRecord = document.querySelector('.timeRecord');
    let btn__pause = document.getElementById('btn__pause');
    let btn__resume = document.getElementById('btn__resume');
    let isRecording = true ; // true > paused



    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia supported.");
        navigator.mediaDevices
            .getUserMedia(
            // constraints - only audio needed for this app
            {
                audio: true,
            }
            )
        
            // Success callback
            .then((stream) => {
                const mediaRecorder = new MediaRecorder(stream);
                
                mediaRecorder.start();
                console.log(mediaRecorder.state);
                
                let chunks = [];
        
                    mediaRecorder.ondataavailable = (e) => {
                    chunks.push(e.data);
                    };
        //-----------------------------------------------
                btn__pause__resume.addEventListener('click' , ()=>{
                    if(mediaRecorder.state === "paused"){
                        btn__pause.style['display'] = 'block';
                        btn__resume.style['display'] = 'none';
                        ul.classList.add('start_anim_record');
                        isRecording = true;
                        mediaRecorder.resume();
                        console.log(mediaRecorder.state);
                    }
                    else if(mediaRecorder.state === "recording"){
                        btn__pause.style['display'] = 'none';
                        btn__resume.style['display'] = 'block';
                        ul.classList.remove('start_anim_record');
                        isRecording = false;
                        mediaRecorder.pause();
                        console.log(mediaRecorder.state);
                    }

                })
                let mm  = 0;
                let ss  = 0;
                let STRmm ;
                let STRss ;
                let tmr = setInterval(() => {
                    if(isRecording){
                        if(ss === 59){
                            mm+=1;
                            ss=0;
                            
                        }else{
                            ss+=1;
                            
                        }
                        if(ss<10){
                            STRss = '0'+ss;
                        }else{
                            STRss = ss ;
                        }
                        if(mm<10){
                            STRmm = '0'+mm;
                        }else{
                            STRmm = mm ;
                        }
                    
                        timeRecord.innerHTML = `${STRmm}:${STRss}`;
                    }
            
                }, 1000);
            
            
                
        //-----------------------------------------------

                    audio_del.addEventListener('click' , ()=>{
                        clearInterval(tmr);
                        timeRecord.innerHTML = '00:00';
                        container_audio.style['display'] = 'none';
                        btn_audio_record.style['display'] = 'block';
                        btn__send.style['display'] = 'none';
                        getText.style['display'] = 'block';
                        mediaRecorder.stop();
                    });


                    btn__send.addEventListener('click' , ()=>{
                        console.log('btn__send')
                        mediaRecorder.stop();
                        console.log(mediaRecorder.state);
                        isRecording = false;

                        clearInterval(tmr);
                        timeRecord.innerHTML = '00:00';
                        container_audio.style['display'] = 'none';
                        btn_audio_record.style['display'] = 'block';
                        btn__send.style['display'] = 'none';
                        getText.style['display'] = 'block';
                    
                        
                        mediaRecorder.onstop = (e) => {
                        console.log("recorder stopped");
            
                        let audio = document.createElement('div');
                        let MSGAREA = document.querySelector('.msg-area');
                        audio.classList.add('me');
                        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                        chunks = [];
                        const audioURL = window.URL.createObjectURL(blob);
                        // audioTest.src = audioURL;
                        
                  

                        let audioContent = `
                                    
                                        <div>
                                            <audio src="${audioURL}" controls=""></audio>
                                            <span>17/04/2023</span>
                                        </div>
                                    
                                    `;
                        audio.innerHTML = audioContent;
                        MSGAREA.appendChild(audio);
                        MSGAREA.scrollTo({ left: 0, top: MSGAREA.scrollHeight, behavior: "smooth" });
                                                        
                    };
               
                });
        
        
            })
        
            // Error callback
            .catch((err) => {
            console.error(`The following getUserMedia error occurred: ${err}`);
            });
        } else {
        console.log("getUserMedia not supported on your browser!");
        }
}





// ======== AND AUDIO ============








