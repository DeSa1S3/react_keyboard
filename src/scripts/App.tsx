import { useState, useRef, useEffect } from 'react'
import '../preprocessor/App.sass'

const App: React.FC = () =>  {

  const [inputText, setInputText] = useState<string>('');
  const [isUpperCase, setIsUpperCase] = useState<boolean>(false); // Флаг для отслеживания регистра
  const inputRef = useRef<HTMLInputElement>(null);


  const buttonTextMap: { [key: string]: string } = {
    key_1: '1',
    key_2: '2',
    key_3: '3',
    key_4: '4',
    key_5: '5',
    key_6: '6',
    key_7: '7',
    key_8: '8',
    key_9: '9',
    key_0: '0',
    key_q: 'q',
    key_w: 'w',
    key_e: 'e',
    key_r: 'r',
    key_t: 't',
    key_y: 'y',
    key_u: 'u',
    key_i: 'i',
    key_o: 'o',
    key_p: 'p',
    key_a: 'a',
    key_s: 's',
    key_d: 'd',
    key_f: 'f',
    key_g: 'g',
    key_h: 'h',
    key_j: 'j',
    key_k: 'k',
    key_l: 'l',
    key_z: 'z',
    key_x: 'x',
    key_c: 'c',
    key_v: 'v',
    key_b: 'b',
    key_n: 'n',
    key_m: 'm',
    key_space: ' ',
    key_semicolon: ';',
    key_uppercomma: "'",
    key_sq_bracket_left: '[',
    key_sq_bracket_right: ']',
    key_comma: ',',
    key_slash: '\\',
    key_revslash: '/',
    key_dot: '.'
  };

  // Функция для обработки нажатия кнопки
  const handleButtonClick = (id: string) => {
    const textToAdd = buttonTextMap[id];
    setInputText((prevText) => prevText + (isUpperCase ? textToAdd.toUpperCase() : textToAdd.toLowerCase()));
  
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRemoveLastCharacter = () => {
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
 
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
            <div className="key">Esc</div>
            <div className="key" onClick={() => handleButtonClick('key_f1')}>F1</div>
            <div className="key" onClick={() => handleButtonClick('key_f2')}>F2</div>
            <div className="key" onClick={() => handleButtonClick('key_f3')}>F3</div>
            <div className="key" onClick={() => handleButtonClick('key_f4')}>F4</div>
            <div className="key" onClick={() => handleButtonClick('key_f5')}>F5</div>
            <div className="key" onClick={() => handleButtonClick('key_f6')}>F6</div>
            <div className="key" onClick={() => handleButtonClick('key_f7')}>F7</div>
            <div className="key" onClick={() => handleButtonClick('key_f8')}>F8</div>
            <div className="key" onClick={() => handleButtonClick('key_f9')}>F9</div>
            <div className="key" onClick={() => handleButtonClick('key_f10')}>F10</div>
            <div className="key" onClick={() => handleButtonClick('key_f11')}>F11</div>
            <div className="key" onClick={() => handleButtonClick('key_f12')}>F12</div>
        </div>
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
            <div className="key">-</div>
            <div className="key">+</div>
            <div className="key" onClick={handleRemoveLastCharacter}>Backspace</div>
        </div>
        <div className="row">
            <div className="key" id="key_tab">Tab</div>
            <div className="key" onClick={() => handleButtonClick('key_q')}>{isUpperCase ? 'Q' : 'q'}</div>
            <div className="key" onClick={() => handleButtonClick('key_w')}>{isUpperCase ? 'W' : 'w'}</div>
            <div className="key" onClick={() => handleButtonClick('key_e')}>{isUpperCase ? 'E' : 'e'}</div>
            <div className="key" onClick={() => handleButtonClick('key_r')}>{isUpperCase ? 'R' : 'r'}</div>
            <div className="key" onClick={() => handleButtonClick('key_t')}>{isUpperCase ? 'T' : 't'}</div>
            <div className="key" onClick={() => handleButtonClick('key_y')}>{isUpperCase ? 'Y' : 'y'}</div>
            <div className="key" onClick={() => handleButtonClick('key_u')}>{isUpperCase ? 'U' : 'u'}</div>
            <div className="key" onClick={() => handleButtonClick('key_i')}>{isUpperCase ? 'I' : 'i'}</div>
            <div className="key" onClick={() => handleButtonClick('key_o')}>{isUpperCase ? 'O' : 'o'}</div>
            <div className="key" onClick={() => handleButtonClick('key_p')}>{isUpperCase ? 'P' : 'p'}</div>
            <div className="key" onClick={() => handleButtonClick('key_sq_bracket_left')}>{"["}</div>
            <div className="key" onClick={() => handleButtonClick('key_sq_bracket_right')}>{"]"}</div>
            <div className="key" onClick={() => handleButtonClick('key_slash')}>\</div>
        </div>
        <div className="row">
            <div className="key" onClick={handleToggleCase}>Caps Lock</div>
            <div className="key" onClick={() => handleButtonClick('key_a')}>{isUpperCase ? 'A' : 'a'}</div>
            <div className="key" onClick={() => handleButtonClick('key_s')}>{isUpperCase ? 'S' : 's'}</div>
            <div className="key" onClick={() => handleButtonClick('key_d')}>{isUpperCase ? 'D' : 'd'}</div>
            <div className="key" onClick={() => handleButtonClick('key_f')}>{isUpperCase ? 'F' : 'f'}</div>
            <div className="key" onClick={() => handleButtonClick('key_g')}>{isUpperCase ? 'G' : 'g'}</div>
            <div className="key" onClick={() => handleButtonClick('key_h')}>{isUpperCase ? 'H' : 'h'}</div>
            <div className="key" onClick={() => handleButtonClick('key_j')}>{isUpperCase ? 'J' : 'j'}</div>
            <div className="key" onClick={() => handleButtonClick('key_k')}>{isUpperCase ? 'K' : 'k'}</div>
            <div className="key" onClick={() => handleButtonClick('key_l')}>{isUpperCase ? 'L' : 'l'}</div>
            <div className="key" onClick={() => handleButtonClick('key_semicolon')}>;</div>
            <div className="key" onClick={() => handleButtonClick('key_uppercomma')}>'</div>
            <div className="key">Enter</div>
        </div>
        <div className="row">
            <div className="key shift">Shift</div>
            <div className="key" onClick={() => handleButtonClick('key_z')}>{isUpperCase ? 'Z' : 'z'}</div>
            <div className="key" onClick={() => handleButtonClick('key_x')}>{isUpperCase ? 'X' : 'x'}</div>
            <div className="key" onClick={() => handleButtonClick('key_c')}>{isUpperCase ? 'C' : 'c'}</div>
            <div className="key" onClick={() => handleButtonClick('key_v')}>{isUpperCase ? 'V' : 'v'}</div>
            <div className="key" onClick={() => handleButtonClick('key_b')}>{isUpperCase ? 'B' : 'b'}</div>
            <div className="key" onClick={() => handleButtonClick('key_n')}>{isUpperCase ? 'N' : 'n'}</div>
            <div className="key" onClick={() => handleButtonClick('key_m')}>{isUpperCase ? 'M' : 'm'}</div>
            <div className="key" onClick={() => handleButtonClick('key_comma')}>,</div>
            <div className="key" onClick={() => handleButtonClick('key_dot')}>.</div>
            <div className="key" onClick={() => handleButtonClick('key_revslash')}>/</div>
            <div className="key shift">Shift</div>
        </div>
        <div className="row">
            <div className="key ctrl">Ctrl</div>
            <div className="key">Win</div>
            <div className="key">Alt</div>
            <div className="key space" onClick={() => handleButtonClick('key_space')}>Пробел</div>
            <div className="key">Alt</div>
            <div className="key">Win</div>
            <div className="key ctrl">Ctrl</div>
        </div>
      </div>
    </>
  )
}

export default App
