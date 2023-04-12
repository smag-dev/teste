import Model from "./model";

class Service {
  async getAll() {
    const products = await Model.find();
    return products;
  }
}

export default new Service();
