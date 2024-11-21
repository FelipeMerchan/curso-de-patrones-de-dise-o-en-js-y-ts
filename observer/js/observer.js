/* Observers
  Es un patrón de diseño de comportamiento. Un objeto tiene propiedades
  y cuando una de estas propiedades cambie nosotros le vamos a notificar
  a un conjunto des observadores. Cada observador puede hacer una acción
  distinta dependiendo la notificación de cambio de estado del objeto.
  Los observers pueden suscribirse y desuscribirse a gusto.
*/

class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unSubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => {
      /* Todos los observadores deben tener el método refresh en este ejemplo */
      observer.refresh(data);
    })
  }
}

class Observer {
  constructor(func) {
    this.function = func;
  }

  refresh(data) {
    this.function(data);
  }
}

/* Subject es el objeto que va a poder ser observado: */
const subject = new Subject();

const observer1 = new Observer((data) => console.log(`Hola, soy el observador 1 ${data}`));
const observer2 = new Observer((data) => {
  div1.innerHTML = data;
});
const observer3 = new Observer((data) => {
  div2.innerHTML = data.split("").reverse().join("");
});

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.subscribe(observer3);
subject.unSubscribe(observer1);

function change() {
  subject.notify(myText.value);
}