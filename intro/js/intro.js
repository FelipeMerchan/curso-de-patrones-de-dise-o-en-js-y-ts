function sum(a,b) {
  return a+b
}

let res = sum(1,2)
console.log(res)

/* Función de primer orden */
/* Guardamos una función que va a estar lista para ejecutarse */
const fSum = sum;

res = fSum(5, 6);
console.log(res)

/* Función de orden superior */
function operation(fn, a , b) {
  console.log('Se hace algo')
  console.log(fn(a, b))
}

operation(sum, 10, 20)