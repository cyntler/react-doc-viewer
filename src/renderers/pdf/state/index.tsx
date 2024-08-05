import React, {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useEffect,
  useReducer,
} from "react";
import { IMainState } from "../../../store/mainStateReducer";
import { PDFActions, SET_CURRENT_MAIN_STATE } from "./actions";
import {
  initialPDFState,
  IPDFState,
  PDFStateReducer,
  reducer,
} from "./reducer";

const PDFContext = createContext<{
  state: IPDFState;
  dispatch: Dispatch<PDFActions>;
}>({ state: initialPDFState, dispatch: () => null });

const PDFProvider: FC<PropsWithChildren<{ mainState: IMainState }>> = ({
  children,
  mainState,
}) => {
  const [state, dispatch] = useReducer<PDFStateReducer>(reducer, {
    ...initialPDFState,
    defaultZoomLevel:
      mainState.config?.pdfZoom?.defaultZoom ??
      initialPDFState.defaultZoomLevel,
    zoomLevel:
      mainState.config?.pdfZoom?.defaultZoom ?? initialPDFState.zoomLevel,
    zoomJump: mainState.config?.pdfZoom?.zoomJump ?? initialPDFState.zoomJump,
    paginated: mainState.config?.pdfVerticalScrollByDefault
      ? false
      : initialPDFState.paginated,
    mainState,
  });

  useEffect(() => {
    dispatch({
      type: SET_CURRENT_MAIN_STATE,
      value: mainState,
    });
  }, [mainState]);

  return (
    <PDFContext.Provider value={{ state, dispatch }}>
      {children}
    </PDFContext.Provider>
  );
};

export { PDFContext, PDFProvider };
