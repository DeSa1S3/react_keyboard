

class ClassController {

    isCombineMode: boolean;
    isLanguageChanged: boolean;
    pressedKeys: Set<string>;
    CharsRus: readonly string[];
    CharsEng: readonly string[];

    constructor(
        combMode: boolean, 
        langChanged: boolean, 
        pressKeys: Set<string>, 
        chRus: readonly string[], 
        chEng: readonly string[]
        ) {
        this.isCombineMode = combMode;
        this.isLanguageChanged = langChanged;
        this.pressedKeys = pressKeys;
        this.CharsRus = chRus;
        this.CharsEng = chEng;
    };
    
    Name = (id: string = '', sass_id: string = '') => {
        if (this.isCombineMode) {
            if (this.pressedKeys.has(id)) {
                if (sass_id !== '')
                    return `key ${sass_id} clicked`;
                else
                    return `key clicked`;
            }


            if (this.pressedKeys.has('key_Lalt')) {

                if (id === 'key_shift') {
                    return `key ${sass_id} inactive`;
                }

                return `key`;
            }


            if (!this.isLanguageChanged) {
                for (var i = 0; i < this.CharsEng.length; i++) {
                    if (this.CharsEng[i] === id || id === 'key_shift' || id === 'key_Lalt') {
                        if (sass_id !== '')
                            return `key ${sass_id} inactive`;
                        else
                            return `key inactive`;
                    }
                }
            }
            else {
                for (var i = 0; i < this.CharsRus.length; i++) {
                    if (this.CharsRus[i] === id || id === 'key_shift' || id === 'key_Lalt') {
                        if (sass_id !== '')
                            return `key ${sass_id} inactive`;
                        else
                            return `key inactive`;
                    }
                }
            }
        }

        if (sass_id !== '')
            return `key ${sass_id}`;
        else
            return `key`;
    };
};

export { ClassController };