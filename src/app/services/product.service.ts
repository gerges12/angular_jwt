import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private geAllProductEndPoint =
    'http://localhost:8080/MIS/product/getAllProduct';

  private getCategoriesByMainCategory =
    'http://localhost:8080/MIS/product/getCategoriesByMainCategory/';

  private getProductsByCategory =
    'http://localhost:8080/MIS/product/getProductsByCategory/';

  constructor(private http: HttpClient) {}

  getAllProduct() {
    return this.http.get<any>(this.geAllProductEndPoint, httpOptions);
  }

  findCategoriesByMainCategoryName(mainCategoryName: string) {
    return this.http.get<any>(
      this.getCategoriesByMainCategory + mainCategoryName,
      httpOptions
    );
  }

  findProductsByCategory(categoryId: number) {
    return this.http.get<any>(
      this.getProductsByCategory + categoryId,
      httpOptions
    );
  }
}
