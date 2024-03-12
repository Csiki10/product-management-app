import { Component } from '@angular/core';
import { Product } from '../Models/product.model';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  productId: string = '';
  product: Product = {
    id: '',
    name: '',
    description: '',
    price: 0
  };

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.productId = param['id']
      this.productService.getProduct(this.productId).subscribe(
        (product: Product) => {
          this.product = product;
        },
        error => {
          console.error('Error fetching product:', error);
          this.snackBar.open('Error fetching product. Please try again later.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      );
    });
  }

  onSubmit(): void {
    if (!this.isValidProduct()) {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.productService.updateProduct(this.productId, this.product).subscribe(
      () => {
        this.snackBar.open('Product updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/products']);
      },
      error => {
        console.error('Error updating product:', error);
        this.snackBar.open('Error updating product. Please try again later.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  isValidProduct(): boolean {
    return !!this.product.name && !!this.product.description && !!this.product.price;
  }

}
