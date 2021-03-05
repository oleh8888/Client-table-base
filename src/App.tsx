import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useQuery,useQueryClient,useMutation}  from "react-query";
import { request, gql,GraphQLClient } from "graphql-request";
import { useForm } from "react-hook-form";

const endpoint = "https://test-task.expane.pro/api/graphql";


const getClients = async () => {
  const response = await request(endpoint,gql`{
      getClients {
        id
        firstName
        lastName
        phone
        avatarUrl
        }
    }`)
   return response;
}








function App() {
  const { register, handleSubmit,  errors } = useForm();
  const { status, data, isFetching, error } = useQuery('clients', getClients);
  const queryClient = useQueryClient()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  
  interface Variables {
    firstName : any;
    lastName: any;
  }


  const variables: Variables = {
    firstName: firstName,
    lastName: lastName
  }

  const addClients = async () => {
    const response = await request(endpoint,gql `
      mutation AddClient($firstName: String!, $lastName: String! ){
        addClient(firstName: $firstName, lastName: $lastName){
             firstName
             lastName
             phone
             avatarUrl
       }
     }`, variables)
     console.log(JSON.stringify(response, undefined, 2))
     return response
     
  }

  const mutation =  useMutation(addClients,{
    onSuccess: () => queryClient.invalidateQueries('clients'),
  })
  




  if (status === 'loading') {
    return <div>loading...</div> // loading state
  }

  if (status === 'error') {
    return <div>error</div> // error state
  }

const handle =  (data) => {
  mutation.mutate(data, {
    onSuccess: () => {
      setFirstName('')
      setLastName("");
    }
  });
   }

  return (
      <>
      <form onSubmit={handleSubmit(handle)}>
        <input type="text"   placeholder="firstName" name="firstName" ref={register} onChange={(e) => setFirstName(e.target.value)}/>
        <input  type="text"  placeholder="lastName" name="lastName"  ref={register} onChange={(e) => setLastName(e.target.value)}/>
        <input type="submit"/>
      </form>
      <div>
      <h1>Posts</h1>
      <table>
        {data.getClients.map((client,idx) =>(
          <>
        <tr key={client.id}>
          <th>firstName</th>
          <th>lastName</th>
          <th>phone</th>
        </tr>
        <tr>
          <td>{client.firstName}</td>
          <td>{client.lastName}</td>
          <td>{client.phone}</td>
       </tr>
       </>
      ) )}
      </table>
    </div>
    </>
  );
}
export default App;















// function Clients({name,setName}) {
//   const { status, data, isFetching, error,refetch: refetchUsers } = useQuery('clients', getClients)

//   // async function createNewClient() {
//   //   await createClient({ variables: { name } })
//   //   setName('')
//   //   refetchUsers()
//   // }

//   // const [createClient] = useMutation(addClients)


//   if (status === 'loading') {
//     return <div>loading...</div> // loading state
//   }

//   if (status === 'error') {
//     return <div>error</div> // error state
//   }

//   return (
    
//   );
// }

