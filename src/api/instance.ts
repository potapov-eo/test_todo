import axios from "axios";
import { taskType } from "../store/app-reduser/app-reducer";

export const baseURL = "https://uxcandy.com/~shapoval/test-task-backend/v2/"

export const instance = axios.create({baseURL,  headers: {'Content-Type': 'multipart/form-data' }})

export const Name = "JON"

export const AuthAPI = {
    login() {
        let formData = new FormData()
        formData.append("username", "admin" )
        formData.append("password", "123")
        return instance.post(`/login?developer=JON.`, formData)
    },

}
export const API = {
    getTask(params?:any) {
        return instance.get<getTaskDataType|string>(`?developer=${Name}.`,{
            params: params
        })

    },
    addTask(newTask:newTaskType) {
        let formData = new FormData()
        formData.append("username", newTask.userName )
        formData.append("text", newTask.text)
        formData.append("email", newTask.email)
        return instance.post<addTaskDataType>(`create?developer=${Name}.`,formData)
    },
}

export type getSuccessTaskDataType = {
    status: "ok"
    message: messageType
    total_task_count: string
}
export type getErrorTaskDataType = {
    status:  "error"
    message: string
}
export type messageType = {
    total_task_count: string,
    tasks:Array<taskType>
}
export type newTaskType = {
    userName: string,
    email: string,
    text: string
}
export type addSuccessTaskDataType = {
    status: "ok",
    message: taskType,
   }
export type addErrorTaskDataType = {
    status: "error",
    message: {
        username: string,
        email: string,
        text: string
    }
}
export type addTaskDataType = addSuccessTaskDataType | addErrorTaskDataType

export type getTaskDataType = getSuccessTaskDataType|getErrorTaskDataType

