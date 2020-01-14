const WIDTH = 1800;
const HEIGHT = 600;

const coeffs = [1, 2, 1]; 
const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const output = [];

let inputIndex = 0;
let process = coeffs.map(c => ({
  a: c,
  x: null,
  xPrime: null,
  p: null,
  pPrime: null
}));

function makeStep() {

  //check if we have reached the end of the input list (the last element in "input")
  if(inputIndex < input.length){
    process[0].p = 0; //if we have NOT we set pin of first process to 0
  }
  else{
    process[0].p  = null; //we set it to null
  }

  if(inputIndex < input.length){
      process[0].x = input[inputIndex]; //if we have NOT we set the value of xin to current value
                                        //in the input list based on index
  }
  else{
    process[0].x = null; //we set it to null
  }

  inputIndex++; //go to next element in the input list


  //adjust the pin,pout,xin and xout accordingly by propagating the values
  for (let i = 1; i < process.length; i++) {
    process[i].p = process[i-1].pPrime;
    process[i].x = process[i-1].xPrime;
  }

  //if the pout of the last process is changed from null we display it beneath "Output"
  if (process[process.length-1].pPrime !== null)
    output.splice(0, 0, process[process.length-1].pPrime);

  //compute the values for pout and xout
  for (let i = 0; i < process.length; i++) {
    if (process[i].x !== null) {
      process[i].pPrime = process[i].p * process[i].x + process[i].a;
      process[i].xPrime = process[i].x;
    } else {
      process[i].pPrime = process[i].xPrime = null;
    }
  }
}


function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  clear();
  textAlign(LEFT)
  textSize(35)

  //Allign and edit Inputs layout
  textStyle(BOLDITALIC)
  text('Input Values:', 10, 50)

  textStyle(NORMAL)
  text(input.slice(inputIndex).reverse().join(), 10, 100)

  //Allign and edit Outputs layout
  textStyle(BOLDITALIC)
  text('Output Values:', 10, 150)

  textStyle(NORMAL)
  text(output.join(),10,200)


  //model the graphics for process rectangles
  process.forEach((process, index) => {

    //everything will be alligned relatively to the top left corner of the rectangle
    const left =  300 * (index + 1)
    const top = HEIGHT / 2 -50;

    //draw the rectangles for processes
    fill(255);
    rect(left, top, 150, 200)
    fill(0);

    //allign the "P"+index and "a" values in the rectangles
    textAlign(CENTER)
    textSize(40)
    text('P' + index, left, top + 30, 160, 50);
    textSize(30)
    text(process.a, left, top + 100, 160, 80);


    textSize(20)
    //draw the top-left lines between processes
    line(left - 150, top + 30, left, top + 30)

    //draw the bottom-left lines
    line(left - 150, top + 170, left, top + 170)

    //draw the top-right and bottom-right lines for the last process

     line(left + 300, top + 30, left + 150, top + 30)
     line(left + 300, top + 170, left + 150, top + 170)


    //add the values of p, pPrime, x and xPrime on the lines next to the rectangles
    if (process.p !== null) {
       textAlign(RIGHT, BOTTOM);
       text(process.p, left - 20, top + 30)
     }

    if (process.x !== null) {
      textAlign(RIGHT, BOTTOM);
      text(process.x, left - 20, top + 170)
    }


    if (process.pPrime !== null) {
      textAlign(LEFT, BOTTOM);
      text(process.pPrime, left + 170, top + 30)
    }

    if (process.xPrime !== null) {
      textAlign(LEFT, BOTTOM);
      text(process.xPrime, left +170, top + 170)
    }

    //draw the delay black rectangles
    if (index > 0) {
      rect(left - 80, top + 15, 20, 30);
      rect(left - 80, top + 155, 20, 30);
    }
  });

}

function mouseClicked() {
  makeStep();
}
