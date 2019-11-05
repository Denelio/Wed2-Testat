class Settings {
    constructor(theme, state, sort){
        this.theme = theme;
        this.state = state;
        this.sort = sort;
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
}

export const settings = new Settings();