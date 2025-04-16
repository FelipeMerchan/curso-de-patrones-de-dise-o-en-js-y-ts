/* Implementor - interface */
interface ListImplementor {
  elements: number[];
  add(number: number): void;
  getElements(): number[];
}

/* ConcreteImplementor, es el funcionamiento específico */
class OrderedList implements ListImplementor {
  elements: number[] = [];

  public add(number: number): void {
    this.elements.push(number);
    this.elements.sort();
  }

  public getElements(): number[] {
    return this.elements;
  }
}

/* ConcreteImplementor, es el funcionamiento específico */
class UniqueList implements ListImplementor {
  elements: number[] = [];

  public add(number: number): void {
    if (!this.elements.includes(number)) {
      this.elements.push(number);
    }
  }

  public getElements(): number[] {
    return this.elements;
  }
}

/* RefinedAbstraction - interface */
interface DataAbstraction {
  implementor: ListImplementor;
  add(number: number): void;
  get(): number[];
  operation(fn: (number: number) => number): number[];
}

/* RefinedAbstraction */
class DataRefinedAbstraction implements DataAbstraction {
  implementor: ListImplementor;

  constructor(implementor: ListImplementor) {
    this.implementor = implementor;
  }

  public add(number: number): void {
    this.implementor.add(number);
  }

  public get(): number[] {
    return this.implementor.getElements();
  }

  public operation(fn: (number: number) => number): number[] {
    return this.implementor.getElements().map(fn);
  }
}

const uniqueData = new DataRefinedAbstraction(new UniqueList());
const orderedData = new DataRefinedAbstraction(new OrderedList());
uniqueData.add(3);
uniqueData.add(3);
uniqueData.add(1);
uniqueData.add(1);
uniqueData.add(2);
console.log(uniqueData.get());
orderedData.add(3);
orderedData.add(3);
orderedData.add(1);
orderedData.add(1);
orderedData.add(2);
console.log(orderedData.get());

const uniqueItems = uniqueData.operation((element: number) => element * 2);
const orderedItems = orderedData.operation((element: number) => element * 2);
console.log({ uniqueItems });
console.log({ orderedItems });

/* El patrón bridge nos funciona para este tipo de comportamientos, en los cuales,
2 implementaciones que funcionan distinto puedan trabajar independientemente, es decir,
podemos usar a los implementors directamente, pero la ventaja de bridge es que nos permite
acercar el funcionamiento al modelo de negocio. */