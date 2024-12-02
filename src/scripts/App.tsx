import { useState } from 'react'
import '../preprocessor/App.sass'
import winImageLeft from '../assets/free-icon-globe-558593.png'; 
import winImageRight from '../assets/free-icon-text-3721901.png'; 
import EnterImage from '../assets/icons8-enter-key-50.png'; 
import BackSpaceImage from '../assets/free-icon-backspace-7465583.png'; 


const App: React.FC = () =>  {

  const [clickedButtons, setClickedButtons] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>('');

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
    // добавьте другие кнопки и их тексты по необходимости
  };

  // Функция для обработки нажатия кнопки
  const handleButtonClick = (id: string) => {
    setClickedButtons((prev) => [...prev, id]);
    setInputText((prevText) => prevText + buttonTextMap[id]);
  };

  const handleRemoveLastCharacter = () => {
    setInputText((prevText) => prevText.slice(0, -1)); // Удаляем последний символ
  };

  return (
    <>
      <div className="inputLine">
        <input className="inputLine_text" type="text" value={inputText}></input>
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
            <div className="key">
              <img src={BackSpaceImage} alt="Win" onClick={handleRemoveLastCharacter} style={{ width: '20px', height: '20px' }} />
            </div>   
        </div>
        <div className="row">
            <div className="key" id="key_tab">Tab</div>
            <div className="key" onClick={() => handleButtonClick('key_q')}>Q</div>
            <div className="key" onClick={() => handleButtonClick('key_w')}>W</div>
            <div className="key" onClick={() => handleButtonClick('key_e')}>E</div>
            <div className="key" onClick={() => handleButtonClick('key_r')}>R</div>
            <div className="key" onClick={() => handleButtonClick('key_t')}>T</div>
            <div className="key" onClick={() => handleButtonClick('key_y')}>Y</div>
            <div className="key" onClick={() => handleButtonClick('key_u')}>U</div>
            <div className="key" onClick={() => handleButtonClick('key_i')}>I</div>
            <div className="key" onClick={() => handleButtonClick('key_o')}>O</div>
            <div className="key" onClick={() => handleButtonClick('key_p')}>P</div>
            <div className="key" onClick={() => handleButtonClick('key_[')}>[</div>
            <div className="key" onClick={() => handleButtonClick('key_]')}>]</div>
            <div className="key" id="key_\">\</div>
        </div>
        <div className="row">
            <div className="key">Caps Lock</div>
            <div className="key" onClick={() => handleButtonClick('key_a')}>A</div>
            <div className="key" onClick={() => handleButtonClick('key_s')}>S</div>
            <div className="key" onClick={() => handleButtonClick('key_d')}>D</div>
            <div className="key" onClick={() => handleButtonClick('key_f')}>F</div>
            <div className="key" onClick={() => handleButtonClick('key_g')}>G</div>
            <div className="key" onClick={() => handleButtonClick('key_h')}>H</div>
            <div className="key" onClick={() => handleButtonClick('key_j')}>J</div>
            <div className="key" onClick={() => handleButtonClick('key_k')}>K</div>
            <div className="key" onClick={() => handleButtonClick('key_l')}>L</div>
            <div className="key" onClick={() => handleButtonClick('key_;')}>;</div>
            <div className="key" onClick={() => handleButtonClick('key_')}>'</div>
            <div className="key">
              <img src={EnterImage} alt="Win" style={{ width: '20px', height: '20px' }} />
            </div>    
          </div>
        <div className="row">
            <div className="key shift">Shift</div>
            <div className="key" onClick={() => handleButtonClick('key_z')}>Z</div>
            <div className="key" onClick={() => handleButtonClick('key_x')}>X</div>
            <div className="key" onClick={() => handleButtonClick('key_c')}>C</div>
            <div className="key" onClick={() => handleButtonClick('key_v')}>V</div>
            <div className="key" onClick={() => handleButtonClick('key_b')}>B</div>
            <div className="key" onClick={() => handleButtonClick('key_n')}>N</div>
            <div className="key" onClick={() => handleButtonClick('key_m')}>M</div>
            <div className="key" onClick={() => handleButtonClick('key_,')}>,</div>
            <div className="key" onClick={() => handleButtonClick('key_.')}>.</div>
            <div className="key" onClick={() => handleButtonClick('key_e')}>/</div>
            <div className="key shift">Shift</div>
        </div>
        <div className="row">
            <div className="key ctrl">Ctrl</div>
            <div className="key">
              <img src={winImageLeft} alt="Win" style={{ width: '20px', height: '20px' }} />
            </div>
            <div className="key">Alt</div>
            <div className="key space">Пробел</div>
            <div className="key">Alt</div>
            <div className="key">
              <img src={winImageRight} alt="Win" style={{ width: '20px', height: '20px' }} />
            </div>
            <div className="key ctrl">Ctrl</div>
        </div>
      </div>
    </>
  )
}

export default App
