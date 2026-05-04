import CalorieDisplay from "./CalorieDisplay"
import { useActivity } from "../hooks/useActivity"


export default function CalorieTracker() {

    const {caloriesConsumed, caloriesWasted, caloriesBalance} = useActivity()

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
