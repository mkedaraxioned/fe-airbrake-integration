import { useEffect } from 'react';
import useExitPrompt from './useExitPrompt';

export default function preventRefresh() {
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(true);

  useEffect(() => {
    setShowExitPrompt(!showExitPrompt);
  }, []);
}
