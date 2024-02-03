/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Link } from 'react-router-dom'
import { useForm, FieldErrors, SubmitHandler } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import styles from './_styles.module.scss'
import AppLayout from 'src/layouts/AppLayout'

import { Spotify } from 'src/assets/sportify'
import { Facebook } from 'src/assets/facebook'
import Checkbox from 'src/core/components/Checkbox/Checkbox'

type FormValues = {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: {
      errors,
      isDirty,
      /* touchedFields,
      dirtyFields,
      isValid, */
      isSubmitting,
      isSubmitSuccessful
    }
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  console.log({ isSubmitting, isSubmitSuccessful });
  /* console.log({ isDirty, touchedFields, dirtyFields, isValid }); */

  React.useEffect(() => {
    isSubmitSuccessful && reset()
  }, [isSubmitSuccessful, reset])

  /* const handleLogin = (data: FormValues) => {
    console.log('FOrm DaTa', data);
  } Or_ */

  const handleLogin: SubmitHandler<FormValues> = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('FOrm DaTa', data);
      throw new Error('This password is already being used by _user20!')
    }
    catch (error: any) {
      if (error.message)
        setError('root', { message: error.message });
    }
  }

  const handleErrors = (errors: FieldErrors<FormValues>) => {
    console.log('FOrm ERRors', errors);

  }

  return (
    <AppLayout>
      <section className={styles.login}>
        <div className={styles.loginHeader}>
          <h1>Welcome Back</h1>
          <p>Collect information, payments, and signatures with custom online forms.</p>
        </div>

        <form autoComplete='off' noValidate className={styles.formLogin} onSubmit={handleSubmit(handleLogin, handleErrors)}>
          <div className={styles.formGroup}>
            <label htmlFor='email'>Email</label>
            <input
              autoFocus
              type='text'
              id='email'
              placeholder='Email'
              {...register('email', {
                required: 'Email is required!',
                pattern: {
                  message: 'Please enter a valid email!',
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i
                },
                // need to add an extra check of error type
                // to display the error message
                validate: {
                  // admin: value => !(value === 'admin@example.com'),
                  // blackListed: value => !value.endsWith('baddomain.com')
                  admin: value => {
                    if (value === 'admin@example.com')
                      return 'Please enter a different email!'

                    return true;
                  },
                  blackListed: value => {
                    if (value.endsWith('baddomain.com'))
                      return 'This domain is not supported!'

                    return true
                  }
                }
              })} />
            {errors.email?.message && (
              <span className={styles.formError}>{errors.email?.message}</span>
            )}
            {/* {errors.email?.type === 'admin' && (
              <span className={styles.formError}>Please enter a different email!</span>
            )}
            {errors.email?.type === 'blackListed' && (
              <span className={styles.formError}>This domain is not supported!</span>
            )} */}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              placeholder='Password'
              {...register('password', {
                required: 'Password is required!',
                minLength: {
                  value: 8,
                  message: 'Password must contain at least 8 characters!'
                }
              })} />
            {errors.password?.message && (
              <span className={styles.formError}>{errors.password?.message}</span>
            )}

            <div className={styles.formForgotLink}>
              <a href='/forgotPassword' >Can't remember password?</a>
            </div>

            {/* {error && (
              <span className={styles.formError}>{error}!</span>
            )} */}
          </div>

          <div className={styles.formLinks}>
            <p>Use social Login</p>
            <a><Facebook /></a>
            <a><Spotify /></a>
          </div>

          <Checkbox label="Remember Me on This Device for 1 Month" />
          {/* <button type='submit' disabled={!isDirty || !isValid || isSubmitting}>Signup</button> */}
          <button type='submit' disabled={!isDirty || isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Signup'}
          </button>

          {errors.root?.message && (
            <span className={styles.formError}>{errors.root?.message}</span>
          )}

          <span className={styles.formNoAccount}>Don&apos;t have an account?  <Link to='/signup'>Sign Up</Link></span>
        </form>

        <DevTool control={control} />
      </section>
    </AppLayout>
  )
}

export { Login }