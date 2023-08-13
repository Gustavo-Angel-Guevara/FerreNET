const { createContext, useState } = require("react")

const Context = createContext()

const Provider = ({children}) => {

    const [menuHide, setMenuHide] = useState(false);
    const [dataUser, setDataUser] = useState({})

    let data = {
        setMenuHide,
        menuHide,
        dataUser,
        setDataUser
    }

    return(       
        <Context.Provider value={data}>
            {children}
        </Context.Provider> 
    )
}

export {Provider}
export default Context;