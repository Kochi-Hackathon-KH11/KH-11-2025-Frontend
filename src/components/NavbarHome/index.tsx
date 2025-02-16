import styles from './styles.module.css'

export default function Navbar (){
    return(
        <div className={styles['navbar']}>
            <div className={styles['nav-logo']}><img src='/nav-logo.svg'></img></div>
            <div className={styles['git-logo']}>
                <a href='https://github.com/Kochi-Hackathon-KH11' target='_bank'> <img src='/github.svg'></img></a></div>
                
        </div>
    )
}