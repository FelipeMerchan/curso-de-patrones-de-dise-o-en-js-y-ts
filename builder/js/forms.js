class Form {
  constructor(controls, action) {
    this.controls = controls;
    this.action = action;
  }

  getContent() {
    return `
      <form method="post" action="${this.action}">
        ${this.controls.reduce((acc, control) => {
          return acc + `
            <div>
              ${this.getLabel(control)}
              ${this.getInput(control)}
            </div>
          `
        }, "")}
        <button type="submit">Enviar</button>
      </form>
    `
  }

  getLabel(control) {
    return `<label>${control.text}</label>`;
  }

  getInput(control) {
    return `
      <input
        type="${control.type}"
        id="${control.name}"
        name="${control.name}"
      />
    `
  }
}

class FormBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.action = "";
    this.controls = [];
  }

  setAction(action) {
    this.action = action;
    return this;
  }

  setText(name, text) {
    this.controls.push({
      name,
      text,
      type: "text",
    });
    return this;
  }

  setEmail(name, text) {
    this.controls.push({
      name,
      text,
      type: "email",
    });
    return this;
  }

  setCheckbox(name, text) {
    this.controls.push({
      name,
      text,
      type: "checkbox",
    });
    return this;
  }

  setColor(name, text) {
    this.controls.push({
      name,
      text,
      type: "color",
    });
    return this;
  }

  build() {
    const form = new Form(this.controls, this.action);
    this.reset();

    return form;
  }
}

/* Un director va a ser el encargado de tener recetas, es decir, por medio
del patrón builder creamos objetos que regularmente son complejos con distinta
presentación, el director tiene esas presentaciones guardadas para crearlas directamente.
Es decir, tiene los pasos/receta para construir el objeto.

Esto nos da una herramienta extra de que vamos a tener un conjunto de preparaciones
listas para construir un objeto complejo en base a ciertos pasos.
*/

class FormDirector {
  constructor(formBuilder) {
    this.setBuilder(formBuilder);
  }

  setBuilder(formBuilder) {
    this.formBuilder = formBuilder;
  }

  /* Reseta para crear una de las posibles presentaciones del objeto.
  Es un recetario de qué pasos/elementos va a tener y en qué orden los
  va a ejecutar/tener */
  createPeopleForm() {
    this.formBuilder.reset();
    this.formBuilder.setText("firstName", "Nombre")
                    .setText("lastName", "Apellido");
  }

  /* El objetivo del director es tener recetas, por lo cual,
  podemos crear más recetas como createContactForm para crear
  objetos con diferentes presentaciones: */
  createContactForm() {
    this.formBuilder.reset();
    this.formBuilder.setText("name", "Nombre del interesado")
                    .setEmail("email", "Correo electrónico")
                    .setText("message", "Mensaje");
  }
}

const formBuilder = new FormBuilder();
const formPeople = formBuilder.setAction('add.php')
                              .setText("firstName", "Nombre")
                              .setText("lastName", "Apellido")
                              .setCheckbox("drinker", "Es bebedor?")
                              .setColor("favoriteColor", "Color favorito")
                              .build();

console.log(formPeople);
form1.innerHTML = formPeople.getContent();
const formEmail = formBuilder.setAction("send.php")
                               .setText("name", "Nombre")
                               .setEmail("email", "Correo electrónico")
                               .build();
form2.innerHTML = formEmail.getContent();

const director = new FormDirector(formBuilder);
director.createPeopleForm();
form3.innerHTML = formBuilder.build().getContent();

director.createPeopleForm();
form4.innerHTML = formBuilder.build().getContent();

/* El mismo director sabe hacer diferentes recetas, en esta
ocasión crea formularios de contacto: */
director.createContactForm();
form5.innerHTML = formBuilder.build().getContent();

/* Gracias al patrón builder podemos crear objetos complejos por medio
de directores los cuales tienen los pasos y secuencias que permiten
crear los objetos.
 */
