// export [checkemail]

let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let email = document.getElementById('email');
let password = document.getElementById('password');
let cpassword = document.getElementById('cpassword');
let btn_submit = document.querySelector('.btn-submit');
let text = document.querySelector('.btn-submit span');
let loadingObj = document.querySelector(".btn-submit ul");
let containerMessages = document.querySelector('.container-messages');
let info = document.querySelector('.info');
let confirmeEmail = document.querySelector('.confirme-email');
let eye1 = password.parentElement.childNodes[5];
let eye2 = cpassword.parentElement.childNodes[5];
// let eye1 = document.getElementById('eye1');
// let eye2 = document.getElementById('eye2');

// console.log(password.getAttribute('type'));

fname.addEventListener('blur' , ()=>{ checkFname() });
lname.addEventListener('blur' , ()=>{checklname()});
email.addEventListener('blur' , ()=>{ checkemail() });
password.addEventListener('blur' , ()=>{ checkpass1() });
cpassword.addEventListener('blur' , ()=>{ checkpass2() });
eye1.addEventListener('click' , ()=>{
    if(password.getAttribute('type') === 'password'){
        password.setAttribute('type','text') ;
        eye1.classList.remove('fa-eye-slash');
        eye1.classList.add('fa-eye')
    }else{
        password.setAttribute('type','password') ;
        eye1.classList.remove('fa-eye');
        eye1.classList.add('fa-eye-slash')
    }
    
});

eye2.addEventListener('click' , ()=>{
    if(cpassword.getAttribute('type') === 'password'){
        cpassword.setAttribute('type','text') ;
        eye2.classList.remove('fa-eye-slash');
        eye2.classList.add('fa-eye')
    }else{
        cpassword.setAttribute('type','password') ;
        eye2.classList.remove('fa-eye');
        eye2.classList.add('fa-eye-slash')
    }
    
});
// console.log(fname.getAttribute('class'))
function checkFname(){
    let re = /[^0-9][a-z]{3,}/g;
    let check = re.test(fname.value.trim());
    if(check){
        if(fname.getAttribute('class') === 'ErrorInfo'){
            fname.classList.remove('ErrorInfo');
        }
        return true ;
    }else{
        fname.classList.add('ErrorInfo');
        return false;
    }
}


function checklname(){
    let re = /[^0-9][a-z]{3,}/g;
    let check = re.test(lname.value.trim());
    if(check){
        if(lname.getAttribute('class') === 'ErrorInfo'){
            lname.classList.remove('ErrorInfo');
        }
        return true ;
    }else{
        lname.classList.add('ErrorInfo');
        return false;
    }
}


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

function checkpass1(){
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    let check = re.test(password.value.trim());
    if(check){
        if(password.getAttribute('class') === 'ErrorInfo'){
            password.classList.remove('ErrorInfo');
        }
        return true ;
    }else{
        password.classList.add('ErrorInfo');
        return false;
    }
}


function checkpass2(){
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    let check = re.test(cpassword.value.trim());
    if(check){
        if(cpassword.getAttribute('class') === 'ErrorInfo'){
            cpassword.classList.remove('ErrorInfo');
        }
        return true ;
    }else{
        cpassword.classList.add('ErrorInfo');
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



btn_submit.onclick = ()=>{
    checkFname();
    checklname();
    checkemail();
    checkpass1();
    checkpass2();
    if(checkFname() && checklname() && checkemail() && checkpass1() && checkpass2()){
        console.log('ok');
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
            info.style.display = 'none';
            confirmeEmail.style.display = 'flex';
          }
          
          readData();
        
    }else{
        console.log("not ok")
        createMSG('There Is an Error in fields, Please check it' , 'bg-red')
        

    }
}

let numbers = document.querySelectorAll('.numbers input');
// numbers[0].value= 0;
numbers.forEach((element , index) => {
    // element.addEventListener('enter' , ()=> console.log('entered'));
    element.onchange = ()=>{
        if(element.value.length === 1){
            if((index + 1)  < numbers.length){
                numbers[index + 1].focus();
            }
        }else{
            element.value = '';
        }
    }
});


let btnConfirme = document.querySelector('.confirme');
let textSpan = document.querySelector('.confirme span');
let treePoints = document.querySelector('.confirme ul');


btnConfirme.addEventListener('click',()=>{
    let checkfilds = ()=>{
        let tst = true;
        numbers.forEach((element) => {
            if(element.value.length !== 1){tst = false;}
        });
        return tst;
    }

    console.log(checkfilds());
    if(checkfilds()){
        textSpan.style.display ='none';
        treePoints.style.display ='flex';
        //promise
        const myPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
            resolve("Iam The Good Promise");
            reject(Error("Iam The Bad Promise"));
            }, 3000);
        });
        async function readData() {
            console.log("Before Promise");
            console.log(await myPromise);
            textSpan.style.display ='block';
            treePoints.style.display ='none';
        }
        
        readData();
    }else{
        createMSG('There Is an Error in sume fild , Please check it ' , 'bg-red')
    }
});

/* ====== SIGN IN ========= */



