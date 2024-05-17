import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoCadastro from './assets/file-earmark-text.png';

function App() {

  const axiosInstance = axios.create({
    httpsAgent: false
  });

  const baseUrl='http://localhost:5265/api/Cliente';

  const [data, setData]=useState([]);
  const [updateData, setupdateData] = useState(true);
  const [modalIncluir, setModalIncluir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  const [clienteSelecionado, setclienteSelecionado] = useState({
    id: '',
    nome: '',
    email: '',
    telefone: '',
  })

  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  }

  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirFecharModalExcluir = () => {
    setModalExcluir(!modalExcluir);
  }

  const selecionarcliente = (cliente, opcao) => {
    setclienteSelecionado(cliente);
    (opcao === 'Editar') ? abrirFecharModalEditar() : abrirFecharModalExcluir();
  }

  const pedidoPost = async ()=>{
    delete clienteSelecionado.id;
      await axios.post(baseUrl, clienteSelecionado)
    .then(response => {
      setData(data.concat(response.data));
      setupdateData(true);
      abrirFecharModalIncluir();
    }).catch(error => {
      console.log(error);
    })
  }
  
  const pedidoGet = async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error)
    })
  }

  const pedidoPut = async () => {
    await axios.put(baseUrl+'/'+clienteSelecionado.id, clienteSelecionado)
    .then(response => {
      var resposta = response.data;
      var dadosAuxiliar = data;
      dadosAuxiliar.map(cliente => {
        if(cliente.id === clienteSelecionado.id)
        {
          cliente.nome = resposta.name;
          cliente.email = resposta.email;
          cliente.telefone = resposta.telefone;
        }
      });
      setupdateData(true);
      abrirFecharModalEditar();
    }).catch(error => {
      console.log(error);
    })
  }

  const pedidoDelete = async () => {
    await axios.delete(baseUrl + "/" + clienteSelecionado.id)
      .then(response => {
        setData(data.filter(cliente => cliente.id !== response.data));
        setupdateData(true);
        abrirFecharModalExcluir();
      }).catch(error => {
        console.log(error);
      });
  }

  const handleChange = e=>{
    const {name, value} = e.target;
    setclienteSelecionado({
      ...clienteSelecionado, [name]:value
    });
    console.log(clienteSelecionado);
  }

  useEffect(()=>{
    if(updateData){
      pedidoGet();
      setupdateData(false);
    }
  }, [updateData])

  return (
    <div className="cliente-container">
      <br/>
      <h3>Cadastro de Clientes</h3>
      <header>
        <img src={logoCadastro} alt='Cadastro' />
        <button className='btn btn-sucess' onClick={()=>abrirFecharModalIncluir()} >Incluir Novo Cliente</button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Operações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(cliente=>(
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>
                <button className='btn btn-primary' onClick={()=> selecionarcliente(cliente, 'Editar')}> Editar</button> {" "}
                <button className='btn btn-danger' onClick={()=> selecionarcliente(cliente, 'Excluir')} >Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir clientes</ModalHeader>
        <ModalBody>
          <div className='form-gruop'>
            <label>Nome: </label>
            <input type='text' className='form-control' name='nome' onChange={handleChange}/>
            <label>Email: </label>
            <input type='text' className='form-control' name='email' onChange={handleChange}/>
            <label>Telefone: </label>
            <input type='text' className='form-control' name='telefone' onChange={handleChange}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>pedidoPost()} >Incluir</button> {" "}
          <button className='btn btn-danger' onClick={()=>abrirFecharModalIncluir()} >Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar clientes</ModalHeader>
        <ModalBody>
          <div className='form-gruop'>
            <label>ID: </label>
            <input type='text' className='form-control' disabled readOnly value={clienteSelecionado && clienteSelecionado.id} ></input>            
            <label>Nome: </label>
            <input type='text' className='form-control' name='nome' onChange={handleChange}
              value={clienteSelecionado && clienteSelecionado.nome}/>
            <label>Email: </label>
            <input type='text' className='form-control' name='email' onChange={handleChange}
              value={clienteSelecionado && clienteSelecionado.email}/>
            <label>telefone: </label>
            <input type='text' className='form-control' name='telefone' onChange={handleChange}
             value={clienteSelecionado && clienteSelecionado.telefone}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>pedidoPut()} >Editar</button> {" "}
          <button className='btn btn-danger' onClick={()=>abrirFecharModalEditar()} >Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Confirmar a exclusão do(a) cliente {clienteSelecionado && clienteSelecionado.nome}?
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={()=> pedidoDelete()}> Sim </button>
          <button className='btn btn-secondary' onClick={()=> abrirFecharModalExcluir()}> Não </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
