'use client'
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Button from '@/ui/Button/Button';
import Badge from '@/ui/Badge/Badge';
import Participant from '../Participant/Participant';
import { getMembers } from '@/service';
import { useQuery } from '@tanstack/react-query';

export default function Team() {

	const {data: list} = useQuery({
		queryKey: ['members'],
		queryFn: async () => {
			const res = await getMembers()
			return res?.data?.items
		}
	})

	return (
		<section className={styles.team} id='team'>
			<h2 className="h2">Участники</h2>
			{list?.length && list.map((item: any, index: number) => (
				<Participant
					key={index}
					info={item}
					variant={index % 2 === 0 ? 'default' : 'alternative'}
				/>
			))}
		</section>
	);
}
