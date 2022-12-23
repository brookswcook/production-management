import { ProductModel } from "./product.model";

export class ProductService {
  getProductCodesByFabricCode(fabricCode: string, factoryCode?: string) {
    const query = { fabricCode };
    factoryCode && Object.assign(query, { factoryCode });
    return ProductModel.getProductCodes(query);
  }

  getProductCodesByStyleCode(styleCode: string, factoryCode?: string) {
    const query = { styleCode };
    factoryCode && Object.assign(query, { factoryCode });
    return ProductModel.getProductCodes(query);
  }
}
