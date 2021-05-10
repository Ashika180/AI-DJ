scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristX = 0;
leftWristX = 0;
rightWristX = 0;
rightWristY = 0;


function preload(){
 audio = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.position(600, 225);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
console.log("Model Loaded!");
}

function gotPoses(results){

    if(results.length > 0){
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("The confidence/score of left wrist is: " + scoreLeftWrist + " and the confidence of right wrist is " + scoreRightWrist);

    leftWristX = results[0].pose.leftWrist.x - 5;
    leftWristY = results[0].pose.leftWrist.y - 5;

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;

    console.log("The x coordinates of left and right wrists are: " + leftWristX + " " + rightWristX + ". The y coordinates for left and right wrists are: " + leftWristY + " " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke(	"#FF0000");

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);

        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML = "Speed is 0.5x.";
            audio.rate(0.5);
        }

        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed is 1x.";
            audio.rate(1);
        }

        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed is 1.5x.";
            audio.rate(1.5);
        }

        else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed is 2x.";
            audio.rate(2);
        }

        else if(rightWristY > 400){
            document.getElementById("speed").innerHTML = "Speed is 2.5x.";
            audio.rate(2.5);
        }
    }




    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        number = Number(leftWristY);
        decimal = floor(number);
        volume = decimal/500;
        audio.setVolume(volume);
        document.getElementById("volume").innerHTML = "Volume is " + volume;
    }
}

function playSound(){
    audio.play();
    audio.rate(1);
    audio.setVolume(1);
}

function stopSound(){
audio.stop();
}