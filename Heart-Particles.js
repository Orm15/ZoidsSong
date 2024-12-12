const startBtn = document.querySelector('.start-btn');
const canva = document.querySelector('#c');

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  canva.style.display = 'block';
});

var b = document.body;
var c = document.getElementsByTagName('canvas')[0];
var a = c.getContext('2d');

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();

var w = innerWidth,
    h = innerHeight,
    f = ~~((w * h) / 29E3),
    d = c.getContext("2d"),
    g = [],
    col = 255;

c.width = w;
c.height = h;

// Inicialización de partículas
l = 900;
while (l--) {
    var p = {};
    p.x = w / 2;
    p.y = h / 2;
    p.c = Math.random() > 0.4 ? 0 : 1;
    p.b = p.a = Math.random() * 1E5;
    p.p = 0;
    p.op = 0.1;
    g[l] = p;
}

d.fillStyle = "rgba(0, 0, 0, 255)";
// Ajuste del tamaño de fuente según el dispositivo
if (/Mobi|Android/i.test(navigator.userAgent)) {
    d.font = w * 0.9 - h * 0.2 + "px sans-serif"; // Tamaño original para dispositivos móviles
} else {
    d.font = w * 0.5 - h * 0.1 + "px sans-serif"; // Tamaño reducido para dispositivos no móviles
}
d.textAlign = "center";
d.textBaseline = "middle";
d.fillText('♥', w / 2, h / 2);

var heartPixelData = d.getImageData(0, 0, w, h).data;
d.fillStyle = "rgba(0, 0, 0, 1)";
d.fillRect(0, 0, w, h);

// Simular clic en el centro cada 5 segundos
setInterval(() => {
    var centerX = w / 2;
    var centerY = h / 2;
    for (l = 600; l--;) {
        var v = g[l];
        v.x = centerX;
        v.y = centerY;
    }
}, 5000);

function render() {
    d.fillStyle = "rgba(0, 0, 0, 0.01)";
    d.fillRect(0, 0, w, h);

    var e = g.length;
    while (e--) {
        var p = g[e];
        p.a += Math.random() > 0.5 ? -1 : 1;
        p.b -= (p.b - p.a) * 0.05;
        var m = p.b * 8;
        p.x += Math.cos(m / 180 * Math.PI);
        p.y += Math.sin(m / 180 * Math.PI);

        xd = p.x - w / 2;
        yd = p.y - h / 2;

        distance = Math.sqrt(xd * xd + yd * yd);

        var changeVal = heartPixelData[((~~p.x + (~~p.y * w)) * 4) - 1];

        if (p.p !== changeVal) {
            p.op = 0.01;
        }

        p.op += p.op < 0.5 ? 0.02 : 0;

        col = col < 0 ? 0 : col - 0.001;

        if (changeVal) {
            d.fillStyle = "rgba(255,0,0," + p.op + ")";
        } else {
            d.fillStyle = "rgba(255,255,255," + p.op + ")";
        }

        p.p = changeVal;

        if (p.x > w + f) p.x = -f;
        if (p.x < -f) p.x = w + f;
        if (p.y > h + f) p.y = -f;
        if (p.y < -f) p.y = h + f;

        a.font = (distance < f * (f / 4) ? (distance / (f / 4)) >> 0 || 1 : f) + 'px Arial';
        d.fillText('❤', ~~p.x, ~~p.y);
    }
}

// Animación
(function animationLoop() {
    requestAnimFrame(animationLoop);
    render();
})();
