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