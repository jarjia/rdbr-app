import rdbrLogo from '../../../assets/rdbr-letter-logo.png'
import groupImg from '../../../assets/Group 1.png'
import './StartPage.css'
import { Link } from 'react-router-dom'

const StartPage = () => {
  return (
    <div className='main'>
      <div className='wrapper'>
        <div className='rdbr-logo'>
          <img src={rdbrLogo} alt='redberry logo' width='90px' height='15px' />
        </div>
        <div className='group-img'>
          <img src={groupImg} alt='group' width='550px' height='300px'/>
        </div>
        <div className='btn-div'>
          <Link to='/form'><button className='btn'>ᲩᲐᲜᲐᲬᲔᲠᲘᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ</button></Link>
          <button className='btn'>ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ</button>
        </div>
      </div>
    </div>
  )
}

export default StartPage