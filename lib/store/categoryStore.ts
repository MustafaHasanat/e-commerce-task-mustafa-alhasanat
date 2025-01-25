import { CategoryDetailsType, CategoryType } from "@/lib/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CategoryStoreState {
    categories: CategoryType[] | undefined;
    currentCategory: CategoryDetailsType | undefined;
    isHydrated: boolean;
    setCategories: (categories: CategoryType[]) => void;
    setCurrentCategory: (category: CategoryDetailsType) => void;
    setIsHydrated: (value: boolean) => void;
}

const getInitialState = (set: {
    (state: CategoryStoreState | ((state: CategoryStoreState) => CategoryStoreState)): void;
}): CategoryStoreState => ({
    categories: undefined,
    currentCategory: undefined,
    isHydrated: false,
    setCategories: (categories) => {
        set((state) => ({
            ...state,
            categories,
        }));
    },
    setCurrentCategory: (currentCategory) => {
        set((state) => ({
            ...state,
            currentCategory,
        }));
    },
    setIsHydrated: (isHydrated) => {
        set((state) => ({ ...state, isHydrated }));
    },
});

export const useCategoryStore = create<CategoryStoreState>()(
    persist((set) => getInitialState(set), {
        name: "category-storage",
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
            if (state) {
                state.setIsHydrated(true); // This will be called when the persisted state is hydrated
            }
        },
    }),
);
