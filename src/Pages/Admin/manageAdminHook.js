import { fetchApi } from '../../../services/admin';

export const manageAdminHook = () => {
  // Generalized function to get users based on the endpoint
  const fetchGraphValues = async (endpoint) => {
    try {
      const response = await fetchApi(endpoint);
      if (response && response.status === 'success') {
        return response.data;
      } else {
        console.log(response.error || 'Unknown error');
        return null;
      }
    } catch (error) {
      console.error('An error occurred while fetching users:', error);
      return null;
    }
  };

  // Specific user fetching functions using the generalized function
  // const getUser = async () => await fetchGraphValues('/Api/User/getUsers');
  // const getUser1 = async () => await fetchGraphValues('/Api/User/getUsers1');
  // const getUser2 = async () => await fetchGraphValues('/Api/User/getUsers2');
  // const getUser3 = async () => await fetchGraphValues('/Api/User/getUsers3');
  // const getUser4 = async () => await fetchGraphValues('/Api/User/getUsers4');
  // const getUser5 = async () => await fetchGraphValues('/Api/User/getUsers5');
  const getTransactions = async () => await fetchGraphValues('/Api/Transaction/getTransactions');
  // const getTransactions1 = async () => await fetchGraphValues('/Api/Transaction/getTransactions1');
  // const getTransactions2 = async () => await fetchGraphValues('/Api/Transaction/getTransactions2');
  // const getTransactions3 = async () => await fetchGraphValues('/Api/Transaction/getTransactions3');
  // const getTransactions4= async () => await fetchGraphValues('/Api/Transaction/getTransactions4');
  // const getTransactions5 = async () => await fetchGraphValues('/Api/Transaction/getTransactions5');
  const getMonthlyTransactions = async () => await fetchGraphValues('/Api/Transaction/getMonthlyTransactions');
  const getProducts = async () => await fetchGraphValues('/Api/Products/getProducts');



   
 
   
 


  return {
    // getUser,
    // getUser1,
    // getUser2,
    // getUser3,
    // getUser4,
    // getUser5,
    getTransactions ,
    // getTransactions1,
    // getTransactions2 ,
    // getTransactions3 ,
    // getTransactions4,
    // getTransactions5 ,
    getMonthlyTransactions,
    getProducts ,
  };
};







  
  