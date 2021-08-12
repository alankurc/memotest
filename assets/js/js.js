// Pasos puede ser 1 o 2.
// Si es dos oculto todas 
// Si clickeo 2 iguales las dejo visibles

var paso = 0;
var primerTarjeta;
var segundaTarjeta;
var match;
var sePuedeClickear = true;

// Background

var colors = new Array([44, 145, 223], [110, 233, 133], [110, 233, 225], [255, 213, 0], [255, 0, 86], [213, 0, 255]);
var step = 0;
var colorIndices = [0, 1, 2, 3];
var gradientSpeed = 0.004;

function updateGradient() {
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "#" + ((r1 << 16) | (g1 << 8) | b1).toString(16);

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "#" + ((r2 << 16) | (g2 << 8) | b2).toString(16);

    document.getElementById('gradient').style.background = 'linear-gradient(' + color1 + ',' + color2 + ') no-repeat';

    step += gradientSpeed;

    if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];
        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

    }
};

setInterval(updateGradient, 10);

// Fin Background

$(function () {

    var parent = $("#container-cartas");
    var divs = parent.children();

    while (divs.length) {

        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);

    }
});

$('#inicio').modal({backdrop: 'static', keyboard: false})

$("#inicio").modal("show");

$(".card").click(function () {

    if ($(this).hasClass('adivinada')) {
        return false;
    }

    var tarjetaActual = $(this);

    if (paso != 2) {
        paso++;

    }

    if (paso === 1 && sePuedeClickear) {
        primerTarjeta = $(this);
        $(this).addClass("flipped");

    } else if (paso === 2 && sePuedeClickear) {
        segundaTarjeta = $(this);
        $(this).addClass("flipped");
        console.log(segundaTarjeta);


        match = primerTarjeta.data('par') === segundaTarjeta.data('par');

        function matchear() {
            primerTarjeta.addClass("adivinada");
            segundaTarjeta.addClass("adivinada");

        }

        if (match) {
            matchear();
            sePuedeClickear = true;

        } else if (!match) {
            setTimeout(darVuelta, 500);
            sePuedeClickear = false;
        }

        function darVuelta() {
            primerTarjeta.removeClass("flipped");
            segundaTarjeta.removeClass("flipped");
            sePuedeClickear = true;
            paso = 0;

        }

        if ($('.card.adivinada').length === $('.card').length) {
            $('#ganaste').modal({backdrop: 'static', keyboard: false})
            $("#ganaste").modal("show");
            running = false;

        } else {
            console.log('Seguis jugando');
        }

        paso = 0;
        console.log(match);
    }

});


// Reloj

var valor1 = document.getElementById("lvl1").value;
var valor2 = document.getElementById("lvl2").value;
var valor3 = document.getElementById("lvl3").value;

var nivel1 = parseInt(valor1);
var nivel2 = parseInt(valor2);
var nivel3 = parseInt(valor3);

var start;
var start01;
var start02;
var sec = 0;
var running = false;

function init() {

    resetClock();
    start = document.getElementById('lvl1');
    start01 = document.getElementById('lvl2');
    start02 = document.getElementById('lvl3');
    start.addEventListener('click', startClock, false);
    start01.addEventListener('click', startClock, false);
    start02.addEventListener('click', startClock, false);

}

function startClock() {

    running = true;
    countTime();
    $('#lvl1').attr('disabled', true);
    $('#lvl2').attr('disabled', true);
    $('#lvl3').attr('disabled', true);
    $("#inicio").modal("hide");

}

function resetClock() {
}

function countTime() {

    setTimeout(function () {
        if (running) {
            sec++;
            if ($(start).click(this)) {
                if (sec === nivel1) {
                    $('#perdiste').modal({backdrop: 'static', keyboard: false})
                    $("#perdiste").modal("show");
                    running = false;
                }

            }
            if ($(start01).click(this)) {
                if (sec === nivel2) {
                    $('#perdiste').modal({backdrop: 'static', keyboard: false})
                    $("#perdiste").modal("show");
                    running = false;
                }

            }
            if ($(start02).click(this)) {
                if (sec === nivel3) {
                    $('#perdiste').modal({backdrop: 'static', keyboard: false})
                    $("#perdiste").modal("show");
                    running = false;
                }
            }

            showTime();
            countTime();
        }
    }, 1000);

}

$(".volver-jugar").click(function () {

    location.reload();

});

function showTime() {

    makeOne(sec, '#sec .ones');

    makeTen(sec, '#sec .tens');

}

function makeOne(time, type) {

    var one = time % 10;
    makeNumber(one, type);

}

function makeTen(time, type) {

    var ten = Math.floor(time / 10);
    makeOne(ten, type);

}

function makeNumber(num, type) {

    switch (num) {

        case 0:
            $(type).show();
            $(type + '.b7').hide();
            break;

        case 1:
            $(type).hide();
            $(type + '.b5,' + type + '.b6').show();
            break;

        case 2:
            $(type).show();
            $(type + '.b2,' + type + '.b5').hide();
            break;

        case 3:
            $(type).show();
            $(type + '.b2,' + type + '.b3').hide();
            break;

        case 4:
            $(type).show();
            $(type + '.b1,' + type + '.b3,' + type + '.b4').hide();
            break;

        case 5:
            $(type).show();
            $(type + '.b3,' + type + '.b6').hide();
            break;

        case 6:
            $(type).show();
            $(type + '.b6').hide();
            break;

        case 7:
            $(type).hide();
            $(type + '.b1,' + type + '.b5,' + type + '.b6').show();
            break;

        case 8:
            $(type).show();
            break;

        case 9:
            $(type).show();
            $(type + '.b3').hide();
            break;
    }

}

window.addEventListener('load', init, false);