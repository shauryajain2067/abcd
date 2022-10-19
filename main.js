 left_wrist_x=0;
 left_wrist_y=0;
 right_wrist_x=0;
 right_wrist_y=0;
 scoreLeftWrist=0;
 score_right_wrist=0;
 music="";
function preload(){
music=loadSound("music.mp3");


}

function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}



function play(){
music.play();


}

function modelLoaded(){
    console.log("POSENET IS INITILIZED");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        left_wrist_x=results[0].pose.leftWrist.x;
        left_wrist_y=results[0].pose.rightWrist.y;
        console.log("the left wrist x = " + left_wrist_x + " and the left wrist y = " + left_wrist_y);

        right_wrist_x=results[0].pose.rightWrist.x;
        right_wrist_y=results[0].pose.rightWrist.y;
        console.log("the right wrist x = " + right_wrist_x + " and the right wrist y = " + right_wrist_y);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("score left wrist = " + scoreLeftWrist);

        score_right_wrist=results[0].pose.keypoints[10].score;
        console.log("right wrist score is " + score_right_wrist);
    }

}

function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");



  if( score_right_wrist > 0.2){
    circle(right_wrist_x,right_wrist_y,20);

    if(right_wrist_y > 0 && right_wrist_y <=100){
        document.getElementById("speed").innerHTML="Speed = 0.5x";
        music.rate(0.5); 
    }
    else if(right_wrist_y > 100 && right_wrist_y <=200){
        document.getElementById("speed").innerHTML="Speed = 1x";
        music.rate(1);        
    }
    else if(right_wrist_y > 200 && right_wrist_y <= 300){
        document.getElementById("speed").innerHTML="Speed = 1.5x";
        music.rate(1.5);

    }
    else if(right_wrist_y >300 && right_wrist_y <=400){
        document.getElementById("speed").innerHTML="Speed = 2x";
        music.rate(2);
    }
    else if(right_wrist_y > 400 && right_wrist_y <=500){
        document.getElementById("speed").innerHTML="Speed = 2.5x";
    music.rate(2.5);
    }
  }
    if(scoreLeftWrist > 0.2){
        circle(left_wrist_x,left_wrist_y,20);
        iNnumberleftwristy=Number(left_wrist_y);
        remove_decimal=floor(iNnumberleftwristy);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="Volume = " + volume;
        music.setVolume(volume);
    }
    
    }
