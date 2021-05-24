import {
    AppInitialStateType,
    appReducer,
    setAppError,
    setAppStatus,
} from "./app-reducer";


let startState: AppInitialStateType


beforeEach(() => {
    startState = {
        status: 'succeeded',
        error: null,
    }

});

test('correct status should be added', () => {
    const action = setAppStatus("loading");

    const endState = appReducer(startState, action)

    expect(endState.status).toBe("loading");
})
test('correct error should be added', () => {
    const action = setAppError("something wrong");

    const endState = appReducer(startState, action)

    expect(endState).toEqual(
        {
            error: 'something wrong',
            status: 'succeeded',
        })
})
