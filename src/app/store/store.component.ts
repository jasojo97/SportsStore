import { Component } from '@angular/core'
import { Product } from '../model/product.model'
import { ProductRepository } from '../model/product.repository'
import { Cart } from '../model/cart.model'
import { Router } from '@angular/router'

@Component({
  selector: 'store',
  templateUrl: 'store.component.html',
})
export class StoreComponent {
  public selectedCategory = null
  public productsPerPage = 4
  public selectedPage = 1

  constructor(private repository: ProductRepository, private cart: Cart, private router: Router) {}

  get products(): Product[] {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage
    return this.repository
      .getProducts(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.productsPerPage)
  }

  get categories(): string[] {
    return this.repository.getCategories()
  }

  changeCategory(newCategory?: string) {
    // console.log('change categorhy. New value: ' + newCategory)
    this.selectedCategory = newCategory
  }

  changePage(newPage: number) {
    this.selectedPage = newPage
  }

  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize)
    this.changePage(1)
  }

  get pageNumbers(): number[] {
    const products = this.repository.getProducts(this.selectedCategory)
    const pages = products.length / this.productsPerPage

    // the next whole number, 0.5 => 1, 3.2 => 4
    const pageCount = Math.ceil(pages)

    // x is 0 and i is the index
    // if page count is 3, it generate [1, 2, 3]
    const pageNumbers = Array(pageCount)
      .fill(0) // fills with 0
      .map((x, i) => i + 1)

    return pageNumbers
  }

  addProductToCart(product: Product) {
    this.cart.addLine(product)
    this.router.navigateByUrl('/cart')
  }
}
