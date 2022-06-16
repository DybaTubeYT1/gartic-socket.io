document.addEventListener('DOMContentLoaded', () => {

const socket = io.connect();

const pencil = {
    activate: false,
    moving: false,
    pos:{x:0,y:0},
    posBefore: null
}

const screen = document.querySelector('#screen')
const context = screen.getContext('2d')

screen.width = 700;
screen.height = 500;

const drawLine = (linha) =>{

    context.beginPath();
    context.moveTo(linha.posBefore.x,linha.posBefore.y)
    context.lineTo(linha.pos.x,linha.pos.y);
    context.stroke();
}

// desenharLinha({pos:{x:350,y:250}, posAnterior:{x:50,y:50}})

screen.onmousedown = (event) => {
    console.log(pencil.activate);
    pencil.activate = true;
}

screen.onmouseup = (event) => {
    console.log(pencil.activate);
    pencil.activate = false;
}

screen.onmousemove = (event) => {
    pencil.pos.x = event.clientX;
    pencil.pos.y = event.clientY;
    pencil.moving = true;
}

socket.on('draw', (line) => {
    drawLine(line);
})

const ciclo = () => {
    if(pencil.activate && pencil.moving && pencil.posBefore) {
        socket.emit('draw', {pos:pencil.pos, posBefore:pencil.posBefore})
        pencil.moving = false;
    }
    pencil.posBefore = {x:pencil.pos.x,y:pencil.pos.y}

    requestAnimationFrame(ciclo)
}
ciclo();

})