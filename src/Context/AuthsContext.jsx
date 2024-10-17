import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";



//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (token) {
//           const responce = await axios.get(
//             "http://localhost:3000/api/auth/verify",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           if (responce.data.success) {
//             setUser(responce.data.user);
//           }
//         } else {
//           setUser(null);
//           setLoading(false);
//         }
//       } catch (error) {
//         if (error.responce && !error.responce.data.error) {
//           setUser(null);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     verifyUser();
//   }, []);

//   const login = (user) => {
//     setUser(user);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//   };
//   return (
//     <userContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </userContext.Provider>
//   );
// };
// export const useAuth = () => useContext(userContext);
// export default ContextAuth;

const userContext = createContext();

const AuthsContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "https://ems-backend-beige.vercel.app/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        if (error.response && error.response.data.error) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = (User) => {
    setUser(User);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ login, logout, user, loading }}>
      {children}
    </userContext.Provider>
  );
};
export const useAuth = () => useContext(userContext);
export default AuthsContext;
