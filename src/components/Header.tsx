import { useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

export default function Header() {
    const [searchFilters, setSearchFilters] = useState({
        ingrendient: '',
        category:''
    })

    const fetchCategories = useAppStore((state)=>state.fetchCategories)
    const categories = useAppStore((state)=>state.categories)
    const searchRecipes =useAppStore( (state)=>state.searchRecipes)
    useEffect(()=> {
        fetchCategories()
    },[])

    const {pathname} = useLocation()
    const isHome = useMemo(()=> pathname === '/', [pathname])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
 
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(Object.values(searchFilters).includes('')){
            console.log('Todos los campos son obligatorios')
            return
        }
        searchRecipes(searchFilters)


    }

    return (
        <header className={isHome ? 'headerImage' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-6">
                <div className="flex justify-between items-center">
                    <div>
                        <img className= "w-32" src="/logo.svg" alt="logotipo" />
                    </div>
                    <nav className="flex gap-4">
                        <NavLink
                            to='/'
                            className={({isActive})=>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }
                        >Inicio</NavLink>
                        <NavLink
                            to='/favoritos'
                            className={({isActive})=>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }
                        >Favoritos</NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form
                        onSubmit={handleSubmit}
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                    >
                        <div className="space-y-4">

                        
                            <label
                                htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Nombre o Ingrediente</label>

                            <input
                                value={searchFilters.ingrendient}
                                id="ingrendient"
                                name="ingrendient"
                                type="text"
                                className="p-3 w-full rounded-lg focus:outline-none bg-white"
                                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-4">

                        
                            <label
                                htmlFor="category"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Categoría</label>

                            <select
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg focus:outline-none bg-white"
                                value={searchFilters.category}
                                onChange={handleChange}
                            >
                                <option value= ''>Seleccione</option>
                                {categories.drinks.map(category => (
                                    <option
                                        value={category.strCategory}
                                        key={category.strCategory}
                                    >{category.strCategory}</option>
                                )
                                )}
                            </select>
                        </div>
                        <input
                            type="submit"
                            value= 'Buscar Recetas'
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                        />
                    </form>
                )}

            </div>
        </header>
    )
}
