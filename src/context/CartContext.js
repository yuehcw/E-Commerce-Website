import React, { createContext, useReducer, useContext } from "react";
import * as ProductService from "../services/productService";

// Actions
const UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY";
const SET_ITEMS_EMPTY = "SET_ITEMS_EMPTY";

// Initial cart state
const initialState = {
  items: [],
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_ITEM_QUANTITY:
      return { ...state, items: action.payload };
    case SET_ITEMS_EMPTY:
      return { ...state, items: [] };
    default:
      return state;
  }
};

// Context creation
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Actions
  const updateItem = async (newProduct, newQuantity) => {
    try {
      // Attempt to update the cart via API
      const response = await ProductService.updateProductToCart(
        newProduct.id,
        newQuantity,
      );
      // Check for success
      if (response.status === 200) {
        console.log("API call successful. Update cart item");

        let updatedItems;

        if (newQuantity === 0) {
          updatedItems = state.items.filter(
            (item) => item.id !== newProduct.id,
          );
        } else {
          const productExists = state.items.find(
            (item) => item.id === newProduct.id,
          );

          if (productExists) {
            updatedItems = state.items.map((item) =>
              item.id === newProduct.id
                ? { ...item, quantity: item.quantity + newQuantity }
                : item,
            );
          } else {
            updatedItems = [
              ...state.items,
              { ...newProduct, quantity: newQuantity },
            ];
          }
        }

        dispatch({ type: UPDATE_ITEM_QUANTITY, payload: updatedItems });
      } else {
        // Handle non-successful response
        console.error("API call unsuccessful.");
      }
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  const setItemsEmpty = () => {
    dispatch({ type: SET_ITEMS_EMPTY });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        updateItem,
        setItemsEmpty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
