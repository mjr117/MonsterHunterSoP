// Setting up generic values
let titleText="The monster name (Type): title";
let descText="Description lives here";
let img = new Image();
let imgSource="Monster Images/greatSword.webp";
let themeButton={x:0,y:550,width:200,height:50};
let smashButton={x:0,y:60,width:50,height:280};
let passButton={x:550,y:60,width:50,height:280};
let backButton={x:400,y:550,width:200,height:50};
let audio=new Audio("Monster Theme/button-3.mp3");
let monsterIndex=0;
let initalSetup=false;

// Setting up class for each smash or pass section
class Monster {
    constructor(name,type,title,image,desc,theme,smash){
        this.name=name; // name of monster
        this.type=type; // the catigory/type of monster
        this.title=title; // if the monster has other names
        this.image=image; // location of image for monster
        this.desc=desc; // description of the monster
        this.theme=theme; // location of theme song of the monster
        this.smash=smash; // -1=no, 0=no answer, 1=yes
    }
    // show the slide
    show() {
        titleText=this.name+" ("+this.type+"): "+this.title;
        descText=this.desc;
        imgSource=this.image;
        if (this.theme!="NA"){
            audio=new Audio(this.theme);
        } else {
            audio=new Audio("Monster Theme/button-3.mp3");
        }
    }
    smashing(smash) {
        this.smash=smash;
        monsterIndex++;
        console.log(monsterIndex);
        draw();
    }
    backStep() {
        monsterIndex--;
        console.log(monsterIndex);
        draw();
    }
}

// defines a monsters
var monsters = new Array();
monsters.push(new Monster("Acidic Glavenus","Brute Wyvern","Sulfuric Cutting Wyvern","Monster Images/A/Acidic Glavenus.webp",
    "A subspecies of Glavenus found in the Rotten Vale. A corrosive\nfluid has crystallized on its tail, spraying acid with\neach swing.",
    "NA",0));
monsters.push(new Monster("Abyssal Lagiacrus","Leviathan","Consumer of the World","Monster Images/A/Abyssal Lagiacrus.webp",
    "A rare species of Lagiacrus known only from an ancient scroll:\nFrom the abyss' darkest cave Comes the master of the wave\nConsumer of the world entire Devil of the sea most dire Fear it as\nyou fear the grave.",
    "NA",0));

function draw() {
    const canvas = document.getElementById("tutorial");
    const volume = document.getElementById("volume-control")
    if (!initalSetup){
        // Adding the button actually button
        canvas.addEventListener('click', function(evt) {
            var mousePos = getMousePos(canvas, evt);

            if (isInside(mousePos,themeButton)) {
                audio.play();
            }else if(isInside(mousePos,smashButton)){
                monsters[monsterIndex].smashing(1);
            }else if(isInside(mousePos,passButton)){
                monsters[monsterIndex].smashing(0);
            }else if(isInside(mousePos,backButton)){
                monsters[monsterIndex].backStep();
            }else{
                alert('clicked outside buttons');
            }
        }, false);
        volume.addEventListener("change", function(e) {
            audio.volume = e.currentTarget.value / 100;
            });
        initalSetup=true;
    }
    monsters[monsterIndex].show();
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        // clear the inital space
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle="black";

        // Main text for saying what is done
        ctx.font= "40px serif";
        ctx.fillText("Monster Hunter: Smash or Pass", 10, 50);
        
        // Title text for the monster
        ctx.font = "20px serif";
        ctx.fillText(titleText,60,100);

        // Description text for the monster
        ctx.font = "20px serif";
        x=50; y=400; lineheight=25; lines=descText.split('\n');
        for (var i = 0; i<lines.length; i++)
            ctx.fillText(lines[i], x, y + (i*lineheight) );
        
        // Place main image of monster
        img.onload = () => {
            ctx.drawImage(img,150,150,200,200);
        }
        img.src=imgSource;

        // setting up button click
        ctx.fillStyle='#810066';
        ctx.fillRect(themeButton.x,themeButton.y,themeButton.width,themeButton.height);
        ctx.fillStyle='pink';
        ctx.fillRect(smashButton.x,smashButton.y,smashButton.width,smashButton.height);
        ctx.fillStyle='green';
        ctx.fillRect(passButton.x,passButton.y,passButton.width,passButton.height);
        ctx.fillStyle='black';
        ctx.fillRect(backButton.x,backButton.y,backButton.width,backButton.height);
        // The text for the buttons
        ctx.fillStyle='#f5bd05';
        ctx.fillText("Theme song play",20,580);
        ctx.fillStyle='white';
        ctx.fillText("Go back",480,580);
        ctx.save();
        ctx.rotate(Math.PI/2);
        ctx.fillStyle='black';
        ctx.fillText("SMASH",180,-20);
        ctx.restore();
        ctx.save();
        ctx.rotate(-Math.PI/2);
        ctx.fillStyle='black';
        ctx.fillText("PASS",-200,580);
        ctx.restore();
    }
}

// Function for getting the mouse position
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

// Function for checking is point is inside a box
function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y;
}