import React, {useState, useEffect} from 'react'
import './FormOne.css'
import { useLocalStorageState } from '../../hook';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

const INITIAL_VALUES = {
    name: '',
    surname: '',
    team_id: '',
    position_id: '',
    email: '',
    phone_number: ''
};
const LOCAL_STORAGE_KEY = 'customLocalStorageKey';

const georgianRegex = /[\u10A0-\u10FF]/;
const georgianPhoneRegex = /^(\+?995)?(79\d{7}|5\d{8})$/;

const validate = Yup.object({
    name: Yup.string()
      .max(14, 'უნდა იყოს 14 ან ნაკლები ასო')
      .min(2, 'უნდა იყოს 2 ან მეტი ასო')
      .matches(georgianRegex, 'გამოიყენე ქართული ასოები')
      .required('გთხოვთ შეავსოთ'),
    surname: Yup.string()
      .max(24, 'უნდა იყოს 24 ან ნაკლები ასო')
      .min(2, 'უნდა იყოს 2 ან მეტი ასო') 
      .matches(georgianRegex, 'გამოიყენე ქართული ასოები') 
      .required('გთხოვთ შეავსოთ'),
    position_id: Yup.string()
      .required('აუცილებელია'),
    team_id: Yup.string()
      .required('აუცილებელია'),
    email: Yup.string()
      .email('მეილი არასწორია')
      .matches('@redberry.ge', 'უნდა მთავრდებოდეს @redberry.ge-ით')
      .required('გთხოვთ მიუთითოთ მეილი'),
    phone_number: Yup.string()
        .matches(georgianPhoneRegex, 'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს')
        .required('გთხოვთ შეავსოთ')
})

const MyForm = ({errors, touched, saveForm, ...props }) => {
    const [teams, setTeams] = useState([])
    const [positions, setPositions] = useState([])

    useEffect(() => {
        saveForm(props.values);
    }, [props.values, saveForm]);

    useEffect(() => {
        fetch('https://pcfy.redberryinternship.ge/api/teams')
            .then((response) => response.json())
            .then((data) => setTeams(data.data))
    }, [])

    useEffect(() => {
        fetch('https://pcfy.redberryinternship.ge/api/positions')
            .then((response) => response.json())
            .then((data) => setPositions(data.data))
    }, [])

    const handleReset = React.useCallback(() => {
        saveForm(INITIAL_VALUES);
    }, [saveForm]);

    return (
      <Form className='form-page-1'>
        <div className='full-name'>
            <div>
                <label htmlFor='name' className={`${errors.name && touched.name && 'label-red'}`}>სახელი</label>
                <Field type='text' name='name' className={`input ${errors.name && touched.name && 'input-red'}`} autoCorrect='off' placeholder='სახელი'/>
                <small className={`small ${errors.name && touched.name && 'small-red'}`}>
                    {`${errors.name && touched.name ? errors.name : 'მინიმუმ 2 სიმბოლო, ქართული ასოები'}`}
                </small>
            </div>
            <div>
                <label htmlFor='surname' className={`${errors.surname && touched.surname && 'label-red'}`}>გვარი</label>
                <Field type='text' name='surname' className={`input ${errors.surname && touched.surname && 'input-red'}`} placeholder='გვარი'/>
                <small className={`small ${errors.surname && touched.surname && 'small-red'}`}>
                    {`${errors.surname && touched.surname ? errors.surname : 'მინიმუმ 2 სიმბოლო, ქართული ასოები'}`}
                </small>
            </div>
        </div>
        <div className='select-div'>
            <Field as="select" name="team_id" className='select' style={{
                border: errors.team_id && touched.team_id && '2px solid #E52F2F'
            }}>
                <option value="">თიმი</option>
                {teams.map(item => {
                    return <option key={item.id} value={item.id}>{item.name}</option>
                })}
            </Field>
            <Field as="select" name="position_id" className='select' style={{
                border: errors.position_id && touched.position_id && '2px solid #E52F2F'
            }}>
                <option value="">პოზიცია</option>
                {positions.filter(prev => {
                    if(props.values.team_id === '1') {
                        return prev.team_id === 1
                    }else if(props.values.team_id === '2') {
                        return prev.team_id === 2
                    }else if(props.values.team_id === '3') {
                        return prev.team_id === 3
                    }else if(props.values.team_id === '4') {
                        return prev.team_id === 4
                    }else if(props.values.team_id === '5') {
                        return prev.team_id === 5
                    }
                    return prev
                }).map(item => {
                    return <option key={item.id} value={item.id}>{item.name}</option>
                })}
            </Field>
        </div>
        <div className='email'>
            <label htmlFor='email' className={`${errors.email && touched.email && 'label-red'}`}>მეილი</label>
            <Field type='email' name='email' className={`input long ${errors.email && touched.email && 'input-red'}`} placeholder='მისამართი@redberry.ge' autoComplete='off'/>
            <small className={`small ${errors.email && touched.email && 'small-red'}`}>
                {`${errors.email && touched.email ? errors.email : 'უნდა მთავრდებოდეს @redberry.ge-ით'}`}
            </small>
        </div>
        <div className='phone-number'>
            <label htmlFor='phone_number' className={`${errors.phone_number && touched.phone_number && 'label-red'}`}>ტელეფონის ნომერი</label>
            <Field type='tel' name='phone_number' className={`input long ${errors.phone_number && touched.phone_number && 'input-red'}`} placeholder='+995 598 00 07 01' autoComplete='off'/>
            <small className={`small ${errors.phone_number && touched.phone_number && 'small-red'}`}>
                {`${errors.phone_number && touched.phone_number ? errors.phone_number : 'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს'}`}
            </small>
        </div>
        <div className='sub-res-btns'>
            <button className='btns' type='submit'>შემდეგი</button>
            <button className='btns btns-red' type='reset' onClick={handleReset}>წაშლა</button>
        </div>
     </Form>
    );
};


const FormOne = ({handleData, handleStepNext}) => {
    const [initialValues, handleUpdateForm] = useLocalStorageState({ key: LOCAL_STORAGE_KEY, value: INITIAL_VALUES });

    const handleSubmit = (values) => {
        let newObject = {...values}
        newObject["team_id"] = parseFloat(newObject["team_id"])
        newObject["position_id"] = parseFloat(newObject["position_id"])
        handleData(newObject)
        handleStepNext()
    }

  return (
    <div className='form-1-main'>
        <Formik 
            enableReinitialize 
            initialValues={initialValues} 
            validationSchema={validate}
            onSubmit={handleSubmit}
        >
        {(props, errors, touched) =>  <MyForm errors={errors} touched={touched} saveForm={handleUpdateForm} {...props} />}
        </Formik>
    </div>
  )
}

export default FormOne