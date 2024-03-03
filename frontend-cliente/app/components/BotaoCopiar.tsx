import React, { useRef, useEffect } from 'react';
import Clipboard from 'clipboard';
import { FaRegCopy } from "react-icons/fa";

type CopyButtonProps = {
  textToCopy: string;
}

export default function BotaoCopiar({ textToCopy }:CopyButtonProps){
  const buttonRef = useRef<HTMLButtonElement>(null);
  let clipboard: Clipboard | null = null;

  useEffect(() => {
    if (buttonRef.current) {
      clipboard = new Clipboard(buttonRef.current, {
        text: () => textToCopy
      });

      clipboard.on('success', () => {
        alert('PIX copiado!');
      });

      clipboard.on('error', () => {
        alert('Erro ao copiar o texto!');
      });
    }

    return () => {
      if (clipboard) {
        clipboard.destroy();
      }
    };
  }, [textToCopy]);

  return (
    <button className='flex' ref={buttonRef}>
        <FaRegCopy size={28}/>
    </button>
  );
}