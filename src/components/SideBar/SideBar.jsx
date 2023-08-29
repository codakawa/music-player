import { style } from '@mui/system'
import React, { useEffect, useState } from 'react'
import styles from "./SideBar.module.css"

const SideBar = () => {
    const [opened, setOpened] = useState(false)
    const [openedText, setOpenedText] = useState(false)
    let timeout;
    
    useEffect(() => {
        console.log(opened);
        if(!opened) setOpenedText(false)
        else setOpenedText(true)
    }, [ openedText ])

  return (
    <div className={opened ? `${styles.opened} ${styles.sideBarParent}` : styles.sideBarParent} onMouseEnter={() => {
        setOpened(true)
        setOpenedText(true)
    }} onMouseLeave={() => {
        timeout = setTimeout(() => {
            setOpenedText(false)
        }, 2000)
        setOpened(false)

    }} onm>
        <div className={styles.logo} style={opened ? {paddingRight: "0"} : {paddingRight: "60px"}}>
            <a href="" style={opened ? {gap: "0"} : {gap: "20px"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M37.1486 14.7146C37.1486 16.8107 36.6157 17.2371 34.8393 17.6634L26.5613 19.6885C25.8152 19.8306 25.5309 20.1503 25.5309 21.3938V33.1536C25.5309 38.3406 22.0492 42 16.9332 42C13.3093 42 11 39.7973 11 36.7063C11 33.2601 13.6291 31.2706 17.0042 30.3824L20.2373 29.5297C21.9781 29.0678 22.0847 28.8191 22.0847 27.2914V11.7302C22.0847 9.59855 22.4755 9.17222 24.2875 8.74588L34.6616 6.15235C36.5802 5.69048 37.1486 6.29446 37.1486 7.7511V14.7146Z" fill="white" fill-opacity="0.96"/></svg>
                <span>Why</span>
            </a>
        </div>
        <div className={opened ? `${styles.sideBarNavigateOpened}` : styles.sideBarNavigate}>
            <div className={styles.sideBarBtn}>
                <a href="#" style={opened ? {gap: "5px"} : {gap: "26px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M17.9937 30.9875C25.1189 30.9875 31 25.1064 31 17.9937C31 10.8811 25.1063 5 17.9812 5C10.8685 5 5 10.8811 5 17.9937C5 25.1064 10.8811 30.9875 17.9937 30.9875ZM23.0706 18.7352L15.5433 23.146C14.9275 23.5104 14.2112 23.1963 14.2112 22.5679V13.4447C14.2112 12.8038 14.9652 12.5148 15.5433 12.854L23.0706 17.29C23.6109 17.6167 23.6235 18.4084 23.0706 18.7352Z" fill="white" fill-opacity="0.96"/></svg>
                    <span className={styles.sideBarLink}>Listen Now</span>
                </a>
            </div>
            <div className={styles.sideBarBtn}>
                <a href="#" style={opened ? {gap: "5px"} : {gap: "26px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none"><rect x="8.375" y="8.375" width="8.25" height="8.25" rx="2.0625" fill="white" fill-opacity="0.96"/><rect x="18" y="7" width="11" height="11" rx="2.75" fill="white" fill-opacity="0.96"/><rect x="18.6875" y="7.6875" width="9.625" height="9.625" rx="2.0625" stroke="white" stroke-opacity="0.96" stroke-width="1.375"/><rect x="19.375" y="19.375" width="8.25" height="8.25" rx="2.0625" fill="white" fill-opacity="0.96"/><rect x="7" y="18" width="11" height="11" rx="2.75" fill="white" fill-opacity="0.96"/><rect x="7.6875" y="18.6875" width="9.625" height="9.625" rx="2.0625" stroke="white" stroke-opacity="0.96" stroke-width="1.375"/></svg>
                    <span className={styles.sideBarLink}>Browse</span>
                </a>
            </div>
            <div className={styles.sideBarBtn}>
                <a href="#" style={opened ? {gap: "5px"} : {gap: "26px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="36" viewBox="0 0 37 36" fill="none"><path d="M28.3614 11.0359C28.3614 12.608 27.9618 12.9278 26.6295 13.2475L20.4209 14.7664C19.8614 14.8729 19.6482 15.1128 19.6482 16.0454V24.8652C19.6482 28.7555 17.0369 31.5 13.1999 31.5C10.482 31.5 8.75 29.848 8.75 27.5298C8.75 24.9451 10.7218 23.4529 13.2532 22.7868L15.678 22.1473C16.9836 21.8009 17.0635 21.6144 17.0635 20.4686V8.79767C17.0635 7.19892 17.3567 6.87916 18.7156 6.55941L26.4962 4.61426C27.9351 4.26786 28.3614 4.72084 28.3614 5.81333V11.0359Z" fill="white" fill-opacity="0.96"/></svg>
                    <span className={styles.sideBarLink}>Library</span>
                </a>
            </div>
            <div className={styles.sideBarBtn}>
                <a href="#" style={opened ? {gap: "5px"} : {gap: "26px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M8.60928 27.8244H27.3797C29.7603 27.8244 31 26.5957 31 24.248V10.8969C31 8.54925 29.7603 7.32056 27.3797 7.32056H8.60928C6.23966 7.32056 5 8.53828 5 10.8969V24.248C5 26.5957 6.23966 27.8244 8.60928 27.8244ZM18 19.4978C15.9046 19.4758 14.281 17.7315 14.27 15.4277C14.2591 13.2446 15.9156 11.4235 18 11.4235C20.0844 11.4235 21.719 13.2446 21.719 15.4277C21.719 17.7315 20.0844 19.5197 18 19.4978ZM10.8802 25.74C11.7688 23.129 14.5992 21.275 18 21.275C21.4008 21.275 24.2312 23.129 25.1089 25.74H10.8802Z" fill="white" fill-opacity="0.96"/></svg>
                    <span className={styles.sideBarLink}>Made for You</span>
                </a>
            </div>
        </div>
        <div className={styles.sideBarBtn}>
            <a href="#" style={opened ? {gap: "5px"} : {gap: "26px"}} className={styles.sideBarBtnAcc}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M17.9885 29.24C24.3957 29.24 29.6842 23.9515 29.6842 17.5555C29.6842 11.1596 24.3844 5.87109 17.9772 5.87109C11.5813 5.87109 6.30408 11.1596 6.30408 17.5555C6.30408 23.9515 11.5926 29.24 17.9885 29.24ZM17.9772 19.3975C15.7624 19.3862 14.0447 17.5329 14.0447 15.0808C14.0221 12.7755 15.7737 10.8545 17.9772 10.8545C20.1808 10.8545 21.9097 12.7755 21.9097 15.0808C21.9097 17.5329 20.1921 19.4201 17.9772 19.3975ZM17.9772 27.3076C15.446 27.3076 12.7565 26.2567 11.0502 24.4261C12.3497 22.4824 14.9261 21.3524 17.9772 21.3524C20.9944 21.3524 23.5934 22.4598 24.9042 24.4261C23.1979 26.2567 20.5085 27.3076 17.9772 27.3076Z" fill="white" fill-opacity="0.96"/>
                </svg>
                <span className={styles.sideBarLink}>Account</span>
            </a>
        </div>
    </div>
  )
}

export default SideBar