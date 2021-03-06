/*
    This class is a connector between cloudmersive-ocr-api to NodeJS app.
    source: https://api.cloudmersive.com/docs/ocr.asp
*/


const CloudmersiveOcrApiClient = require('cloudmersive-ocr-api-client');
const fs = require("fs");
const defaultClient = CloudmersiveOcrApiClient.ApiClient.instance;

const Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = '4bc9ddf6-b7f3-4928-9730-049e9bc9bf8b';

const apiInstance = new CloudmersiveOcrApiClient.ImageOcrApi();

export const getText = (img:string):Promise<{MeanConfidenceLevel:number, TextResult:string}>=>{
  return new Promise((resolve,reject)=>{
    const imageFile = Buffer.from(fs.readFileSync(img).buffer) // File | Image file to perform OCR on.  Common file formats such as PNG, JPEG are supported.

    const opts = { 
        'recognitionMode': "Advanced", // String | Optional; possible values are 'Basic' which provides basic recognition and is not resillient to page rotation, skew or low quality images uses 1-2 API calls; 'Normal' which provides highly fault tolerant OCR recognition uses 14-16 API calls; and 'Advanced' which provides the highest quality and most fault-tolerant recognition uses 28-30 API calls.  Default recognition mode is 'Advanced'
        'language': "ENG", // String | Optional, language of the input document, default is English (ENG).  Possible values are ENG (English), ARA (Arabic), ZHO (Chinese - Simplified), ZHO-HANT (Chinese - Traditional), ASM (Assamese), AFR (Afrikaans), AMH (Amharic), AZE (Azerbaijani), AZE-CYRL (Azerbaijani - Cyrillic), BEL (Belarusian), BEN (Bengali), BOD (Tibetan), BOS (Bosnian), BUL (Bulgarian), CAT (Catalan; Valencian), CEB (Cebuano), CES (Czech), CHR (Cherokee), CYM (Welsh), DAN (Danish), DEU (German), DZO (Dzongkha), ELL (Greek), ENM (Archaic/Middle English), EPO (Esperanto), EST (Estonian), EUS (Basque), FAS (Persian), FIN (Finnish), FRA (French), FRK (Frankish), FRM (Middle-French), GLE (Irish), GLG (Galician), GRC (Ancient Greek), HAT (Hatian), HEB (Hebrew), HIN (Hindi), HRV (Croatian), HUN (Hungarian), IKU (Inuktitut), IND (Indonesian), ISL (Icelandic), ITA (Italian), ITA-OLD (Old - Italian), JAV (Javanese), JPN (Japanese), KAN (Kannada), KAT (Georgian), KAT-OLD (Old-Georgian), KAZ (Kazakh), KHM (Central Khmer), KIR (Kirghiz), KOR (Korean), KUR (Kurdish), LAO (Lao), LAT (Latin), LAV (Latvian), LIT (Lithuanian), MAL (Malayalam), MAR (Marathi), MKD (Macedonian), MLT (Maltese), MSA (Malay), MYA (Burmese), NEP (Nepali), NLD (Dutch), NOR (Norwegian), ORI (Oriya), PAN (Panjabi), POL (Polish), POR (Portuguese), PUS (Pushto), RON (Romanian), RUS (Russian), SAN (Sanskrit), SIN (Sinhala), SLK (Slovak), SLV (Slovenian), SPA (Spanish), SPA-OLD (Old Spanish), SQI (Albanian), SRP (Serbian), SRP-LAT (Latin Serbian), SWA (Swahili), SWE (Swedish), SYR (Syriac), TAM (Tamil), TEL (Telugu), TGK (Tajik), TGL (Tagalog), THA (Thai), TIR (Tigrinya), TUR (Turkish), UIG (Uighur), UKR (Ukrainian), URD (Urdu), UZB (Uzbek), UZB-CYR (Cyrillic Uzbek), VIE (Vietnamese), YID (Yiddish)
        'preprocessing': "Auto" // String | Optional, preprocessing mode, default is 'Auto'.  Possible values are None (no preprocessing of the image), and Auto (automatic image enhancement of the image before OCR is applied; this is recommended).
    };
    
    const callback = (error:string, data:{MeanConfidenceLevel:number,TextResult:string}, response:string)=>{
        if(error)
            reject(error);
        resolve(data);
    };
    apiInstance.imageOcrPost(imageFile, opts, callback);
})}