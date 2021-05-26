import { AppRootStateType } from '../store';
import { RequestStatusType, taskStatusType, taskType } from './app-reducer';
import { createSelector } from 'reselect';

export const selectorStatus = (state: AppRootStateType): RequestStatusType => state.app.status;
export const selectorError = (state: AppRootStateType): string | null => state.app.error;
export const Tasks = (state: AppRootStateType): Array<taskType> => state.app.tasks;
export const selectorTotalTaskCount = (state: AppRootStateType): number => state.app.totalTaskCount;
export const selectorCurrentPage = (state: AppRootStateType): number => state.app.getMeData.page;
export const selectorToken = (state: AppRootStateType): string => state.app.token;

export const selectorTasks = createSelector([Tasks], (Tasks): Array<taskType> => {
    return Tasks.map(task => {
        return { ...task, status: taskTextStatus(task.status) };
    });
});


const taskTextStatus = (status: taskStatusType) => {
    switch (status) {
        case 0: {
            return 'задача не выполнена';
        }
        case 1: {
            return 'задача не выполнена, отредактирована админом';
        }
        case 10: {
            return 'задача выполнена';
        }
        case 11: {
            return 'задача отредактирована админом и выполнена';
        }
        default:
            return 'отсутствуют сведения о задаче';
    }

};
