import React, {useEffect, useState} from 'react';
import 'date-fns';
import axios from 'axios';
import '../styles/scss/dash.scss'
import {Spinner} from 'react-bootstrap'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InfoIcon from '@material-ui/icons/Info';
import {format} from 'date-fns';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Button, FormControl, FormControlLabel, FormLabel, IconButton, Input, InputLabel, Radio, RadioGroup, TableSortLabel} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LoopIcon from '@material-ui/icons/Loop';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import _ from "lodash";
import placeholder from "lodash/fp/placeholder";

export default () => {
    let [users, setUsers] = useState([]);
    let [user, setUser] = useState({});
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [gender, setGender] = useState('');
    let [phone, setPhone] = useState('');
    let [dob, setDob] = useState(new Date());
    let [nat, setNat] = useState('');
    let [text, setText] = useState('');
    let [type, setType] = useState('name.first');
    let [page, setPage] = useState(50);
    let [open, setOpen] = useState(false);
    let [isLoading, updateLoading] = useState(true)
    let [sortingName, updateSortingName] = useState('asc')
    let [sortingGender, updateSortingGender] = useState('asc')
    let base_url = process.env.REACT_APP_API_URL || 'http://localhost:5001';
    const getList =  async (parameter) => {
        axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
        await axios.get(base_url + "/users?from=" + parameter)
            .then((response) => {
                setUsers([...users, ...response.data.users])
                if (users === undefined) {
                    updateLoading(true)
                } else {
                    updateLoading(false)
                }
            })
    }

    const getUser =  async (parameter) => {
        axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
        await axios.get(base_url + "/users/" + parameter)
            .then((response) => {
                setUser(response.data.user)
            })
    }

    const searchUser =  async (content) => {
        axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
        await axios.post(base_url + "/search_user/", content)
            .then((response) => {
                toast.info('Searching for users!')
                console.log(response.statusText)
                setUsers(response.data.users)
            }).catch(() => toast.error('Nothing found, try again!'))

    }

    const deleteUser =  async (parameter) => {
        axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
        await axios.delete(base_url + "/users/" + parameter)
            .then((response) => {
            })
    }

    const editUser =  async (user_id, content) => {
        axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
        await axios.put(base_url + "/users/" + user_id, content)
            .then((response) => {
            })
    }

    // load table data
    useEffect(async () => {
        if (users.length === 0) {
            await getList();
        }
    }, [users])

    const handleLoad = async () => {
        if(text){
            if(page > users.length){
                toast.success('All users found!')
            }
        }else{
            await getList(page)
            setPage(page + 50)
        }

    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInfo = async (user) => {
        await getUser(user._id)
        handleOpen()
    }

    const handleDelete = async (id) => {
        await deleteUser(id)
        handleClose()
        initialState()
        toast.warning('User deleted successfully!')
    }

    const handleEdit = async (firstName, lastName, email, gender, phone, nat, dob) => {
        let editedFields = {
            name_first: firstName,
            name_last: lastName,
            phone: phone,
            email: email,
            nat: nat,
            gender: gender,
            dob: dob
        }
        await editUser(user._id, editedFields)
        handleClose()
        initialState()
        toast.success('User edited successfully!')
    }

    const initialState = () => {
        setGender('')
        setFirstName('')
        setLastName('')
        setNat('')
        setDob(new Date())
        setPhone('')
        setEmail('')
        setUsers([])
        setText('')
    }

    const handleNameSort = () => {
        let sortedUsers = users
        sortedUsers = _.orderBy(sortedUsers, ['name.first'], sortingName)
        setUsers(sortedUsers)
        if(sortingName === 'asc'){
            updateSortingName('desc')
        }else{
            updateSortingName('asc')
        }
    }

    const handleGenderSort = () => {
        let sortedUsers = users
        sortedUsers = _.orderBy(sortedUsers, ['gender'], sortingGender)
        setUsers(sortedUsers)
        if(sortingGender === 'asc'){
            updateSortingGender('desc')
        }else{
            updateSortingGender('asc')
        }
    }

    const handleSearch = async (text, type) => {
        let request_body = {
            query: text,
            type: type
        }
        await searchUser(request_body)
    }

    const userInfo = (props) => {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div style={{border: '2px solid black', width: 'auto', height: 'auto', background:"#532bc1"}}>
                        <form className={"form"} style={{margin:"1vw"}}>
                            <div style={{display: 'flex', direction: 'row', justifyContent: 'center', justifyItems:'center', marginBottom: '2vh'}}>
                                <img src={props.picture.large}></img>
                            </div>
                            <div style={{display: 'flex', direction: 'row', justifyContent: 'center', justifyItems:'center', marginTop: '5vh'}}>
                                <div>
                                    <InputLabel style={{marginBottom: '1vh', marginRight: '1vw',  color: '#7ffff9'}} >First Name:</InputLabel>
                                    <Input placeholder={props.name.first} style={{marginBottom: '1vh', marginRight: '1vw',  color: '#7ffff9'}} value={firstName} onChange={e => setFirstName(e.target.value)} variant={"outlined"}/>
                                    <InputLabel style={{marginBottom: '1vh', marginRight: '1vw',  color: '#7ffff9'}} >Last Name:</InputLabel>
                                    <Input placeholder={props.name.last} style={{marginBottom: '1vh', marginRight: '1vw',  color: '#7ffff9'}} value={lastName} onChange={e => setLastName(e.target.value)} variant={"outlined"}/>
                                    <InputLabel style={{marginBottom: '1vh', marginRight: '1vw',  color: '#7ffff9'}} >Gender:</InputLabel>
                                    <Input placeholder={props.gender} style={{marginBottom: '1vh', marginRight: '1vw',  color: '#7ffff9'}} value={gender} onChange={e => setGender(e.target.value)}  variant={"outlined"}/>
                                    <InputLabel style={{marginBottom: '1vh', marginRight: '1vw',  color: '#7ffff9'}} >Email:</InputLabel>
                                    <Input placeholder={props.email} style={{width:"auto",marginBottom: '1vh', marginRight: '1vw',  color: '#7ffff9'}} value={email} onChange={e => setEmail(e.target.value)} variant={"outlined"}/>
                                </div>
                                <div>
                                    <InputLabel style={{marginBottom: '1vh', marginRight: '1vw',  color: '#7ffff9'}} >Phone:</InputLabel>
                                    <Input placeholder={props.phone} style={{marginBottom: '1vh', marginRight: '1vw',  color: '#7ffff9'}} value={phone} onChange={e => setPhone(e.target.value)}  variant={"outlined"}/>
                                    <InputLabel style={{marginBottom: '1vh', marginRight: '1vw',  color: '#7ffff9'}} >Nationality:</InputLabel>
                                    <Input placeholder={props.nat} style={{marginBottom: '1vh', marginRight: '1vw',  color: '#7ffff9'}} value={nat} onChange={e => setNat(e.target.value)} variant={"outlined"}/>
                                    <InputLabel style={{marginBottom: '1vh', marginRight: '1vw',  color: '#7ffff9'}} >Birthday:</InputLabel>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                        <KeyboardDatePicker variant="inline" value={dob} onChange={e => setDob(e)} InputProps={{style: {color: '#7ffff9'}}}/>
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                            <div style={{display: 'flex', direction: 'row', justifyContent: 'center', justifyItems:'center', marginTop: '5vh'}}>
                                <Button variant="contained" color={'primary'} disableElevation style={{ width: "auto", padding: "1vh", marginLeft:"3vh",  color: '#7ffff9', background:'#21086d'}} endIcon={<SaveIcon/>} onClick={() => handleEdit(firstName, lastName, email, gender, phone, nat, dob)} > Save </Button>
                                <Button variant="contained" color={'primary'} disableElevation style={{ width: "auto", padding: "1vh", marginLeft:"3vh",  color: '#7ffff9', background:'#21086d'}} endIcon={<DeleteForeverIcon/>} onClick={() => handleDelete(props._id)} > Delete </Button>
                            </div>

                        </form>
                    </div>
                </Fade>
            </Modal>
        )
    }

    const userTable = (props) => {
        return (
        <div className={"table-div"}>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                    <TableHead >
                        <TableRow >
                            <TableCell style={{background:"#21086d", color:'#7ffff9', fontSize:'1.5rem'}} align="left">
                                <TableSortLabel onClick={() => handleNameSort()} direction={sortingName} style={{color: '#7ffff9'}}>
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell style={{background:"#21086d", color:'#7ffff9', fontSize:'1.5rem'}} align="left">
                                <TableSortLabel onClick={() => handleGenderSort()} direction={sortingGender} style={{color: '#7ffff9'}}>
                                    Gender
                                </TableSortLabel>
                            </TableCell>
                            <TableCell style={{background:"#21086d", color:'#7ffff9', fontSize:'1.5rem'}} align="left">Birth</TableCell>
                            <TableCell style={{background:"#21086d", color:'#7ffff9', fontSize:'1.5rem'}} align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {props.map((row) => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell style={{fontSize:'1.5rem'}}>
                                        {`${row.name.first} ${row.name.last}`}
                                    </TableCell>
                                    <TableCell  align="left" style={{fontSize:'1.5rem'}}>
                                        {row.gender}
                                    </TableCell>
                                    <TableCell align="left" style={{fontSize:'1.5rem'}}>
                                        {format(new Date(row.dob.date),'dd/MM/yyyy')}
                                    </TableCell>
                                    <TableCell align="left" style={{fontSize:'1.5rem'}}>
                                        <IconButton variant="contained" disableElevation onClick={() => handleInfo(row)} style={{color: '#21086d'}} > <InfoIcon/> </IconButton>
                                    </TableCell>
                                </TableRow>
                                );
                        })}
                    </TableBody>
                </Table>
                <Button variant={'contained'} size={'large'} style={{margin: '2vh auto', display:'flex', color: '#7ffff9', background:'#21086d'}} endIcon={<LoopIcon/>} onClick={handleLoad} >Load More </Button>
            </TableContainer>
        </div>
            )
    }

    return (
        <div>
            <ToastContainer limit={1}/>
            <div style={{display: 'flex', marginTop: '2vh'}}>
                <Input  placeholder=" Search here..." fullWidth={true}  style={{margin:"1vh", fontSize: "1.5rem",color: '#21086d', background:'white', height:'10vh'}} value={text} onChange={e => setText(e.target.value)}/>
                <Button variant="contained" disableElevation style={{margin: '1vh ', display:'flex', color: '#7ffff9', background:'#21086d', height:'10vh'}} onClick={() => handleSearch(text, type)}> <SearchIcon/> </Button>
                <Button variant={'contained'} disableElevation style={{margin: '1vh ', display:'flex', color: '#7ffff9', background:'#21086d', marginLeft: '1vw', height:'10vh'}}  onClick={initialState}> <HighlightOffIcon/> </Button>
                <FormControl  row component="fieldset" fullWidth={true} style={{margin: '1vh'}}>
                    <FormLabel>Search Filter:</FormLabel>
                    <RadioGroup row value={type} onChange={e => setType(e.target.value)}>
                        <FormControlLabel value="name.first" control={<Radio />} label="First Name" />
                        <FormControlLabel value="nat" control={<Radio />} label="Nationality" />
                    </RadioGroup>
                </FormControl>
            </div>

            {isLoading ? <div><Spinner animation="border" variant={"info"}/></div> : userTable(users)}
            {open ? userInfo(user) : <div/>}

        </div>
    )

}
