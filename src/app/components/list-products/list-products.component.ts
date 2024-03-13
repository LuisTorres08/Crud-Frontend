import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  listProducts: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  loading: boolean = false;

  constructor(private _productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts() {
    this.loading = true;

    this._productService.getListProducts().subscribe((data: Product[]) => {
      this.listProducts = data;
      this.filteredProducts = this.listProducts;
      this.loading = false;
    })
  }

  deleteProduct(id: number) {
    this.loading = true;

    this._productService.deleteProduct(id).subscribe(() => {
      this.getListProducts();
      this.toastr.warning('El producto fue eliminado con exito', 'Producto Eliminado');
    })
  }

  onSearchTermChange(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm = searchTerm;

    this.filteredProducts = this.listProducts.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm);
      const descriptionMatch = product.description.toLowerCase().includes(searchTerm);
      return nameMatch || descriptionMatch;
    });
  }
}