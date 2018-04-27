
function mainFunction(x) {
    return new Promise((resolve,reject)=>{
           setTimeout(()=>{
               resolve(x);
           },4000);
    })
}

async function add1(x) {
  var t1 = await mainFunction(20);
  var t2 = await mainFunction(30) ;
  return x + t1 + t2 ;
}

let result ;
add1(10).then(v => {
    console.log(v) ;
  });

  