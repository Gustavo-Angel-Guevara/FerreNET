import React from 'react';

const InputPrice = ({label, ...props}) =>{
    
    const handleKeyPress = (e) => {
        console.log(e.keyCode)
        let regExp = /^[[$][0-9]*([.][0-9]+)*$/gm

        let spotRegExp = /\./g
        let letters = /[0-9]/g

        let value = (e.target.value).trim()
        if(value[0] !== "$" && value[0] !== "-" && value[0] !== "+"){
            e.target.value = `$${value}`
        }

        if (!(e.key).match(letters) && e.keyCode !== 8 && e.keyCode !== 190  && e.keyCode !== 37 && e.keyCode !== 38 && e.keyCode !== 39 && e.keyCode !== 40 && e.keyCode !== 189 && e.keyCode !== 187 && e.keyCode !== 9) {
          e.preventDefault();
        }else{
            if((e.key).match(spotRegExp)){
                let spot = ((e.target.value).match(spotRegExp)) || []
                if(spot.length > 0){
                    e.preventDefault();
                }
            }
        }

        
        

    };

    return(
        <div className='input-container'>
            <label>{label}</label>
            <input {...props} onKeyDown={handleKeyPress}/>
        </div>
    )
}

export default InputPrice;