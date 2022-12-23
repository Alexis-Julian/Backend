class ProductManger {
  constructor() {
    this.Productos = [];
    this.id = 0;
  }
  /* Devuelve el array de los productos  */
  getProduct() {
    console.log(this.Productos);
  }
  /* Metodo para agregar un producto al array */
  addProduct(Product) {
    let VerifiedProduct = Object.values(Product).includes("");
    if (!VerifiedProduct && this.VerifiedCopyProduct(Product)) {
      this.Productos.push({ ...Product, id: this.id });
      this.id++;
      this.getProduct();
    } else {
      console.log("Error al producto le hace falta un campo o esta repetido");
    }
  }
  /* Verificia el producto si esta repetido */
  VerifiedCopyProduct(Product) {
    for (const key in this.Productos) {
      if (this.Productos[key].code == Product.code) {
        return false;
      }
    }
    return true;
  }
  GetProductById(id) {
    for (const key in this.Productos) {
      if (this.Productos[key].id === id) {
        return this.Productos[key];
      }
    }
    return "Producto no encontrado";
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
  title: "Motorola",
  description: "Buen estado",
  price: "Anashei",
  thumbnail: "Sin imagen",
  code: "abc1234",
  stock: 25,
};

const addprod = new ProductManger();

addprod.addProduct(motorola);
addprod.addProduct(samsung);
addprod.addProduct(prueba);
addprod.addProduct(prueba1);
console.log(addprod.GetProductById(1));
console.log(addprod.GetProductById(9));

addprod.getProduct();
