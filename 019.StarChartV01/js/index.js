import {  ajustPixelPerfectness, getCoordinates  } from "./otherFunctions.js"

const canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// Preenchimento manual
const ImageZoom = 4;
let marks = [
    {x: 280, y: 280, name: "Arthusa Sector", planets: ["Arystia", "Arvenor"], population: 87.5, sistemas: 27, alinhamento: "Imperial"},
    {x: 250, y: 324, name: "Raban Sector", planets: ["Cindrass"],  population: 11.3, sistemas: 8, alinhamento: "Imperial"},
    {x: 340, y: 360, name: "Caracalla Sector", planets: ["Auribor"],  population: 32.9, sistemas: 24, alinhamento: "Imperial"},
    {x: 740, y: 320, name: "Ladon Sector", planets: ["Darkash", "Nathar"],  population: 18, sistemas: 7, alinhamento: "Imperial"},
    {x: 310, y: 190, name: "Grural Sector", planets: ["Virel"],  population: 14.8, sistemas: 9, alinhamento: "Imperial"},
    {x: 160, y: 320, name: "Thalamon Sector", planets: ["Thalrun", "Vorthaal"],  population: 27.5, sistemas: 15, alinhamento: "Imperial"},
    {x: 220, y: 410, name: "Balcazar Sector", planets: ["Drahun"],  population: 20.1, sistemas: 10, alinhamento: "Imperial"},
    {x: 460, y: 100, name: "Myrad Sector", planets: ["Myrras Korr"],  population: 31.2, sistemas: 17, alinhamento: "Imperial"},
    {x: 620, y: 180, name: "Maltre Sector", planets: ["Korvess", "Ravyn 9"],  population: 24.5, sistemas: 12, alinhamento: "Imperial"},
    {x: 50, y: 200, name: "Kernis Sector", planets: ["Karthane"],  population: 58.2, sistemas: 32, alinhamento: "Imperial"},
    {x: 300, y: 30, name: "Noitra Sector", planets: ["Lethara"],  population: 25, sistemas: 14, alinhamento: "Imperial"},
    {x: 800, y: 220, name: "Albalin Sector", planets: ["Neret"],  population: 24.9, sistemas: 16, alinhamento: "Imperial"},
];

/*
Doreth Prime
Taranys
Vallis Reach
Eripsa
Sikkion
Carnessia
Caltheris
Lysara
Virellyon
Caer Sadal
Nemea
Khelaris
Baranor IV
Corvath
Drahun
Kharos
Thyssar
Halverin
Velka Prime
Ferr Vallis
Crynia
*/

marks = ajustPixelPerfectness(marks, ImageZoom);

// Inicializa a imagem do mapa espacial;
let spaceChart = new Image();
spaceChart.src = "./img/spacechart.png";
spaceChart.addEventListener('load', initialImage);

function initialImage() {
    context.drawImage(spaceChart,0,0);
};


// Inicializa os pontos do mapa;
let mark = new Image();
mark.src = "./img/point.png";
mark.addEventListener('load', initialMarks);

function initialMarks() {
    for (let i = 0; i < marks.length; i++) {
        context.drawImage(mark, marks[i].x, marks[i].y);
    };
};

// Inicializa os pontos, quando sobre hover;
let markHover = new Image();
markHover.src = "./img/pointHover.png";

// Função de hover
let subtitles = {x: 40, y: 520};
let currentHover = {x: 0, y: 0};
let redrawnNeeded = false;
document.fonts.load('40px Micro5');
document.fonts.load('30px Tiny5');
document.fonts.load('20px Tiny5');
canvas.addEventListener('mousemove', listenForHover);

function listenForHover(event) {
    const coordinates = getCoordinates(canvas, event);
    for (let i = 0; i < marks.length; i++) {
        if (coordinates.x > marks[i].x && coordinates.x < (marks[i].x + mark.width) &&
            coordinates.y > marks[i].y && coordinates.y < (marks[i].y + mark.height)) {
            
            context.drawImage(markHover, marks[i].x, marks[i].y);

            context.font = "30px Tiny5";
            context.fillStyle = "yellow";
            context.fillText(marks[i].name, subtitles.x, subtitles.y);
            
            context.font = "20px Tiny5";
            context.fillText(marks[i].planets.join(", ") + " (...)", subtitles.x, subtitles.y+28);
            context.fillText("Systems:", subtitles.x, subtitles.y+52);
            context.fillText(marks[i].sistemas, subtitles.x+120, subtitles.y+52);
            context.fillText("Population:", subtitles.x, subtitles.y+72);
            context.fillText(marks[i].population + " bi", subtitles.x+120, subtitles.y+72);
            context.fillText("Alignment:", subtitles.x, subtitles.y+92);
            context.fillText(marks[i].alinhamento, subtitles.x+120, subtitles.y+92);


            currentHover = {x: marks[i].x, y: marks[i].y};
            redrawnNeeded = true;
        };
    };
    if (coordinates.x > currentHover.x && coordinates.x < (currentHover.x + mark.width) &&
        coordinates.y > currentHover.y && coordinates.y < (currentHover.y + mark.height)) {
    } else if (redrawnNeeded) {
        initialImage(); initialMarks();
        redrawnNeeded = false;
    }
}
