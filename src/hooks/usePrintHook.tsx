import React, { useCallback, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

interface PrintHookProps {
  componentRef: any;
  docTitle: string;
}

/**
 * Print selected component based on ref.
 * @param {ref} componentRef - Reference of component to print.
 * @param {string} docTitle - title of the pdf document which will be downloaded.
 * @returns [
 * 	isPrinting - state for checking printing state,
 * 	{void} handlePrint - click event to trigger printing of a selected component
 * ]
 */

const usePrintHook = ({
  componentRef,
  docTitle,
}: PrintHookProps): [boolean, () => void] => {
  const onBeforeGetContentResolve = useRef<any>(null);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  // const [openAccordianOnPrint, setOpenAccordianOnPrint] = useState<
  //   number[] | undefined
  // >([]);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handleOnBeforeGetContent = useCallback(() => {
    // setOpenAccordianOnPrint(defaultValue);
    setIsPrinting(true);

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }, [setIsPrinting]);

  const handleBeforePrint = () => setIsPrinting(false);

  // const handleAfterPrint = () => setOpenAccordianOnPrint([]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: docTitle,
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    // onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
  });

  return [isPrinting, handlePrint];
};

export default usePrintHook;
