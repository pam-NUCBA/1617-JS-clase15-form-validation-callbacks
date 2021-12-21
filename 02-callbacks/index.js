const hola = (cb) => {
  const text = "hola";
  cb(text);
};

hola((mensajes) => console.log(mensajes));
