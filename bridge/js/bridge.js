/*
  Patrón bridge (patrón de diseño estructural)
  Es un puente separando una implementación de una clase que va a hacer
  uso de esta implementación.

  Imaginemos que el implementador es el funcionamiento nativo/específico, el funcionamiento
  más separado. Este funcionamiento va a ser usado por una abstracción, esta abstracción va a ser
  algo más cercano al modelo de negocio. El implementador va a estar alejado al modelo
  de negocio.

  Bridge crea un puente separando abstracciones de implementadores.

  Bridge puede hacercenos parecido a strategy y state, pero state y strategy son patrones
  de comprotamiento, Los patrones estructurales nos van a ayudar a hacer los andamios, pero
  no vamos a cambiar el comportamiento.
*/

/* RefinedAbstraction */
/* La clase abstraction va a invocar otras clases que están separadas/desacopladas.
Va a estar más cercana a la lógica del dominio o de negocio */
class EncoderTextAbstraction {
  /* encoder será el implementor */
  constructor(encoder) {
    this.encoder = encoder;
  }

  encode(str) {
    /* el encode de EncoderTextAbstraction y el método
    del implementador que invocamos aquí se pueden llamar distinto.
    No tienen que llamarse encode ambos (tanto EncoderTextAbstraction.encode como
    encoder.encode no necesariemente deben tener el mismo nombre) */
    return this.encoder.encode(str);
  }

  decode(str) {
    return this.encoder.decode(str);
  }
}

/* ConcreteImplementor, es el funcionamiento específico */
class Base64EncoderImplementor {
  encode(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  decode(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }
}

/* ConcreteImplementor, es el funcionamiento específico */
class HTMLEncoderImplementor {
  encode(str) {
    return str.split(".").reduce((acc, element) => {
      return acc + `<p>${element.trim()}</p>`
    }, "");
  }

  decode(str) {
    return str.split("</p>").reduce((acc, element) => {
      return element !== "" ? acc + element.replace("<p>", "") + ". " : acc + "";
    }, "");
  }
}

const encoder1 = new EncoderTextAbstraction(new Base64EncoderImplementor());
console.log(encoder1.encode("pato"));
console.log(encoder1.decode("cGF0bw=="));
const encoder2 = new EncoderTextAbstraction(new HTMLEncoderImplementor());
console.log(encoder2.encode("Esto es un texto. Y aquí comienza otro. Y aquí otro más"));
console.log(encoder2.decode("<p>Esto es un texto</p><p>Y aquí comienza otro</p><p>Y aquí otro más</p>"));