/* ====== SIGN IN ========= */


let btnLogin =document.querySelector('.btn-login');
let containerMessages = document.querySelector('.container-messages');
let text = document.querySelector('.btn-submit span');
let loadingObj = document.querySelector(".btn-submit ul");

function checkemail(){
    let re = /[a-z0-9]{6,}.@gmail.com/ig;
    let check = re.test(email.value.trim());
    if(check){
        if(email.getAttribute('class') === 'ErrorInfo'){
            email.classList.remove('ErrorInfo');
        }
        return true ;
    }else{
        email.classList.add('ErrorInfo');
        return false;
    } 
}

function createMSG(message , clr){
    let container = document.createElement('div');
    container.classList.add('message');
    container.classList.add(clr);
    let exitBtn  = document.createElement('i');
    exitBtn.classList.add('fa-solid');
    exitBtn.classList.add('fa-xmark');
    let msg = document.createElement('p');
    let txt = document.createTextNode(message);
    msg.appendChild(txt);
    container.appendChild(exitBtn);
    container.appendChild(msg);
    containerMessages.appendChild(container);
    exitBtn.addEventListener('click' , ()=>{container.remove()})
    setTimeout(() => {container.remove()}, 5000);
}

btnLogin.addEventListener('click' , ()=>{
    // checkemail();
    if(checkemail()){
        text.style.display ='none';
        loadingObj.style.display ='flex';
        //promise
        const myPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve("Iam The Good Promise");
              reject(Error("Iam The Bad Promise"));
            }, 3000);

            // let myXHR = new XMLHttpRequest();
            // myXHR.open("GET" , apiLink);
            // myXHR.send();
            // myXHR.onload = function(){
            //     if(this.status === 200 && this.readyState === 4){
            //     resolve(this.responseText);
            //     }else{
            //     reject(Error("No data found"));
            //     }
            // }
          });
        async function readData() {
            console.log("Before Promise");
            // myPromise.then((resolvedValue) => console.log(resolvedValue));
            console.log(await myPromise);
            console.log("After Promise");
            text.style.display ='block';
            loadingObj.style.display ='none';
          }
          
          readData();
    }else{
        createMSG('There Is an Error in sume fild , Please check it ' , 'bg-red');
    }
        
});










let passlog = document.getElementById('passlog');
let logEye = passlog.parentElement.childNodes[5];
logEye.addEventListener('click' , ()=>{
    if(passlog.getAttribute('type') === 'password'){
        passlog.setAttribute('type','text') ;
        logEye.classList.remove('fa-eye-slash');
        logEye.classList.add('fa-eye')
    }else{
        passlog.setAttribute('type','password') ;
        logEye.classList.remove('fa-eye');
        logEye.classList.add('fa-eye-slash')
    }
    
});