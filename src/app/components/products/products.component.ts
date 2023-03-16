import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  selectedlang: any;

  lang = [
    { name: 'HTML' },
    { name: 'ReactJS' },
    { name: 'Angular' },
    { name: 'Bootstrap' },
    { name: 'PrimeNG' },
  ];

  products!: any[];

  MobileCategories!: any[];

  selectedCategory!: any;

  constructor(
    private token: TokenStorageService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadDataTable();
    this.loadCategory();
  }

  onChange(event: any) {
    console.log('event :' + event.value);
    this.loadFilteredDataTable(1);
  }

  loadDataTable() {
    this.productService.getAllProduct().subscribe((data) => {
      this.products = data;
    });
    console.log('rtrt', this.products);
  }

  loadFilteredDataTable(categoryId: number) {
    this.productService.findProductsByCategory(categoryId).subscribe((data) => {
      this.products = data;
    });
  }

  loadCategory() {
    this.productService
      .findCategoriesByMainCategoryName('phones')
      .subscribe((data) => {
        this.MobileCategories = data;
      });

    console.log('rt', this.MobileCategories);
  }
}
