import { Injectable } from "@angular/core";
import { Product } from "./product.model";

@Injectable()
export class Cart {
  public lines: CartLine[] = [];
  public itemCount: number = 0;
  public cartPrice: number = 0;

  addLine(product: Product, quantity: number = 1) {
    let line = this.lines.find(line => line.product?.id == product.id);
    if (line) {
      line.quantity += quantity;
    } else {
      this.lines.push(new CartLine(product, quantity));
    }
    this.recalculate();
  }

  updateQuantity(product: Product, quantity: number) {
    let line = this.lines.find(line => line.product?.id == product?.id);

    // if the product doesn't exist
    if (!line) {
      return;
    }

    // negative numbers are prohibited
    if (quantity <= 0) {
      line.quantity = 1;
     } else {
      line.quantity = Number(quantity);
     }

    this.recalculate();
  }

  removeLine(id: number | undefined) {
    // if undefined
    if (!id) {
      return
    }

    let index = this.lines.findIndex(line => line.product?.id == id);
    this.lines.splice(index, 1);
    this.recalculate();
  }

  clear(){
    this.lines = [];
    this.itemCount = 0;
    this.cartPrice = 0;
  }

  private recalculate(){
    this.itemCount = 0;
    this.cartPrice = 0;
    this.lines.forEach(l => {
      this.itemCount += l.quantity;
      // TODO: to replace
      if (l.product.price) {
        this.cartPrice += (l.quantity * l.product?.price);
      }
    })
  }
}

export class CartLine {
  constructor(
    public product: Product,
    public quantity: number) { }

  get lineTotal(): (number | undefined) {
    // if undefined
    if(!this.product.price) return;
    return this.quantity * this.product?.price;
  }
}
