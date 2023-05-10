




// TAKERS

let boxs               = document.querySelector('.boxs');
let messageHeader      = document.getElementById('messageHeader');
let msgArea            = document.getElementById('msg-area');
let dateContainer      = document.querySelector('.date');
let storiesContainer   = document.querySelector('.storiesContainer');
let contTimer          = document.querySelector('.timers');
let mystorytools       = document.querySelector('.mystorytools');


getData();
async function getData(){
    const myPromise = new Promise((resolve , reject)=>{
        const httpR = new XMLHttpRequest();
        httpR.open('GET' , 'js/storiesData.json');
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
    let jsonObject = JSON.parse(myData)
    let stories = jsonObject.slice(1);
    MYSTORY(jsonObject[0])
    setData(stories);
}



function setData(stories){
    // create box
    stories.forEach(story => {
        let box = createBox(story);
        box.addEventListener('click' , ()=>{
            
            mystorytools.style['display'] = 'none';
            document.querySelectorAll('.boxs .box').forEach(b =>{b.classList.remove('active')});
            box.classList.add('active');
            let header = `<div class="nav">
                            <div class="img-name">
                                <img src="${story.image}" alt="">
                                <h3>${story.fname} ${story.lname}</h3>
                            </div>
                            <ul>
                                <li><i class="fa-solid fa-phone"></i></li>
                                <li><i class="fa-solid fa-video"></i></li>
                                <li ><i class="fa-solid fa-comment"></i></li>
                            </ul>
                        </div>`;

                messageHeader.innerHTML = header;

                dateContainer.innerHTML = `${story.lastStory}`;
            setStory(story.STORIES);
            // console.log(story.STORIES)
        });
        boxs.appendChild(box);
    });
}



function createBox(story){
    let box = document.createElement('div');
    box.classList.add('box');

let image = document.createElement('img');
    image.src = `${story.image}`;

let desc = document.createElement('div');
    desc.classList.add('desc');

let title = document.createElement('div');
    title.classList.add('title');

let msg = document.createElement('div');
    msg.classList.add('msg');

let h4 = document.createElement('h4');
    h4.innerHTML = `${story.fname} ${story.lname}`;

let span = document.createElement('span');
    span.innerHTML = `${story.lastStory}`;




    title.appendChild(h4);
    title.appendChild(span);

    desc.appendChild(title);

    box.appendChild(image);
    box.appendChild(desc);

    // boxs.appendChild(box);
    return box;
}



function setStory(allStories){
    
    // console.log(allStories);
    storiesContainer.innerHTML ='';
    allStories.forEach(story =>{
        if(story.type === 'image'){
            let image = document.createElement('img');
            image.src = story.image;
            image.classList.add('slidCounter');
            image.setAttribute('data-time' , story.time);
            storiesContainer.appendChild(image);
        }else if(story.type === 'video'){
            let video = document.createElement('video');
            video.src = story.video;
            video.classList.add('slidCounter');
            storiesContainer.appendChild(video);
            
        }
    });

    contTimer.innerHTML = '<li><span data-width="0"></span></li>'.repeat(allStories.length);
    
    slider();

}



function slider(){
    let timers       = document.querySelectorAll('.timers li');
    let elements     = document.querySelectorAll('.storiesContainer .slidCounter');
    let sliderBtns   = document.querySelectorAll('.btn-story li');
    let next         = sliderBtns[2];
    let stop         = sliderBtns[1];
    let prev         = sliderBtns[0];
    let current      = 0
    let sps = document.querySelectorAll('.timers span');
    let isStart = true;
    // sps.forEach(element => {element.style['width'] = 0;});
    sps.forEach(element => {element.setAttribute('data-width' , 0)  ;});
    
    

    function test(){
        setInterval(() => {
            if(isStart){
    
                sps[current].style['width'] = parseInt(sps[current].getAttribute('data-width')) + 1 + '%';
                sps[current].setAttribute('data-width' , parseInt(sps[current].getAttribute('data-width'))+1)  ;

                if(sps[current].getAttribute('data-width') >= 100){
                    next.click();
                }
            }
        }, 50);
        
    }
    test();

    next.addEventListener('click' ,  function(){
        

    // sps.forEach(element => {element.setAttribute('data-width' , 0)  ;});

        elements.forEach(element => {element.style['display'] = 'none';});
        if(current === elements.length -1){  
            current = 0;
        }else{
            current +=1;
        }
        isStart = true;
        
        
        sps[current].setAttribute('data-width' , 0);
        dateContainer.innerHTML = elements[current].getAttribute('data-time');
        elements[current].style['display'] = 'block';

    });

    prev.addEventListener('click' , ()=>{
        elements.forEach(element => {element.style['display'] = 'none';});
        if(current === 0){
            current = elements.length -1;
        }else{
            current -=1;
        }
        isStart = true;
        sps[current].setAttribute('data-width' , 0);
        dateContainer.innerHTML = elements[current].getAttribute('data-time');
        elements[current].style['display'] = 'block';
        console.log('precius')
    });
    
    stop.addEventListener('click' , ()=>{
        if(isStart){
            isStart =false;
        }else{
            isStart =true;
        }
    });

}




function MYSTORY(mydata){
    console.log(mydata.image)
    let img = document.querySelector('.mystory img');
    let txt = document.querySelector('.mystory span');
    let vues = document.querySelector('.mystorytools span');
    let mystoryBox = document.querySelector('.mystory');
    img.src = mydata.image ;

    let header = `<div class="nav">
                            <div class="img-name">
                                <img src="${mydata.image}" alt="">
                                <h3>${mydata.fname} ${mydata.lname}</h3>
                            </div>
                            <ul>
                                <li><i class="fa-solid fa-phone"></i></li>
                                <li><i class="fa-solid fa-video"></i></li>
                                <li ><i class="fa-solid fa-comment"></i></li>
                            </ul>
                        </div>`;

                messageHeader.innerHTML = header;

    mystoryBox.addEventListener('click', ()=>{
        mystorytools.style['display'] = 'flex';
        
        if(mydata.STORIES.length === 0){
            console.log('lllll')
        }else{
            setStory(mydata.STORIES);
            vues.innerHTML = `(${mydata.vues}) vues`;
        }
        
        
    });
    mystoryBox.click();

}