import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { getMe, setSortData, sortFieldType } from '../../store/app-reduser/app-reducer';
import s from './SortButton.module.css';

type SortCardButtonPropsType = {
    name: sortFieldType
}

export const SortCardButton = React.memo(({ name }: SortCardButtonPropsType) => {
    const dispatch = useDispatch();

    const sortUp = useCallback(() => {
        dispatch(setSortData({ sort_field: name, sort_direction: 'asc' }));
        dispatch(getMe());
    }, []);
    const sortDown = useCallback(() => {
        dispatch(setSortData({ sort_field: name, sort_direction: 'desc' }));
        dispatch(getMe());
    }, []);

    return (
        <div className={s.tableSortIcons}>
            <ArrowUpwardIcon color={'primary'} onClick={sortDown}/>
            <ArrowDownwardIcon color={'primary'} onClick={sortUp}/>
        </div>
    );
});
