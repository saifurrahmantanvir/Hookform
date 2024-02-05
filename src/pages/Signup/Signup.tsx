/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools';

import styles from './_styles.module.scss'
import AppLayout from 'src/layouts/AppLayout';
import { Facebook } from 'src/assets/facebook';
import { Spotify } from 'src/assets/sportify';
import Checkbox from 'src/core/components/Checkbox/Checkbox';

type FormValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string
}

const Signup = () => {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({})

  /* const handleSignup = (data: FormValues) => {
    data.email = data.email.toLowerCase()
    console.log(data);
  } */

  const handleSignup = async (data: FormValues) => {
    console.log('FOrm DaTa', data);

  }

  return (
    <AppLayout>
      <section className={styles.signup}>
        <div className={styles.signupHeader}>
          <h1>Sign up with Email</h1>
          <p>Collect information, payments, and signatures with custom online forms.</p>
        </div>

        <form autoComplete='off' className={styles.formSignup} onSubmit={handleSubmit(handleSignup)}>
          {/* <div className={styles.formGroup}>
            <label htmlFor='firstname'>Name</label>
            <input
              autoFocus
              type='text'
              id='firstname'
              placeholder='Name'
              {...register('name', {
                required: 'Please enter your name!'
              })} />

            {errors.name?.type === 'required' && (
              <span className={styles.formError}>{errors.name.message}</span>
            )}
          </div> */}

          <div className={styles.formGroup}>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              placeholder='Email'
              {...register('email', {
                required: 'Email is required',
                pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                validate: {
                  available: async (fieldValue) => {
                    try {
                      const res = await fetch(`${import.meta.env.API_URL}users?email=${fieldValue}`)
                      const data = await res.json();

                      if (data.length > 0)
                        throw new Error('This email is already taken!')
                      return true;
                    }
                    catch (error: any) {
                      if (error.message)
                        setError('root', { message: error.message });
                    }
                  }

                }
              })} />

            {errors.email?.type === 'required' && (
              <span className={styles.formError}>{errors.email.message}</span>
            )}
            {errors.email?.type === 'pattern' && (
              <span className={styles.formError}>Please enter a valid email!</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              placeholder='Password'
              {...register('password', {
                required: 'Password is required!',
                minLength: 8
              })} />

            {errors.password?.type === 'required' && (
              <span className={styles.formError}>{errors.password.message}</span>
            )}
            {errors.password?.type === 'minLength' && (
              <span className={styles.formError}>Password must contain at least 8 characters!</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='passwordConfirm'>Confirm password</label>
            <input
              type='password'
              id='passwordConfirm'
              placeholder='Confirm password'
              {...register('passwordConfirm', {
                required: 'Password confirm is required!',
                minLength: 8,
                disabled: !watch('password'),
                validate: (pc) => pc === getValues('password')
              })} />

            {errors.passwordConfirm?.type === 'required' && (
              <span className={styles.formError}>{errors.passwordConfirm.message}</span>
            )}
            {errors.passwordConfirm?.type === 'minLength' && (
              <span className={styles.formError}>Password must contain at least 8 characters!</span>
            )}
            {errors.passwordConfirm?.type === 'validate' && (
              <span className={styles.formError}>Passwords are not same!</span>
            )}
          </div>

          <div className={styles.formLinks}>
            <p>Use social Signup</p>
            <a><Facebook /></a>
            <a><Spotify /></a>
          </div>

          <Checkbox label='I agree to the Terms of Service and Privacy Policy.' />
          <button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Signup'}</button>

          {errors.root?.message && (
            <span className={styles.formError}>{errors.root?.message}</span>
          )}

          <span className={styles.formYesAccount}>Already have an account?  <Link to='/login'>Login</Link></span>
        </form>
        <DevTool control={control} />
      </section>
    </AppLayout>
  )
}

export { Signup };