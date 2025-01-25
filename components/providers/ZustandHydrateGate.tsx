import LoadingSpinner from "../shared/LoadingSpinner";
import { useCategoryStore, useProductStore } from "@/lib/store";

export const ZustandHydrateGate = ({ children }: { children: React.ReactNode }) => {
    const { isHydrated: categoryIsHydrated } = useCategoryStore();
    const { isHydrated: productIsHydrated } = useProductStore();

    if (!categoryIsHydrated || !productIsHydrated)
        return <LoadingSpinner isFullPage label="Waiting for persisted data" />;

    return children;
};
