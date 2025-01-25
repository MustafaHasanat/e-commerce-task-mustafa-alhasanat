import { ProductDetailsType } from "products";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ProductStoreState {
    currentProduct: ProductDetailsType | undefined;
    isHydrated: boolean;
    setCurrentProduct: (product: ProductDetailsType) => void;
    setIsHydrated: (value: boolean) => void;
}

const getInitialState = (set: {
    (state: ProductStoreState | ((state: ProductStoreState) => ProductStoreState)): void;
}): ProductStoreState => ({
    currentProduct: undefined,
    isHydrated: false,
    setCurrentProduct: (currentProduct) => {
        set((state) => ({
            ...state,
            currentProduct,
        }));
    },
    setIsHydrated: (isHydrated) => {
        set((state) => ({ ...state, isHydrated }));
    },
});

export const useProductStore = create<ProductStoreState>()(
    persist((set) => getInitialState(set), {
        name: "product-storage",
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
            if (state) {
                state.setIsHydrated(true); // This will be called when the persisted state is hydrated
            }
        },
    }),
);
