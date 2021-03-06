import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { Link, useHistory } from 'react-router-dom'

export default function Read(){
    const [ data, setData ] = useState([])

    const history = useHistory()

    async function loadDisciplinas(){
        const response = await api.get('/disciplina/list')
        setData(response.data)

        console.log(response.data)
    }

    useEffect(()=>{
        loadDisciplinas()
    },[])

    function handleDeleteDisciplinas(e){
        console.log(`/disciplina/delete/${e.target.value}`)
        api.delete(`/disciplina/delete/${e.target.value}`).then(
            ()=>{
                alert("Deu tudo certo")
                history.push('/')
            }
        ).catch((error)=>{
            alert(error)
        })
    }

    return(
        <div className="page">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Disciplina</th>
                        <th scope="col">Curso</th>
                        <th scope="col">Capacidade</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((info) => {
                            return(
                                <tr key={info._id}>
                                    <td>{info.nome}</td>

                                    <td>{info.curso}</td>

                                    <td>{info.capacidade}</td>

                                    <td><button className="buttonDelete" value={info._id} onClick={handleDeleteDisciplinas}>Apagar</button></td>
                                    <td><Link className="buttonEdit" to={()=>{
                                        return("/edit/"+info._id)
                                    }}>Editar</Link></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link className="btn btn-primary" to="/">To Home</Link>
        </div>
    )
} 
