const { createContext, useState } = require("react")


const Context = createContext()

const Provider = ({children}) => {

    const [menuHide, setMenuHide] = useState(false);

    let data = {
        setMenuHide,
        menuHide
    }

    return(       
        <Context.Provider value={data}>
            {children}
        </Context.Provider> 
    )
}

export {Provider}
export default Context;