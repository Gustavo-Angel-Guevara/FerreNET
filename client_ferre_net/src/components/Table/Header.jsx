

const Header = ({data}) =>{
    return(
        <div className="table-row table-header">
        {
            data &&
                data.map((el, index)=>{
                    return <div key={index} className="table-cell">{el}</div>
                })
        }
    </div>
    )
}

export default Header;