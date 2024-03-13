import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  product: Product = {
    id: '',
    name: '',
    description: '',
    price: 0
  };

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmit(): void {

    if (!this.isValidProduct()) {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.productService.addProduct(this.product).subscribe(
      () => {
        this.snackBar.open('Product added successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.resetForm();  
        this.router.navigate(['/products']);     
      },
      error => {
        console.log("asd")
        this.snackBar.open(error.message || 'An error occurred while adding the product', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  isValidProduct(): boolean {
    return !!this.product.name && !!this.product.description && !!this.product.price;
  }

  resetForm(): void {
    this.product = {
      id: '',
      name: '',
      description: '',
      price: 0
    };
  }

}
