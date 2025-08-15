import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class PosService {
  // State signals
  private readonly _products = signal<Product[]>([
    { id: '1', name: 'Tacos al Pastor', price: 25, stock: 50 },
    { id: '2', name: 'Quesadilla', price: 30, stock: 30 },
    { id: '3', name: 'Torta', price: 35, stock: 20 },
    { id: '4', name: 'Refresco', price: 15, stock: 100 },
  ]);

  private readonly _cart = signal<CartItem[]>([]);
  private readonly _isOpen = signal(false);

  // Computed signals
  readonly products = this._products.asReadonly();
  readonly cart = this._cart.asReadonly();
  readonly isOpen = this._isOpen.asReadonly();

  readonly cartTotal = computed(() => {
    return this._cart().reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  });

  readonly cartItemCount = computed(() => {
    return this._cart().reduce((count, item) => count + item.quantity, 0);
  });

  // Actions
  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this._cart();
    const existingItem = currentCart.find(
      item => item.product.id === product.id
    );

    if (existingItem) {
      // Update existing item
      this._cart.update(cart =>
        cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Add new item
      this._cart.update(cart => [...cart, { product, quantity }]);
    }

    // Update stock
    this._products.update(products =>
      products.map(p =>
        p.id === product.id ? { ...p, stock: p.stock - quantity } : p
      )
    );
  }

  removeFromCart(productId: string): void {
    const itemToRemove = this._cart().find(
      item => item.product.id === productId
    );
    if (!itemToRemove) return;

    // Restore stock
    this._products.update(products =>
      products.map(p =>
        p.id === productId
          ? { ...p, stock: p.stock + itemToRemove.quantity }
          : p
      )
    );

    // Remove from cart
    this._cart.update(cart =>
      cart.filter(item => item.product.id !== productId)
    );
  }

  updateQuantity(productId: string, quantity: number): void {
    const currentCart = this._cart();
    const item = currentCart.find(item => item.product.id === productId);
    if (!item) return;

    const quantityDiff = quantity - item.quantity;

    // Update cart
    this._cart.update(cart =>
      cart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );

    // Update stock
    this._products.update(products =>
      products.map(p =>
        p.id === productId ? { ...p, stock: p.stock - quantityDiff } : p
      )
    );
  }

  clearCart(): void {
    // Restore all stock
    const currentCart = this._cart();
    this._products.update(products =>
      products.map(product => {
        const cartItem = currentCart.find(
          item => item.product.id === product.id
        );
        return cartItem
          ? { ...product, stock: product.stock + cartItem.quantity }
          : product;
      })
    );

    this._cart.set([]);
  }

  checkout(): void {
    // In a real app, this would send the order to the backend
    console.log('Processing checkout:', {
      items: this._cart(),
      total: this.cartTotal(),
      timestamp: new Date().toISOString(),
    });

    this.clearCart();
  }

  toggleDrawer(): void {
    this._isOpen.update(open => !open);
  }

  openDrawer(): void {
    this._isOpen.set(true);
  }

  closeDrawer(): void {
    this._isOpen.set(false);
  }
}
