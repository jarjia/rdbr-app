import React, {useState, useEffect} from 'react'
import FormOne from './Form-1/FormOne'
import FormTwo from './Form-2/FormTwo'
import arrow from '../../../assets/arrow-down.png'
import rdbrLogo from '../../../assets/LOGO-10 2.png'
import { useNavigate } from 'react-router-dom'
import './Form.css'
import axios from 'axios'

const token = 'ff9c1272e3a127fa1f4d38de2761a0ce';

const Form = () => {
    const [form, setForm] = useState(null)
    const [step, setStep] = useState(0)

    useEffect(() => {
        const savedStep = JSON.parse(localStorage.getItem('react-step'))
        const savedForm = JSON.parse(localStorage.getItem('react-form'))
        if(savedStep || savedForm){
          setStep(savedStep)
          setForm(savedForm)
        }
    }, [])

    useEffect(()=>{
        localStorage.setItem('react-step',JSON.stringify(step))
        localStorage.setItem('react-form',JSON.stringify(form))
    },[step, form])

    const navigate = useNavigate()

    const handleData = (newData) => {
        setForm(prev => {
            return {...prev, ...newData, token}
        })
    }

    const handleResetForm = () => {
        setForm(null)
    }

    const createLaptop = () => {
        console.log(form);
        fetch('https://pcfy.redberryinternship.ge/api/laptop/create', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        })
        .then(response => response.json())
        .then(res => console.log(res))
        .catch(error => (console.log(error)))
    }

    const handleStepNext = () => {
        setStep(prev => prev + 1)
    }

    const handleStepBack = () => {
        if(step === 0) {
            navigate('/')
        }else if(step === 1) {
            setStep(prev => prev - 1)
        }
    }

  return (
    <div className='Form-main'>
        {step !== 3 ? <>
            <button type='button' className='back-btn' onClick={handleStepBack}><img src={arrow} className='arrow-left' alt='arrow left'/></button>
            <div className='form-pages'>
                <div className='form-pages-1'>
                    <span className={`form ${step === 0 && 'border-bottom'}`}>თანამშრომლის ინფო</span>
                </div>
                <div className='form-pages-2'>
                    <span className={`form ${step === 1 && 'border-bottom'}`}>ლეპტოპის მახასიათებლები</span>
                </div>
            </div>
            {step === 0 && <FormOne handleData={handleData} handleStepNext={handleStepNext}/>}
            {step === 1 && <FormTwo handleResetForm={handleResetForm} createLaptop={createLaptop} handleData={handleData} handleStepBack={handleStepBack}/>}
            <div className='rdbr-logo'>
                <img src={rdbrLogo} width='75px' height='75px' alt='redberry logo'/>
            </div>
        </> : <div>finish</div>}
    </div>
  )
}

export default Form