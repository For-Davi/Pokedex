export interface Pokemon{
    name: string | null
    id: number | null
    count: number
    next:string
    previous: string | null
    results:[
        {
            name: string,
            url: string
        }
    ]
        
}