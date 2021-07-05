import { Store, StoreMap } from "../../../store/Store"

function useStore<T>(store: Store<T>): [T, (value: T) => void] {
	const setStoreValue = (value: T) => {
		store.setValue(value)
	}
	return [store.getValue(), setStoreValue]
}

function useStoreMap<T>(
	store: StoreMap<T>,
	key: string
): [T, (value: T) => void] {
	const setStoreValue = (value: T) => {
    store.setValue(key, value)
    console.log(`Editing store with ${key}:${value}`)
	}
	return [store.getValue(key), setStoreValue]
}
export { useStore, useStoreMap }
