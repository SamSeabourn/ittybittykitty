export interface KittenCSS {
	left?: string
	transition?: string
	filter?: string
}

export type KittenColor =
	| 'black'
	| 'clear'
	| 'gold'
	| 'neon'
	| 'white'
	| 'normal'

export interface Kitten {
	id: string
	name?: string
	color: KittenColor
}
