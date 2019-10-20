let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;

canvas.height = window.innerHeight-4;

ctx.fillStyle = '#33cccc';

let arrayElements = [],
    mouseX, mouseY;

let randPositionX = () => {
    return Math.random() * (canvas.width - 10) + 5;
}

let randPositionY = () => {
    return Math.random() * (canvas.height - 10) + 5;
}

let randSpeedX = () => {
    return Math.random() * (3 + 3) - 3;
}

let randSpeedY = () => {
    return Math.random() * (3 + 3) - 3;
}

let randomSize = () => {
    return Math.random() * (3 - 0) + 3;
}

canvas.addEventListener("mousemove", event => {
    mouseX = event.clientX;
    mouseY = event.clientY;
}, false)


let generateCircle = (length) => {
    for (let i = 0; i < length; i ++){
        let obj = {
            x: randPositionX(),
            y: randPositionY(),
            size: randomSize(),
            speedX: randSpeedX(),
            speedY: randSpeedY()
        };
        arrayElements.push(obj);
    } 
}

let newConfigurateForCircle = () => {
    arrayElements.map(item => {
        if ((item.x <= (item.size)) || (item.x >= canvas.width - (item.size)) ){
            item.speedX = -item.speedX
        }
        if ((item.y <= (item.size)) || (item.y >= canvas.height - (item.size))){
            item.speedY = -item.speedY
        }
        if ((Math.abs(item.x - mouseX) < 100) && (Math.abs(item.y - mouseY) < 100)){
            item.x = (item.speedX < 0) ? item.x - 3 : item.x + 3;
            item.y = (item.speedY < 0) ? item.y - 3 : item.y + 3;         
        }
        item.x = item.x + item.speedX;
        item.y = item.y + item.speedY;
    })
    
}

let renderElements = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let arrayLinkedCircle = [[]];
    arrayElements.map((item, index) => {
        ctx.moveTo(item.x, item.y);
        ctx.arc(item.x, item.y, item.size, 0, 2*Math.PI);
        ctx.strokeStyle = '#33cccc';
        ctx.fill();
        ctx.beginPath();
        let linkForCircle = [];
        arrayElements.map((otherItem, otherIndex) => {
            if ((Math.abs(item.x - otherItem.x)) < 70 && (Math.abs(item.y - otherItem.y)) < 70 && !arrayLinkedCircle[index].includes(otherIndex)){
                ctx.moveTo(item.x, item.y);
                ctx.lineWidth = 1;
                ctx.lineTo(otherItem.x , otherItem.y); 
                ctx.stroke();
                linkForCircle.push(otherIndex);
            };
        });
        arrayLinkedCircle.push(linkForCircle);
    });
    newConfigurateForCircle()
};
let start = () => {
    
    generateCircle(100);
    setInterval(() => { 
        renderElements(); 
        
    }, 40);
}

start();
