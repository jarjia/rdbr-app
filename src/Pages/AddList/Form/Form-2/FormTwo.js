import React, {useState, useEffect} from 'react'
import { useLocalStorageState } from '../../hook';
import { Field, Formik, Form } from 'formik';
import lariSymbol from '../../../../assets/lari-symbol.png'
import * as Yup from 'yup';
import './FormTwo.css'

const INITIAL_VALUES = {
  laptop_image: '',
  laptop_name: '',
  laptop_brand_id: '',
  laptop_cpu: '',
  laptop_cpu_cores: '',
  laptop_cpu_threads: '',
  laptop_ram: '',
  laptop_hard_drive_type: '',
  purchaseDate: '',
  laptop_price: '',
  laptop_state: ''
};
const LOCAL_STORAGE_KEY = 'CustomLocalStorageKey';
const matchRegex = /[a-zA-Z0-9-!$%^&*()_+|~=`{}:";'<>?,.]/
const numbersRegex = /[0-9]/

const validate = Yup.object({
  laptop_name: Yup.string()
    .matches(matchRegex, 'გამოიყენე ლათინური ასოები, ციფრები, !@#$%^&*()_+= ')
    .required('გთხოვთ შეავსოთ'),
  laptop_brand_id: Yup.string()
    .required('აუცილებელია'),
  laptop_cpu: Yup.string()
    .required('აუცილებელია'),
  laptop_cpu_cores: Yup.string()
    .matches(numbersRegex, 'მხოლოდ ციფრები')
    .required('გთხოვთ შეავსოთ')
})

const MyForm = ({handleStepBack, errors, touched, saveForm, ...props }) => {
  const [cpu, setCpu] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    fetch('https://pcfy.redberryinternship.ge/api/brands')
        .then((response) => response.json())
        .then((data) => setBrands(data.data))
  }, [])

  useEffect(() => {
    fetch('https://pcfy.redberryinternship.ge/api/cpus')
        .then((response) => response.json())
        .then((data) => setCpu(data.data))
  }, [])

  useEffect(() => {
      saveForm(props.values);
  }, [props.values, saveForm]);

  const handleReset = React.useCallback(() => {
      saveForm(INITIAL_VALUES);
  }, [saveForm]);

  return (
    <Form className='form-page-1'>
      <div className='image-drop'>
        <input name='laptop_image' type="file" onChange={(e) => {
          let image = document.getElementById('1')
          image.src = URL.createObjectURL(e.target.files[0])
          props.values.laptop_image = URL.createObjectURL(e.target.files[0])
          console.log(e.target.files);
        }}/>
        <img src={props.values.laptop_image} id='1' alt='laptop'/>
      </div>
      <div className='laptop-name-brand'>
        <div>
          <label htmlFor='laptop_name'>ლეპტოპის სახელი</label>
          <Field type='text' name='laptop_name' className='input-field' autoCorrect='off' placeholder='HD'/>
        </div>
        <div>
          <Field as="select" name="laptop_brand_id" className='select-field'>
            <option value="">ლეპტოპის ბრენდები</option>
            {brands.map(item => {
              return <option key={item.id} value={item.id}>{item.name}</option>
            })}
          </Field>
        </div>
      </div>
      <div className='cpu'>
        <div>
          <Field as="select" name="laptop_cpu" className='select-field'>
            <option value="">CPU</option>
            {cpu.map(item => {
              return <option key={item.id} value={item.name}>{item.name}</option>
            })}
          </Field>
        </div>
        <div>
          <label htmlFor='laptop_cpu_cores'>CPU-ს ბირთვი</label>
          <Field type='number' name='laptop_cpu_cores' className='input-field' autoCorrect='off' placeholder='14'/>
        </div>
        <div>
          <label htmlFor='laptop_cpu_threads'>CPU-ს ნაკადი</label>
          <Field type='number' name='laptop_cpu_threads' className='input-field' autoCorrect='off' placeholder='365'/>
        </div>
      </div>
      <div className='laptop-ram-storage'>
        <div>
          <label htmlFor='laptop_ram'>ლეპტოპის RAM (GB)</label>
          <Field type='number' name='laptop_ram' className='input-field' autoCorrect='off' placeholder='365'/>
        </div>
        <div className='radio-hdd-ssd'>
          <label htmlFor='laptop_hard_drive_type'>მეხსიერების ტიპი</label>
          <div>
            <label>
              <Field type="radio" name="laptop_hard_drive_type" value='SSD'/>
              SSD
            </label>
            <label>
              <Field type="radio" name="laptop_hard_drive_type" value="HDD" />
               HDD
            </label>
          </div>
        </div>
      </div>
      <div className='laptop-date-cost'>
        <div>
          <label htmlFor='purchaseDate'>შეძენის რიცხვი (არჩევითი)</label>
          <Field type='text' 
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")} 
            placeholder='დდ / თთ / წწწწ' className='input-field' name='purchaseDate'
          />
        </div>
        <div>
          <div>
            <label htmlFor='laptop_price'>ლეპტოპის ფასი</label>
            <Field type='number' onInput={(e) => {
              if (e.target.value.length > e.target.maxLength)
              e.target.value = e.target.value.slice(0, e.target.maxLength);
            }} maxLength={6} className='input-field' name="laptop_price" placeholder='00.00'/>
            <img src={lariSymbol} alt='lari symbol' className='lari'/>
          </div>
        </div>
      </div>
      <div className='laptop-condition'>
          <label htmlFor='laptop_state'>ლეპტოპის მდგომარეობა</label>
          <div>
            <label>
              <Field type="radio" name="laptop_state" value='new'/>
              ახალი
            </label>
            <label>
              <Field type="radio" name="laptop_state" value="used" />
               მეორადი
            </label>
          </div>
        </div>
      <div className='sub-res-btns'>
          <button className='btns' type='submit'>დამახსოვრება</button>
          <button className='btns btns-red' type='reset' onClick={handleReset}>წაშლა</button>
          <button className='btns-back' onClick={handleStepBack}>უკან</button>
      </div>
   </Form>
  );
};

const FormTwo = ({handleResetForm, createLaptop, handleStepBack, handleData}) => {
  const [initialValues, handleUpdateForm] = useLocalStorageState({ key: LOCAL_STORAGE_KEY, value: INITIAL_VALUES });

  const handleSubmit = (values) => {
    const newObject = {...values}
    newObject['laptop_brand_id'] = parseFloat(newObject['laptop_brand_id'])
    handleData(newObject)
    createLaptop()
    // handleResetForm()
    // handleUpdateForm(INITIAL_VALUES)
  }

return (
  <div className='form-1-main'>
      <Formik 
          enableReinitialize 
          initialValues={initialValues} 
          onSubmit={handleSubmit}
      >
      {(props, errors, touched) =>  <MyForm 
        handleStepBack={handleStepBack} 
        errors={errors} 
        touched={touched} 
        saveForm={handleUpdateForm} 
        {...props} 
      />}
      </Formik>
  </div>
)
}

export default FormTwo