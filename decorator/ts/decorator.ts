interface Component {
  getDetail() : string;
}

class ProductComponent implements Component {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getDetail(): string {
    return `${this.name}`;
  }
}

/* Decorator */
abstract class ProductDecorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  public getDetail(): string {
    return this.component.getDetail();
  }
}

/* Decorator 1 */
class CommercialInfoProductDecorator extends ProductDecorator {
  private tradename: string;
  private brand: string;

  constructor(component: Component, tradename: string, brand: string) {
    super(component);
    this.tradename = tradename;
    this.brand = brand;
  }

  public getDetail(): string {
    return `${this.tradename} ${this.brand} ${super.getDetail()}`;
  }
}

/* Decorator 2 */
class StoreProductDecorator extends ProductDecorator {
  private price: number;

  constructor(component: Component, price: number) {
    super(component);
    this.price = price;
  }

  getDetail(): string {
    return `${super.getDetail()} $${this.price}`;
  }
}

/* Decorator 3 */
class HTMLProductDecorator extends ProductDecorator {
  getDetail(): string {
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
const commercialInfoProduct = new CommercialInfoProductDecorator(productComponent, "London", "Renault");
console.log(commercialInfoProduct.getDetail());

/* Decorator 2 con component */
const storeProduct = new StoreProductDecorator(productComponent, 15.5);
console.log(storeProduct.getDetail());

/* Decorator 2 con decorator 1 (es decir, envolvemos el decorator
2 con el decorator 1, así es cómo reducimos la herencia
o la jerarquización donde nos perdemos en una herencia problemática muy
larga. Aquí envolvemos decoradores entre sí en lugar de heredar clases:) */
const storeProduct2 = new StoreProductDecorator(commercialInfoProduct, 15.5);
/* Tenemos el funcionamiento de 3 clases (el getDetail de CommercialInfoProductDecorator,
el de StoreProductDecorator y el de ProductComponent) sin necesidad de hacer
herencia múltiple: */
console.log(storeProduct2.getDetail());

/* Decorator 3 con decorator 2 con decorator 1 */
const htmlProductDecorator = new HTMLProductDecorator(storeProduct2);
console.log(htmlProductDecorator.getDetail());