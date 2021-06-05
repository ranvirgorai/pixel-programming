var e131 = require('e131');

var client = new e131.Client('192.168.1.52');  // or use a universe
var packet = client.createPacket(512);  // we want 8 RGB (x3) slots
var slotsData = packet.getSlotsData();
packet.setSourceName('test E1.31 client');
packet.setUniverse(1);  // make universe number consistent with the client
//packet.setUniverse(0x02);  // make universe number consistent with the client
packet.setOption(packet.Options.PREVIEW, true);  // don't really change any fixture
packet.setPriority(packet.DEFAULT_PRIORITY);  // not strictly needed, done automatically

// slotsData is a Buffer view, you can use it directly
var color = 0;
function cycleColor() {
  for (var idx=0; idx<slotsData.length; idx++) {
    slotsData[idx] = color % 0xff;
    color = color + 90;
  }
  client.send(packet, function () {
    setTimeout(cycleColor, 125);
  });
}
//cycleColor();
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

let r=0;
let g=0;
let b=0;
let currentColorIndex=0

function delay(t, data) {
    return new Promise((resolve) => {
      setTimeout(resolve.bind(null, data), t);
    });
  }

function changColor(max,current){
  
   let colors=[
       {r:255,g:0,b:0},
       {r:0,g:255,b:0},
       {r:0,g:0,b:255},
       {r:255,g:255,b:0},
       {r:0,g:255,b:255},
    ]
    if(currentColorIndex===colors.length){
        currentColorIndex=0;
    }
        r=colors[currentColorIndex].r;
        g=colors[currentColorIndex].g;
        b=colors[currentColorIndex].b;
        
        if(max===current+2){
            
        currentColorIndex++;
        }
    
}

function scanOneByOne(){

    // for (let idx=0; idx<slotsData.length; idx=idx+3) {
    //     let {r,g,b}=getColor(slotsData.length,idx);
    //     slotsData[idx]=r;
    //     slotsData[idx+1]=g;
    //     slotsData[idx+2]=b;

    //   }


      
      client.send(packet, function () {
        setTimeout(scanOneByOne, 10);
      });

}

scanArray(slotsData);

async function scanArray(array) {
    let index = 0;
    async function next() {
      if (index < array.length) {
        let {r,g,b}=getColor(array.length,index);
        array[index]=r;
        array[index+1]=g;
        array[index+2]=b;

        index=index+3;
        delay(5).then(next);
      }else{
        scanArray(slotsData)
      }
    }
    next();
  }



scanOneByOne()



function getColor(max,current){
    changColor(max,current)
    return {
        r,g,b
    }
}

//changColor();



// process.on('beforeExit', (code) => {
//     console.log("Turn off all light");
//        for (let idx=0; idx<slotsData.length; idx=idx+1) {
        
//         slotsData[idx]=0;


//       }


      
//     client.send(packet, function () {

//       });
// });

// process.on('exit', (code) => {
//     console.log(`About to exit with code: ${code}`);
//   });
  






//   scanArray(slotsData,(data)=>{
//     client.send(packet, function () {
//         setTimeout(()=>scanArray(slotsData,()=>{}), 1000);
//       });
//   })