'use client';

import React, { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode, FC } from "react";
import { Banner } from "@/utils/types";

interface ContextProps {
    bannersData: Banner[];
    setBannersData: Dispatch<SetStateAction<Banner[]>>;
}

const GlobalContext = createContext<ContextProps | undefined>(undefined);

interface ProviderProps {
    children: ReactNode;
}

const GlobalContextProvider: FC<ProviderProps> = ({ children }) => {
    const [bannersData, setBannersData] = useState<Banner[]>([]);    
    return (
        <GlobalContext.Provider value={{ bannersData, setBannersData }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalContextProvider");
    }
    return context;
};

export { GlobalContextProvider };
