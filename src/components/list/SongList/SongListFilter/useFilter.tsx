import { useMemo } from "react"

export interface UseStringFilter {}

interface FilterParams<T> {
	elements: T[]
	filters?: ((object: T) => boolean)[]
	filtersFirst?: ((object: T) => boolean)[]
	filtersLast?: ((object: T) => boolean)[]
	stringFilters?: ((object: T) => boolean)[]
	valuesUsed?: any[]
}

const useFilter = <T extends object>({
	elements,
	filters,
	filtersFirst,
	filtersLast,
	stringFilters,
	valuesUsed,
}: FilterParams<T>): T[] => {
	const value = useMemo(() => {
		if (elements.length === 0) return []
		let outValue: T[] = [...elements]
		if (filtersFirst && filtersFirst.length > 0)
			for (let f of filtersFirst) outValue = outValue.filter(f)
		if (filters && filters.length > 0)
			for (let f of filters) outValue = outValue.filter(f)

		if (stringFilters && stringFilters.length > 0)
			for (let f of stringFilters) outValue = outValue.filter(f)

		if (filtersLast && filtersLast.length > 0)
			for (let f of filtersLast) outValue = outValue.filter(f)
		return outValue
		//eslint-disable-next-line
	}, [elements, stringFilters, filters, filtersFirst, filtersLast, valuesUsed])
	return value
}

export default useFilter
