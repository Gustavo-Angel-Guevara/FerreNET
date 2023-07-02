

const Header = ({data}) =>{
    return(
        <div class="table-row table-header">
        {
            data &&
                data.map(el=>{
                    return <div class="table-cell">{el}</div>
                })
        }
    </div>
    )
}

export default Header;