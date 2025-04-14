/*
  State
  Es un patrón de diseño de tipo comportamiento. Vamos a tener un contexto
  que puede tener un estado establecido y dependiendo de este estado va a tener
  un comportamiento. Puede compartir conocimiento entre sus mismas clases (que van
  a ser sus estados) y estas pueden cambiar de estado al objeto principal.
*/

/* Context */
class DocumentContext {
  constructor() {
    this.content = "";
    /* El estado inicial será en blanco */
    this.state = new BlankState();
  }

  setState(state) {
    this.state = state;
  }

  /* A el método o métodos del context podemos llamarlo
  como nosotros queramos, en este caso lo llamamos write: */
  write(text) {
    this.state.write(this, text);
  }
}

/* Concrete state */
class BlankState {
  write(documentContext, text) {
    documentContext.content = text;
    /* Ahora debemos cambiar el estado dado a que
    ya no está en blanco el estado, esto permite
    cambiar la lógica que debemos ejecutar en el contexto
    dependiendo del estado: */
    documentContext.setState(new WithContentState());
  }
}

/* Concrete state */
class WithContentState {
  write(documentContext, text) {
    /* Cuando el estado cambia a WithContentState el código/comportamiento
    que necesitamos es diferente a BlankState: */
    documentContext.content += " " + text;
  }
}

/* Concrete state */
class ApprovedState {
  write(documentContext, text) {
    /* Cuando el estado cambia a ApprovedState el código/comportamiento
    que necesitamos es diferente de BlankState y de WithContentState: */
    console.error("Documento aprobado. Ya no es posible modificarlo");
  }
}

const doc = new DocumentContext();
console.log(doc.state);
doc.write("Pato");
console.log(doc.content);
console.log(doc.state);
doc.write("Algo");
doc.write("Más");
console.log(doc.content);

doc.setState(new ApprovedState());
console.log(doc.state);
doc.write("Algo");
doc.write("Más");
console.log(doc.content);

doc.setState(new WithContentState());
console.log(doc.state);
doc.write("No que no");
console.log(doc.content);

/* Esto es el patrón state. Dependiendo del estado, que vamos asignando,
va a tener un comportamiento diferente el método (write) del contexto (DocumentContext). */