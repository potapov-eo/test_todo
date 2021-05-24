import { Dispatch } from "redux";
import { addTaskDataType, API, getTaskDataType, newTaskType } from "../../api/instance";
import { AxiosResponse } from "axios";
import { AppRootStateType } from "../store";

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as string | null,
    tasks: [] as Array<taskType>,
    totalTaskCount: 0,
    getMeData: {
        page: 1,
        sort_field: "" as sortFieldType,
        sort_direction: "" as "asc" | "desc"
    }
}

export const appReducer = (state: AppInitialStateType = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return { ...state, status: action.status }
        case 'APP/SET_ERROR':
            return { ...state, error: action.error }
        case 'APP/SET_TASKS':
            return { ...state, tasks: action.tasks }
        case 'APP/SET_TOTAL_CARDS_COUNT':
            return { ...state, totalTaskCount: action.totalTaskCount }
        case 'APP/SET_CURRENT_PAGE':
            return { ...state, getMeData: { ...state.getMeData, page: action.currentPage } }
        case 'APP/SET_SORT_DATA':
            return { ...state, getMeData: { ...state.getMeData, ...action.data } }
        default:
            return state
    }
}

export const setAppStatus = (status: RequestStatusType) =>
    ({ type: 'APP/SET_STATUS', status } as const)
export const setAppError = (error: string | null) =>
    ({ type: 'APP/SET_ERROR', error } as const)
export const setTasks = (tasks: Array<taskType>) =>
    ({ type: 'APP/SET_TASKS', tasks } as const)
export const setTotalCardsCount = (totalTaskCount: number) =>
    ({ type: 'APP/SET_TOTAL_CARDS_COUNT', totalTaskCount } as const)
export const setCurrentPage = (currentPage: number) =>
    ({ type: 'APP/SET_CURRENT_PAGE', currentPage } as const)
export const setSortData = (data: { sort_field: sortFieldType, sort_direction: "asc" | "desc" }) =>
    ({ type: 'APP/SET_SORT_DATA', data } as const)

export const getMe = () => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    try {
        dispatch(setAppStatus('loading'))
        const params = getState().app.getMeData
        const res = <AxiosResponse<getTaskDataType>>await API.getTask(params)
        if (res.data.status === "ok") {
            dispatch(setTasks(res.data.message.tasks))
            dispatch(setTotalCardsCount(Number(res.data.message.total_task_count)))
        } else {
            dispatch(setAppError(res.data.message))
        }
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        dispatch(setAppStatus('succeeded'))
        dispatch(setAppError("Error from response"))
        throw new Error("Error from response")
    }
}
export const addTask = (newTask: newTaskType) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    try {
        dispatch(setAppStatus('loading'))
        const res = <AxiosResponse<addTaskDataType>>await API.addTask(newTask)
        if (res.data.status === "ok") {
            await getMe()
        } else {
            dispatch(setAppError(JSON.stringify(res.data.message)))
        }
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        dispatch(setAppStatus('succeeded'))
        dispatch(setAppError("Error from response"))
        throw new Error("Error from response")
    }
}

export type RequestStatusType = 'succeeded' | 'loading'

export type AppInitialStateType = typeof initialState

type ActionsType =
    ReturnType<typeof setAppStatus> |
    ReturnType<typeof setAppError> |
    ReturnType<typeof setTasks> |
    ReturnType<typeof setTotalCardsCount> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setSortData>


export type taskType = {
    id: number,
    username: string,
    email: string,
    text: string,
    status: 0 | 1 | 10 | 11
}
/* status
0 - задача не выполнена
1 - задача не выполнена, отредактирована админом
10 - задача выполнена
11 - задача отредактирована админом и выполнена*/

export type sortFieldType = "id" | "username" | "email" | "status"


