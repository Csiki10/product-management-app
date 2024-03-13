import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})

export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'price', 'actions'];
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  
  deleteProduct(product: Product): void {
    const confirmationSnackBar = this.snackBar.open(
      `Are you sure you want to delete ${product.name}?`, 
      'Yes', 
      { duration: 5000 }
    );

    confirmationSnackBar.onAction().subscribe(() => {
      this.productService.deleteProduct(product.id).subscribe(
        () => {
          this.products = this.products.filter(p => p !== product);
          this.snackBar.open('Product deleted successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error => {
          this.snackBar.open(error.message || 'An error occurred while deleting the product', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      );
    });
  }
}
