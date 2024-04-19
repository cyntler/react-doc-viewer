import React, {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { DocViewerContext } from "../store/DocViewerProvider";

export const LoadingTimeout: FC<PropsWithChildren> = ({ children }) => {
  const { state } = useContext(DocViewerContext);
  const { config } = state;
  const [shouldLoadingRender, setShouldLoadingRender] = useState(
    config?.loadingRenderer?.showLoadingTimeout === false,
  );

  useEffect(() => {
    const timeoutRef = setTimeout(
      () => {
        setShouldLoadingRender(true);
      },
      typeof config?.loadingRenderer?.showLoadingTimeout === "number"
        ? config.loadingRenderer.showLoadingTimeout
        : 500,
    );

    return () => clearTimeout(timeoutRef)
  }, [config?.loadingRenderer?.showLoadingTimeout]);

  if (!shouldLoadingRender) {
    return null;
  }

  return <>{children}</>;
};
