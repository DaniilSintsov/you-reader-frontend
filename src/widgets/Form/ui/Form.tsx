'use client';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Button,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './Form.module.css';
import { IFormInputs, IFormProps } from './Form.types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthService from '@/src/shared/lib/services/auth.service';
import { LocalStorageService } from '@/src/shared/lib/services/localStorage.service';
import { useProfile } from '@/src/shared/lib/hooks/useStoreProfile';
import { ClientError } from 'graphql-request';
import { useRouter } from 'next/navigation';
import { useAlert } from '@/src/shared/lib/hooks/useAlert';

export default function Form({ mode }: IFormProps) {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword(show => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const yupObj = {
		email: yup
			.string()
			.trim()
			.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Вы указали некорректный Email') // Check email regex
			.required('Это обязательное поле'),
		password: yup
			.string()
			.trim()
			.min(8, 'Пароль должен содержать не менее 8 символов')
			.max(20, 'Пароль должен содержать не более 20 символов')
			.required('Это обязательное поле'),
	};

	const [yupObjState, setYupObjState] = useState(yupObj);

	const [isFirstRun, setIsFirstRun] = useState(true);

	useEffect(() => {
		if (isFirstRun) {
			setIsFirstRun(false);
		}

		if (!isFirstRun) reset();

		if (mode === 'register') {
			setYupObjState(
				Object.assign(yupObj, {
					username: yup.string().trim().required('Это обязательное поле'),
				}),
			);
		} else {
			setYupObjState(yupObj);
		}
	}, [mode, isFirstRun]);

	const {
		control,
		reset,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormInputs>({
		resolver: yupResolver(yup.object(yupObjState)),
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	});

	const { setIsAuth, setProfile } = useProfile();
	const { setAlert } = useAlert();

	const router = useRouter();

	const onSubmit: SubmitHandler<IFormInputs> = async (data: FieldValues) => {
		if (mode === 'register') {
			try {
				const res = await AuthService.signup({
					username: data.username,
					email: data.email,
					password: data.password,
				});
				LocalStorageService.set('token', res.accessToken);
				setIsAuth(true);
				setProfile(res);
				setAlert({
					open: true,
					message: 'Регистрация прошла успешно',
					severity: 'success',
				});
				router.replace('/');
			} catch (error: unknown) {
				if (
					error instanceof ClientError &&
					error.response.errors?.length &&
					error.response.errors[0].extensions?.originalError?.statusCode === 400
				) {
					setAlert({
						open: true,
						message: 'Ошибка при регистрации. Проверьте почту и пароль',
						severity: 'error',
					});
				} else {
					setAlert({
						open: true,
						message: 'Ошибка при регистрации. Попробуйте позже',
						severity: 'error',
					});
				}
			}
		} else {
			try {
				const res = await AuthService.login({
					email: data.email,
					password: data.password,
				});
				LocalStorageService.set('token', res.accessToken);
				setIsAuth(true);
				setProfile(res);
				setAlert({
					open: true,
					message: 'Авторизация прошла успешно',
					severity: 'success',
				});
				router.replace('/');
			} catch (error: unknown) {
				if (
					error instanceof ClientError &&
					error.response.errors?.length &&
					(error.response.errors[0].extensions?.originalError?.statusCode === 401 ||
						error.response.errors[0].extensions?.originalError?.statusCode === 400)
				) {
					setAlert({
						open: true,
						message: 'Ошибка при авторизации. Проверьте почту и пароль',
						severity: 'error',
					});
				} else {
					setAlert({
						open: true,
						message: 'Ошибка при авторизации. Попробуйте позже',
						severity: 'error',
					});
				}
			}
		}
		reset();
	};

	return (
		<form
			noValidate
			className={styles.form}
			onSubmit={handleSubmit(onSubmit)}>
			{mode === 'register' && (
				<Controller
					name="username"
					control={control}
					render={({ field }) => (
						<TextField
							label="Имя"
							id="username"
							type="text"
							{...field}
							error={!!errors.username}
							helperText={errors.username?.message}
							sx={{ width: '100%' }}
						/>
					)}
				/>
			)}
			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<TextField
						label="Email"
						id="email"
						type="email"
						{...field}
						error={!!errors.email}
						helperText={errors.email?.message}
						sx={{ width: '100%' }}
					/>
				)}
			/>
			<Controller
				name="password"
				control={control}
				render={({ field }) => (
					<FormControl
						sx={{ width: '100%' }}
						variant="outlined">
						<InputLabel
							error={!!errors.password}
							htmlFor="password">
							Пароль
						</InputLabel>
						<OutlinedInput
							id="password"
							error={!!errors.password}
							{...field}
							type={showPassword ? 'text' : 'password'}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end">
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Пароль"
						/>
						<FormHelperText error={!!errors.password}>
							{errors.password?.message}
						</FormHelperText>
					</FormControl>
				)}
			/>
			<Button
				size="large"
				variant="contained"
				type="submit"
				sx={{
					width: '100%',
				}}>
				{mode === 'register' ? 'Зарегистрироваться' : 'Войти'}
			</Button>
		</form>
	);
}
