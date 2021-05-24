import {AppRootStateType} from "../store";
import { RequestStatusType, taskType } from "./app-reducer";


export const selectorStatus = (state: AppRootStateType): RequestStatusType => state.app.status
export const selectorError = (state: AppRootStateType): string | null => state.app.error
export const selectorTasks = (state: AppRootStateType): Array<taskType> => state.app.tasks
export const selectorTotalTaskCount = (state: AppRootStateType): number => state.app.totalTaskCount
export const selectorCurrentPage = (state: AppRootStateType): number => state.app.getMeData.page
