const axios = require('axios');

const getInfoRnc = async( rnc ) => {

      const url = 'https://www.dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx';

      const params = new URLSearchParams()
      params.append('__VIEWSTATE', '/wEPDwUKMTkxNDA2Nzc4Nw9kFgJmD2QWAgIBD2QWAgIDD2QWAmYPZBYCAgEPZBYEAgEPDxYIHgRUZXh0ZR4IQ3NzQ2xhc3MFBmxhYmVsIB4EXyFTQgICHgdWaXNpYmxlaGRkAgUPFgIeBXN0eWxlBQ5kaXNwbGF5OkJsb2NrOxYIAgEPFgIfBAUNZGlzcGxheTpOb25lO2QCAw8WAh8EBQ1kaXNwbGF5Ok5vbmU7ZAIFDzwrAA8CAA8WBB4LXyFEYXRhQm91bmRnHgtfIUl0ZW1Db3VudAIBZAoQFgRmAgECAwIEFgQ8KwAFAQAWAh4KSGVhZGVyVGV4dAULQ8OpZHVsYS9STkM8KwAFAQAWAh8HBRROb21icmUvUmF6w7NuIFNvY2lhbDwrAAUBABYCHwcFCkNhdGVnb3LDrWE8KwAFAQAWAh8HBRFSw6lnaW1lbiBkZSBwYWdvcxYEZmZmZhYCZg9kFhRmDw8WAh8DaGRkAgEPZBYCAgEPDxYCHwAFDTAwMS0xMTY3MTAxLTJkZAICD2QWAgIBDw8WAh8ABR1FRFVBUkRPIEFSVFVSTyBISUNJQU5PIEdBUkNJQWRkAgMPZBYCAgEPDxYCHwAFBiZuYnNwO2RkAgQPZBYCAgEPDxYCHwAFAiAgZGQCBQ9kFgICAQ8PFgIfAAUGTk9STUFMZGQCBg9kFgICAQ8PFgIfAAUGQUNUSVZPZGQCBw9kFgICAQ8PFgIfAAVbQUxRVUlMRVIgREUgRVFVSVBPIERFIFRSQU5TUE9SVEUgUEFSQSBWJiMyMDU7QSBURVJSRVNUUkUsIFNJTiBPUEVSQVJJT1MgTkkgVFJJUFVMQUNJJiMyMTE7TmRkAggPZBYCAgEPDxYCHwAFF0FETSBMT0NBTCBaT05BIE9SSUVOVEFMZGQCCQ8PFgIfA2hkZAIHDzwrAA0BAA8WAh8DaGRkGAIFH2N0bDAwJGNwaE1haW4kZ3ZCdXNjUmF6b25Tb2NpYWwPZ2QFI2N0bDAwJGNwaE1haW4kZHZEYXRvc0NvbnRyaWJ1eWVudGVzDxQrAAdkZGRkZBYAAgFkZMgwOiKl8WRRzUZx/tNfBxvkY1A=');
      params.append('ctl00$cphMain$txtRNCCedula', rnc )
      params.append('__EVENTVALIDATION', '/wEWBQLau+ruDgLqq//bBAKC/r/9AwKhwMi7BAKKnIvVCXeAWp4TEJUmJjijhY0F8tZOsbNT')
      params.append('__ASYNCPOST', 'false')
      params.append('ctl00$cphMain$btnBuscarPorRNC', 'Buscar');
      
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

    let resp = await axios.post(url, params, config);
    let data = await resp.data;

    let arrayValues = getArrayValuesOfHTML( data );

    if( !arrayValues ) {
        return null;
    }

    const keyFields = ["rnc", "name", "commercialName", "category", "paymentScheme", "status", "economicActivity", "local"];
    const infoRNC = generateObject( keyFields, arrayValues );
    
    return infoRNC;
    
}

const getArrayValuesOfHTML = ( HTMLdata ) => {

    // Get each last <td>{data}</td> element
    let matches =  HTMLdata.match(/<td>.*<\/td>/ig);

    if( matches ) {

       let arrayValues = matches.map( value => {

           let firstSearchTerm = "<td>";
           let secondSearchTerm = "</td>";
           let firstIndex = value.lastIndexOf(firstSearchTerm);
           value = value.substring( firstIndex + firstSearchTerm.length, value.length - secondSearchTerm.length );
    
           return decodeHTMLEntities( value );

        })
    
        return arrayValues;
    }

    return null;

}

const generateObject = ( props=[], values=[] )=> {
   if( props.length !== values.length ) {
       return null;
   }
   
   let object = {};
   props.forEach( (prop, i ) => {
       object[prop] = values[i].trim();
   });

   return object;
}

const decodeHTMLEntities = ( str ) => {

    return str.replace(/&#(\d+);/g, ( match, dec) => {
        return String.fromCharCode( dec )
    });
}


module.exports = {
    getInfoRnc
}