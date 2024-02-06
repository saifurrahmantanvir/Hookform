import React from 'react'
import { Link } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import styles from './_styles.module.scss'
import AppLayout from 'src/layouts/AppLayout'
import { Spotify } from 'src/assets/sportify'
import { Facebook } from 'src/assets/facebook'
import Checkbox from 'src/core/components/Checkbox/Checkbox'

let renderCount = 0;

type FormValues = {
  phoneNumbers: {
    number: string
  }[],
  zip: number,
  dob: Date
}

const UserData = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormValues>({
    defaultValues: {
      phoneNumbers: [{ number: '' }],
      dob: new Date().toJSON().slice(0, 10) as unknown as Date
    }
  })

  const { fields, append, remove } = useFieldArray({
    name: 'phoneNumbers',
    control
  })

  const handleData = (data: FormValues) => {
    console.log(data);

  }

  React.useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
    });

    return () => subscription.unsubscribe()
  }, [watch])

  /* const watchV = watch();
  console.log(watchV); */

  renderCount++;

  return (
    <AppLayout>
      <section className={styles.data}>
        <div className={styles.dataHeader}>
          <h1>Welcome Back [{renderCount}]</h1>
          <p>Collect information, payments, and signatures with custom online forms.</p>

        </div>

        <form autoComplete='off' noValidate className={styles.formData} onSubmit={handleSubmit(handleData)}>
          <div className={styles.formGroup}>
            <label htmlFor='dob'>Birthday</label>
            <input
              type='date'
              id='dob'
              style={{ fontFamily: 'Operator mono, monospace' }}
              placeholder='Date of birth'
              {...register('dob', {
                required: "Date of birth is required!",
                valueAsDate: true
              })} />
            {errors.dob?.message && (
              <span className={styles.formError}>{errors.dob?.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='zip'>ZipCode</label>
            <input
              type='number'
              id='zip'
              placeholder='Zip code'
              {...register('zip', {
                required: "Zip code is required!",
                valueAsNumber: true
              })} />
            {errors.zip?.message && (
              <span className={styles.formError}>{errors.zip?.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Enter number(s)</label>

            {fields.map((field, index) => (
              <div key={field.id}>
                <input
                  type='text'
                  style={{ marginBottom: index === 0 ? '1rem' : '0' }}
                  placeholder='Phone number'
                  {...register(`phoneNumbers.${index}.number`)} />

                {index > 0 && (
                  <div className={styles.formDeleteButton}>
                    <button type='button' onClick={() => remove(index)}>Remove!</button>
                  </div>
                )}
              </div>
            ))}

            <div className={styles.formAddButton}>
              <button type='button' onClick={() => append({ number: '' })}>Add another one!</button>
            </div>
          </div>

          <div className={styles.formLinks}>
            <p>Use social Login</p>
            <a><Facebook /></a>
            <a><Spotify /></a>
          </div>

          <Checkbox label="Remember Me on This Device for 1 Month" />
          <button type='submit'>Submit</button>

          <span className={styles.formNoAccount}>Don&apos;t have an account? <Link to='/signup'>Sign Up</Link></span>
        </form>

        <DevTool control={control} />
      </section>
    </AppLayout>
  )
}

export { UserData }