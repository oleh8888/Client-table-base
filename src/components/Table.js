import { useQuery}  from "react-query";
import { request, gql} from "graphql-request";


const endpoint = "https://test-task.expane.pro/api/graphql"

const Table = ({setId,setOpenEditModal,setOpenCreateModal}) => {
 

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
const { status, data} = useQuery('clients', getClients);


   
const OpenEditFormModal = (e) => {
  setOpenEditModal(true)
  setOpenCreateModal(false)
  setId(e.target.value)
}




 

    if (status === 'loading') {
        return <div>loading...</div> 
      }

    if (status === 'error') {
        return <div>error</div>
      }

    return(
      <div className="flex flex-col w-full">
      <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
        <tr>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">firstName</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">lastName</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">phone</th>
          {/* <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">avatarUrl</th> */}
        </tr>
        {data.getClients.map((client,idx) =>(
          <tbody className="bg-white divide-y divide-gray-200">
          <tr key={client.id}>
          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{client.firstName}</td>
          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{client.lastName}</td>
          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{client.phone}</td>
          {/* <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{client.avatarUrl}</td> */}
          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"><button value={client.id} onClick={(e)=> OpenEditFormModal(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button></td>
       </tr>
       </tbody>
      ) )}
       </table>
       </div>
  </div>
  </div>
    );
}

export default Table;