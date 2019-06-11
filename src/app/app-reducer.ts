export interface State { isLoading: false }

const initialState: State = { isLoading: false }

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'START':
            return { isLoading: true }
        case 'STOP':
            return { isLoading: false }
        default:
            return initialState;
    }
}

