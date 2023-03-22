
function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();
    background("rgb(219, 217, 217)");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}

function clearCanvas(){
    background("rgb(219, 217, 217)");
}

function draw(){
    strokeWeight(5);
    stroke("black");
    if (mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    checkSketch();
    if (drawnSketch == sketch){
        answerHolder = "set";
        score++;
        document.getElementById("dScore").innerHTML = "Score: " + score;
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if (error) {
        console.log(error);   
    }
    console.log(results);
    var result = results[0].label;
    document.getElementById("dName").innerHTML = "Nome: " + result.replace("_", " ");
    document.getElementById("dPrecision").innerHTML = "Precisão: " + Math.round(results[0].confidence * 100) + "%";
    
    utterThis = new SpeechSynthesisUtterance(result.replace('_', ' ')); 
    synth.speak(utterThis);
}

function updateCanvas(){
    background("white");
    randomNumber = Math.floor(Math.random() * quickDrawDataset.lenght) + 1;
    sketch = quickDrawDataset[randomNumber];
    document.getElementById("dDraw").innerHTML = "Desenho: " + sketch;
}

function checkSketch(){
    timerCounter++;
    document.getElementById("dTime").innerHTML = "Tempo restante: " + timerCounter;
    if (timerCounter > 400){
        timerCounter = 0;
        timerCheck = "completed";
    }
    if (timerCheck == "completed" || answerHolder == "set") {
        timerCheck = "";
        answerHolder = "";
        createCanvas();
    }
}