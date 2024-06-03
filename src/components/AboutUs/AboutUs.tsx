import React from "react";
import styles from "./styles.module.css";

export default function AboutUs() {
	return (
		<section className={styles.about} id='about'>
			<h2 className="h2">О нас</h2>
			<div className={styles.info}>
				<div className={[styles.text, 'text-center'].join(' ')}>
				Мы – группа талантливых и неординарных людей, объединенных страстью к творчеству и желанием создавать уникальные проекты.
				Мы верим в силу идей, которые помогают нам  преодолевать творческие границы.
				Мы – не просто группа людей, мы – команда единомышленников. Мы постоянно  экспериментируем с новыми форматами, ищем новые точки соприкосновения с искусством.
				</div>
			</div>
		</section>
	);
}
