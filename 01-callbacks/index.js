const btn1 = document.getElementById("hola");
const btn2 = document.getElementById("chau");

//*vamos a pasar la funcion de callback desde afuera:
const sayHi = () => {
  alert("hola");
};

//*al pasar una función como callback, tiene que ir sin los paréntesis, o va a ejecutarla inmediatamente, y no con el evento click
btn1.addEventListener("click", sayHi); //como callback, con los paréntesis se ejecutaría automáticamente

//*esto es equivalente a esto:
//btn1.addEventListener("click", () => alert("hola"))

//*podemos pasarla con los paréntesis, pero para eso tenemos que hacer esto:
const cb = () => {
  console.log("chau");
};

const andate = (bolaDePelos) => {
  bolaDePelos(); //ahora esta función es un parámetro, entonces podría pasarle cualquier función!
};

btn2.addEventListener("click", () => andate(cb));

//*intro a asincronía:
const f1 = () => {
  setTimeout(() => {
    console.log("soy la primera");
  }, 1000);
};

//yo quiero que siga siendo la segunda
const f2 = () => {
  console.log("soy la segunda");
};

// f1()
// f2()

//*veámoslo con dos funciones nuevas
const fn3 = (fn) => {
  setTimeout(() => {
    console.log("soy la primera");
    fn();
  }, 1000);
};

//yo quiero que siga siendo la segunda
const fn4 = () => {
  console.log("soy la segunda");
};

fn3(fn4);
