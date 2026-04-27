import type { Activity } from "../types"  
import { useMemo } from "react" 
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({activities}: CalorieTrackerProps) {

    //Contadores
    const caloriesConsumed = useMemo(() => activities.reduce((total,activity)=> activity.category === 1 ? total + activity.calories : total, 0),[activities])

    const caloriesWasted = useMemo(() => activities.reduce((total,activity)=> activity.category === 2 ? total + activity.calories : total, 0),[activities])

    const caloriesBalance = useMemo(() => caloriesConsumed - caloriesWasted, [caloriesConsumed, caloriesWasted])

  return (
    <>
        <h2 className="text-4xl font-black text-white text-center">Resumen de Calorías</h2>

        <div className="flex flex-col justify-between items-center md:flex-row md-justify-between gap-5 mt-10">
            <CalorieDisplay
                calories={caloriesConsumed}
                text="Consumidas"
            />
             <CalorieDisplay
                calories={caloriesWasted}
                text="Ejercicio"
            />
            <CalorieDisplay
                calories={caloriesBalance}
                text="Diferencia"
            />
        </div>
            
    
    </>
  )
}
