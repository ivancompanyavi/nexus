import { useState, useEffect } from 'react'

export function useObservable(observable, defaultValue) {
    const [state, setState] = useState(defaultValue)

    useEffect(() => {
        const subscription = observable.subscribe(setState)
        return () => subscription.unsubscribe()
    }, [observable])

    return state
}