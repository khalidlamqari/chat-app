

let boxs            = document.querySelector('.boxs');
let messageHeader   = document.getElementById('messageHeader');
let msgArea         = document.getElementById('msg-area');
let dateContainer   = document.querySelector('.date');
let appelsContainer = document.querySelector('.appels');


getData();
async function getData(){
    const myPromise = new Promise((resolve , reject)=>{
        const httpR = new XMLHttpRequest();
        httpR.open('GET' , 'js/appels.json');
        httpR.send();
        httpR.onload = function(){
            if(this.status === 200 && this.readyState === 4){
                resolve(this.responseText);
            }else
            {
                reject(Error("No Data Found"));
            }
        }
    });
    const myData = await myPromise ;
    console.log(myData);
    setData(JSON.parse(myData));
}



let searchContact    = document.getElementById('searchContact');
let btnSearchContact = document.getElementById('btnSearchContact');
let goBack           = document.getElementById('goBack');


function setData(appels){
    // create box
    appels.forEach(appel => {
        let box = createBox(appel);
        box.addEventListener('click' , ()=>{
            document.querySelectorAll('.boxs .box').forEach(b =>{b.classList.remove('active')});
            box.classList.add('active');
            history(appel);
        });
        boxs.appendChild(box);
    });

}




function createBox(appel){
    let box = document.createElement('div');
    box.classList.add('box');

let image = document.createElement('img');
    image.src = `${appel.image}`;

let desc = document.createElement('div');
    desc.classList.add('desc');

let title = document.createElement('div');
    title.classList.add('title');

let msg = document.createElement('div');
    msg.classList.add('msg');

let h4 = document.createElement('h4');
    h4.innerHTML = `${appel.fname} ${appel.lname}`;

let span = document.createElement('span');
    span.innerHTML = `${appel.date}`;

let i = document.createElement('i');
    i.classList.add('fa-solid');
    i.classList.add('fa-phone');
    // i.classList.add('c-green');

let p = document.createElement('p');
    p.innerHTML = `${appel.path}  (${appel.APPELS.length})`;
    // p.classList.add('c-green');

    msg.appendChild(i);
    msg.appendChild(p);


    title.appendChild(h4);
    title.appendChild(span);

    desc.appendChild(title);
    desc.appendChild(msg);

    box.appendChild(image);
    box.appendChild(desc);

    // boxs.appendChild(box);
    return box;
}



function history(appel){

    let header = `<div class="nav">
                    <div class="img-name">
                        <img src="${appel.image}" alt="">
                        <h3>${appel.fname} ${appel.lname}</h3>
                    </div>
                    <ul>
                        <li><i class="fa-solid fa-phone"></i></li>
                        <li><i class="fa-solid fa-video"></i></li>
                        <li ><i class="fa-solid fa-comment"></i></li>
                    </ul>
                </div>`;
        
    messageHeader.innerHTML = header;

    dateContainer.innerHTML = `${appel.date}`;




    appelsContainer.innerHTML = '';
    appel.APPELS.forEach( (ap) => {
        let duration;
        if (ap.reponse == 'y') {
            duration = ap.time;
        } else {
            duration = 'No Response';
        }
        let call = `
                    <div class="appel">
                        <i class="fa-solid fa-phone"></i>
                        <p> ${ap.type} call  ${ap.start} </p>
                        <span>${duration}</span>
                    </div>
                `;


        appelsContainer.innerHTML += call;

        // appelsContainer.innerHTML += call ;
    });
}




