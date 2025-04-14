/* Person es Product en la imagen builder.png */
class Person {
  private name: string;
  private lastName: string;
  private age: number;
  private country: string;
  private city: string;
  private hobbies: string[];

  constructor(
    name: string,
    lastName: string,
    age: number,
    country: string,
    city: string,
    hobbies: string[],
  ) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.country = country;
    this.city = city;
    this.hobbies = hobbies;
  }

  /* El objeto que crea el patrón builder, en este caso Person,
   puede tener métodos, pero no debemos pensar que estos métodos de los
   objetos Person son parte del patrón de diseño builder.
   Builder simplemente nos ayuda a crear objetos sea cual sea
   su estructura o los métodos que pueda tener. Aquí creamos el método
   getFullName simplemenmte para ejemplificar que podemos tener métodos
   y estos no hacen parte del concepto del patrón builder: */
  getFullName(): string {
    return this.name + " " + this.lastName;
  }
}

/* IBuilder */
interface PersonBuilder {
  name: string;
  lastName: string;
  age: number;
  country: string;
  city: string;
  hobbies: string[];

  setName(name: string): PersonBuilder;
  setLastName(LastName: string): PersonBuilder;
  setAge(age: number): PersonBuilder;
  setCountry(country: string): PersonBuilder;
  setCity(city: string): PersonBuilder;
  addHobby(hobby: string): PersonBuilder;
  build(): Person;
}

/* ConcreteBuilder, podríamos tener más tipos
de builder y no solo NormalPersonBuilder, lo importante es que
implementen la interfaz PersonBuilder para que
el director pueda recibir el builder y usarlo: */
class NormalPersonBuilder implements PersonBuilder {
  name: string;
  lastName: string;
  age: number;
  country: string;
  city: string;
  hobbies: string[];

  constructor() {
    this.name = "";
    this.lastName = "";
    this.age = 0;
    this.country = "";
    this.city = "";
    this.hobbies = [];
  }

  setName(name: string): PersonBuilder {
    this.name = name;
    return this;
  }
  setLastName(LastName: string): PersonBuilder {
    this.lastName = LastName;
    return this;
  }

  setAge(age: number): PersonBuilder {
    this.age = age;
    return this;
  }

  setCountry(country: string): PersonBuilder {
    this.country = country;
    return this;
  }

  setCity(city: string): PersonBuilder {
    this.city = city;
    return this;
  }

  addHobby(hobby: string): PersonBuilder {
    this.hobbies.push(hobby);
    return this;
  }

  build(): Person {
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

  reset(): void {
    this.name = "";
    this.lastName = "";
    this.age = 0;
    this.country = "";
    this.city = "";
    this.hobbies = [];
  }
}

/* Director */
class PersonDirector {
  /* Cualquier clase que implemente PersonBuilder podrá ser usada
  en este director: */
  private personBuilder: PersonBuilder;

  constructor(personBuilder: PersonBuilder) {
    this.personBuilder = personBuilder;
  }

  setPersonBuilder(personBuilder: PersonBuilder) {
    this.personBuilder = personBuilder;
  }

  createSimplePerson(name: string, lastName: string) {
    this.personBuilder.setName(name).setLastName(lastName);
  }
}

/* Creación 1 */
const personBuilder = new NormalPersonBuilder();
const felipe = personBuilder.setName("Felipe")
                            .setLastName("Merchan")
                            .addHobby("Comer")
                            .addHobby("Dormir")
                            .build();
console.log({ felipe });
/*
 {
  felipe: Person {
    name: 'Felipe',
    lastName: 'Merchan',
    age: 0,
    country: '',
    city: '',
    hobbies: [ 'Comer', 'Dormir' ]
  }
}
*/

/* Creación 2 */
const wendy = personBuilder.setName("Wendy")
                            .setLastName("Sánchez")
                            .setCountry("Colombia")
                            .setCity("Bogotá")
                            .addHobby("Comer")
                            .addHobby("Dormir")
                            .build();
console.log({ wendy });
/*
{
  wendy: Person {
    name: 'Wendy',
    lastName: 'Sánchez',
    age: 0,
    country: 'Colombia',
    city: 'Bogotá',
    hobbies: [ 'Comer', 'Dormir' ]
  }
}
*/

/* Creación con director */
const director = new PersonDirector(personBuilder);
director.createSimplePerson("John", "Cena");
const johnCena = personBuilder.build();
console.log({
  johnCena,
});

/*
  johnCena: Person {
    name: 'John',
    lastName: 'Cena',
    age: 0,
    country: '',
    city: '',
    hobbies: []
  }
*/
