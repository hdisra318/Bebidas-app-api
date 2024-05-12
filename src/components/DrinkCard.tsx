import { Drink } from "../types"
import { useAppStore } from "../stores/useAppStore";

type DrinkCardProps = {
    drink: Drink
}

function DrinkCard({drink}: DrinkCardProps) {


    const selectRecipe = useAppStore(state => state.selectRecipe);

    return (
        <div className="border shadow-lg hover:scale-105 transition-transform rounded-lg">
            <div className="overflow-hidden">
                <img src={drink.strDrinkThumb} alt={`Imagen de ${drink.strDrink}`} className="rounded-tl-lg rounded-tr-lg hover:scale-110 transition-transform hover:rotate-2" />
            </div>

            <div className="p-5 ">
                <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
                <button
                    type="button"
                    className="w-full bg-orange-500 hover:bg-orange-600 mt-5 p-3 font-bold text-white text-lg rounded-lg"
                    onClick={() => selectRecipe(drink.idDrink)}
                >
                    Ver Receta
                </button>
            </div>
        </div>
    )
}

export default DrinkCard
