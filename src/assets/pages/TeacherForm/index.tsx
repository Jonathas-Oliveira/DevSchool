import React,{useState, FormEvent} from 'react'
import PageHeader from '../../components/PageHeader'
import './style.css'
import Input from '../../components/input'
import warningIcon from '../../images/icons/warning.svg'
import Textarea from '../../components/Textarea/index'
import Select from '../../components/select'
import api from '../../../services/api'
import {useHistory} from 'react-router-dom'
function TeacherForm (){
    const history = useHistory()
    const [name,setName] = useState('')
    const [avatar,setAvatar] = useState([].toString())
    const [bio,setBio] = useState([].toString())
    const [whatsapp,setwhatsapp] = useState('')
    const [scheduleItems,setScheduleItems] = useState([
        {week_day:0,from: '',to:''}
    ])
    const [subject,setsubject] = useState('')
    const [cost,setcost] = useState('')

    const url = 'https://api.github.com/users'
    
    function GetUsers(){
        GetAddres()
        
        return
    }
    async function GetAddres(){
        const hostName = (document.getElementById('avatar') as HTMLInputElement)
        const hostBio = (document.getElementById('bio') as HTMLInputElement)
        const profileResponse = await fetch(`${url}/${name}`)
        .then(resp => resp.json())
        .then(Data =>{ 
            
            if(Data.avatar_url !== undefined){
                hostName.value = Data.avatar_url
                hostBio.value= Data.bio
                setAvatar(Data.avatar_url)
                setBio(Data.bio)

            }else{
                hostName.value = 'Digite username válido!'
                hostBio.value = 'Digite username válido!'
            }
            
        })
        
    }
    
    
    
    
    function setScheduleItemValue(position:Number,field:string,value:string){
        const UpdateScheduleItem = scheduleItems.map((scheduleItem,index) =>{
            if(index === position){
                return {...scheduleItem, [field]:value}
            }
            return scheduleItem
        })
        setScheduleItems(UpdateScheduleItem)
    }

    function HandleCreateClass(e:FormEvent){
        e.preventDefault()
        api.post('classes',{
            name,
            whatsapp,
            avatar,
            bio,
            subject,
            cost: Number(cost),
            schedule : scheduleItems
        }).then(() =>{
            alert('Cadastro realizado com sucesso!')
            history.push('/')
        }).catch(() =>{
            alert('Erro no cadastro!')
        })

        console.log(name,
            avatar,
            bio,
            scheduleItems,
            cost,
            whatsapp)
    }

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            {week_day:0,from: '',to:''}
        ])
        
        scheduleItems.push()
    }
    
    
    return (
        <div id='page-teacher-form' className="container">
            <PageHeader 
            title='Que incrível que você quer dar aulas.'
            description='O primeiro passo é preencher este formulário de inscrição'
            ></PageHeader>
            <main>
                <form action="" onSubmit={HandleCreateClass}>
                <fieldset>
                    <legend > Seus dados </legend>
                    <button onClick={e =>GetUsers()}   className='auto'type='button'>Auto</button>
                    <br/>  
                    <Input id='name' name='name' label='Nome '
                    
                    value={name} onChange={(e) =>{setName(e.target.value)}}></Input>
                    
                    <Input name='avatar' label='Avatar'
                     id='avatar'
                   
                    /*onChange={(e) => {console.log(e.target.value)}}*/></Input>
                    
                    <Input name='whatsapp' label='WhatsApp'
                     value={whatsapp}
                    onChange={(e) =>{setwhatsapp(e.target.value)}}></Input>
                    
                    <Textarea id='bio' name='bio' label='Biografia'
                    /*onChange={(e) =>{setBio(e.target.value)}}*/></Textarea>
                </fieldset>
                <fieldset>
                    <legend> Sobre a aula</legend>
                    <Select name='subject' label='Techs'
                    value={subject} 
                    onChange={(e) =>{setsubject(e.target.value)}}
                    options={[
                        {value: 'Javascript', label:'Javascript'},
                        {value: 'Python', label:'Python'},
                        {value: 'Typescript', label:'Typescript'},
                        {value: 'Angular', label:'Angular'},
                        {value: 'React', label:'React'},       
                        ]}></Select>
                    <Input 
                    value={cost} 
                    onChange={(e) =>{setcost(e.target.value)}}
                    name='cost' 
                    label='Custo da sua hora por aula'
                    ></Input>        
                
                </fieldset>
                
                <fieldset>
                    <legend>
                        Horários dísponiveis
                        <button type='button' onClick={addNewScheduleItem}>+ Novo horário</button>
                    </legend>
                   {scheduleItems.map((scheduleItem,index) =>{
                       return(
                        <div key={scheduleItem.week_day}className="schedule-item">
                        <Select 
                        onChange={e => setScheduleItemValue(index,'week_day', e.target.value)}
                        name='week_day' label='Dia da semana'
                         options={[
                             {value: '0', label:'Domingo'},
                             {value: '1', label:'Segunda-feira'},
                             {value: '2', label:'Terça-feira'},
                             {value: '3', label:'Quarta-feira'},
                             {value: '4', label:'Quinta-feira'},
                             {value: '5', label:'Sexta-feira'},
                             {value: '6', label:'Sábado'},       
                             ]}
                             value={scheduleItem.week_day}
                             />
                        

                         <Input name='from' label='Das' type='time'
                         onChange={e => setScheduleItemValue(index,'from', e.target.value)}
                         value={scheduleItem.from}
                         />                         
                         <Input name='to' label='Até' type='time'
                         onChange={e => setScheduleItemValue(index,'to', e.target.value)}
                         value={scheduleItem.to}
                         />
     
                        </div>
                       )
                   })}
                </fieldset>
                <footer>
                   
                    <p>
                        <img src={warningIcon} alt=""/>
                        Importante! <br/>
                        Preencha todos os dados.
                    </p>
                    <button type='submit'>Salvar cadastro</button>
                </footer>
                </form>
            </main>
        </div>
        
    )
}

export default TeacherForm