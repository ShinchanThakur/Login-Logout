import React from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const loginHandler = (email, password) => {
  //   setIsLoggedIn(true);
  //   localStorage.setItem('isLoggedIn', 'true');
  // };

  // const logoutHandler = () => {
  //   setIsLoggedIn(false);
  //   localStorage.setItem('isLoggedIn', 'false');
  // };

  // useEffect(() => {
  //   if (localStorage.getItem('isLoggedIn') === 'true')
  //     setIsLoggedIn(true);
  // }, [])

  // return (
  //   <AuthContext.Provider value={{
  //     isLoggedIn: isLoggedIn,
  //     onLogout: logoutHandler
  //   }}>
  //     <MainHeader />
  //     <main>
  //       {/* We are not using context in the below 2 components because they don't have prop chain
  //        They are directly using the props*/}
  //       {!isLoggedIn && <Login onLogin={loginHandler} />}
  //       {isLoggedIn && <Home onLogout={logoutHandler} />}
  //     </main>
  //   </AuthContext.Provider >
  // );

  const ctx = React.useContext(AuthContext);
  return (
    <>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </>
  )
}

export default App;
