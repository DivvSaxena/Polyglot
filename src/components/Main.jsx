import React from 'react';
import frenchflag from '../assets/fr-flag.png';
import japanflag from '../assets/jpn-flag.png';
import spainflag from '../assets/sp-flag.png';
import Groq from 'groq-sdk';

// Use import.meta.env for Vite
const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });

const Main = () => {
  const [state, setState] = React.useState(true);
  const [text, setText] = React.useState('');
  const [radio, setRadio] = React.useState('');
  const [data, setData] = React.useState('');

  async function fetchReport() {
    const messages = [
      {
        role: 'system',
        content: `you are a polyglot that converts given text by the user in English and responds back the same text in ${radio} language. You don't have to greet them or respond back differently just convert the same text in the required language mentioned by the user.`,
      },
      {
        role: 'system',
        content: `${text}`,
      },
    ];

    try {
      const response = await groq.chat.completions.create({
        model: 'llama3-8b-8192',
        messages: messages,
      });

      renderReport(response.choices[0].message.content);
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  function renderReport(output) {
    console.log(output);
    setData(output);
  }

  function handleClick() {
    if (text && radio) {
      fetchReport();
      setState(!state);
    }
  }

  function StartOver() {
    setState(!state);
    setText('');
    setRadio('');
    setData('');
  }

  function input(e) {
    setText(e.target.value);
  }

  function handleRadio(e) {
    setRadio(e.target.value);
  }

  const intial = (
    <>
      <h3>Select language 👇</h3>
      <div className="radio-inputs">
        <label>
          <input type="radio" name="option" value="french" onChange={handleRadio} />
          French <img src={frenchflag} alt="french flag" className="flag" />
        </label>
        <label>
          <input type="radio" name="option" value="spanish" onChange={handleRadio} />
          Spanish <img src={spainflag} alt="spain flag" className="flag" />
        </label>
        <label>
          <input type="radio" name="option" value="japanese" onChange={handleRadio} />
          Japanese <img src={japanflag} alt="japan flag" className="flag" />
        </label>
      </div>
      <button onClick={handleClick}>Translate</button>
    </>
  );

  const final = (
    <>
      <h3>Select language 👇</h3>
      <div className="output">{data}</div>
      <button onClick={StartOver}>Start Over</button>
    </>
  );

  return (
    <div className="main">
      <h3>Text to translate 👇</h3>
      <textarea
        name="text"
        id="text"
        value={text}
        placeholder="How are you?"
        onChange={input}
      ></textarea>
      {state ? intial : final}
    </div>
  );
};

export default Main;
