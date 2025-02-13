interface IObserver<T> {
  refresh(value: T) : void;
}

interface ISubject<T> {
  observers: IObserver<T>[];
  subscribe(observer: IObserver<T>) : void;
  unSubscribe(observer: IObserver<T>) : void;
  notify(value: T) : void;
}

class Subject<T> implements ISubject<T> {
  observers: IObserver<T>[];

  constructor() {
    this.observers = [];
  }

  subscribe(observer: IObserver<T>) {
    this.observers.push(observer);
  }

  unSubscribe(observer: IObserver<T>) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(value: T) {
    this.observers.forEach((observer) => {
      observer.refresh(value);
    })
  }
}

class Observer<T> implements IObserver<T> {
  private fn: (value: T) => void;

  constructor(fn: (value: T) => void) {
    this.fn = fn
  }

  refresh(value: T): void {
    this.fn(value);
  }
}

const subject = new Subject<number>();
const observer1 = new Observer<number>((number) => {
  console.log(`Hello ${number}`);
});
const observer2 = new Observer<number>((number) => {
  console.log(`Hi ${number}`);
});

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.notify(1.2);
subject.notify(20);

const subjectString = new Subject<string>();
const observer1String = new Observer<string>((text) => {
  console.log(`${text.toUpperCase()}`);
});
const observer2String = new Observer<string>((text) => {
  console.log(`${text.toLowerCase()}`);
});

subjectString.subscribe(observer1String);
subjectString.subscribe(observer2String);
subjectString.notify("Felipe");
subjectString.notify("Desarrollador");