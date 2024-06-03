"use client";
import React from "react";
import "./styles.css";

interface IInput {
	register: Function;
	fieldName: string;
	error: string | undefined;
	placeholder?: string;
}

export default function Input({
	register,
	fieldName,
	error,
	placeholder,
}: IInput) {
	return (
		<div className="input">
			<input
				{...register(fieldName)}
				className={`input__field w-100 input-text d-block${
					error ? " error" : null
				}`}
				placeholder={placeholder}
			/>
			<div className="input__error">{error}</div>
		</div>
	);
}
