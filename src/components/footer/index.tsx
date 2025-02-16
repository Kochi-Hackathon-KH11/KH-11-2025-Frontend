import styles from "./styles.module.css"

export default function Footer() {
    const LearnMore = [
        {
            name: "Learn More",
            link: ""
        },
        {
            name: "Documentation",
            link: ""
        },
        {
            name: "Source Code",
            link: ""
        },
        {
            name: "System Requirement Specification"
        }
    ]
    const Explore = [
        {
            name: "Explore",
            link: ""
        },
        {
            name: "Try Demo",
            link: ""
        },
        {
            name: "Get Started",
            link: ""
        },
        {
            name: "Integrate ArticulateAI",
            link: ""
        }
    ]
    const TeamMembers = [
        {
            name: "Team Members",
            link: ""
        },
        {
            name: "Diljith P D",
            link: ""
        },
        {
            name: "Arshiya P Hafis",
            link: ""
        },
        {
            name: "Mayank Gupta",
            link: ""
        }
    ]
    return (
        <div className={styles['footer']}>
            <div className={styles['footer-container']}>
                <div className={styles['footer-top']}>
                    <div className={styles['footer-left']}>
                        <div className={styles['footer-subtitle']}>Design and Developed during</div>
                        <div className={styles['footer-title']}>Kochi Hackathon 2025</div>
                        <div className={styles['footer-logo']}>
                            <img src = '/kochiHack-logo.svg' alt = 'kochi'></img>
                        </div>
                        <div className={styles['footer-team']}>by <span className={styles['footer-team-name']}>DAMN.ai</span></div>
                        {/* <div>DAMN.ai</div> */}
                    </div>
                    <div className={styles['footer-right']}>
                        <div className={styles['footer-column']}>
                            {LearnMore.map((obj, indx)=>(
                                <ul key = {indx} style={{ fontWeight: indx === 0 ? 700 : 'normal',opacity: indx === 0 ? 1 : 0.5, paddingBottom: '14px'  }}>{obj.name}</ul>
                            ))}
                        </div>
                        <div className={styles['footer-column']}>
                            {Explore.map((obj, indx)=>(
                                <ul key = {indx} style={{ fontWeight: indx === 0 ? 700 : 'normal',opacity: indx === 0 ? 1 : 0.5, paddingBottom: '14px'  }}>{obj.name}</ul>
                            ))}
                        </div>
                        <div className={styles['footer-column']}>
                            {TeamMembers.map((obj, indx)=>(
                                <ul key = {indx} style={{ fontWeight: indx === 0 ? 700 : 'normal',opacity: indx === 0 ? 1 : 0.5, paddingBottom: '14px' }}>{obj.name}</ul>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles['footer-bottom']}>
                    <div><img src = '/copyright.svg' alt = 'copyright'></img></div>
                    <div>2025 Copyright ArticulateAI, National Institute of Technology Calicut</div>
                </div>
            </div>
        </div>
    )
};