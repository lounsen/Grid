let input_W, input_H, input_Fsize, input_Lsize, button, greeting,radio;

let select_R,result;
//let input_coff, select_C;

let IH,IU,IL,IR;

//let Color_A = ['#61e294','#7bcdba','#9799ca','#bd93d8','#b47aea'];
let Color_A = ['#FFF0F5','#D1E8E2','#A2D8DD','#66C7B4'];
function setup() {
  
  textAlign(CENTER);
  textSize(10);
  pixelDensity(1.0);
  //createCanvas(400,400);
  
  // create canvas
  let baseX = 100;
  let baseY = 65;
  
  
  
  //input_W = createInput("宽");
  //input_W.mouseClicked((function (){input_W.value("")}));
  //input_W.position(base,base);
  //text('版心宽度：', input_W.x-30, base);
  
  input_H = createInput("540");
  input_H.mouseClicked((function (){input_H.value("")}));
  input_H.position(baseX,baseY);
  input_H.size(60,16);
  input_H.style('border-radius','8px');
  input_H.style('background-color','#FFF2CC');
  
  radio = createRadio();
  radio.position(input_H.x+input_H.width+baseX,baseY);
  //.option([value], [contentLabel])
  //If 1 param, it's both content AND
  //value. Values treated as strings.
  radio.option(1, "pt");
  radio.option(2, "mm");
  radio.selected('1');
  
  //input_Fsize = createInput("字号");
  //input_Fsize.mouseClicked((function (){input_Fsize.value("")}));
  //input_Fsize.position(20,3*base);

  input_Lsize = createInput("12");
  input_Lsize.mouseClicked((function (){input_Lsize.value("")}));
  input_Lsize.position(baseX,input_H.y+input_H.height+5);
  input_Lsize.size(60,16);
  input_Lsize.style('border-radius','8px');
  input_Lsize.style('background-color','#FFF2CC');
  
  select_R = createSelect();
  select_R.position(input_H.x+input_H.width+baseX,input_H.y+input_H.height+5);
  //.option([contentValue],[value])
  //If 1 param, it's both content AND
  //value. Values treated as strings.
  for(let i = 1;i<13;i++){
    select_R.option(i);
  }
  //select_R.style('background-color','#FFF2CC');
  
  
  //select_C = createSelect();
  //select_C.position(select_R.x+select_R.width+40,select_R.y);
  //select_C.position(
  //.option([contentValue],[value])
  //If 1 param, it's both content AND
  //value. Values treated as strings.
  //for(let i = 1;i<11;i++){
  //  select_C.option(i);
  //}
  
  
  
  //input_coff = createInput(12);
  //input_coff.position(input_Lsize.x+input_Lsize.width+base, input_Lsize.y);
  
  
  button = createButton('submit');
  button.position(20, select_R.y+input_Lsize.height+10);
  button.size(select_R.x+select_R.width,20);
  
  button.style('background-color','#FFF2CC');
  button.style('border-radius','8px');
  button.style('appearance', 'compat-special');
  
  button.mousePressed(grid);
  
  

  greeting = createElement('h2', 'What Grid System Do You Want?');
  greeting.position(20, 5);
  
  result = createElement('main', '');
  result.position(20,3*baseY);
  
  IH = createElement('main', '版心高度：');
  IH.position(20,baseY);
  
  IU = createElement('main', '高度单位：');
  IU.position(baseX+input_H.width+20,baseY);
  
  IL = createElement('main', '行距(pt):');
  IL.position(20,baseY+IU.height+2);
  
  IR = createElement('main', '纵向分格：');
  IR.position(baseX+input_H.width+20,baseY+IU.height+2);
  
}

function grid() {
  let canvas = createCanvas(600,600);
  
  //const W = int(radio.value())==1?int(input_W.value()):int(input_W.value())*2.8346;
  const H = int(radio.value())==1?int(input_H.value()):int(input_H.value())*2.8346;
  //const W = random([0,1])==0?int(H*0.618):int(H/0.618);
  //console.log("w:"+W);
  //const Fsize = int(input_Fsize.value());
  const Lsize = int(input_Lsize.value());
  
  
  //const c = 2;//collum
  //const c  = int(select_C.value());
  //const r = 4;//roll
  const r = int(select_R.value());
  
  const c = random([2,3,4,5,6,7]);
  //const r = 1;
  
  
  //var total_line = int(H/(Fsize+Lsize));
  var total_line = round(H/(Lsize));
  //var total_line = H/(Fsize+Lsize);
  //if(total_line%1!=0){
  //  total_line = int(total_line)+1;
  //  console.log(total_line);
  //}
  
  var cell_line = round((total_line - (r-1))/r);
  total_line = (r-1) + cell_line*r;
  console.log(total_line);
  //rect(0,0,50,50);
  pixelDensity(1.0);
  //createCanvas(W, total_line*Lsize);
  //background(255,0);
  noFill();
  
  
  textSize(12);
  //fill("skyblue");
  let st = "计算后版心高度："+total_line*Lsize+"pt ,共"+total_line+"行。 </br>可用组合如下： </br></br>";
  for (let i = 2; i<total_line; i++){
    rx=(total_line+1)/(i+1);
    if(rx %1 == 0){
      //console.log("line for each cell:"+i,"roll:"+rx);
      st+=("纵向可分为"+rx+"格，每大格"+i+"行文字"+"; </br>");
      //text("line for each cell:"+i+"roll:"+rx,200,i*20);
    }
  }
  
  result.html(st);
  let h = map(H,0,10000,300,500);
  
  let w = int(random([0,1])==0?h*0.618:h*(1/0.618));
  while(w>400){
    w = w/1.2;
    h = h/1.2;
  }
  
  let ratio = h/H;
  
  const c_off = round(Lsize*1.2*ratio);
  const r_off = Lsize*ratio;
  
  
  
  const illor_base_x = w>h?60:80;
  const illor_base_y = w>h?80:60;
  const ill_off_x = random(-20,20);
  const ill_off_y = random(-20,20);
  const illor_x = illor_base_x+ill_off_x;
  const illor_y = illor_base_y+ill_off_y;
  //console.log(r,c);
  //stroke(10);
  noStroke();
  fill(255);
  rect(illor_base_x-50,illor_base_y-50,w+110,h+110);
  noStroke();
  fill(random(Color_A));
  for (let x = illor_x; x < w+illor_x; x += (w-((c-1)*c_off))/c+c_off) {
    let n = 1;
    for(let y = illor_y; y < total_line*Lsize*ratio+illor_y; y += (cell_line+1)*Lsize*ratio){
      
      if(random([0,1])==0 && n<r){
        
        rect(x,y,(w-(c-1)*c_off)/c,(cell_line+1)*Lsize*ratio);
        
      }
      else{
        rect(x,y,(w-(c-1)*c_off)/c,cell_line*Lsize*ratio);
        fill(random(Color_A));
      }
      n++;
    }
  }
  
  //saveCanvas('grid.png');
}
