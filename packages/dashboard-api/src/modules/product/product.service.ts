import { ProductModel } from "./product.model";

export class ProductService {
  getProductCodesByFabricCode(fabricCode: string) {
    return ProductModel.getProductCodes({ fabricCode });
  }
}
