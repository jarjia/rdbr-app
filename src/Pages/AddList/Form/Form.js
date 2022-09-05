import React, {useState, useEffect} from 'react'
import FormOne from './Form-1/FormOne'
import FormTwo from './Form-2/FormTwo'
import arrow from '../../../assets/arrow-down.png'
import arrowMobile from '../../../assets/Vector (2).png'
import rdbrLogo from '../../../assets/LOGO-10 2.png'
import './Form.css'
import { useNavigate } from 'react-router-dom'
import Finish from './Finish/Finish'

const Form = () => {
    const [form, setForm] = useState(null)
    const [step, setStep] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        const savedForm = JSON.parse(localStorage.getItem('react-field'))
        const savedStep = JSON.parse(localStorage.getItem('react-step-save'))
        if(savedForm || savedStep) {
            setForm(savedForm)
            setStep(savedStep)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('react-field', JSON.stringify(form))
        localStorage.setItem('react-step-save', JSON.stringify(step))
    }, [form, step])

    const handleData = (newData) => {
        setForm(prev => {
            return {...prev, ...newData}
        })
    }

    const handleStepNext = () => {
        setStep(prev => prev + 1)
    }

    const handleStepBack = () => {
        if(step === 0) {
            navigate('/')
        }else if(step === 1) {
            setStep(prev => prev - 1)
        }else if(step === 2){
            setStep(prev => prev - 2)
        }
    }

  return (
    <div className='Form-main'>
        {step !== 2 ? <>
            <button type='button' className='back-btn' onClick={handleStepBack}><img src={arrow} className='arrow-left' alt='arrow left'/></button>
            <div className='form-pages'>
                <div className='form-pages-step-1'>
                    <div className='form-pages-1'>
                        <span className={`form ${step === 0 && 'border-bottom'}`}>თანამშრომლის ინფო</span>
                    </div>
                    <div className='form-pages-2'>
                        <span className={`form ${step === 1 && 'border-bottom'}`}>ლეპტოპის მახასიათებლები</span>
                    </div>
                </div>
                <div className='form-pages-step-2'>
                    {step === 0 ? <div className='form-pages-1'>
                        <button onClick={handleStepBack}><img src={arrowMobile} alt='arrow-left'/></button>
                        <span className='form'>თანამშრომლის ინფო</span>
                        <div className='number-page'>{step === 0 ? '1' : '2'}/2</div>
                    </div> :
                    <div className='form-pages-2'>
                        <button onClick={handleStepBack}><img src={arrowMobile} alt='arrow-left'/></button>
                        <span className='form'>ლეპტოპის მახასიათებლები</span>
                        <div className='number-page'>{step === 0 ? '1' : '2'}/2</div>
                    </div>}
                </div>
            </div>
            {step === 0 && <FormOne 
                handleData={handleData} 
                handleStepNext={handleStepNext} 
                handleStepBack={handleStepBack} 
            />}
            {step === 1 && <FormTwo 
                form={form} 
                handleStepNext={handleStepNext} 
                handleStepBack={handleStepBack}
            />}
            <div className='rdbr-logo'>
                <img src={rdbrLogo} width='75px' height='75px' alt='redberry logo'/>
            </div>
        </> : <Finish />}
    </div>
  )
}

export default Form