import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0
  };

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    this.productService.addProduct(this.product).subscribe(
      () => {
        this.snackBar.open('Product added successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });       
      },
      error => {
        this.snackBar.open(error.message || 'An error occurred while adding the product', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }

}
