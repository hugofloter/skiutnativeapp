import React, {useEffect} from 'react';
import { showMessage } from "react-native-flash-message";


export const handleMessage = (current, error, reset, errorMessage, successMessage, extraHook = null) => {
  useEffect(() => {
    if (current || error) {
      if (error) {
        showMessage({
           message: errorMessage,
           type: "fail",
        });
      } else {
        showMessage({
           message: successMessage,
           type: "success",
        });
        if (extraHook) {
            extraHook()
        }
      }
      reset()
    }
  }, [current, error])
};
