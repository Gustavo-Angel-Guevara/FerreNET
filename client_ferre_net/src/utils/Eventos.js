class Eventos{

    constructor(resize){

        if(typeof Eventos.instance == "object"){
            this.component = null;
            this.componentToDisplay = null;
    
            this.classOfComponent = null;
            this.dataSet = null
            this.componentsToSetData = null;
    
            this.dataComponent = null
            this.coordComponent = null;
            this.targetDisplayed = '0';
            this.idItem = null
            this.resize = resize;

            return Eventos.instance
        }

        Eventos.instance = this
        return this
        
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

    set setTargetDisplayed(targetDisplayed){
        this.targetDisplayed = targetDisplayed;
    }

    get getCoord(){
        return this.coordComponent;
    }

    get getIdItem(){
        return this.idItem;
    }

    resizeWindow(component){
        window.addEventListener('resize', e=>{
            try{
                component.style.opacity = '0'
                component.style.visibility = 'hidden'
                this.targetDisplayed = '0'
            }catch(err){

            }
        })
    }

    getPositionByClick(event){

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
    
    displayOptions(){

        this.resizeWindow(this.componentToDisplay)

        if(!this.component){
            console.error("El atributo component es nulo o no es un componente HTML")
            return
        }

        if(this.targetDisplayed == this.component.target.dataset['id']){
            this.componentToDisplay.style.opacity = '0'
            this.targetDisplayed = '0'
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
        
        let coord = {
            left : GuideComponent.left - dataComponentToDisplay.width - 5,
            top : GuideComponent.top,
        }

        this.componentToDisplay.style.visibility = 'visible'
        this.componentToDisplay.style.opacity = '1'

        this.coordComponent = coord;
        this.idItem = this.component.target.dataset['id'];
        this.targetDisplayed = this.component.target.dataset['id']

    }

}


export default Eventos;