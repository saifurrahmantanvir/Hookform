import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import styles from './_styles.module.scss'
import AppLayout from 'src/layouts/AppLayout'
import { Spotify } from 'src/assets/sportify'
import { Facebook } from 'src/assets/facebook'
import Checkbox from 'src/core/components/Checkbox/Checkbox'

const schema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email!')
    .required('Email is required!'),
  password: yup
    .string()
    .required('Password is required!'),
  passwordConfirm: yup
    .string()
    .required('Password Confirmation is required!')
    .oneOf([yup.ref('password')], 'Passwords are not same!'),
  /* passwordConfirm: yup
    .string()
    .when('password', (pass, passConf) =>
      pass ? passConf
        .required('Password Confirmation is required!')
        .oneOf([yup.ref('password')], 'Passwords don\'t match!')
        : passConf
    ) */
})

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string
}

const YupForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ resolver: yupResolver(schema) })

  const handleData = async (data: FormValues) => {
    data.email = data.email.toLowerCase()

    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('FOrm DaTa', data);
  }

  return (
    <AppLayout>
      <section className={styles.data}>
        <div className={styles.dataHeader}>
          <h1>Yup Form Validation</h1>
          <p>Collect information, payments, and signatures with custom online forms.</p>

        </div>

        <form autoComplete='off' noValidate className={styles.formData} onSubmit={handleSubmit(handleData)}>
          {/* <div className={styles.formGroup}>
            <label htmlFor='firstname'>Name</label>
            <input
              autoFocus
              type='text'
              id='firstname'
              placeholder='Name'
              {...register('name')} />

            {errors.name?.message && (
              <span className={styles.formError}>{errors.name.message}</span>
            )} 
          </div> */}

          <div className={styles.formGroup}>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              placeholder='Email'
              {...register('email')} />

            {errors.email?.message && (
              <span className={styles.formError}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              placeholder='Password'
              {...register('password')} />

            {errors.password?.message && (
              <span className={styles.formError}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='passwordConfirm'>Confirm password</label>
            <input
              type='password'
              id='passwordConfirm'
              placeholder='Confirm password'
              {...register('passwordConfirm')} />

            {errors.passwordConfirm?.message && (
              <span className={styles.formError}>{errors.passwordConfirm.message}</span>
            )}
          </div>

          <div className={styles.formLinks}>
            <p>Use social Signup</p>
            <a><Facebook /></a>
            <a><Spotify /></a>
          </div>

          <Checkbox label='I agree to the Terms of Service and Privacy Policy.' />
          <button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>

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

export { YupForm }