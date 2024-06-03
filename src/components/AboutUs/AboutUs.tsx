import React from "react";
import styles from "./styles.module.css";

export default function AboutUs() {
	return (
		<section className={styles.about} id='about'>
			<h2 className="h2">О нас</h2>
			<div className={styles.info}>
				<div className={[styles.text, 'text-center'].join(' ')}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
					luctus fermentum sem, vel luctus lacus feugiat vitae. Donec et nisi eu
					ligula imperdiet pellentesque. Donec vitae nunc nibh. Maecenas suscipit
					nisi congue sapien tempus fermentum. Fusce dolor enim, viverra fringilla
					pharetra in, porttitor a tellus. <br />
					Fusce rhoncus lorem cursus metus tristique volutpat. Praesent nec
					blandit elit. Etiam iaculis vel leo at tincidunt. In fringilla, sapien
					quis imperdiet pulvinar, sem nisl facilisis massa, eget aliquam erat
					diam ut libero. Ut ullamcorper rutrum urna, eget congue dui dignissim
					sit amet. <br /> Nunc eu dolor a lacus semper tincidunt eu ac erat. Sed 
					ultricies nulla nibh, nec viverra nibh imperdiet id. 
				</div>
			</div>
		</section>
	);
}
