/* Component */
class ClientComponent {
  constructor(url) {
    this.url = url;
  }

  async getData() {
    const res = await fetch(this.url);
    const data = await res.json();

    return data;
  }
}

/* Decorator */
class ClientDecorator {
  constructor(clientComponent) {
    this.clientComponent = clientComponent;
  }

  async getData() {
    return await this.clientComponent.getData();
  }
}

/* Decorator 1 */
/* Con decorators extendemos el funcionamiento del ClientComponent, sin tener
que usar if's ni modificar el contenido de ClientComponent.getData: */
class UpperCaseClientDecorator extends ClientDecorator {
  async getData() {
    const data = await super.getData();
    /* Extendemos el funcionamiento de super.getData con
    lógica adicional cumpliendo el principio de abierto y cerrado en
    ClientComponent.getData: */
    const newData = data.map((element) => {
      element.title = element.title.toUpperCase();

      return element;
    });

    return newData;
  }
}

/* Decorator 2 */
class HTMLClientDecorator extends ClientDecorator {
  async getData() {
    const data = await super.getData();
    const newData = data.map((element) => {
      element.title = `<p>${element.title}</p>`;
      element.thumbnailUrl = `<img src='${element.thumbnailUrl}' />`

      return element;
    });

    return newData;
  }
}

/* Ejecución */
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/photos';

  const Client = new ClientComponent(url);
  const data = await Client.getData();
  console.log({ data });

  const UpperClient = new UpperCaseClientDecorator(Client);
  const dataUpper = await UpperClient.getData();
  console.log({ dataUpper });

  const HTMLClient = new HTMLClientDecorator(UpperClient);
  const dataHTML = await HTMLClient.getData();
  divContent1.innerHTML = dataHTML.reduce((acc, element) => {
    return acc + element.title + element.thumbnailUrl;
  }, "");

  const HTMLClient2 = new HTMLClientDecorator(Client);
  const dataHTML2 = await HTMLClient2.getData();
  divContent2.innerHTML = dataHTML2.reduce((acc, element) => {
    return acc + element.title + element.thumbnailUrl;
  }, "");
})();