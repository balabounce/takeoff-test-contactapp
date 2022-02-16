import Contact from '../Contact/Contact.component';
import './ContactList.styles.css';
import addSVG from './circle-plus-solid.svg';

const ContactList = () => {
    return (
        <div className='contacts-container'>
            <h1>Контакты</h1>
            <div className='contact-list'>
                <Contact/>
                <Contact/>
            </div>
            <button className='add-contact-btn'>
                <img src={addSVG} alt='add'/>
            </button>
        </div>
    );
};

export default ContactList;
