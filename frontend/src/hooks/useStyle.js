import { useEffect } from 'react'

const useStyle = (styles) => {
	useEffect(() => {
		const style = document.createElement('style')

		style.innerHTML = styles

		document.head.appendChild(style)

		return () => {
			document.head.removeChild(style)
		}
	}, [styles])
}

export default useStyle
