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
  social: {
    facebook: string
  },
  phone: string[]
}

const UserSocial = () => {
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
      social: {
        facebook: ''
      },
      phone: ['', '']
    }
  })

  /* console.log({ isDirty, touchedFields, dirtyFields, isValid }); */
  console.log({ isSubmitting, isSubmitSuccessful });

  React.useEffect(() => {
    isSubmitSuccessful && reset()
  }, [isSubmitSuccessful, reset])

  /* const handleData = (data: FormValues) => {
    console.log('FOrm DaTa', data);
  } Or_ */

  const handleData: SubmitHandler<FormValues> = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('FOrm DaTa', data);
      throw new Error('What! are you mad? Set error on root.')
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
      <section className={styles.social}>
        <div className={styles.socialHeader}>
          <h1>Welcome Back</h1>
          <p>Collect information, payments, and signatures with custom online forms.</p>
        </div>

        <form autoComplete='off' noValidate className={styles.formSocial} onSubmit={handleSubmit(handleData, handleErrors)}>
          <div className={styles.formGroup}>
            <label htmlFor='facebook'>Facebook</label>
            <input
              type='text'
              id='facebook'
              placeholder='Facebook'
              {...register('social.facebook')} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='phone'>Phone</label>
            <input
              type='text'
              id='phone'
              placeholder='Phone'
              {...register('phone.0')} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='phone-sec'>Phone Secondary</label>
            <input
              type='text'
              id='phone-sec'
              placeholder='Phone Secondary'
              {...register('phone.1')} />
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

export { UserSocial }