const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService{
  constructor(){
    this.products = [];
    this.generate();
  }

  async generate(){
    const limit = 10;
    for(let index = 0; index < limit; index ++){
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data){
    const newProduct = {
      id: faker.string.uuid(),
      name: data.name,
      price: data.price,
      image: data.image
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 2000);
    });
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound('Product not found');
    }
    if(product.isBlock){
      throw boom.conflict('Product is block')
    }
    return product;
  }

  async findIndex(id){
    return this.products.findIndex(item => item.id === id);
  }

  async update(id, changes){
    const index = await this.findIndex(id);
    if (index === -1 ){
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id){
    const index = await this.findIndex(id);
    if (index === -1 ){
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return {message: 'Product ' + id + ' deleted'};
  }
}

module.exports = ProductsService;