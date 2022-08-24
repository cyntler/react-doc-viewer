/* eslint-disable consistent-return */
import React from "react";
import styled from "styled-components";
import { areEqual, FixedSizeList } from "react-window";
import { RenderContext } from "../state";
import { setDocumentCurrentPage } from "../state/actions/render.actions";
import { createEvent, emitEvent } from "../utils/events";
import makeScrollListener from "../utils/makeScrollListener";
import getVisibleIndexRangeByParent from "../utils/getVisibleIndexRangeByParent";

const Container = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  max-width: 340px;
  height: 100%;

  .navigator-list {
    // scroll bar
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #888;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }

  .page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &[data-active="true"] {
      background: rgba(0, 0, 0, 0.3);
    }

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }

    .page-image {
      max-width: 150px;

      img {
        width: 100%;
      }

      .not-loaded {
        width: 150px;
        min-height: 200px;
        height: 100%;
        background: #fff;
      }
    }

    .page-caption {
      margin-top: 8px;
      text-align: center;
      color: #fff;
    }
  }
`;

interface IPage {
  id: number;
  image: string;
  caption: string;
  loaded: boolean;
}

function DocumentPagesNav() {
  const { state, dispatch } = React.useContext(RenderContext);
  const [pages, setPages] = React.useState<IPage[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<any>(null);
  const [listHeight, setListHeight] = React.useState(0);
  const paginated = state.pagesCount > 1 && state.paginated;

  React.useEffect(() => {
    let pages: IPage[] = [];

    const clearLoadListener = createEvent(
      "onPaginationDocumentLoaded",
      (payload: any) => {
        pages = payload.map((item: any) => ({
          id: item.index + 1,
          loaded: item.loaded,
          image: item.imageURL,
          caption: `${item.name || "Page"} ${item.index + 1}`,
        }));

        setPages(pages);
      }
    );
    const clearPageLoadListener = createEvent(
      "onPaginationDocumentPagesLoaded",
      (loadedPages: any[]) => {
        // I've pictures of the requested pages.
        pages = pages.map((page) => {
          const loadedPage = loadedPages.find(
            (item) => item.index + 1 === page.id
          );
          if (loadedPage) {
            return {
              ...page,
              loaded: true,
              image: loadedPage.imageURL,
            };
          }

          return page;
        });
        setPages(pages);
      }
    );

    return () => {
      clearPageLoadListener();
      clearLoadListener();
    };
  }, []);

  React.useEffect(() => {
    if (!listRef.current) return;
    const element =
      listRef.current._outerRef || document.querySelector(".navigator-list");
    if (!element) return;

    const clearScrollListener = makeScrollListener(
      element,
      () => {},
      () => {
        const visiblePageRange = getVisibleIndexRangeByParent(element, {
          width: 280,
          height: 280,
        });

        emitEvent("onPageRequestRange", visiblePageRange);
      },
      300
    );

    return () => {
      clearScrollListener();
    };
  }, [listRef.current]);

  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(state.currentPage - 1);
    }
  }, [state.currentPage]);

  React.useEffect(() => {
    if (!containerRef.current) return;

    setListHeight(containerRef.current.clientHeight);

    window.addEventListener("resize", () => {
      setListHeight(containerRef.current?.clientHeight || 0);
    });
  }, [containerRef.current]);

  // eslint-disable-next-line react/no-unstable-nested-components
  const Row = React.memo(({ index, style }: any) => {
    const page = pages[index];
    const active = page.id === state.currentPage;

    const onPageClick = () => {
      if (state.currentPage === page.id) return;
      if (listRef.current?.scrollToItem) {
        listRef.current.scrollToItem(page.id - 1);
      }
      dispatch(setDocumentCurrentPage(page.id));
    };

    return (
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        className="page"
        data-active={active}
        style={style}
        onClick={onPageClick}
      >
        <div className="page-image">
          {page.loaded ? (
            <img src={page.image} alt={page.caption} />
          ) : (
            <div className="not-loaded" />
          )}
        </div>
        <div className="page-caption">{page.caption}</div>
      </div>
    );
  }, areEqual);

  return paginated ? (
    <Container id="document-pages-nav" ref={containerRef}>
      <FixedSizeList
        className="navigator-list"
        ref={listRef}
        width={230}
        height={listHeight}
        itemCount={pages.length}
        itemData={pages}
        itemSize={280}
      >
        {Row}
      </FixedSizeList>
    </Container>
  ) : (
    <></>
  );
}

export default DocumentPagesNav;
