class Settings {
    constructor(theme, state, sort, orientation){
        this.theme = theme;
        this.state = state;
        this.sort = sort;
        this.orientation = orientation;
    }

    getTheme(){
        return this.theme;
    }

    setTheme(theme){
        this.theme = theme;
    }

    getState(){
        return this.state;
    }

    setState(state){
        this.state = state;
    }

    getSort(){
        return this.sort;
    }

    setSort(sort){
        this.sort = sort;
    }

    getOrientation(){
        return this.orientation;
    }

    setOrientatin(orientation){
        this.orientation = orientation;
    }
}

export const settings = new Settings();