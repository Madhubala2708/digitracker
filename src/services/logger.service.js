import Config from "../config";

export default {
    showLog: (data) => {
      if (Config.log) { 
        if (typeof (data) === 'string') {
          console.log(data);
        } else {
          console.log(...data);
        }
      }
    }
};