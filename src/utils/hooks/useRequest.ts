import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { usePrevious } from './usePrevious';
export const useRequest = <T>(action: any, select: any) => {
  const selectData = useSelector(select) as T;
  const previousValue = usePrevious(selectData);
  const dispatch = useDispatch();
  useEffect(() => {
    //setData(selectData);
    dispatch(action());
  }, []);

  const result = useMemo(() => {
    if (!isEmpty(selectData) && previousValue !== undefined) {
      return { data: selectData, loading: false };
    }

    return { data: undefined, loading: true };
  }, [selectData]);

  return result;
};
