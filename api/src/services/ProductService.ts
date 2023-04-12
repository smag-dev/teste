import ProductModel from "../model/ProductModel";
import FileService from "./FileService";

class ProductService {
  async create(product: any, image: any) {
    /*verifica se existe ficheiro de imagem */
    if (image) {
      /* constroi o objecto pois acima  só chamei o ficheiro*/
      const fileservice = new FileService();
      /*grava a imagem */
      const fileName = fileservice.save(image);
      product = { ...product, image: fileName };
    }
    const createdProduct = await ProductModel.create(product);
    return createdProduct;
  }
  async getAll() {
    const products = await ProductModel.find();
    return products;
  }
  async getOne(id: string) {
    const product = await ProductModel.findById(id);
    return product;
  }
  async update(id: string, product: any, image: any) {
    /*verifica se existe ficheiro de imagem */
    if (image) {
      /* constroi o objecto pois acima  só chamei o ficheiro*/
      const fileservice = new FileService();
      /*grava a imagem */
      const fileName = fileservice.save(image);
      product = { ...product, image: fileName };
    }
    let productObj = { ...product, updatedAt: Date.now() };
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      productObj,
      {
        new: true,
      }
    );
    return updatedProduct;
  }
  async delete(id: string) {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    return deletedProduct;
  }
}

export default new ProductService();
