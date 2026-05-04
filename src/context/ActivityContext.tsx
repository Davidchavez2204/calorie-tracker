import { createContext, useReducer, type Dispatch, type ReactNode} from "react";
import { useMemo } from "react";
import { activityReducer, initialState, type ActivityActions, type ActivityState } from "../reducers/activity-reducer";
import { categories } from "../data/categories";
import type { Activity } from "../types";

type ActivityProviderProps = {
    children: ReactNode
}

type  ActivityContextProps = {
    state: ActivityState
    dispatch: Dispatch<ActivityActions>
    caloriesConsumed: number
    caloriesWasted: number
    caloriesBalance: number
    categoryName: (category: Activity['category']) => string[]
    isEmptyActivities: boolean
}

// eslint-disable-next-line react-refresh/only-export-components
export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps)

export const ActivityProvider = ({children} : ActivityProviderProps) => {

    const [state, dispatch] = useReducer(activityReducer, initialState)
     //Contadores
    const caloriesConsumed = useMemo(() => state.activities.reduce((total,activity)=> activity.category === 1 ? total + activity.calories : total, 0),[state.activities])

    const caloriesWasted = useMemo(() => state.activities.reduce((total,activity)=> activity.category === 2 ? total + activity.calories : total, 0),[state.activities])

    const caloriesBalance = useMemo(() => caloriesConsumed - caloriesWasted, [caloriesConsumed, caloriesWasted])

    const categoryName = useMemo(() =>(category:Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '' ), [state.activities])

    const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities]) //useMemo para evitar recalcular esta variable cada vez que se renderiza el componente, solo se recalcula cuando cambia el array de actividades. De esta forma tmb no llamamos a la funcion, es decir no usamos ()
    
    return(
        <ActivityContext.Provider value={{
            state,
            dispatch,
            caloriesConsumed,
            caloriesWasted,
            caloriesBalance,
            categoryName,
            isEmptyActivities

        }}>
            {children}
        </ActivityContext.Provider>
    )
}