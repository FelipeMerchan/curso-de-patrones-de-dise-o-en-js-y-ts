/* El patrón Bridge viene bien cuando tenemos que hacer herramientas las cuales
tengan un comportamiento particular a partir de su destino final. En este ejemplo,
el destino final era un div o un canvas, dependiendo del destino final
la implementación cambia porque la forma de modificar un div es diferente a la
forma de modificar un canvas. A esto se refieren con comportamientos particulares
(la forma de modificar el div o el canvas) a partir del destino final (div o canvas),
pero abstractamente es igual se debe modificar un color, un alto y un ancho lo que
cambia es la forma particular de hacerlo en base al destino final (div o canvas). */

/* RefinedAbstraction */
/* Podemos tener otros RefinedAbstraction que tengan otro comportamiento, pero que
trabajen sobre implementadores distintos. */
class Editor {
  constructor(implementor) {
    this.implementor = implementor;
  }

  print(width, height, color) {
    /* Podemos llamar varios métodos del implementador,
    la abstracción es un puente, el puente va a resolver esa parte de qué
    es lo que se invoca. Recordemos que el patrón bridge es de tipo estrutural,
    estamos estructurando un comportamiento.
    Estructural es distinto a cómo se comporta, el implementor tiene un comportamiento
    que está separado a la clase de la abstracción.
    */
    this.implementor.setWidth(width);
    this.implementor.setHeight(height);
    this.implementor.setColor(color);
    this.implementor.print();
    /* Abstractamente la estructura o secuencia de métodos que invocamos
    aquí es igual para todos los implementadores, lo que
    cambia es el comportamiento particular que le da cada implementador a
    cada uno de sus métodos.
    Agrupamos el funcionamiento de lo que con lleva un proceso, en este caso print.
    */
  }
}

/* Una de las ventajas que tiene bridge es que podemos heredar del RefinedAbstraction
y agregarle más funcionamiento */
class EditorWithClear extends Editor {
  constructor(implementor) {
    super(implementor);
  }

  clear() {
    this.implementor.setWidth(0);
    this.implementor.setHeight(0);
    this.implementor.print();
  }
}

/* ConcreteImplementor, es el funcionamiento específico */
class HTMLPainter {
  constructor(container) {
    this.container = container;
    this.width = "1px";
    this.height = "1px";
    this.color = "#000000";
  }

  setWidth(width) {
    this.width = width + "px";
  }

  setHeight(height) {
    this.height = height + "px";
  }

  setColor(color) {
    this.color = color;
  }

  print() {
    this.container.innerHTML = `
      <div
        style="width: ${this.width}; height: ${this.height}; background: ${this.color};"
      >
      </div>
    `;
  }
}

/* ConcreteImplementor, es el funcionamiento específico */
class CanvasPainter {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = 1;
    this.height = 1;
    this.color = "#000000";
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  setColor(color) {
    this.color = color;
  }

  print() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}

/* const editor = new Editor(new HTMLPainter(content)); */
/* const editor = new Editor(new CanvasPainter(canvas)); */
/* const editor = new EditorWithClear(new HTMLPainter(content)); */
const editor = new EditorWithClear(new CanvasPainter(canvas));
range.addEventListener("input", (event) => {
  const width = event.target.value;
  const height = event.target.value;
  const color = editorColor.value;
  editor.print(width, height, color);
});

editorColor.addEventListener("input", (event) => {
  const width = range.value;
  const height = range.value;
  const color = event.target.value;
  editor.print(width, height, color);
});

btn.addEventListener("click", () => {
  editor.clear();
})
