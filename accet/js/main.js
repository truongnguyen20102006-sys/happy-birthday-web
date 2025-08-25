var intervalArr = [];

var box_head = document.getElementById("box_head");
var box_body = document.getElementById("box_body");
var clicked = true;

var pixelOfY = String(Math.random()*50 +250);
var pixelOfX = String((Math.random()*50 +250));
var general1 = {
    opacity:[0,1,0],
    transform: ["translateY(0px) rotate(0) translateX(0)",
                `translateY(-${pixelOfY}px) rotate(30deg) translateX(${pixelOfX}px)`],
}
var general2 = {
    opacity:[0,1,0],
    transform: ["translateY(0px) rotate(0) translateX(0)",
                `translateY(-${pixelOfY}px) rotate(30deg) translateX(-${pixelOfX}px)`],
}
const vibration = (ele) => {
    const id1 = setInterval(()=>{
        ele.style.transform = "translateX(-48%)";
    },300)
    const id2 = setInterval(()=>{
        ele.style.transform = "translateX(-50%)";
    },400)
    intervalArr.push(id1,id2);
}   
const stopVibration = () => {
    intervalArr.forEach(id => clearInterval(id));
    intervalArr = [];
}
const move_animation = () => {
    vibration(box_head);
    vibration(box_body);   
}
const move_box_head = () => {
    return new Promise(
        (resolve) => {
            const move_box_head = new KeyframeEffect(
                box_head,
                {
                    transform: ["translateX(-50%)","translateX(0%)"],
                },
                {duration: 1500,fill:"forwards"}
            )
            const execute = new Animation(move_box_head, document.timeline)
            execute.play();
            execute.onfinish = () => resolve();
        }
    )
}
const fall_box_head = () => {
    const fall_box_head = new KeyframeEffect(
        box_head,
        {
            transform: ["translate(0, 0) rotate(0deg)"],
            transform: ["translate(45%, 55%) rotate(35deg)"]
        },
        {duration:2000, fill:"forwards"}
    )
    const execute = new Animation(fall_box_head,document.timeline);
    execute.play();
    execute.onfinish = () => {resolve()}
}
const animation_open = () => {
    var rule = Promise.resolve();
    rule
        .then(
            () => move_box_head()
        )
        .then(
            () => fall_box_head()    
        )   
        .then(
            () => appear_context()
        ) 
}
const appear_context = () => {
    let context = document.getElementById("Happy_context");
    const context_a = new KeyframeEffect(
        context,
        {
            opacity: [0,1],
            transform:["translateY(0)","translateY(-330px)"],
        },
        {duration:2000, fill:"forwards"}
    )
    const execute = new Animation(context_a, document.timeline)
    execute.play();
}
const open_box = () => {
    box_body.onclick = () => {
        stopVibration();
        animation_open();
        setTimeout(
            () => {
                fireworks_a();
                fly_pictures();
            }
        ,3000)
        box_body.onclick=null;
    }
}
const fireworks_a = () => {
    const fw_container = document.getElementById("firework");
    const fireworks = new Fireworks(fw_container, {
        autoresize: true,
        opacity: 0.9,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 50,
        traceLength: 3,
        traceSpeed: 10,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        hue: { min: 0, max: 360 },
        delay: { min: 30, max: 60 },
        }
    );
    fireworks.start();
}
    

const fly_pictures = () =>{
    const image1 = document.getElementById("cat1");
    const image2 = document.getElementById("cat2");
    const image3 = document.getElementById("cat3");
    const image4 = document.getElementById("cat4");
    const image5 = document.getElementById("cat5");
    const image6 = document.getElementById("cat6");
    const fly_picture1 = new KeyframeEffect(
        image1,
        general1,
        {duration: 2500} 
    )
    const fly_picture2 = new KeyframeEffect(
        image2,
        general2,
        {duration: 2500} 
    )
    const fly_picture3 = new KeyframeEffect(
        image3,
        general1,
        {duration: 2500} 
    )
    const fly_picture4 = new KeyframeEffect(
        image4,
        general2,
        {duration: 2500} 
    )
    const fly_picture5 = new KeyframeEffect(
        image5,
        general1,
        {duration: 2500} 
    )
    const fly_picture6 = new KeyframeEffect(
        image6,
        general2,
        {duration: 2500} 
    )
    const execute1 = new Animation(fly_picture1,document.timeline);
    const execute2 = new Animation(fly_picture2,document.timeline);
    const execute3 = new Animation(fly_picture3,document.timeline);
    const execute4 = new Animation(fly_picture4,document.timeline);
    const execute5 = new Animation(fly_picture5,document.timeline);
    const execute6 = new Animation(fly_picture6,document.timeline);

    execute1.play();
    execute1.onfinish = () => {
        execute2.play();
        execute2.onfinish = () =>{
            execute3.play();
            execute3.onfinish = () =>{
                execute4.play();
                execute4.onfinish = () =>{   
                    execute5.play();
                    execute5.onfinish = () =>{    
                        execute6.play();
                        execute6.onfinish = () =>{    
                        }
                    } 
                }
            }
        }
    }
}
var main  = () => {
    move_animation();
    open_box()
}
main();