export interface PokemonDetails {
    name: string
    id: number
    height : number
    weight: number
    base_experience: number
    abilities:[
        {
            name:string
            url: string
        }
    ]
    sprites: {
        back_default: string |null
        back_female: string | null
        back_shiny: string | null
        back_shiny_female: string | null
        front_shiny: string | null
        front_shiny_female : string | null
    }
    states: [
        {
            base_state: number
            effort: number
            stat:{
                name:string
                url:string
            }
        }
    ]


    types: [
        {
           slot:number 
           url: string
        }
    ]
}