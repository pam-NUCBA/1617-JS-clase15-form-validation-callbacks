const dividir = (num1, num2, cb) => {
  if (num1 === 0) {
    cb(console.log("ufa"));
  } else if (num2 === 0) {
    cb(console.log("ufa"));
  } else {
    cb(null, num1 / num2); //creé un callback con dos parametros. El primero es error, el segundo es todo ok!}
  }
};

//*callback no la creé afuera, entonces no tiene nombre. Con pasarle los parámetros alcanza
dividir(5, 3, (error, result1) => { //básicamente este callback es anónimo, no lo creé afuera. Con pasarle los dos param alcanza
  //el tercer parametro es el callback, y ahí le paso los dos param que le creé: un error, o un resultado
  if (error) {
    console.log(error); //tirate un error
  } else {
    console.log(result1);
  }
});
