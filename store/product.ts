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
      note: EMPTY,
      is_open_note: false,
    } || null;
  cart: any = [] || null;
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

    if (product.quantity <= product.stock_count) {
      if (localStorage.getItem("cart")) {
        this.setCart(JSON.parse(localStorage.cart));
        if (index != -1) {
          const oldValue = this.cart[index];
          const newValue = product.quantity + oldValue.quantity;
          if (newValue <= oldValue.stock_count) {
            oldValue.quantity = newValue;
            this.product.quantity = newValue;
            this.setCart(this.cart);
            localStorage.setItem("cart", JSON.stringify(this.cart));
          }
        } else {
          this.setProduct(product);
          console.log(this.product);
          this.cart.push(this.product);
          this.setCart(this.cart);
          localStorage.setItem("cart", JSON.stringify(this.cart));
        }
      } else {
        this.setProduct(product);
        this.cart.push(this.product);
        this.setCart(this.cart);
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    }
    location.reload();
  }

  @action async updateQuantity(product: any) {
    this.setProduct(product);
    let index = this.cart.findIndex((object: any) => {
      return object.id === product.id;
    });
    if (product.quantity <= product.stock_count) {
      if (index != -1) {
        if (product.quantity <= product.quantity) {
          this.product.quantity = product.quantity;
          this.setCart(this.cart);
          localStorage.setItem("cart", JSON.stringify(this.cart));
        }
      } else {
        this.cart.push(product);
        this.setCart(this.cart);
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    }
    location.reload();
  }

  @action async updateNote(product: any) {
    this.setProduct(product);
    let index = this.cart.findIndex((object: any) => {
      return object.id === product.id;
    });
    if (index != -1) {
      this.product.note = product.note;
      this.product.is_open_note = false;
      this.cart[index] = this.product;
      this.setCart(this.cart);
      localStorage.setItem("cart", JSON.stringify(this.cart));
      alert("Your note was noted");
    } else {
      this.product.is_open_note = false;
      this.cart.push(product);
      this.setCart(this.cart);
      localStorage.setItem("cart", JSON.stringify(this.cart));
      alert("Your note was noted");
    }
    location.reload();
  }

  @action async removeAllCart(cart: any) {
    location.reload();
    this.clearCart(cart);
    localStorage.removeItem("cart");
    localStorage.removeItem("order");
  }

  @action async removeProduct(product: any) {
    const index = this.cart.findIndex((object: any) => {
      return object.id === product.id;
    });
    if (localStorage.getItem("cart")) {
      if (index !== -1) {
        this.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(this.cart));
        let cart = JSON.parse(localStorage.cart);
        if (cart.length == 0) {
          localStorage.removeItem("order");
          localStorage.removeItem("cart");
        }
      }
    }
    this.setCart(this.cart);
    location.reload();
  }

  @action async handleCheckout(order: any) {
    this.setOrder(order);
    try {
      localStorage.removeItem("order");
      localStorage.setItem("order", JSON.stringify(this.order));
    } catch (error) {
      alert(error);
    }
  }

  @action async handleConfirm(order: any) {
    this.setOrder(order);
    if (localStorage.getItem("order")) {
      localStorage.removeItem("order");
      localStorage.removeItem("cart");
      localStorage.setItem("order", JSON.stringify(this.order));
    }
    window.location.href = "/thankyou";
  }
}
