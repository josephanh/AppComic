import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const { children } = props;
    const [isLogin, setisLogin] = useState(false);
    const [inForUser, setinForUser] = useState({});
    const [status, setstatus] = useState("#FFF");
    return (
        <AppContext.Provider
            value={{ isLogin, setisLogin, inForUser, setinForUser, status, setstatus }}>
            {children}
        </AppContext.Provider>
    )
}