/* Crear clase context */
class SaleContext {
  /* Recibe la estrategia con la cual va a funcionar: */
  constructor(strategy) {
    this.strategy = strategy;
  }

  /* Tenemos la posibilidad de cambiar la estrategia (instancia),
  de esta manera es como podemos modificar qué queremos ejecutar
  en el método (calculate) del contexto (SaleContext): */
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  calculate(amount) {
    /* El contexto simplemente ejecuta la estrategia
    sin importar lo que pase dentro de ella. En este caso
    la estrategia es una instancia que tiene un método calculate: */
    return this.strategy.calculate(amount);
  }
}

class RegularSaleStrategy {
  constructor(tax) {
    this.tax = tax;
  }

  /* Esta es nuestra estrategia: */
  calculate(amount) {
    /* En la estraetegia ejecutamos nuestro código particular
    que se ejecutará en el contexto SaleContext: */
    return amount + (amount * this.tax);
  }
}

/* Si necestiamos un nuevo calculo creamos una nueva clase: */
class DiscountSaleStrategy {
  constructor(tax, discount) {
    this.tax = tax;
    this.discount = discount;
  }

  calculate(amount) {
    return amount + (amount * this.tax) - this.discount;
  }
}

class ForeignSaleStrategy {
  getDollarPrice() {
    return 20;
  }

  calculate(amount) {
    return amount * this.getDollarPrice();
  }
}

const regularSale = new RegularSaleStrategy(0.16);
const discountSale = new DiscountSaleStrategy(0.16, 3);
const foreignSale = new ForeignSaleStrategy();

const sale = new SaleContext(regularSale);

console.log({ regular: sale.calculate(10) });

sale.setStrategy(discountSale);

console.log({ discount: sale.calculate(10) });

sale.setStrategy(foreignSale);

console.log({ foreignSale: sale.calculate(10) });

/* Explicación práctica */
/* El patrón strategy nos sirve cuando tengamos comportamientos que van a cambiar en un
objeto en tiempo de ejecución */
const data = [
  {
    name: "Erdinger Pikantus",
    country: "Alemania",
    info: "Erdinger Pikantus es una cerveza",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRawys9NZdRCW7C0TUmAA202Kit4Klq8LeQ2g&s"
  },
  {
    name: "Erdinger Pikantus 2",
    country: "Alemania",
    info: "Erdinger Pikantus es una cerveza",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRawys9NZdRCW7C0TUmAA202Kit4Klq8LeQ2g&s"
  },
  {
    name: "Erdinger Pikantus 3",
    country: "Alemania",
    info: "Erdinger Pikantus es una cerveza",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRawys9NZdRCW7C0TUmAA202Kit4Klq8LeQ2g&s"
  },
]

class InfoContext {
  constructor(strategy, data, element) {
    this.setStrategy(strategy);
    this.data = data;
    this.element = element;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  show() {
    this.strategy.show(this.data, this.element)
  }
}

class ListStrategy {
  show(data, element) {
    element.innerHTML = data.reduce((acc, item) => {
      return acc + `<div>
        <h2>${item.name}</h2>
        <p>${item.country}</p>
      </div>
      <hr />`;
    }, "");
  }
}

class DetailedListStrategy {
  show(data, element) {
    element.innerHTML = data.reduce((acc, item) => {
      return acc + `<div>
        <h2>${item.name}</h2>
        <p>${item.country}</p>
        <p>${item.info}</p>
      </div>
      <hr />`;
    }, "");
  }
}

class ListWithImageStrategy {
  show(data, element) {
    element.innerHTML = data.reduce((acc, item) => {
      return acc + `<div>
        <h2>${item.name}</h2>
        <img width="10%" src="${item.img}"/>
      </div>
      <hr />`;
    }, "");
  }
}

const strategies = [
  new ListStrategy(),
  new DetailedListStrategy(),
  new ListWithImageStrategy(),
]

/* Como el script del html donde agregamos este archivo JavaScript
esta debajo del div con id content podemos obtener ese div
escribiendo el nombre del id como si guera una variable. Es por esta
razón que el tercer parámetro de InfoContext es content y hace
referencia al elemento del html con id content: */
const info = new InfoContext(new ListStrategy(), data, content);
info.show();

slcOptions.addEventListener('change', (event) => {
  const optionSelected = event.target.value;
  info.setStrategy(strategies[optionSelected]);
  info.show();
});