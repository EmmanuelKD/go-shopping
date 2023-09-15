import { useCallback, useState } from "react";

export function useDrawer() {
  const [state, setState] = useState<{ open: boolean; data?: any }>({
    open: false,
    data: undefined,
  });

  const handleOpen = useCallback((data?: any) => {
    setState({
      open: true,
      data,
    });
  }, []);

  const handleClose = useCallback(() => {
    setState({
      open: false,
    });
  }, []);

  return {
    data: state.data,
    handleClose,
    handleOpen,
    open: state.open,
  };
}
