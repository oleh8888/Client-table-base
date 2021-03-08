import React, { useState } from "react";
import './App.css';
import Table from './components/Table'
import CreateModel from './components/CreateModal'
import EditModal from './components/EditModal'



function App() {
  
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState('');
  const [id, setId] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <div>
      <button onClick={() => openCreateModal ?  setOpenCreateModal(false) : setOpenCreateModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">CreateClient</button>
      <CreateModel setOpenCreateModal={setOpenCreateModal} setFirstName={setFirstName} setLastName={setLastName} setPhone={setPhone} setAvatarUrl={setAvatarUrl}
        openCreateModal={openCreateModal} firstName={firstName} lastName={lastName} phone={phone} avatarUrl={avatarUrl} id={id}/>
      <div className="flex justify-center mt-8">
        <Table setId={setId} setOpenEditModal={setOpenEditModal} setOpenCreateModal={setOpenCreateModal}/>
        <EditModal setOpenEditModal={setOpenEditModal} setFirstName={setFirstName} setLastName={setLastName} setPhone={setPhone} setAvatarUrl={setAvatarUrl} setId={setId}
          openEditModal={openEditModal} firstName={firstName} lastName={lastName} phone={phone} avatarUrl={avatarUrl} id={id}  />
      </div>
    </div>
  );
}
export default App;


