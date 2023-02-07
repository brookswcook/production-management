import { ProductModel } from "./product.model";

export class ProductService {
  getProductCodesByFabricCode(fabricCode: string) {
    const query = { fabricCode };
    return ProductModel.getProductCodes(query);
  }

  getProductCodesByStyleCode(styleCode: string) {
    const query = { styleCode };
    return ProductModel.getProductCodes(query);
  }
}
