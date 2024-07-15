export interface IPokemon {
  id: number
  name: string
  types: IPokemonType[]
}

export interface IPokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}
