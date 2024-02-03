import styles from './_styles.module.scss'

interface Props {
   children: React.ReactNode
}

const AppLayout = ({ children }: Props) => (
   <div className={`${styles.app} ${styles.appSmall}`}>
      <div className={styles.appContainer}>{children}</div>
   </div>
)

export default AppLayout