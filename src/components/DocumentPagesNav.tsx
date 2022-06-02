import React from 'react';
import styled from "styled-components";
import { areEqual, FixedSizeList } from "react-window";
import { RenderContext } from '../state';
import { setDocumentCurrentPage } from '../state/actions/render.actions';
import { createEvent } from '../utils/events';

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
        
        &:hover { 
            background: rgba(0, 0, 0, .3);
        }
        
        .page-image {
            max-width: 150px;
            img { 
                width: 100%;

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
}

function DocumentPagesNav() {
    const { state, dispatch } = React.useContext(RenderContext);
    const [pages, setPages] = React.useState<IPage[]>([]);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<FixedSizeList>(null);
    const [listHeight, setListHeight] = React.useState(0);

    React.useEffect(() => {
        createEvent("onPaginationDocumentLoaded", (payload: any) => {
            setPages(payload.map((item: any) => {
                return {
                    id: item.index + 1,
                    image: item.imageURL,
                    caption: `Page ${item.index + 1}`
                }
            }));
        });
    }, []);

    React.useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollToItem(state.currentPage - 1);
        }
    }, [state.currentPage]);

    React.useEffect(() => {
        if (!containerRef.current) return;

        setListHeight(containerRef.current.clientHeight);

        window.addEventListener('resize', () => {
            setListHeight(containerRef.current?.clientHeight || 0);
        });
    }, [containerRef.current]);

    const Row = ({ index, style }: any) => {
        const page = pages[index];

        const onPageClick = () => {
            if (state.currentPage === page.id) return;
            if (listRef.current?.scrollToItem) {
                listRef.current.scrollToItem(page.id - 1);
            }
            dispatch(setDocumentCurrentPage(page.id));
        };

        return (
            <div className="page" style={style} onClick={onPageClick}>
                <div className="page-image">
                    <img src={page.image} alt={page.caption} />
                </div>
                <div className="page-caption">{page.caption}</div>
            </div>
        );
    };

    const paginated = state.pagesCount > 1 && state.paginated;

    return paginated ? (
        <Container id="document-pages-nav" ref={containerRef}>
            <FixedSizeList className="navigator-list" ref={listRef} width={230} height={listHeight} itemCount={pages.length} itemData={pages} itemSize={300}>
                {Row}
            </FixedSizeList>
        </Container>
    ) : <></>;
}

export default DocumentPagesNav;