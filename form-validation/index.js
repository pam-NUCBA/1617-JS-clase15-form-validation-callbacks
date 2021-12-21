const form = document.getElementById("form");
const username = document.getElementById("username");
const wand = document.getElementById("wand");
const email = document.getElementById("email");
const password = document.getElementById("pass");
const password2 = document.getElementById("pass2");

form.addEventListener("submit", (e) => {
  //es para evitar el comportamiento default, que es justamente, submit
  e.preventDefault();
  validate();
});

//*regex: https://regexr.com/3e48o
//la i al final es insensitive: no distingue mayusculas y minusculas
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

//*https://stackoverflow.com/questions/14850553/javascript-regex-for-password-containing-at-least-8-characters-1-number-1-uppe
const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

//*que no haya varita seleccionada:
//-1 se puede usar para el "fuera de index", o sea, no existe
//selectedIndex dice qué index va a mostrar
wand.selectedIndex = -1;

//vamos a llamar cada validacion en una sola funcion:
const validate = () => {
  //tenemos un problema! los espacios los toma como caracteres! para evitar eso, usamos una funcion llamada trim: va a quitar los espacios al ppio y al final:
  const user = username.value.trim();
  const mail = email.value.trim();
  const pass = password.value.trim();
  const pass2 = password2.value.trim();
  const userWand = wand.value; //no necesito trimearlo

  //*por qué capturamos el value y no el input:
  // console.log('mail:', typeof mail, mail)
  // console.log('email:', typeof email, email)

  //vamos a hacer las comprobaciones:
  if (user === "") {
    let errorMessage = "El user no puede estar vacío";
    inputError(username, errorMessage);
  } else if (user.length < 2 || user.length > 30) {
    let errorMessage =
      "El nombre de usuario debe tener entre 2 y 30 caracteres";
    inputError(username, errorMessage);
  } else {
    inputSuccess(username);
  }

  if (mail === "") {
    let errorMessage = "El email no puede estar vacío";
    inputError(email, errorMessage);
    //*https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
    //esto se lee como "si emailRegex al testear mail da false"
    //el ! significa "no da true"
    //sería igual a emailRegex.test(mail) === false
  } else if (!emailRegex.test(mail)) {
    let errorMessage = "El email no es válido";
    inputError(email, errorMessage);
  } else {
    inputSuccess(email);
  }

  if (userWand === "") {
    let errorMessage = "Seleccione su varita";
    inputError(wand, errorMessage);
  } else {
    inputSuccess(wand);
  }

  if (pass === "") {
    let errorMessage = "El password no puede estar vacío";
    inputError(password, errorMessage);
  } else if (!passRegex.test(pass)) {
    let errorMessage =
      "El password no es válido. Debe tener mayúscula, minúscula, números y al menos 8 caracteres.";
    inputError(password, errorMessage);
  } else {
    inputSuccess(password);
  }

  if (pass2 === "") {
    let errorMessage = "El password no puede estar vacío";
    inputError(password2, errorMessage);
  } else if (pass2 !== pass) {
    let errorMessage = "Los password no coinciden.";
    inputError(password2, errorMessage);
  } else {
    inputSuccess(password2);
  }

  //* pseudocódigo para poner un ojito en el input de password: poner el ícono con absolute desde css ;)
  // ojito.addEventListener("click", ()=> {
  //   password.setAttribute("type", "text")
  //   ojito.classList.add('ojo tachado')
  // })

  //*psedocódigo para agregar varita personalizada al elegir "otra":
  //hay que tener un input que esté oculto, al seleccionar index 4 (que es el otra), remove(clase que oculte ese index). Entonces, si != esa clase, que se compruebe que no está vacío.
  //revisar los tabIndex. Calculo que estando oculto el tab no va a entrar a él, pero estar atento

  //*validar términos y condiciones: habría que chequear que el checkbox esté en checked. Lo ideal además sería que el botón de submit tenga un setAttribute("disabled", "disabled") si no se chequeó
  //probablemente esta función la pondría fuera del validate, porque sino cómo chequeamos el botón de submit? Yo pondría un listener al check y tendría todo en una función aparte

  //*se puede hacer un "estás seguro de que tus datos son correctos?" con esto: https://sweetalert2.github.io/

  //*se pueden activar las etiquetas i cuando es success o error!
};

//*vamos a validar si el form se rellenó bien:
const inputSuccess = (input) => {
  const inputParent = input.parentElement;
  //con querySelector nos va a agarrar el primero en que la etiqueta coincida. Si fuera querySelectorAll, nos agarraría todos
  const small = inputParent.querySelector("small");
  inputParent.classList.add("success");
  inputParent.classList.remove("error");
  small.innerHTML = "";
};

//*o si se rellenó mal:
//agrego un parámetro que va a ser el texto de error de los small, que va a ser personalizado
const inputError = (input, message) => {
  const inputParent = input.parentElement;

  const small = inputParent.querySelector("small");
  inputParent.classList.add("error");
  inputParent.classList.remove("success");

  small.classList.add("error");
  small.innerHTML = message;
};
