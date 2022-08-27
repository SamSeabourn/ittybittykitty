export interface KittenCSS {
	left?: string
	transition?: string
	filter?: string
}

export type Action =
	| 'run'
	| 'stroll'
	| 'sleep'
	| 'zoomies'
	| 'idle'
	| 'wag'
	| 'lick'
	| 'wipe'
	| 'swipe'
	| 'jump'
	| 'hiss'

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
	colorShift: number
}
