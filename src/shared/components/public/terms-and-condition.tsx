import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from './terms-and-condition.module.css'
import Api from '../../../Api';
export const TermsAndConditions = () => {
    const [tc, setTC] = useState<any>({});
    useLayoutEffect(() => {
        document.title = "::Jax Automotive, LLC Terms and Conditions Vehicle Rental Agreement::"
    },[])

    useEffect(()=>{
        Api.get('/api/v1/terms').then(data=>{
            setTC(data.data[0]);
        })
    }, [])
    return (
        <>
                <main className={styles.mainContainer}>
                    <div className={styles.container}>
                        <div className={styles.termsPolicy}>
                            <div className={styles.pageTitle}>
                                <h1 >{tc?.title}</h1>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: tc.content}} />
                        </div>
                    </div>
                </main>
        </>
    )
}
