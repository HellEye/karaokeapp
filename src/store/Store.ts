export interface Store<T> {
	getValue: () => T
	setValue: (value: T) => void
}

export interface StoreMap<T> {
	getValue: (key: string) => T
	setValue: (key: string, value: T) => void
}
