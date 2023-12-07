status="";
objects=[];
object_name="";

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function start()
{
    objectDetector.detect(gotResults);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
    if(results.length>0){    
    console.log(results);
    objects = results;
    }
    }
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults); 
        for (i = 0; i < objects.length; i++)
        {
            if(objects[i].label==object_name){
                document.getElementById("status").innerHTML = "Status : Object found";
                fill(r,g,b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 15);
                noFill();
                stroke(r,g,b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
            else {
                document.getElementById("status").innerHTML = "Status : Object not found";
            }
        }
    }
}
