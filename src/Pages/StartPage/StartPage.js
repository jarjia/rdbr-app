import rdbrLogo from '../../assets/rdbr-letter-logo.png'
import groupImg from '../../assets/Group 1.png'
import computerImg from '../../assets/Group.png'
import './StartPage.css'
import { Link } from 'react-router-dom'

const StartPage = () => {
  return (
    <div className='main'>
      <div className='wrapper'>
        <div className='rdbr-logo'>
          <img src={rdbrLogo} alt='redberry logo' className='rdbr-logo-img' />
        </div>
        <div className='group-div-img'>
          <img src={groupImg} alt='group' className='group-img'/>
          <img src={computerImg} alt='group' className='group-img'/>
        </div>
        <div className='btn-div'>
          <Link to='/form'><button className='btn'>ᲩᲐᲜᲐᲬᲔᲠᲘᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ sadasd</button></Link>
          <Link to='/List'><button className='btn'>ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ</button></Link>
        </div>
      </div>
    </div>
  )
}

export default StartPage