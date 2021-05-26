import { Dispatch } from 'redux';
import { addTaskDataType, API, AuthAPI, getTaskDataType, loginDataType, newTaskType } from '../../api/instance';
import { AppRootStateType } from '../store';

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as string | null,
    tasks: [] as Array<taskType>,
    totalTaskCount: 0,
    getMeData: {
        page: 1,
        sort_field: '' as sortFieldType,
        sort_direction: '' as 'asc' | 'desc',
    },
    token: '',
};

export const appReducer = (state: AppInitialStateType = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return { ...state, status: action.status };
        case 'APP/SET_ERROR':
            return { ...state, error: action.error };
        case 'APP/SET_TASKS':
            return { ...state, tasks: action.tasks };
        case 'APP/SET_TOTAL_CARDS_COUNT':
            return { ...state, totalTaskCount: action.totalTaskCount };
        case 'APP/SET_CURRENT_PAGE':
            return { ...state, getMeData: { ...state.getMeData, page: action.currentPage } };
        case 'APP/SET_SORT_DATA':
            return { ...state, getMeData: { ...state.getMeData, ...action.data } };
        case 'APP/SET_TOKEN':
            return { ...state, token: action.token };
        case 'APP/SET_ERROR_RESPONSE':
            return { ...state, status: action.status, error: action.error };
        default:
            return state;
    }
};

export const setAppStatus = (status: RequestStatusType) =>
    ({ type: 'APP/SET_STATUS', status } as const);
export const setAppError = (error: string | null) =>
    ({ type: 'APP/SET_ERROR', error } as const);
export const setTasks = (tasks: Array<taskType>) =>
    ({ type: 'APP/SET_TASKS', tasks } as const);
export const setTotalCardsCount = (totalTaskCount: number) =>
    ({ type: 'APP/SET_TOTAL_CARDS_COUNT', totalTaskCount } as const);
export const setCurrentPage = (currentPage: number) =>
    ({ type: 'APP/SET_CURRENT_PAGE', currentPage } as const);
export const setSortData = (data: { sort_field: sortFieldType, sort_direction: 'asc' | 'desc' }) =>
    ({ type: 'APP/SET_SORT_DATA', data } as const);
export const setToken = (token: string) =>
    ({ type: 'APP/SET_TOKEN', token } as const);
export const setErrorResponse = (error: string, status: RequestStatusType) =>
    ({ type: 'APP/SET_ERROR_RESPONSE', error, status } as const);

export const getMe = () => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    try {
        dispatch(setAppStatus('loading'));
        const params = getState().app.getMeData;
        const res = <getTaskDataType>await API.getTask(params);
        if (res.status === 'ok') {
            dispatch(setTasks(res.message.tasks));
            dispatch(setTotalCardsCount(Number(res.message.total_task_count)));
        } else {
            dispatch(setAppError(res.message));
        }
        dispatch(setAppStatus('succeeded'));
    } catch (e) {
        dispatch(setErrorResponse('Error from getMe response', 'succeeded'));
        throw new Error('Error from getMe response');
    }
};
export const addTask = (newTask: newTaskType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = <addTaskDataType>await API.addTask(newTask);
        if (res.status === 'error') {
            dispatch(setAppError(JSON.stringify(res.message)));
        }
        dispatch(setAppStatus('succeeded'));
    } catch (e) {
        dispatch(setErrorResponse('Error from addTask response', 'succeeded'));
        throw new Error('Error from addTask response');
    }
};
export const login = (username: string, password: string) => async (dispatch: Dispatch) => {
    try {
        const res = <loginDataType>await AuthAPI.login(username, password);
        if (res.status === 'ok') {
            dispatch(setToken(res.message.token));
        } else {
            dispatch(setAppError(JSON.stringify(res.message)));
        }
        dispatch(setAppStatus('succeeded'));
    } catch (e) {
        dispatch(setErrorResponse('Error from login response', 'succeeded'));
        throw new Error('Error from login response');
    }
};
export const updateTask = (id: number, text: string, status: string) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    try {
        dispatch(setAppStatus('loading'));
        const token = getState().app.token;
        const res = <addTaskDataType>await API.updateTask(token, id, text, status);
        if (res.status === 'error') {
            dispatch(setAppError(JSON.stringify(res.message)));
        }
        dispatch(setAppStatus('succeeded'));
    } catch (e) {
        dispatch(setErrorResponse('Error from updateTask response', 'succeeded'));
        throw new Error('Error from updateTask response');
    }
};

export type RequestStatusType = 'succeeded' | 'loading'

export type AppInitialStateType = typeof initialState

type ActionsType =
    ReturnType<typeof setAppStatus> |
    ReturnType<typeof setAppError> |
    ReturnType<typeof setTasks> |
    ReturnType<typeof setTotalCardsCount> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setSortData> |
    ReturnType<typeof setToken> |
    ReturnType<typeof setErrorResponse>

export type getMeDataType = {
    page: number
    sort_field: sortFieldType,
    sort_direction: 'asc' | 'desc'
}
export type taskType = {
    id: number,
    username: string,
    email: string,
    text: string,
    status: taskStatusType
}
export type taskStatusType = 0 | 1 | 10 | 11 |
    'задача не выполнена' |
    'задача не выполнена, отредактирована админом' |
    'задача выполнена' |
    'задача отредактирована админом и выполнена' |
    'отсутствуют сведения о задаче'

export type sortFieldType = 'id' | 'username' | 'email' | 'status'


