import './Contact.styles.css';
import editSVG from './square-pen-solid.svg';
import deleteSVG from './square-minus-solid.svg';

const Contact = () => {
    return (
        <div className='contact'>
            <span className='contact-name'>Макаев Азим</span>
            <div className='contact-features'>
                <button className='edit-feature'>
                    <img src={editSVG}/>
                </button>
                <button className='delete-feature'>
                    <img src={deleteSVG}/>
                </button>
            </div>
        </div>
    )
};

export default Contact;
