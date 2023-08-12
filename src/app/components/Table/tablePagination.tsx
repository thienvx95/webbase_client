import React from 'react';
import { useTranslation } from 'react-i18next';

interface ITablePagination {
  actionRef: any;
  page: number;
  type: string;
  element: React.ReactNode;
}

export const TablePagination = ({
  actionRef,
  page,
  type,
  element,
}: ITablePagination) => {
  const { t } = useTranslation();
  if (type === 'prev') {
    return <span>1</span>;
  }
  if (type === 'next') {
    return <span>2</span>;
  }
  if (type === 'prev') {
    return <></>;
  }
  return <></>;
  //   return (
  //     <>
  //       <Tooltip key="previous" title={<FormattedMessage id="table.previous" />}>
  //         <Button
  //           className={styles.marginRight}
  //           shape="circle"
  //           onClick={() => onClickPaging('previous', actionRef)}
  //           disabled={isEmpty(previous)}
  //         >
  //           <LeftOutlined />
  //         </Button>
  //       </Tooltip>
  //       <Tooltip key="next" title={<FormattedMessage id="table.next" />} >
  //         <Button
  //           shape="circle"
  //           onClick={() => onClickPaging('next', actionRef)}
  //           disabled={isEmpty(next)}
  //         >
  //           <RightOutlined />
  //         </Button>
  //       </Tooltip>
  //     </>
  //   );
};
