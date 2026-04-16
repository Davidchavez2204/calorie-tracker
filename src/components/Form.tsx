import { useState, type Dispatch } from "react"
import { categories } from "../data/categories"
import type { Activity } from "../types"
import type { ActivityActions } from "../reducers/activity-reducer"

type FormProps = {
    dispatch : Dispatch<ActivityActions>
}

const initialState = {
        category: 1,
        name: '',
        calories: 0
    }
export default function Form({dispatch} : FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    //Coloca el "e" en el cambpo onChange de los inputs para saber el tipo de dato
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>| React.ChangeEvent<HTMLInputElement> ) =>{
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id] : isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const {name, calories} = activity
        console.log()
        return name.trim() !=='' && calories > 0
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type : 'save-activity', payload:{newActivity: activity}})
        setActivity(initialState)
    }

  return (
    <form
        className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoria:</label>
            <select 
                id="category" 
                className="border border-slate-300 p-2 rodunded-lg w-full bg-white"
                value={activity.category}
                onChange={handleChange}
                >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        > 
                            {category.name}
                        </option>
                    ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad:</label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Comida, Juego de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                    value={activity.name}
                    onChange={handleChange}

                />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorias. Ej. 300 o 500"
                    value={activity.calories}
                    onChange={handleChange}

                />
        </div>

        <input type="submit" 
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10 disabled:cursor-auto"
            value={activity.category===1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
            disabled={!isValidActivity()}
        />
    </form>
  )
}

