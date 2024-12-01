import { useState } from 'react'
import '../preprocessor/App.sass'

const App: React.FC = () =>  {

  const [clickedButtons, setClickedButtons] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const buttonTextMap: { [key: string]: string } = {
    key_q: 'q',
    key_w: 'w',
    key_e: 'e',
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
            <div className="key" onClick={() => handleButtonClick('key_q')}>Q</div>
            <div className="key" onClick={() => handleButtonClick('key_w')}>W</div>
            <div className="key" onClick={() => handleButtonClick('key_e')}>E</div>
            <div className="key" id="key_r">R</div>
            <div className="key" id="key_t">T</div>
            <div className="key" id="key_y">Y</div>
            <div className="key" id="key_u">U</div>
            <div className="key" id="key_i">I</div>
            <div className="key" id="key_o">O</div>
            <div className="key" id="key_p">P</div>
            <div className="key" id="key_[">[</div>
            <div className="key" id="key_]">]</div>
            <div className="key" id="key_\">\</div>
        </div>
        <div className="row">
            <div className="key">Caps Lock</div>
            <div className="key">A</div>
            <div className="key">S</div>
            <div className="key">D</div>
            <div className="key">F</div>
            <div className="key">G</div>
            <div className="key">H</div>
            <div className="key">J</div>
            <div className="key">K</div>
            <div className="key">L</div>
            <div className="key">;</div>
            <div className="key">'</div>
            <div className="key">Enter</div>
        </div>
        <div className="row">
            <div className="key shift">Shift</div>
            <div className="key">Z</div>
            <div className="key">X</div>
            <div className="key">C</div>
            <div className="key">V</div>
            <div className="key">B</div>
            <div className="key">N</div>
            <div className="key">M</div>
            <div className="key">,</div>
            <div className="key">.</div>
            <div className="key">/</div>
            <div className="key shift">Shift</div>
        </div>
        <div className="row">
            <div className="key ctrl">Ctrl</div>
            <div className="key">Win</div>
            <div className="key">Alt</div>
            <div className="key space">Пробел</div>
            <div className="key">Alt</div>
            <div className="key">Win</div>
            <div className="key ctrl">Ctrl</div>
        </div>
      </div>
    </>
  )
}

export default App
