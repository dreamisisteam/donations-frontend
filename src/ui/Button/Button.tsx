import React from "react";
import styles from "./styles.module.css";

interface IButton {
	text: string;
	onClickF: Function;
	addClass?: string;
	disabled?: boolean
}

export default function Button({ text, onClickF, addClass, disabled = false }: IButton) {
	return (
		<button
			onClick={() => onClickF()}
			className={[styles.button, addClass ? addClass : '', disabled ? styles.disabled : ''].join(" ")}
		>
			{text}
		</button>
	);
}
