class Eventos{

    constructor(resize){
        this.component = null;
        this.componentToDisplay = null;

        this.classOfComponent = null;
        this.dataSet = null
        this.componentsToSetData = null;

        this.dataComponent = null
        this.coordComponent = null;

        this.resize = resize;
    }

    set setComponent(component){
        this.component = component;
    }

    set setComponentToDisplay(componentToDisplay){
        this.componentToDisplay = componentToDisplay;
    }

    set setClassOfComponent(classOfComponent){
        this.classOfComponent = classOfComponent
    } 

    set setDataSet(dataSet){
        this.dataSet = dataSet;
    }

    set setComponentsToSetData(componentsToSetData){
        this.componentsToSetData = componentsToSetData
    }

    get getCoord(){
        return this.coordComponent;
    }

    resizeWindow(components){
        window.addEventListener('resize', e=>{
            console.log(e)
            components.map(component=>{
                component.style.opacity = '0'
            })
        })
    }

    getPositionByClick(event){

        console.log(event)
        this.dataComponent = {
            top: event.target.offsetTop,
            left : event.target.offsetLeft,
            width : event.target.offsetWidth,
            height : event.target.offsetHeight
        }
    }

    setAttrToHtml(event){
        Object.values(this.componentsToSetData).map(component =>{
            component[0].dataset[component[1]] = event.target.dataset[component[1]]
        })
    }

    displayOptions(event, componentToDisplay){

        if(this.resize){
            this.resizeWindow([componentToDisplay])
        }

        switch(event){
            case 'click':

                let targetDisplayed = '0';

                if(!this.component && !this.classOfComponent){
                    console.error("El atributo component es nulo o no es un componente HTML")
                    return
                }
        
                if(this.component){
                    
                }else if(this.classOfComponent){
                    document.addEventListener('click', e=>{

                        if(e.target.classList.contains('options') && e.target.tagName == 'IMG'){

                            if(targetDisplayed == e.target.dataset[this.dataSet[0]]){
                                componentToDisplay.style.opacity = '0'
                                targetDisplayed = 0
                                return
                            }

                            this.getPositionByClick(e)

                            let dataComponentToDisplay = {
                                top : componentToDisplay.offsetTop,
                                left : componentToDisplay.offsetLeft,
                                width : componentToDisplay.offsetWidth,
                                height : componentToDisplay.offsetHeight,
                            }

                            const GuideComponent = this.dataComponent 
    
                            componentToDisplay.style.left = GuideComponent.left - dataComponentToDisplay.width;
                            componentToDisplay.style.top = GuideComponent.top + 7;

                            componentToDisplay.style.opacity = '1'
                            console.log(componentToDisplay.dataset)
                            
                            this.setAttrToHtml(e)
                        
                            targetDisplayed = e.target.dataset[this.dataSet[0]]
                        }    
                        
                    })
                }    

                break;
        }       
        

    }

    displayAComponent(){
        if(!this.component){
            console.error("El atributo component es nulo o no es un componente HTML")
            return
        }

        this.getPositionByClick(this.component)  

        let dataComponentToDisplay = {
            top : this.componentToDisplay.offsetTop,
            left : this.componentToDisplay.offsetLeft,
            width : this.componentToDisplay.offsetWidth,
            height : this.componentToDisplay.offsetHeight,
        }

        
        const GuideComponent = this.dataComponent 
        console.log(GuideComponent)
        
        let coord = {
            left : GuideComponent.left - dataComponentToDisplay.width,
            top : GuideComponent.height
        }

        this.coordComponent = coord;

    }


}


export default Eventos;