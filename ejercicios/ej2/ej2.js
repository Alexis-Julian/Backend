const fs = require("fs");
class ProductManger {
  constructor(path, products) {
    this.products = [];
    this.id = 0;
    this.path = path;
  }
  /* Devuelve el array de los productos  */
  async GetProduct() {
    const GetProductFile = async () => {
      try {
        let products = await fs.promises
          .readFile(this.path, "utf-8")
          .then((res) => {
            return JSON.parse(res);
          });
        return products;
      } catch {
        return "No hay productos agregados";
      }
    };
    const res_1 = await GetProductFile();
    /* console.log(res_1); */
    return res_1;
    /* fs.existsSync("productos.json") ?   */
  }
  /* Metodo para agregar un producto al array */
  AddProduct(product) {
    let VerifiedProduct = Object.values(product).includes("");
    if (!VerifiedProduct) {
      this.AddProductFile(product);
    } else {
      console.log("Error al producto le hace falta un campo o esta repetido");
    }
    this.GetProduct().then((products) => console.log(products));
  }
  PushCodeFile(path, data) {
    fs.promises.writeFile(path, JSON.stringify(data));
  }
  AddProductFile(product) {
    if (fs.existsSync(this.path)) {
      this.GetProduct().then((products) => {
        if (this.VerifiedCopyProduct(product, products)) {
          products.push({ ...product, id: products.length });
          this.PushCodeFile(this.path, products);
          console.log("Producto agregado correctamente");
        } else {
          console.log("El producto esta repetido, imposible de agregar");
        }
      });
    } else {
      this.PushCodeFile(this.path, [{ ...product, id: 0 }]);
    }
  }
  /* Verificia el producto si esta repetido */
  VerifiedCopyProduct(product, products) {
    for (const key in products) {
      if (products[key].code == product.code) {
        return false;
      }
    }
    return true;
  }
  async GetProductById(id) {
    const products = await this.GetProduct();
    for (const key in products) {
      if (products[key].id === id) {
        return products[key];
      }
    }
    return "Producto no encontrado";
  }
  async UpdateProduct(id, marca) {
    const products = await this.GetProduct();
    products.map((ele) => {
      if (ele.id === id) {
        ele.title = marca;
      }
    });
    this.PushCodeFile(this.path, products);
  }
  async DeleteProduct(id) {
    const products = await this.GetProduct();
    let i = 0;
    for (const key in products) {
      if (products[key].id === id) {
        products.splice(key, 1);
        products.map((ele) => {
          ele.id = i;
          i++;
        });
        console.log(products);
        /* this.PushCodeFile(this.path, products); */
      }
    }
  }
}
let prueba = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "gasd",
  stock: 25,
};
let prueba1 = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "gasd",
  stock: 25,
};

let motorola = {
  title: "Motorola",
  description: "Buen estado",
  price: "Anashei",
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
};
let samsung = {
  title: "Samsung",
  description: "Buen estado",
  price: "Anashei",
  thumbnail: "Sin imagen",
  code: "abc1234",
  stock: 25,
};

const addprod = new ProductManger();
addprod.path = "./productos.json";
addprod.AddProduct(prueba1);
addprod.AddProduct(motorola);
addprod.AddProduct(samsung);
addprod.AddProduct(prueba);
addprod.UpdateProduct(2, "Nokia");
addprod.GetProductById(1).then((res) => console.log(res));
addprod.GetProduct().then((res) => console.log(res));
addprod.DeleteProduct(0);
