import { useState, useRef, useEffect } from 'react'
import '../preprocessor/App.sass'

const App: React.FC = () =>  {

  const [inputText, setInputText] = useState<string>('');
  const [isUpperCase, setIsUpperCase] = useState<boolean>(false); // Флаг для отслеживания регистра
  const inputRef = useRef<HTMLInputElement>(null);


  const buttonTextMap: { [key: string]: string } = {
    key_q: 'q',
    key_w: 'w',
    key_e: 'e',
    key_space: ' ',
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
            <div className="key">F1</div>
            <div className="key">F2</div>
            <div className="key">F3</div>
            <div className="key">F4</div>
            <div className="key">F5</div>
            <div className="key">F6</div>
            <div className="key">F7</div>
            <div className="key">F8</div>
            <div className="key">F9</div>
            <div className="key">F10</div>
            <div className="key">F11</div>
            <div className="key">F12</div>
        </div>
        <div className="row">
            <div className="key">~</div>
            <div className="key" id="number_one">1</div>
            <div className="key" id="number_two">2</div>
            <div className="key" id="number_three">3</div>
            <div className="key" id="number_four">4</div>
            <div className="key" id="number_five">5</div>
            <div className="key" id="number_six">6</div>
            <div className="key" id="number_seven">7</div>
            <div className="key" id="number_eight">8</div>
            <div className="key" id="number_nine">9</div>
            <div className="key" id="number_zero">0</div>
            <div className="key">-</div>
            <div className="key">+</div>
            <div className="key" onClick={handleRemoveLastCharacter}>Backspace</div>
        </div>
        <div className="row">
            <div className="key" id="key_tab">Tab</div>
            <div className="key" onClick={() => handleButtonClick('key_q')}>{isUpperCase ? 'Q' : 'q'}</div>
            <div className="key" onClick={() => handleButtonClick('key_w')}>{isUpperCase ? 'W' : 'w'}</div>
            <div className="key" onClick={() => handleButtonClick('key_e')}>{isUpperCase ? 'E' : 'e'}</div>
            <div className="key" id="key_r">{isUpperCase ? 'R' : 'r'}</div>
            <div className="key" id="key_t">{isUpperCase ? 'T' : 't'}</div>
            <div className="key" id="key_y">{isUpperCase ? 'Y' : 'y'}</div>
            <div className="key" id="key_u">{isUpperCase ? 'U' : 'u'}</div>
            <div className="key" id="key_i">{isUpperCase ? 'I' : 'i'}</div>
            <div className="key" id="key_o">{isUpperCase ? 'O' : 'o'}</div>
            <div className="key" id="key_p">{isUpperCase ? 'P' : 'p'}</div>
            <div className="key" id="key_[">[</div>
            <div className="key" id="key_]">]</div>
            <div className="key" id="key_\">\</div>
        </div>
        <div className="row">
            <div className="key" onClick={handleToggleCase}>Caps Lock</div>
            <div className="key">{isUpperCase ? 'A' : 'a'}</div>
            <div className="key">{isUpperCase ? 'S' : 's'}</div>
            <div className="key">{isUpperCase ? 'D' : 'd'}</div>
            <div className="key">{isUpperCase ? 'F' : 'f'}</div>
            <div className="key">{isUpperCase ? 'G' : 'g'}</div>
            <div className="key">{isUpperCase ? 'H' : 'h'}</div>
            <div className="key">{isUpperCase ? 'J' : 'j'}</div>
            <div className="key">{isUpperCase ? 'K' : 'k'}</div>
            <div className="key">{isUpperCase ? 'L' : 'l'}</div>
            <div className="key">;</div>
            <div className="key">'</div>
            <div className="key">Enter</div>
        </div>
        <div className="row">
            <div className="key shift">Shift</div>
            <div className="key">{isUpperCase ? 'Z' : 'z'}</div>
            <div className="key">{isUpperCase ? 'X' : 'x'}</div>
            <div className="key">{isUpperCase ? 'C' : 'c'}</div>
            <div className="key">{isUpperCase ? 'V' : 'v'}</div>
            <div className="key">{isUpperCase ? 'B' : 'b'}</div>
            <div className="key">{isUpperCase ? 'N' : 'n'}</div>
            <div className="key">{isUpperCase ? 'M' : 'm'}</div>
            <div className="key">,</div>
            <div className="key">.</div>
            <div className="key">/</div>
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
