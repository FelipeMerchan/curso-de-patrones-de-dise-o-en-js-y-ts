/*
  Builder
  Es un patrón creacional, nos va a ayudar a crear objetos.
  A veces tenemos objetos que tienen muchos elementos en su construcción
  y en estos casos el patrón builder es útil porque builder encadena/separa
  el constructor en un conjunto de métodos encadenados. Estos métodos
  encadenados, estos métodos encadenados los podemos invocar o no entonces
  vamos haciendo un encadenamiento de métodos dependiendo de la construcción
  del objeto. De esta manera podemos crear podemos crear un objeto complejo
  con representaciones distintas de una manera muy limpia.
*/

/* Person es la representación del producto (que vemos en la imagen
  Builder.png) */
class Person {
  /* En el construcutor vemos que tenemos muchas propiedades
  para el objeto, por lo que podemos detectar que en este caso
  vendría bien usar Builder: */
  constructor(name, lastName, age, country, city, hobbies) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.country = country;
    this.city = city;
    this.hobbies = hobbies;
  }

  getFullName() {
    return this.name + '' + this.lastName;
  }
}

/* PersonBuilder es el ConcreteBuilder de la imagen Builder.png: */
class PersonBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.name = "";
    this.lastName = "";
    this.age = 0;
    this.country = "";
    this.city = "";
    this.hobbies = [];
  }

  setName(name) {
    this.name = name;
    /* Este método debe retornarse así mismo, de esta manera
    podemos encadenar los métodos:*/
    return this;
  }

  setLastName(lastName) {
    this.lastName = lastName;
    return this;
  }

  setAge(age) {
    this.age = age;
    return this;
  }

  setCountry(country) {
    this.country = country;
    return this;
  }

  setCity(city) {
    this.city = city;
    return this;
  }

  addHobby(hobby) {
    this.hobbies.push(hobby);
    return this;
  }

  /* Este es el método importante que aparece en la imagen Builder.png */
  build() {
    const person = new Person(
      this.name,
      this.lastName,
      this.age,
      this.country,
      this.city,
      this.hobbies,
    );

    this.reset();
    return person;
  }
}

/* Crear el objeto */
const personBuilder = new PersonBuilder();
const felipe = personBuilder.setName("Felipe")
                            .setLastName("Merchan")
                            .addHobby("Comer")
                            .addHobby("Mezclar")
                            .build();

console.log({ felipe });
const daniel = personBuilder.setName("Daniel")
                            .setLastName("Merchan")
                            .addHobby("Viajar")
                            .addHobby("Ver series")
                            .setAge(29)
                            .setCity("Bogotá")
                            .build();
console.log({ daniel });

/* El patrón builder permite crear objetos de distintas presentaciones
  de forma más práctica en lugar de haber invocado todo el constructor
  (constructor(name, lastName, age, country, city, hobbies) ).
  Si no usaramos el patrón builder tendríamos que invocar el constructor
  y enviar todos los valores que solicita y si alguno no lo necesitamos
  usaríamos null lo cual es poco práctico.

  Builder lo podemos aplicar cuando tengamos un objeto que tiene muchos elementos
  en su construcción y puede que en algunos casos ese objeto no necesite todos los elementos.
*/