import React, {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import './RegFrom.styles.css';

const RegFrom = () => {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmedPassword, setConfirmedPassword] = React.useState('');
    const [showRegForm, setShowRegForm] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');

    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const formObj = {
        name: login,
        password: password
    };

    const registerHandler = async (event) => {
        event.preventDefault();
        if(confirmedPassword.length && login.length) {
            if(password && password === confirmedPassword) {
                const isExist = await request('users?name=' + login);
                console.log(isExist);
                if(isExist.length) return setErrorMessage('Пользователь уже существует');

                const data = await request('users', 'POST', {...formObj})
                auth.login(data.id, data.name);
                setSuccessMessage('Регистрация произведена успешно!');
                setErrorMessage(null);
                setTimeout(() => setShowRegForm(false), 5000);
            }
            else setErrorMessage('Введенные пароли не совпадают!');
        } 
        else setErrorMessage('Вы не ввели логин или пароль');
    };

    const loginHandler = async (event) => {
        event.preventDefault();
        if(!login || !password) setErrorMessage('Введите логин и пароль');
        else if(login && password) {
            const data = await request('users?name=' + login);
            if(!data.length) return setErrorMessage('Вы ввели неверный логин');
            if(data[0].password !== password) return setErrorMessage('Вы ввели неверный пароль');

            auth.login(data[0].id, data[0].name);
        };
    }

    return (
        <div className='form-container'>
            { showRegForm ? 
                <form className='registration-form' onSubmit={(event) => registerHandler(event)}>
                    <h3>Введите логин и пароль</h3>
                    {errorMessage.length ? <span id='error-message'>{errorMessage}</span> : null}
                    {successMessage.length ? <span id='success-message'>{successMessage}</span> : null}
                    <label>
                        <input type="text" value={login} placeholder='Логин' onChange={(event) => setLogin(event.target.value)}/>
                    </label>
                    <label>
                    <input type='password' value={password} placeholder='Пароль' onChange={(event) => setPassword(event.target.value)}/>
                    </label>
                    <label>
                    <input type='password' value={confirmedPassword} placeholder='Введите пароль повторно' onChange={(event) => 
                        setConfirmedPassword(event.target.value)}/>
                    </label>
                    <div className='buttons'>
                    <input id='reg-button' type='submit' value='Регистрация' />
                    </div>
                </form> 
                :
                <form className='registration-form' onSubmit={(event) => loginHandler(event)}>
                    <h3>Добро пожаловать!</h3>
                    {errorMessage.length ? <span id='error-message'>{errorMessage}</span> : null}
                    <label>
                        <input type="text" value={login} placeholder='Логин' onChange={(event) => setLogin(event.target.value)}/>
                    </label>
                    <label>
                        <input type='password' value={password} placeholder='Пароль' onChange={(event) => setPassword(event.target.value)}/>
                    </label>
                    <div className='buttons'>
                        <input id='auth-button' type='submit' value='Войти'/>
                        <input id='reg-button' type='button' value='Регистрация' onClick={() => setShowRegForm(true)}/>
                    </div>
                </form> 
            }
        </div>
    );
};

export default RegFrom;
