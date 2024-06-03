import React from 'react'

interface INetworkError {
	message: string,
	dismiss: any
}

export default function NetworkError({
	message,
	dismiss
}: INetworkError) {
  return (
	<div>
		{message}
		<button onClick={dismiss}>
			<span aria-hidden>&times;</span>
		</button>
	</div>
  )
}
