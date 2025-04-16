/* Interface IState */
interface State {
  next(ticket: Ticket): number | null;
  add(ticket: Ticket, quantity: number): void;
}

/* Context */
class Ticket {
  private state: State;
  quantity: number;
  readonly limit: number;
  private number: number;

  constructor(limit: number) {
    this.limit = limit;
    this.quantity = 0;
    this.number = 0;
    this.state = new EmptyState();
  }

  get getNumber(): number {
    return this.number++;
  }

  set setState(state: State) {
    this.state = state;
  }

  get getState(): State {
    return this.state;
  }

  next(): number | null {
    return this.state.next(this);
  }

  add(quantity: number): void {
    this.state.add(this, quantity);
  }
}

/* Concrete state */
class EmptyState implements State {
  next(ticket: Ticket): null {
    return null
  }

  add(ticket: Ticket, quantity: number): void {
    if (quantity < ticket.limit) {
      ticket.quantity += quantity;
      ticket.setState = new WithDataState();
    } else if (quantity === ticket.limit) {
      ticket.quantity = quantity;
      ticket.setState = new FullState();
    }
  }
}

/* Concrete state */
class WithDataState implements State {
  next(ticket: Ticket): number {
    ticket.quantity--;

    if (ticket.quantity <= 0) {
      ticket.setState = new EmptyState();
    }

    return ticket.getNumber;
  }

  add(ticket: Ticket, quantity: number): void {
    if (ticket.quantity + quantity < ticket.limit) {
      ticket.quantity += quantity;
    } else if (ticket.quantity + quantity === ticket.limit) {
      ticket.quantity += quantity;
      ticket.setState = new FullState();
    }
  }
}

/* Concrete state */
class FullState implements State {
  next(ticket: Ticket): number {
    ticket.quantity--;

    if (ticket.quantity <= 0) {
      ticket.setState = new EmptyState();
    } else {
      ticket.setState = new WithDataState();
    }

    return ticket.getNumber;
  }

  add(ticket: Ticket, quantity: number): void {
    console.log('Ticket lleno');
  }
}

/* Ejecución */
const ticket = new Ticket(5);
console.log(ticket.getState);
console.log(ticket.next());
ticket.add(6);
console.log(ticket.getState);
console.log(ticket.next());
ticket.add(4); // no está lleno, falta 1
console.log(ticket.getState);
console.log(ticket.next());
console.log(ticket.next());
ticket.add(3); // con 3 queda lleno en 5
console.log(ticket.getState);
ticket.add(1); // no se agrega, ya está lleno
console.log(ticket.next());
console.log(ticket.getState);
console.log(ticket.next());
console.log(ticket.next());
console.log(ticket.next());
console.log(ticket.next());
console.log(ticket.getState);
console.log(ticket.next()); // Ya no hay tickets

/* El patrón de diseño state permite tener un objeto que puede tener
distintos estados y el estado protege el comportamiento debido a que
en base al estado definimos un comportamiento específico. */