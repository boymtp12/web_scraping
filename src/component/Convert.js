import { KEY_API_TRANS } from './base/base';

import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Convert = ({ text, language, source }) => {
  const [convertedText, setConvertedText] = useState('');
  const [convertedText2, setConvertedText2] = useState('');

  useEffect(() => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", text);
    encodedParams.append("target", language);
    encodedParams.append("source", source);

    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': KEY_API_TRANS,
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      data: encodedParams
    };



    axios.request(options).then(function (response) {
      setConvertedText(response.data.data.translations[0].translatedText)
    }).catch(function (error) {
      console.error(error);
    });


    const encodedParams2 = new URLSearchParams();
    encodedParams2.append("q", convertedText);
    encodedParams2.append("target", source);
    encodedParams2.append("source", language);

    const options2 = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': KEY_API_TRANS,
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      data: encodedParams2
    };

    axios.request(options2).then(function (response) {
      setConvertedText2(response.data.data.translations[0].translatedText)
    }).catch(function (error) {
      console.error(error);
    });
  }, [text, language, source]);

  return <div>{convertedText2}</div>;
};

export default Convert;
