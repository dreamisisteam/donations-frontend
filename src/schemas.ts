import * as yup from 'yup';

export const donateSchema = yup.object({
	summa: yup.number().typeError('Введите число').required('Это обязательное поле').moreThan(0, 'Сумма должна быть больше 0').integer('Введите целое чило').transform((val, orig) => orig === '' ? 0 : val),
});

export const refillSchema = yup.object({
	summa: yup.number().typeError('Введите число').required('Это обязательное поле').moreThan(0, 'Сумма должна быть больше 0').integer('Введите целое чило').transform((val, orig) => orig === '' ? 0 : val),
});

export interface TDonate {
	summa: number
};

export interface TRefill {
	summa: number
};