import { useForm } from "react-hook-form";
import {useQueryClient,useMutation}  from "react-query";
import {gql,request} from "graphql-request";

const endpoint = "https://test-task.expane.pro/api/graphql";

const EditModal = ({
    setOpenEditModal, setFirstName, setLastName, setPhone,setAvatarUrl, setId,
    openEditModal, firstName, lastName, phone, avatarUrl,id
}) => {
    const { register, handleSubmit,  errors } = useForm();

    const queryClient = useQueryClient()
    const showHideModal = openEditModal ? "modal display-block" : "modal display-none";
    
    const idVarible = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        avatarUrl: avatarUrl
      }
      

      
    const updateClients = async () => {
        const response = await request(endpoint,gql`
        mutation updateClient($id: ID! $firstName: String!, $lastName: String!,$phone: String, $avatarUrl: String){
          updateClient(id:$id,  firstName: $firstName, lastName: $lastName, phone: $phone, avatarUrl: $avatarUrl){
            id
            firstName
            lastName
            phone
            avatarUrl
          }
        }`, idVarible) 
          console.log(JSON.stringify(response, undefined, 2))
      }

    const updateClientMutuation = useMutation(updateClients,{
        onSuccess: () => queryClient.invalidateQueries('clients')
      })
    
    const handleUpdateClient =  (data) => {
      setOpenEditModal(false)
      updateClientMutuation.mutate(data, {
        onSuccess: () => {
         setId('')
         setFirstName('')
         setLastName('');
         setPhone('')
        }
      })
     }

     const required = "This field is required";
     const maxLength = "Your input exceed maximum length";
     const minLength = "Your input exceed minimum length";
 
     const errorMessage = error => {
       return <div className="uncorrect-response">{error}</div>;
     };

    return (
    <>
        {openEditModal && (
        <div className={showHideModal}>
            <div className="modal-main">
                <form onSubmit={handleSubmit(handleUpdateClient)}>
                  <input type="text"   placeholder="firstname" name="firstname" value={firstName} ref={register({ required: true, maxLength: 18, minLength: 2})} onChange={(e) => setFirstName(e.target.value)}/>
                    {errors.firstname && errors.firstname.type === "required" && errorMessage(required)}
                    {errors.firstname && errors.firstname.type === "maxLength" && errorMessage(maxLength)}
                    {errors.firstname && errors.firstname.type === "minLength" && errorMessage(minLength)}    
                  <input  type="text"  placeholder="lastname" name="lastName" value={lastName} ref={register({ required: true, maxLength: 18, minLength: 2})} onChange={(e) => setLastName(e.target.value)}/>
                    {errors.lastname && errors.lastname.type === "required" && errorMessage(required)}
                    {errors.lastname && errors.lastname.type === "maxLength" && errorMessage(maxLength)} 
                    {errors.lastname && errors.lastname.type === "minLength" && errorMessage(minLength)}   
                  <input  type="text"  placeholder="phone" name="phone"   value={phone} ref={register({ required: true, maxLength: 15, minLength: 8})} onChange={(e) => setPhone(e.target.value)}/>
                    {errors.phone && errors.phone.type === "required" && errorMessage(required)}
                    {errors.phone && errors.phone.type === "maxLength" && errorMessage(maxLength)}
                    {errors.phone && errors.phone.type === "minLength" && errorMessage(minLength)}
                  <button type="submit" name="id"  ref={register} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                </form>
            </div>
        </div>
        )}
    </>
    );
}


export default EditModal