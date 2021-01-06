
import request from 'request-promise';

export const detectVi = (word: string): boolean => {
   const vi = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ",
      "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ",
   ];

   for (let i = 0; i < vi.length; i++) {
      const sub = vi[i].substr(1);
      const rex = new RegExp('[' + sub + ']', 'g');
      if (rex.test(word))
         return true
   }
   return false;
}

export const translateViki = async (sen: string) => {
   let lang = detectVi(sen) ? "src=vi&tgt=en" : "src=en&tgt=vi";

   const url = "https://vikitranslator.com/divaba";
   const options: any = {
      method: "POST",
      uri: url,
      headers: {
         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: `key=testkey&${lang}&vb=${sen}`,
   };
   return new Promise((resolve, rejects) => {
      request(options).then((data) => {
         if (data) {
            resolve(data);
         } else {
            rejects("no result");
         }
      });
   }).catch((err) => {
      console.log(err);
   });
};

export const translateMicrosoft = async (sen: string) => {
   const vi = detectVi(sen);
   const lang = vi ? "from=vi&to=en" : "from=en&to=vi";
   const url = `http://api.microsofttranslator.com/V2/Ajax.svc/Translate?appId=ABB1C5A823DC3B7B1D5F4BDB886ED308B50D1919&${lang}&text=${sen}`;
   const finalUrl = encodeURI(url);
   return new Promise((resolve, reject) => {
      request(finalUrl).then((data) => {
         if (data) {
            console.log(data);
            resolve(data.replace(/"/g, ""));
         } else {
            reject("😃 no result");
         }
      });
   }).catch((err) => {
      console.log(err);
   });
};
