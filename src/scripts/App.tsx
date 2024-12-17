import { useState, useRef, useEffect } from 'react'
import '../preprocessor/App.sass'
import winImageLeft from '../assets/free-icon-globe-558593.png'; 
import winImageRight from '../assets/free-icon-text-3721901.png'; 
import EnterImage from '../assets/icons8-enter-key-50.png'; 
import BackSpaceImage from '../assets/free-icon-backspace-7465583.png'; 

import RandTextGenerator from '../scripts/components/TextGenerator.tsx'

import { CharsComponents } from '../scripts/components/Chars.tsx'
import { ButtonMaps } from './components/ButtonMaps.tsx';
import { ClassController } from '../scripts/components/ClassController.tsx'

let charsComponents = new CharsComponents();
let buttonMaps = new ButtonMaps();

const App: React.FC = () =>  {

  const [inputText, setInputText] = useState<string>('');
  const [isUpperCase, setIsUpperCase] = useState<boolean>(false); // Флаг для отслеживания регистра
  const inputRef = useRef<HTMLInputElement>(null);

  //Проверки на комбинации
  const [isCombineMode, setIsCombinePressed] = useState<boolean>(false);
  const [isLanguageChanged, setLangChanged] = useState<boolean>(false); 
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const [randomText, setRandomText] = useState<string>('');
  const [highlightedText, setHighlightedText] = useState<string>('');
  const [isMatch, setIsMatch] = useState<boolean>(true); // Новое состояние для проверки совпадения

  

  // Функция для обработки нажатия кнопки
  const handleButtonClick = (id: string) => {
    //Здесь проверки на комбинации
    if (isCombineMode) {
      
      if (pressedKeys.has('key_Lalt')) {
          if (id === 'key_shift') {
            setPressedKeys(prev => new Set(prev).add(id));
          }

          if (id === 'key_Lalt') {
            setPressedKeys(new Set());
          }

          return;
      }

      if (pressedKeys.has(id)) {
        setPressedKeys(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
      else {
        setPressedKeys(prev => new Set(prev).add(id));
      }


     
    }
    else {

      if (id === 'key_combine') {
        setPressedKeys(prev => new Set(prev).add("key_combine"));
      }
      
      if (id === 'key_Lalt' || id === 'key_shift' || id === 'key_combine')
        return;

      const textToAdd = isLanguageChanged ? buttonMaps.buttonTextMapRus[id] : buttonMaps.buttonTextMap[id];

      setInputText((prevText) => prevText + (isUpperCase ? textToAdd.toUpperCase() : textToAdd.toLowerCase()));
    
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleRemoveLastCharacter = () => {

    if (inputRef.current) {
      inputRef.current.focus();
    }

    const input = inputRef.current;
    if (input) {
      const { selectionStart } = input;

      if (selectionStart != null) {
        if (selectionStart > 0) {
          const newText = inputText.slice(0, selectionStart - 1) + inputText.slice(selectionStart);
          setInputText(newText);
          // Устанавливаем курсор на одну позицию влево
          setTimeout(() => {
            input.setSelectionRange(selectionStart - 1, selectionStart - 1);
          }, 0);
        }
      }
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }

  };

  const handleToggleCase = () => {
    setIsUpperCase(prev => !prev); // Переключаем регистр
  };

  const handleCombineMode = () => {
    setIsCombinePressed(prev => !prev);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const text = RandTextGenerator(100, isLanguageChanged); // Генерируем текст длиной 100 символов
    setRandomText(text);
  }, [isLanguageChanged]);

  useEffect(() => {
    const correctText = randomText.slice(0, inputText.length);
    setHighlightedText(correctText);

    if (inputText === randomText.slice(0, inputText.length)) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
  }, [inputText, randomText]);

  useEffect(() => {
    if (pressedKeys.has('key_Lalt') && pressedKeys.has('key_shift')) {
      setLangChanged(prev => !prev);
      setPressedKeys(new Set());
      handleCombineMode();
    }

    if (isLanguageChanged) {
      for (var i = 0; i < charsComponents.writableChars.length; i++) {
        if (pressedKeys.has('key_shift') && pressedKeys.has(charsComponents.writableCharsRus[i])) {

          setPressedKeys(new Set());

          const textToAdd = buttonMaps.buttonTextMapRus[charsComponents.writableCharsRus[i]];

          setInputText((prevText) => prevText + (!isUpperCase ? textToAdd?.toUpperCase() : textToAdd?.toLowerCase()));

          handleCombineMode();

          if (inputRef.current) {
            inputRef.current.focus();
          }
        }
        else if (pressedKeys.has(charsComponents.writableCharsRus[i]) && !pressedKeys.has('key_shift')) {
          setPressedKeys(new Set());
          handleCombineMode();
        }
      }
    }
    else {
      for (var i = 0; i < charsComponents.writableChars.length; i++) {
        if (pressedKeys.has('key_shift') && pressedKeys.has(charsComponents.writableChars[i])) {

          setPressedKeys(new Set());

          const textToAdd = buttonMaps.buttonTextMap[charsComponents.writableChars[i]];

          setInputText((prevText) => prevText + (!isUpperCase ? textToAdd?.toUpperCase() : textToAdd?.toLowerCase()));

          handleCombineMode();

          if (inputRef.current) {
            inputRef.current.focus();
          }
        }
        else if (pressedKeys.has(charsComponents.writableChars[i]) && !pressedKeys.has('key_shift')) {
          setPressedKeys(new Set());
          handleCombineMode();
        }
      }
    }

  }, [pressedKeys]);

  const langChars = (id: string) => {
      return isLanguageChanged ? buttonMaps.buttonTextMapRus[id] : buttonMaps.buttonTextMap[id];
  };

  const releaseChars = (id: string) => {
    return isUpperCase ? langChars(id)?.toUpperCase() : langChars(id)?.toLowerCase();
  };

  const swapLanguage = () => {
    setLangChanged(prev => !prev)
  };


  const highLightCheck = () => {
    if (isMatch) 
      return `highlighted`;
    else
      return `highlighted bad`;
  };

  let classController = new ClassController(
    isCombineMode, 
    isLanguageChanged, 
    pressedKeys, 
    charsComponents.writableChars,
    charsComponents.writableCharsRus
  );

  return (
    <>
      <div className="text-container">
        <span className={highLightCheck()}>{highlightedText}</span>
        <span className="remaining">{randomText.slice(inputText.length)}</span>
      </div>


      <div className="inputLine">
        <input 
          className="inputLine_text" 
          type="text" 
          value={inputText} 
          ref={inputRef} 
          onChange={handleInputChange}>
        </input>
      </div>
      <div className="keyboard">
        <div className="row">
            <div className="key">~</div>
            <div className="key" onClick={() => handleButtonClick('key_1')}>1</div>
            <div className="key" onClick={() => handleButtonClick('key_2')}>2</div>
            <div className="key" onClick={() => handleButtonClick('key_3')}>3</div>
            <div className="key" onClick={() => handleButtonClick('key_4')}>4</div>
            <div className="key" onClick={() => handleButtonClick('key_5')}>5</div>
            <div className="key" onClick={() => handleButtonClick('key_6')}>6</div>
            <div className="key" onClick={() => handleButtonClick('key_7')}>7</div>
            <div className="key" onClick={() => handleButtonClick('key_8')}>8</div>
            <div className="key" onClick={() => handleButtonClick('key_9')}>9</div>
            <div className="key" onClick={() => handleButtonClick('key_0')}>0</div>
            <div className="key" onClick={() => handleButtonClick('key_minus')}>-</div>
            <div className="key" onClick={() => handleButtonClick('key_plus')}>+</div>
            <div className="key">
              <img src={BackSpaceImage} 
                alt="Backspace" 
                onClick={handleRemoveLastCharacter} 
                style={{ width: '20px', height: '20px' }} 
              />
            </div>   
        </div>
        <div className="row">
            <div className="key" id="key_tab">Tab</div>
            <div className={classController.Name('key_q')} onClick={() => handleButtonClick('key_q')}>{releaseChars('key_q')}</div>
            <div className={classController.Name('key_w')} onClick={() => handleButtonClick('key_w')}>{releaseChars('key_w')}</div>
            <div className={classController.Name('key_e')} onClick={() => handleButtonClick('key_e')}>{releaseChars('key_e')}</div>
            <div className={classController.Name('key_r')} onClick={() => handleButtonClick('key_r')}>{releaseChars('key_r')}</div>
            <div className={classController.Name('key_t')} onClick={() => handleButtonClick('key_t')}>{releaseChars('key_t')}</div>
            <div className={classController.Name('key_y')} onClick={() => handleButtonClick('key_y')}>{releaseChars('key_y')}</div>
            <div className={classController.Name('key_u')} onClick={() => handleButtonClick('key_u')}>{releaseChars('key_u')}</div>
            <div className={classController.Name('key_i')} onClick={() => handleButtonClick('key_i')}>{releaseChars('key_i')}</div>
            <div className={classController.Name('key_o')} onClick={() => handleButtonClick('key_o')}>{releaseChars('key_o')}</div>
            <div className={classController.Name('key_p')} onClick={() => handleButtonClick('key_p')}>{releaseChars('key_p')}</div>
            <div className={classController.Name('key_sq_bracket_left')} onClick={() => handleButtonClick('key_sq_bracket_left')}>{releaseChars('key_sq_bracket_left')}</div>
            <div className={classController.Name('key_sq_bracket_right')} onClick={() => handleButtonClick('key_sq_bracket_right')}>{releaseChars('key_sq_bracket_right')}</div>
            <div className="key" onClick={() => handleButtonClick('key_slash')}>\</div>
        </div>
        <div className="row">
            <div className="key" onClick={handleToggleCase}>Caps Lock</div>
            <div className={classController.Name('key_a')} onClick={() => handleButtonClick('key_a')}>{releaseChars('key_a')}</div>
            <div className={classController.Name('key_s')} onClick={() => handleButtonClick('key_s')}>{releaseChars('key_s')}</div>
            <div className={classController.Name('key_d')} onClick={() => handleButtonClick('key_d')}>{releaseChars('key_d')}</div>
            <div className={classController.Name('key_f')} onClick={() => handleButtonClick('key_f')}>{releaseChars('key_f')}</div>
            <div className={classController.Name('key_g')} onClick={() => handleButtonClick('key_g')}>{releaseChars('key_g')}</div>
            <div className={classController.Name('key_h')} onClick={() => handleButtonClick('key_h')}>{releaseChars('key_h')}</div>
            <div className={classController.Name('key_j')} onClick={() => handleButtonClick('key_j')}>{releaseChars('key_j')}</div>
            <div className={classController.Name('key_k')} onClick={() => handleButtonClick('key_k')}>{releaseChars('key_k')}</div>
            <div className={classController.Name('key_l')} onClick={() => handleButtonClick('key_l')}>{releaseChars('key_l')}</div>
            <div className={classController.Name('key_semicolon')} onClick={() => handleButtonClick('key_semicolon')}>{releaseChars('key_semicolon')}</div>
            <div className={classController.Name('key_uppercomma')} onClick={() => handleButtonClick('key_uppercomma')}>{releaseChars('key_uppercomma')}</div>
            <div className="key">
              <img src={EnterImage} alt="Enter" style={{ width: '20px', height: '20px' }} />
            </div>    
        </div>
        <div className="row">
            <div className={classController.Name('key_shift', 'shift')} onClick={() => handleButtonClick('key_shift')}>Shift</div>
            <div className={classController.Name('key_z')} onClick={() => handleButtonClick('key_z')}>{releaseChars('key_z')}</div>
            <div className={classController.Name('key_x')} onClick={() => handleButtonClick('key_x')}>{releaseChars('key_x')}</div>
            <div className={classController.Name('key_c')} onClick={() => handleButtonClick('key_c')}>{releaseChars('key_c')}</div>
            <div className={classController.Name('key_v')} onClick={() => handleButtonClick('key_v')}>{releaseChars('key_v')}</div>
            <div className={classController.Name('key_b')} onClick={() => handleButtonClick('key_b')}>{releaseChars('key_b')}</div>
            <div className={classController.Name('key_n')} onClick={() => handleButtonClick('key_n')}>{releaseChars('key_n')}</div>
            <div className={classController.Name('key_m')} onClick={() => handleButtonClick('key_m')}>{releaseChars('key_m')}</div>
            <div className={classController.Name('key_comma')} onClick={() => handleButtonClick('key_comma')}>{releaseChars('key_comma')}</div>
            <div className={classController.Name('key_dot')} onClick={() => handleButtonClick('key_dot')}>{releaseChars('key_dot')}</div>
            <div className="key" onClick={() => handleButtonClick('key_revslash')}>/</div>
            <div className="key shift" onClick={() => handleButtonClick('key_shift')}>Shift</div>
        </div>
        <div className="row">
            <div className="key ctrl">Ctrl</div>
            <div className="key" onClick={swapLanguage}>
              <img src={winImageLeft} alt="Win" style={{ width: '20px', height: '20px' }} />
            </div>
            <div className={classController.Name('key_Lalt')} onClick={() => {handleButtonClick('key_Lalt')}}>Alt</div>
            <div className="key space" onClick={() => handleButtonClick('key_space')}>Пробел</div>
            <div className="key">Alt</div>
            <div className={classController.Name('key_combine')} onClick={() => { handleCombineMode(); handleButtonClick('key_combine'); }}>
              <img src={winImageRight} alt="Win" style={{ width: '20px', height: '20px' }} />
            </div>
            <div className="key ctrl">Ctrl</div>
        </div>
      </div>
    </>
  );
}

export default App
