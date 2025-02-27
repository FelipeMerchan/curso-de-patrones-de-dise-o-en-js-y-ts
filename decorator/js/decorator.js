/* Decorator es un patrón de tipo estructura que básicamente
soluciona cómo se conforman las clases unas con otras.
Decorator permite solucionar cuando tenemos que agregar mucha
funcionalidad jerarquicamente a un conjunto de clases, es decir,
heredamos muchas veces y perdemos la identificación de qué clase
hereda de quién. El decorator hace reducir la jerarquización haciendo
como un envoltorio de funcionalidad. */

/* Component, esta clase tendrá una funcionalidad en específico
a la cual le vamos a dar más funcionalidades usando los decoradores:*/
class ProductComponent {
  constructor(name) {
    this.name = name;
  }

  getDetail() {
    return `${this.name}`
  }
}

/* Decorator, sirve como envoltorio de algo que ya existe(ProductComponent)
y eso que existe se le puede decorar con mas funcionalidades: */
class ProductDecorator {
  constructor(productComponent) {
    this.productComponent = productComponent;
  }

  getDetail() {
    return this.productComponent.getDetail();
  }
}

/* ProductDecorator nunca la vamos a utilizar directamente, va a ser una 
representación solamente del envoltorio. */
class CommercialInfoProductDecorator extends ProductDecorator {
  constructor(productComponent, tradename, brand) {
    super(productComponent);
    this.tradename = tradename;
    this.brand = brand;
  }

  /* Este getDetail le agreda funcionalidad extra al getDetail original
  de ProductComponent. A esto se refieren con envoltorios que agregan
  funcionalidad extra: */
  getDetail() {
    return `${this.tradename} ${this.brand} ${super.getDetail()}`;
  }
}

class StoreProductDecorator extends ProductDecorator {
  constructor(productComponent, price) {
    super(productComponent);
    this.price = price;
  }

  getDetail() {
    return `${super.getDetail()} $${this.price}`;
  }
}

class HTMLProductDecorator extends ProductDecorator {
  getDetail() {
    return `<h1>Información del producto</h1>
      <p>
        ${super.getDetail()}
      </p>
    `;
  }
}


/* Ejecución */
/* Component */
const productComponent = new ProductComponent("Carro");
console.log(productComponent.getDetail());

/* Decorator 1 con component */
const CommercialInfoProduct = new CommercialInfoProductDecorator(productComponent, "London", "Renault");
console.log(CommercialInfoProduct.getDetail());

/* Decorator 2 con component */
const StoreProduct = new StoreProductDecorator(productComponent, 15.5);
console.log(StoreProduct.getDetail());

/* Decorator 2 con decorator 1 (es decir, envolvemos el decorator
2 con el decorator 1, así es cómo reducimos la herencia
o la jerarquización donde nos perdemos en una herencia problemática muy
larga. Aquí envolvemos decoradores entre sí en lugar de heredar clases:) */
const product = new StoreProductDecorator(CommercialInfoProduct, 15.5);
console.log(product.getDetail());

/* Decorator 3 con decorator 2 con decorator 1 */
const HTMLProduct = new HTMLProductDecorator(product);
myDiv.innerHTML = HTMLProduct.getDetail();