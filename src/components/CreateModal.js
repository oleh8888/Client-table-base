import { useForm } from "react-hook-form";
import {useQueryClient,useMutation}  from "react-query";
import {gql} from "graphql-request";

import { expaneClient } from '../App'

const CreateModal = ({
    setOpenCreateModal, setFirstName, setLastName, setPhone,setAvatarUrl,
    openCreateModal, firstName, lastName, phone, avatarUrl, id                   
    }) => {

    const { register, handleSubmit,  errors } = useForm();
    const queryClient = useQueryClient()

    interface Variables {
      id: String;
      firstName : String;
      lastName: String;
      phone: String;
      avatarUrl: String;
    }
    const variables: Variables = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      avatarUrl: avatarUrl
    }

      const addClients = async () => {
        const response = await expaneClient.request(gql `
          mutation AddClient($firstName: String!, $lastName: String!,$phone: String, $avatarUrl: String){
            addClient(firstName: $firstName, lastName: $lastName, phone: $phone, avatarUrl: $avatarUrl){
              id
                firstName
                lastName
                phone
                avatarUrl
          }
        }`, variables)
         console.log(JSON.stringify(response, undefined, 2));
         return response;
        }
    
      const addClientMutuation =  useMutation(addClients,{
        onSuccess: () => queryClient.invalidateQueries('clients')
        })
    
    const handleNewClient =   (data) => {
       addClientMutuation.mutate(data, {
        onSuccess: () => {
          setFirstName("")
          setLastName("")
          setPhone("")
          setAvatarUrl("")
          console.log(data)
          setOpenCreateModal(false)
        }});
    }

    const required = "This field is required";
    const maxLength = "Your input exceed maximum length";
    const minLength = "Your input exceed minimum length";

    const errorMessage = error => {
      return <div className="uncorrect-response">{error}</div>;
    };
   
    return (
      <div className="create-modal">
        {openCreateModal && 
          <form onSubmit={handleSubmit(handleNewClient)}>
            <input type="text"   placeholder="firstame" name="firstName" ref={register({ required: true, maxLength: 18, minLength: 2})} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              {errors.firstname && errors.firstname.type === "required" && errorMessage(required)}
              {errors.firstname && errors.firstname.type === "maxLength" && errorMessage(maxLength)}
              {errors.firstname && errors.firstname.type === "minLength" && errorMessage(minLength)}
            <input  type="text"  placeholder="lastname" name="lastName"  ref={register({ required: true, maxLength: 18, minLength: 2})} value={lastName} onChange={(e) => setLastName(e.target.value)}/>
              {errors.lastname && errors.lastname.type === "required" && errorMessage(required)}
              {errors.lastname && errors.lastname.type === "maxLength" && errorMessage(maxLength)}
              {errors.lastname && errors.lastname.type === "minLength" && errorMessage(minLength)}
            <input  type="text"  placeholder="phone" name="phone"  ref={register({ required: true, maxLength: 15, minLength: 8})} value={phone} onChange={(e) => setPhone(e.target.value)}/>
              {errors.phone && errors.phone.type === "required" && errorMessage(required)}
              {errors.phone && errors.phone.type === "maxLength" && errorMessage(maxLength)}
              {errors.phone && errors.phone.type === "minLength" && errorMessage(minLength)}
              {/* <input  type="text"  placeholder="avatarUrl" name="avatarUrl"  ref={register()} value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)}/>
                  {errors.avatarUrl && errors.avatarUrl.type === "required" && errorMessage(required)}
                  {errors.avatarUrl && errors.avatarUrl.type === "maxLength" && errorMessage(maxLength)} */}
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</button>
          </form>
        }
      </div>
    );
    
}

export default CreateModal;