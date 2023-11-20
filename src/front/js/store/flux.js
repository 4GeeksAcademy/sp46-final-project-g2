import { loadStripe } from '@stripe/stripe-js';

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwMDQxODQ5MSwianRpIjoiOGQ5MzA1NjctYzhiYi00ZjA1LWE5YzMtMWU5ZDhiYTY4MjAwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6WzIsZmFsc2UsMiwxLG51bGxdLCJuYmYiOjE3MDA0MTg0OTEsImV4cCI6MTcwMDQxOTM5MX0.-7eV4hUdNqYxhdBMfpcptUvIEwcU_RvJg-rdIYKjBV4',
      user: {},
      author: {},
      member: {},
      advisor: {},
      isLoged: false,
      token: '',
      cart: {},
      bill: {total_amount: 0},
      stripePublicKey: '',
      message: null,
      demo: [{ title: "FIRST", background: "white", initial: "white" },
      { title: "SECOND", background: "white", initial: "white" }]
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      getMessage: async () => {
        try {
          // Fetching data from the backend
          // const response = await fetch(process.env.BACKEND_URL + "/api/hello")
          //const data = await response.json()
          // setStore({ message: data.message })
          // Don't forget to return something, that is how the async resolves
          // return data;
        } catch (error) {
          // console.log("Error loading message from backend", error)
        }
      },
      handleLogin: (data) => {
        console.log("recibimos:", data);
        const activeToken= data.token; 
        const activeUser = data.results; 
        setStore({ user: activeUser.user, advisor:  activeUser.advisor, member: activeUser.member, 
        author: activeUser.author, isLoged: true, token: activeToken
        });
        const store = getStore();
        console.log("isLoged es", store.isLoged);
      },
      logout: () => {
				const newObj = {};
				setStore({ user: newObj, advisor:  newObj, member: newObj, 
          author: newObj, isLoged: false, token: ''
          });
          const store = getStore();
          console.log("sesión cerrada correctamente", store.loggedButton, store.isLoged);
			},
      changeColor: (index, color) => {
        // Get the store
        const store = getStore();
        // We have to loop the entire demo array to look for the respective index
        // and change its color
        const demo = store.demo.map((element, i) => {
          if (i === index) element.background = color;
          return element;
        });
        // Reset the global store
        setStore({ demo: demo });
      },
      getStripePublicKey: async () => {
        const url = `${process.env.BACKEND_URL}/stripe-key`
        const options = {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        }
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setStore({ stripePublicKey: data.publicKey });
          return true
        } else {
          console.log('Error:', response.status, response.statusText);
          return false
        }
      },
      processPayment: async () => {
        const stripe = await loadStripe(getStore().stripePublicKey)
        const url = `${process.env.BACKEND_URL}/payment`
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getStore().token}`
          },
          body: JSON.stringify({})
        }
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          stripe.redirectToCheckout({ sessionId: data.sessionId });
        } else {
          console.log('Error:', response.status, response.statusText);
        }
      }
    }
  };
};


export default getState;
