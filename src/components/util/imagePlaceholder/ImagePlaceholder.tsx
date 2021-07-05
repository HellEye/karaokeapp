import React, { FC, useRef } from "react"

interface Props {
	className?: string
	src: string | undefined
	placeholder: string
	alt?: string
}

const ImagePlaceholder: FC<Props> = ({
	className,
	src,
	placeholder,
	alt,
}) => {
	const imgRef: any = useRef(null)

	return (
		<img
			ref={imgRef}
			className={className}
			alt={alt ? alt : ""}
			src={src ? src : placeholder}
		/>
	)
}

export default ImagePlaceholder
