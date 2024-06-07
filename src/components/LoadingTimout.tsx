"use client";

import { FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { DocViewerContext } from "../store/DocViewerProvider";

export const LoadingTimeout: FC<PropsWithChildren> = ({ children }) => {
  const { state } = useContext(DocViewerContext);
  const { config } = state;
  const [shouldLoadingRender, setShouldLoadingRender] = useState(
    config?.loadingRenderer?.showLoadingTimeout === false,
  );

  useEffect(() => {
    setTimeout(
      () => {
        setShouldLoadingRender(true);
      },
      typeof config?.loadingRenderer?.showLoadingTimeout === "number"
        ? config.loadingRenderer.showLoadingTimeout
        : 500,
    );
  }, [config?.loadingRenderer?.showLoadingTimeout]);

  if (!shouldLoadingRender) {
    return null;
  }

  return <>{children}</>;
};
