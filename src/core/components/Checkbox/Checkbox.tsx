import styles from './_styles.module.scss'

interface Props {
   label: React.ReactNode
}

const Checkbox = ({ label }: Props) => (
   <label htmlFor='ckbox' className={styles.formCheckbox}>
      <input defaultChecked type="checkbox" id='ckbox' />
      <span className={styles.checkmark}></span>
      {label}
   </label>
)

export default Checkbox