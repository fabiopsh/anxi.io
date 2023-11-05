import { useRef, useState } from 'react'
import { Button, IconButton, Slider, TextField } from '@mui/material';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Modal } from 'react-bootstrap';
import generatePDF from 'react-to-pdf';
import { acbDTO } from '../types/types';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';

export default function CompileABCpage() {
    const navigate = useNavigate();
    const [data, setData] = useState<Dayjs | null>(null);
    const [whatAppened, setWhatAppened] = useState<string>("")
    const [whatInMyMind, setWhatInMyMind] = useState<string>("")
    const [beleve, setBeleve] = useState<number>(0)
    const [emotions, setEmotions] = useState<string>("")
    const [emotionsRate, setEmotionsRate] = useState<number>(0)
    const [sensation, setSensation] = useState<string>("")
    const [whatIdDo, setWhatIdDo] = useState<string>("")

    const [show, setShow] = useState(false)

    const [abc, setAbc] = useState<acbDTO | undefined>()

    const targetRef = useRef(null);

    const clearData = () => {
        setData(null)
        setWhatAppened("")
        setWhatInMyMind("")
        setBeleve(0)
        setEmotions("")
        setEmotionsRate(0)
        setSensation("")
        setWhatIdDo("")
    }

    const generateData = () => {
        setAbc({
            data: data,
            beleve: beleve,
            whatAppened: whatAppened,
            emotions: emotions,
            emotionsRate: emotionsRate,
            sensation: sensation,
            whatIdDo: whatIdDo,
            whatInMyMind: whatInMyMind
        })
        setShow(true)
    }
    return (
        <>
            <div className='d-flex position-fixed w-100 bg-color App align-items-center justify-content-center p-4'>
                <div className='d-flex flex-column p-2 module-card'>
                    <div className='overflow-scroll-app scrollbar-primary d-flex flex-column flex-1 align-items-center gap-3 p-3'>
                        <div className='close-btn-position'>
                            <IconButton onClick={() => navigate('/')}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </div>
                        <div className='typograpy-title'>Compile your ABC</div>
                        <div className='typograpy-subtitle'>A - Antecedente</div>
                        <div className='d-flex gap-3 flex-1 flex-column w-100'>
                            <div className='typograpy-label'>Data e ora</div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    value={data}
                                    onChange={(newValue) => setData(newValue)}
                                />
                            </LocalizationProvider>
                            <div className='typograpy-label'>Cosa é successo?</div>
                            <TextField
                                required
                                multiline
                                minRows={2}
                                id="outlined-required"
                                label="Cosa é successo"
                                fullWidth
                                value={whatAppened}
                                onChange={(event) => { setWhatAppened(event.target.value) }}
                            />
                        </div>
                        <div className='typograpy-subtitle'>B - Pensieri/i automatico/i</div>
                        <div className='d-flex flex-1 flex-column gap-2 w-100'>
                            <div className='typograpy-label'>Cosa mi sta passando per la mente?</div>
                            <TextField
                                required
                                multiline
                                minRows={4}
                                id="outlined-required"
                                label="Cosa mi sta passando per la mente?"
                                fullWidth
                                value={whatInMyMind}
                                onChange={(event) => { setWhatInMyMind(event.target.value) }}
                            />
                            <div className='typograpy-label'>Quanto credo a questo pensiero?</div>
                            <Slider
                                size="small"
                                max={100} min={0} aria-label="Small"
                                value={beleve}
                                color="warning"
                                onChange={(event: Event, newValue: number | number[]) => {
                                    setBeleve(newValue as number);
                                }}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div className='typograpy-subtitle'>C - Conseguenze</div>
                        <div className='d-flex flex-column gap-2 w-100'>
                            <div className='typograpy-label'>EMOTIVE</div>
                            <TextField
                                required
                                multiline
                                minRows={4}
                                id="outlined-required"
                                label="Che emozione stai provando"
                                fullWidth
                                value={emotions}
                                onChange={(event) => { setEmotions(event.target.value) }}
                            />
                            <div className='typograpy-label'>Quanto é intensa?</div>
                            <Slider
                                size="small"
                                max={100} min={0} aria-label="Small"
                                value={emotionsRate}
                                color="warning"
                                onChange={(event: Event, newValue: number | number[]) => {
                                    setEmotionsRate(newValue as number);
                                }}
                                valueLabelDisplay="auto"
                            />
                            <div className='typograpy-label'>FISIOLOGICHE</div>
                            <div className='typograpy-label'>Che sensazine fisica sto provando?</div>
                            <TextField
                                required
                                multiline
                                minRows={4}
                                id="outlined-required"
                                label="Sensazioni fisiche"
                                fullWidth
                                value={sensation}
                                onChange={(event) => { setSensation(event.target.value) }}
                            />
                            <div className='typograpy-label'>COMPORTAMENTALI</div>
                            <TextField
                                required
                                multiline
                                minRows={4}
                                id="outlined-required"
                                label="Cosa ho fatto"
                                fullWidth
                                value={whatIdDo}
                                onChange={(event) => { setWhatIdDo(event.target.value) }}
                            />
                        </div>
                        <div className='d-flex gap-3'>
                            <Button variant="outlined" color="warning" onClick={clearData}>PULISCI</Button>
                            <Button variant="contained" color="warning" onClick={generateData}>GENERA</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={show}
                size='lg'
                onHide={() => setShow(false)}
                keyboard={false}
            >
                <div className='modal-box d-flex flex-column p-3 gap-3 overflow-scroll-app scrollbar-primary'>
                    <div className='gap-3 d-flex flex-column p-4' ref={targetRef}>
                        <div className='tob-bottom-border' />
                        <div className='fw-bold'>ANXI MODULE PDF</div>
                        <div className='fw-bold'>ANTECEDENTE</div>
                        <div className='fst-italic d-flex gap-3 align-items-center'><div className='hour-label'>Data e Ora:</div> {dayjs(abc?.data).format('DD/MM/YYYY HH:mm')}</div>
                        <div className='fst-italic fw-semibold'>Cosa é successo:</div>
                        <div>{abc?.whatAppened}</div>
                        <div className='fw-bold'>PENSIERO AUTOMATICO</div>
                        <div className='fst-italic fw-semibold'>Cosa mi sta passando per la mente</div>
                        <div>{abc?.whatInMyMind} | intensitá: <b>{abc?.beleve}</b></div>
                        <div className='fw-bold'>CONSEGUENZE</div>
                        <div className='fst-italic fw-semibold'>Emotive: Che emozione sto provando e quanto é intensa da 1 a 100?</div>
                        <div className='d-flex gap-3 align-items-center'><div className='hour-label'>{abc?.emotions}</div> | intensitá: <b>{abc?.emotionsRate}</b></div>
                        <div className='fst-italic fw-semibold'>Fisiologiche: Che sensazione fisica sto provando?</div>
                        <div>{abc?.sensation}</div>
                        <div className='fst-italic fw-semibold'>Comportamentali: Cosa ho fatto?</div>
                        <div>{abc?.whatIdDo}</div>
                        <div className='tob-bottom-border' />
                    </div>
                    <Button variant="contained" color="warning" className='align-self-baseline mt-auto ms-auto' onClick={() => generatePDF(targetRef, { filename: 'documentoABC.pdf' })}>DOWNLOAD PDF</Button>
                </div>
            </Modal>
        </>
    )
}
