import axios from 'axios';
import { getMeDataType, taskType } from '../store/app-reduser/app-reducer';

export const baseURL = 'https://uxcandy.com/~shapoval/test-task-backend/v2/';

export const instance = axios.create({ baseURL, headers: { 'Content-Type': 'multipart/form-data' } });

export const Name = 'EvgenyPotapov';

export const AuthAPI = {
    login(username: string, password: string) {
        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        return instance.post<loginDataType>(`/login?developer=JON.`, formData).then(res=>res.data);
    },
};

export const API = {
    getTask(params: getMeDataType) {
        return instance.get<getTaskDataType | string>(`?developer=${Name}.`, {
            params: params,
        }).then(res=>res.data);

    },
    addTask(newTask: newTaskType) {
        let formData = new FormData();
        formData.append('username', newTask.userName);
        formData.append('text', newTask.text);
        formData.append('email', newTask.email);
        return instance.post<addTaskDataType>(`create?developer=${Name}.`, formData).then(res=>res.data);
    },
    updateTask(token: string, id: number, text: string, status: string) {
        let formData = new FormData();
        formData.append('token', token);
        formData.append('text', text);
        formData.append('status', status);
        return instance.post<addTaskDataType>(`edit/${id}?developer=${Name}.`, formData).then(res=>res.data);
    },
};

export type getSuccessTaskDataType = {
    status: 'ok'
    message: messageType
    total_task_count: string
}
export type getErrorTaskDataType = {
    status: 'error'
    message: string
}
export type messageType = {
    total_task_count: string,
    tasks: Array<taskType>
}
export type newTaskType = {
    userName: string,
    email: string,
    text: string
}
export type addSuccessTaskDataType = {
    status: 'ok',
    message: taskType,
}
export type addErrorTaskDataType = {
    status: 'error',
    message: {
        username: string,
        email: string,
        text: string
    }
}
export type addTaskDataType = addSuccessTaskDataType | addErrorTaskDataType

export type loginSuccessDataType = {
    status: 'ok',
    message: { token: string },
}
export type loginErrorDataType = {
    status: 'error',
    message: {
        username: string,
        password: string,
    }
}
export type loginDataType = loginSuccessDataType | loginErrorDataType

export type getTaskDataType = getSuccessTaskDataType | getErrorTaskDataType

