# API Documentation

This document describes the purpose and required parameters for each API endpoint in the project.

---

## **User Endpoints**

### **1. `/api/user/signup`**

- **Purpose**: Allows new users to create an account.
- **Method**: `POST`
- **Required Parameters**:
  - `name` (string): The name of the user.
  - `email` (string): The email address of the user.
  - `password` (string): The password for the account.

---

### **2. `/api/user/login`**

- **Purpose**: Authenticates a user and provides a session or token.
- **Method**: `POST`
- **Required Parameters**:
  - `email` (string): The registered email address.
  - `password` (string): The password associated with the account.

---

### **3. `/api/user/admin`**

- **Purpose**: Grants or verifies admin privileges for a user.
- **Method**: `POST`
- **Required Parameters**:
  - `email` (string): The registered email of the Admin.
  - `password` (string): The password associated with the Admin account.

---

## **Product Endpoints**

### **4. `/api/product/add`**

- **Purpose**: Add a product to the database.
- **Method**: `POST`
- **Required Parameters**:
  - `name` (string): The name of the product.
  - `description` (string): The description of the product.
  - `price` (string): The price of the product.
  - `image` (string): The images of the product.
  - `category` (string): The category of the product.
  - `subCategory` (string): The subCategory of the product.
  - `sizes` (string): The sizes of the product.
  - `bestseller` (string): The bestseller of the product.

---

### **5. `/api/product/remove`**

- **Purpose**: Deletes a specific product from the database.
- **Method**: `POST`
- **Required Parameters**:
  - `productId` (string): The ID of the product to be removed.

---

### **6. `/api/product/single`**

- **Purpose**: Retrieves details of a single product.
- **Method**: `POST`
- **Required Parameters**:
  - `productId` (string): The ID of the product to fetch.

---

### **7. `/api/product/list`**

- **Purpose**: Fetches a list of all products.
- **Method**: `GET`
- **Required Parameters**:
  - None.

---

## **Cart Endpoints**

### **8. `/api/cart/get`**

- **Purpose**: Retrieves the user's cart details.
- **Method**: `POST`
- **Required Parameters**:
  - `userId` (string): The ID of the user whose cart is being accessed.

---

### **9. `/api/cart/add`**

- **Purpose**: Adds a product to the user's cart.
- **Method**: `POST`
- **Required Parameters**:
  - `userId` (string): The ID of the user.
  - `productId` (string): The ID of the product to add.
  - `quantity` (number): The quantity of the product.

---

### **10. `/api/cart/update`**

- **Purpose**: Updates the quantity of a product in the user's cart.
- **Method**: `POST`
- **Required Parameters**:
  - `userId` (string): The ID of the user.
  - `productId` (string): The ID of the product.
  - `quantity` (number): The new quantity.

---

## **Order Endpoints**

### **11. `/api/order/list`**

- **Purpose**: Fetches a list of all orders in the system.
- **Method**: `POST`
- **Required Parameters**:
  - `adminId` (string): The ID of the admin requesting the list (for admin use).

---

### **12. `/api/order/status`**

- **Purpose**: Retrieves the status of a specific order.
- **Method**: `POST`
- **Required Parameters**:
  - `adminId` (string): The ID of the admin changing the status of the order (for admin use).
  - `orderId` (string): The ID of the order.

---

### **13. `/api/order/place`**

- **Purpose**: Places a new order for the user.
- **Method**: `POST`
- **Required Parameters**:
  - `userId` (string): The ID of the user placing the order.
  - `cartId` (string): The ID of the cart being processed.

---

### **14. `/api/order/stripe`**

- **Purpose**: Initiates a payment session using Stripe.
- **Method**: `POST`
- **Required Parameters**:
  - `userId` (string): The ID of the user initiating the payment.
  - `orderId` (string): The ID of the order to be paid.

---

### **15. `/api/order/verifystripe`**

- **Purpose**: Verifies the status of a Stripe payment.
- **Method**: `POST`
- **Required Parameters**:
  - `userId` (string): The ID of the user for verifying the payment.
  - `paymentId` (string): The ID of the Stripe payment.
  - `orderId` (string): The ID of the order associated with the payment.

---

### **16. `/api/order/userorders`**

- **Purpose**: Retrieves all orders placed by a specific user.
- **Method**: `POST`
- **Required Parameters**:
  - `userId` (string): The ID of the user whose orders are being retrieved.

---
