const { Console } = require("console");
const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  async getProducts() {
    try {
      this.products = await fs.promises
        .readFile("./productos.json", "utf-8")
        .then((res) => {
          return JSON.parse(res);
        });
      console.log("-------------Productos--------------");
      console.log(this.products);
      console.log("------------------------------");
    } catch {
      console.log(this.products);
    }
  }
  async PushProduct(product) {
    await fs.promises.writeFile("./productos.json", JSON.stringify(product));
  }
  SearchProduct(products, productcode) {
    let encontrado = false;
    for (const index in products) {
      if (products[index].code === productcode) {
        encontrado = true;
        break;
      }
    }

    return encontrado;
  }
  async addProduct(product) {
    console.log("Productos antes de la carga");
    await this.getProducts();
    console.log("-----------------------------");
    if (!fs.existsSync("./productos.json")) {
      this.PushProduct([{ ...product, id: 0 }]);
      await this.getProducts();
    } else {
      const bool = this.SearchProduct(this.products, product.code);
      if (!bool) {
        await this.PushProduct([
          ...this.products,
          { ...product, id: this.products.length },
        ]);
        console.log("Producto agregado correctamente");
        await this.getProducts();
        console.log("-----------------------------");
      } else {
        console.log("Producto ya agregado ");
      }
    }
  }
  async getProductById(id) {
    await this.getProducts();
    let aux = this.products.filter((product) => product.id === id);
    if (aux.length > 0) {
      console.log("Producto encontrado correctamente");
      console.log(aux);
      console.log("-----------------------------");
    } else {
      console.log("Producto no encontrado");
      console.log("-----------------------------");
    }
  }
  async updateProduct(id, nombre) {
    await this.getProducts();
    this.products.map((ele) => {
      if (ele.id == id) {
        ele.title = nombre;
      }
    });
    this.PushProduct(this.products);
    console.log("Producto actualizado");
    await this.getProducts();
    console.log("-----------------------------");
  }
  async DeleteProduct(id) {
    await this.getProducts();
    let i = 0;
    let removed = this.products.splice(id, 1);
    if (removed.length > 0) {
      this.products.map((ele) => {
        ele.id = i;
        i++;
      });
      this.PushProduct(this.products);
      await this.getProducts();
    } else {
      console.log("No existe ningun producto a eliminar");
    }
  }
}
const motorola = {
  title: "Motorola",
  description: "Buen estado",
  price: "Anashei",
  thumbnail: "Sin imagen",
  code: "abc12",
  stock: 25,
};
const samsung = {
  title: "Samsung",
  description: "Buen estado",
  price: "Anashei",
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
};

const huawei = {
  title: "Huawei",
  description: "Buen estado",
  price: "Anashei",
  thumbnail: "Sin imagen",
  code: "abc1",
  stock: 25,
};

let ProdMan = new ProductManager();
/* ProdMan.getProducts(); */
/* ProdMan.addProduct(samsung); */
/* ProdMan.addProduct(motorola); */
/* ProdMan.addProduct(huawei); */
/* ProdMan.getProductById(1); */
/* ProdMan.updateProduct(1, "Iphone"); */
/* ProdMan.DeleteProduct(0); */
