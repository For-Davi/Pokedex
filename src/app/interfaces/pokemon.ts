export interface Pokemon{
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