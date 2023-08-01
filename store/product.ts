import { action, createModule, mutation } from "vuex-class-component";
import Vue from "vue";
import { EMPTY } from "~/utils/constant";

const VuexModule = createModule({
  namespaced: "Product",
  strict: false,
  target: "nuxt",
  enableLocalWatchers: true,
});
export class ProductStore extends VuexModule {
  product: any =
    {
      id: EMPTY,
      name: EMPTY,
      image_url: EMPTY,
      price: 0,
      description: EMPTY,
      is_on_discount: false,
      quantity: 0,
      discounted_price: 0,
      final_price: 0,
      stock_count: 0,
    } || null;
  cart: any = [] || null;
  userInfo: any = {
    fname: EMPTY,
    phone_number: EMPTY,
    address: EMPTY,
    email: EMPTY,
    note: EMPTY,
  };
  order: any = [] || null;

  @mutation setProduct(product: any) {
    this.product = product;
  }
  @mutation setCart(cart: any) {
    this.cart = cart;
  }
  @mutation clearCart(cart: any) {
    this.cart = cart;
  }
  @mutation setOrder(order: any) {
    this.order = order;
  }

  @action async addToCart(product: any) {
    this.setProduct(product);
    let index = this.cart.findIndex((object: any) => {
      return object.id === product.id;
    });
    if (
      product.quantity < product.stock_count ||
      product.quantity == product.stock_count
    ) {
      if (index == -1) {
        this.cart.push(product);
        this.setCart(this.cart);
      } else {
        if (product.id == this.cart[index].id) {
          if (product.quantity < this.cart[index].stock_count) {
            const oldValue = this.cart[index];
            const newValue = product.quantity + oldValue.quantity;
            oldValue.quantity = newValue;
            this.product.quantity = newValue;
            this.setCart(this.cart);
          }
        }
      }
    }
  }

  @action async removeAllCart(cart: any) {
    location.reload();
    this.clearCart(cart);
  }

  @action async removeProduct(product: any) {
    const index = this.cart.findIndex((object: any) => {
      return object.id === product.id;
    });
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
    this.setCart(this.cart);
  }

  @action async checkOut() {
    this.order.push(this.cart);
    const user = this.userInfo;
    const userModify = JSON.stringify(user);
    this.order.push(userModify);
    const order = this.order;
    try {
      this.setOrder(order);
      this.cart = [];
      this.order = [];
      this.setCart(this.cart);
      this.setOrder(this.order);
      location.reload();
      alert("Thanks for choosing us");
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
