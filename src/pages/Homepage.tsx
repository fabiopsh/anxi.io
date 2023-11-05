import { useNavigate } from 'react-router-dom';

export default function Homepage() {
    const navigate = useNavigate();

    return (
        <div className='d-flex position-fixed w-100 bg-color App align-items-center justify-content-center'>
            <div className='homepage-card d-flex flex-column align-items-center p-4'>
                <h1>Anxi.io</h1>
                <h4 className='text-center'>Compila il tuo ABC per aiutarti nella terapia!</h4>
                <button className='mt-auto start-btn' onClick={()=> navigate('/module')}> CLICCA PER INIZIARE</button>
            </div>
        </div>
    )
}
