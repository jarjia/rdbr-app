import React, {useState, useEffect} from 'react'
import { useLocalStorageState } from '../../hook';
import { Field, Formik, Form } from 'formik';
import lariSymbol from '../../../../assets/lari-symbol.png'
import warning from '../../../../assets/Vector.png'
import tick from '../../../../assets/Vector (3).png'
import camera from '../../../../assets/ic_baseline-photo-camera.png'
import * as Yup from 'yup';
import axios from 'axios'
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
  laptop_purchase_date: '',
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
    .required('გთხოვთ შეავსოთ'),
  laptop_cpu_threads: Yup.string()
    .matches(numbersRegex, 'მხოლოდ ციფრები')
    .required('გთხოვთ შეავსოთ'),
  laptop_ram: Yup.string()
    .matches(numbersRegex, 'მხოლოდ ციფრები')
    .required('გთხოვთ შეავსოთ'),
  laptop_hard_drive_type: Yup.string()
    .required('აუცილებელია'),
  laptop_purchase_date: Yup.string()
    .notRequired(),
  laptop_price: Yup.string()
    .matches(numbersRegex, 'მხოლოდ რიცხვები')
    .required('გთხოვთ შეავსოთ'),
  laptop_state: Yup.string()
    .required('აუცილებელია'),
  laptop_image: Yup.string()
    .required('აუცილებელია')
})

const MyForm = ({handleStepBack, errors, touched, saveForm, ...props }) => {
  const [cpu, setCpu] = useState([])
  const [brands, setBrands] = useState([])
  const [image, setImage] = useState()
  const [fileName, setFileName] = useState('')
  const [size, setSize] = useState('')

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
    <Form className='form-page-1' encType='multipart/formdata'>
      <div className={`${image === undefined ? 'image-drop' : 'image-preview-div'} ${errors.laptop_image && 'image-warning'}`}>
        <label className='file-label'>
          <input
            type="file" 
            name='laptop_image' 
            id='file-upload'
            className='file'
            accept="image/png, image/jpeg, image/jpg, image/gif" 
            onChange={(e) => {
              let img = document.getElementById('img-file')
              setImage(img.src = URL.createObjectURL(e.target.files[0]))
              setFileName(e.target.files[0].name)
              let size = e.target.files[0].size;
              let fSExt = ['Bytes', 'KB', 'MB', 'GB'],
              i=0;while(size>900){size/=1024;i++;}
              let exactSize = (Math.round(size*100) / 100) + ' ' + fSExt[i];
              setSize(exactSize)
              props.values.laptop_image = e.target.files[0]
            }}
          />
          {image === undefined ? <>
            <div className={errors.laptop_image ? 'warning-div-err' : 'warning-div'}>
              <img src={warning} className='warning' alt='warning'/>
            </div>
            <div className='mob-camera'>
              <img src={camera} className='camera' alt='camera'/>
            </div>
            <div>
              <span className={errors.laptop_image ? 'image-p-warning' : 'image-p'}>ჩააგდე ან ატვირთე<br></br>
              ლეპტოპის ფოტო</span>
            </div>
            <div className={errors.laptop_image ? 'warning-div-err-mob' : 'warning-div-mob'}>
              <img src={warning} className='warning' alt='warning'/>
            </div>
            <div>
              <label className='upload-btn' htmlFor='file-upload'>ატვირთე</label>
            </div>
          </> : null}
          <div className='image-preview' style={{
            display: image === undefined ? 'none' : 'block'
          }}>
            <img src={image} id='img-file' width='100%' height='100%' alt='laptop'/>
          </div>
        </label> 
      </div>
      {image !== undefined && <div className='img-file'>
          <div>
            <img src={tick} alt='done file'/>
            <div>
              <span>{fileName}</span>
              <span className='size'>{size}</span>
            </div>
          </div>
          <label className='upload-again' htmlFor='file-upload'>თავიდან ატვირთე</label>
      </div>}
      <div className='laptop-name-brand'>
        <div>
          <label htmlFor='laptop_name' className={errors.laptop_name && touched.laptop_name && 'label-wrong'}>ლეპტოპის სახელი</label>
          <Field type='text' name='laptop_name' 
            className={`${errors.laptop_name && touched.laptop_name ? 'input-field-red' : 'input-field'}`} 
            autoCorrect='off' 
            placeholder='HD'
          />
          <small className={`small ${errors.laptop_name && touched.laptop_name && 'small-red'}`}>
            {errors.laptop_name && touched.laptop_name ? errors.laptop_name : 'ლათინური ასოები, ციფრები, !@#$%^&*()_+='}
          </small>
        </div>
        <div>
          <Field as="select" name="laptop_brand_id" className='select-field' style={{
                border: errors.laptop_brand_id && touched.laptop_brand_id && '2px solid #E52F2F'
            }}>
            <option value="">ლეპტოპის ბრენდები</option>
            {brands.map(item => {
              return <option key={item.id} value={item.id}>{item.name}</option>
            })}
          </Field>
        </div>
      </div>
      <div className='cpu'>
        <div>
          <Field as="select" name="laptop_cpu" className='select-field' style={{
                border: errors.laptop_cpu && touched.laptop_cpu && '2px solid #E52F2F'
            }}>
            <option value="">CPU</option>
            {cpu.map(item => {
              return <option key={item.id} value={item.name}>{item.name}</option>
            })}
          </Field>
        </div>
        <div>
          <label htmlFor='laptop_cpu_cores' className={errors.laptop_cpu_cores && touched.laptop_cpu_cores && 'label-red'}>CPU-ს ბირთვი</label>
          <Field type='number' name='laptop_cpu_cores' className={`${errors.laptop_cpu_cores && touched.laptop_cpu_cores ? 'input-field-red' : 'input-field'}`}  autoCorrect='off' placeholder='14'/>
          <small className={`small ${errors.laptop_cpu_cores && touched.laptop_cpu_cores && 'small-red'}`}>
            {errors.laptop_cpu_cores && touched.laptop_cpu_cores ? errors.laptop_cpu_cores : 'მხოლოდ ციფრები'}
          </small>
        </div>
        <div>
          <label htmlFor='laptop_cpu_threads' className={errors.laptop_cpu_threads && touched.laptop_cpu_threads && 'label-red'}>CPU-ს ნაკადი</label>
          <Field type='number' name='laptop_cpu_threads' className={`${errors.laptop_cpu_threads && touched.laptop_cpu_threads ? 'input-field-red' : 'input-field'}`}  autoCorrect='off' placeholder='365'/>
          <small className={`small ${errors.laptop_cpu_threads && touched.laptop_cpu_threads && 'small-red'}`}>
            {errors.laptop_cpu_threads && touched.laptop_cpu_threads ? errors.laptop_cpu_threads : 'მხოლოდ ციფრები'}
          </small>
        </div>
      </div>
      <div className='laptop-ram-storage'>
        <div>
        <label htmlFor='laptop_ram' className={errors.laptop_ram && touched.laptop_ram && 'label-red'}>CPU-ს ნაკადი</label>
          <Field type='number' name='laptop_ram' className={`${errors.laptop_ram && touched.laptop_ram ? 'input-field-red' : 'input-field'}`}  autoCorrect='off' placeholder='365'/>
          <small className={`small ${errors.laptop_ram && touched.laptop_ram && 'small-red'}`}>
            {errors.laptop_ram && touched.laptop_ram ? errors.laptop_ram : 'მხოლოდ ციფრები'}
          </small>
        </div>
        <div className='radio-hdd-ssd'>
          <div>
            <label htmlFor='laptop_hard_drive_type' className={errors.laptop_hard_drive_type && touched.laptop_hard_drive_type && 'label-red'}>მეხსიერების ტიპი</label>
            <img src={warning} alt='warning' width='23px' height='20px' style={{
              display: errors.laptop_hard_drive_type && touched.laptop_hard_drive_type ? 'block' : 'none'
            }}/>
          </div>
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
          <label htmlFor='laptop_purchase_date'>შეძენის რიცხვი (არჩევითი)</label>
          <Field type='text' 
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")} 
            placeholder='დდ / თთ / წწწწ' className='input-field' name='laptop_purchase_date'
          />
        </div>
        <div>
          <div>
            <label htmlFor='laptop_price' className={errors.laptop_price && touched.laptop_price && 'label-red'}>ლეპტოპის ფასი</label>
            <Field type='number' onInput={(e) => {
              if (e.target.value.length > e.target.maxLength)
              e.target.value = e.target.value.slice(0, e.target.maxLength);
            }} maxLength={6} className={`${errors.laptop_price && touched.laptop_price ? 'input-field-red' : 'input-field'}`} name="laptop_price" placeholder='00.00'/>
            <img src={lariSymbol} alt='lari symbol' className='lari'/>
          </div>
        </div>
      </div>
      <div className='laptop-condition'>
          <div>
            <label htmlFor='laptop_state' className={errors.laptop_state && touched.laptop_state && 'label-red'}>ლეპტოპის მდგომარეობა</label>
            <img src={warning} alt='warning' width='23px' height='20px' style={{
              display: errors.laptop_state && touched.laptop_state ? 'block' : 'none'
            }}/>
          </div>
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
      <div className='sub-res-buttons'>
          <div>
            <div>
              <button className='btns' type='submit'>დამახსოვრება</button>
              <button className='btns btns-red' type='reset' onClick={handleReset}>წაშლა</button>
            </div>
            <div>
              <button className='btns-back' onClick={handleStepBack}>უკან</button>
            </div>
          </div>
      </div>
   </Form>
  );
};

const FormTwo = ({form, handleStepNext, handleStepBack}) => {
  const [initialValues, handleUpdateForm] = useLocalStorageState({ key: LOCAL_STORAGE_KEY, value: INITIAL_VALUES });
  
  const token = 'a7fd0975265b2120d8d0db2703f20fe7';

  const createLaptop = async (data) => {
    await axios.post('https://pcfy.redberryinternship.ge/api/laptop/create', 
      data,
      {}
    ).then(res => {
      if(res.status === 200) {
        handleStepNext()
        localStorage.clear()
      }
    })
  }

  const handleSubmit = (values) => {
    const formData = new FormData()
    const newObject = {...values}
    newObject['laptop_brand_id'] = parseFloat(newObject['laptop_brand_id'])

    formData.append('name', form.name)
    formData.append('surname', form.surname)
    formData.append('team_id', form.team_id)
    formData.append('position_id', form.position_id)
    formData.append('email', form.email)
    formData.append('phone_number', form.phone_number)
    formData.append('laptop_image', newObject.laptop_image)
    formData.append('laptop_name', newObject.laptop_name)
    formData.append('laptop_brand_id', newObject.laptop_brand_id)
    formData.append('laptop_cpu', newObject.laptop_cpu)
    formData.append('laptop_cpu_cores', newObject.laptop_cpu_cores)
    formData.append('laptop_cpu_threads', newObject.laptop_cpu_threads)
    formData.append('laptop_ram', newObject.laptop_ram)
    formData.append('laptop_hard_drive_type', newObject.laptop_hard_drive_type)
    formData.append('laptop_purchase_date', newObject.laptop_purchase_date)
    formData.append('laptop_price', newObject.laptop_price)
    formData.append('laptop_state', newObject.laptop_state)
    formData.append('token', token)

    setTimeout(() => {
      createLaptop(formData)
    }, 300)
  }

return (
  <div className='form-1-main'>
      <Formik 
          enableReinitialize 
          initialValues={initialValues} 
          onSubmit={handleSubmit}
          validationSchema={validate}
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