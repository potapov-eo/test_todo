import {
    AppInitialStateType,
    appReducer,
    RequestStatusType,
    setAppStatus, setCurrentPage,
    sortFieldType,
    taskType,
} from './app-reducer';


let startState: AppInitialStateType


beforeEach(() => {
    startState =  {
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
    }

});

test('correct status should be added', () => {
    const action = setAppStatus("loading");

    const endState = appReducer(startState, action)

    expect(endState.status).toBe("loading");
})
test('correct current page should be added', () => {
    const action = setCurrentPage(7);

    const endState = appReducer(startState, action)

    expect(endState).toEqual(
        {
            status: 'succeeded' as RequestStatusType,
            error: null as string | null,
            tasks: [] as Array<taskType>,
            totalTaskCount: 0,
            getMeData: {
                page: 7,
                sort_field: '' as sortFieldType,
                sort_direction: '' as 'asc' | 'desc',
            },
            token: '',
        })
})
