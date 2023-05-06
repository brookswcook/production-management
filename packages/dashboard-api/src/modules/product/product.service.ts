import { Service } from "typedi";
import { ProductModel } from "./product.model";

@Service()
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
