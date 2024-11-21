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
      observer.refresh(data);
    })
  }
}

class ItemsSubject extends Subject {
  constructor() {
    super();
    this.data = [];
  }

  add(item) {
    /* Un subject puede tener estado (las propiedades de la clase
    que se pueden cambiar) y los observadores pueden saber cuando
    el subject cambie este estado. En este ejemplo, data va a recibir un
    nuevo elemento (.push(item)) y es por esto que debemos notificar
    a los observadores con .notify: */
    this.data.push(item);
    this.notify(this.data);
  }
}

class HtmlElementObserver {
  constructor(element) {
    this.element = element;
  }

  refresh(data) {
    this.element.innerHTML = data.reduce((acc, element) => {
      return acc + `<p>${element}</p>`
    }, "")
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

const items = new ItemsSubject();
const div1Observer = new HtmlElementObserver(div1);
const div2Observer = new HtmlElementObserver(div2);
const observer1 = new Observer((data) => {
  div3.innerHTML = data.length;
});

items.subscribe(div1Observer);
items.subscribe(div2Observer);
items.subscribe(observer1);

function add() {
  const name = txtName.value;
  items.add(name);
}