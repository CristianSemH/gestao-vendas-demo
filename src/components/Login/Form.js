import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Alert from '../../components/custom/alert';
import { LoginUser } from '../../services/usuario'
import { useNavigate } from 'react-router-dom';
import StoreContext from '../context/Context';


const FormLogin = () => {

    const [MesssagesError, setMesssagesError] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit } = useForm()

    const { setToken } = useContext(StoreContext)

    const navigate = useNavigate()

    const handleLogin = async (user) => {
        setIsLoading(true)
        setMesssagesError([])

        await LoginUser(user).then(Result => {
            if (Result.code) {
                if (Result.code === 'ERR_BAD_REQUEST') {
                    setMesssagesError(Result.response.data)
                }
            } else {
                if (Result.token) {
                    console.log('set: ' + Result.token)
                    setToken(Result.token)
                    navigate('/home')
                }
            }
        }).catch(err => {
            console.log(err)
        });
    }

    return (
        <div className="main-login-container">
            <div className="main-login">
                <div className='main-login-banner'>
                    <h3>Sistema de gestão de vendas</h3>
                </div>
                <div className='main-login-form position-relative'>
                    <div className="position-absolute end-0 top-0 m-2">
                        {MesssagesError.length > 0 && (MesssagesError.map((e, index) => {
                            return <Alert key={index} TitleAlert="" MessageAlert={e.message}></Alert>
                        }))
                        }
                    </div>
                    <div className='main-login-form-container'>
                        <h1>Login</h1>
                        <form className='login-form' onSubmit={handleSubmit(handleLogin)}>

                            <div className='mb-3'>
                                <input placeholder='Usuário' type="text" {...register("usuario")} value="admin.demo" disabled />
                            </div>

                            <div className='mb-3'>
                                <input placeholder='Senha' type="password" {...register("senha")} value="admin.demo" disabled />
                            </div>

                            <div className='mb-3'>
                                <button className='' type="submit">
                                    {!isLoading ?
                                        'Entrar'
                                        :
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FormLogin;