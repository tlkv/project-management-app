import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import { CONFIRM_MODAL_CLOSE, CONFIRM_MODAL_INIT } from '../data/constants';

export default function useConfirm() {
  const { confirm, dispatchConfirm } = useContext(AppContext);
  const [cleanup, setCleanup] = useState(false);

  const isConfirmed = (question = 'Are you sure?') => {
    setCleanup(true);

    const promise = new Promise((resolve, reject) => {
      dispatchConfirm({
        type: CONFIRM_MODAL_INIT,
        payload: {
          question,
          isOpen: true,
          proceed: resolve,
          cancel: reject,
        },
      });
    });

    return promise.then(
      () => {
        dispatchConfirm({
          type: CONFIRM_MODAL_CLOSE,
          payload: {
            isOpen: false,
          },
        });
        return true;
      },
      () => {
        dispatchConfirm({
          type: CONFIRM_MODAL_CLOSE,
          payload: {
            isOpen: false,
          },
        });
        return false;
      }
    );
  };

  useEffect(() => {
    return () => {
      if (confirm.cancel && cleanup) {
        confirm.cancel();
      }
    };
  }, [confirm, cleanup]);

  return {
    ...confirm,
    isConfirmed,
  };
}
