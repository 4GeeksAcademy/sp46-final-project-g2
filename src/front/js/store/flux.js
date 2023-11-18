import { loadStripe } from '@stripe/stripe-js';

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwMDI4MDI1MCwianRpIjoiZDEwMjQzZmMtNmNjYy00MTYzLTk1NWUtMzZkOGQ2NzEwNDNjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6WzIsZmFsc2UsMiwxLG51bGxdLCJuYmYiOjE3MDAyODAyNTAsImV4cCI6MTcwMDI4MTE1MH0.y4deIEBkbA2mcIVZkt8mGVpPmnnnRk8p1ZATLM94iHM',
      user: {},
      author: {},
      member: {},
      advisor: {},
      cart: {},
      bill: {},
      carrito: [
        { price: 'price_1ODGc9BgaT0Vkd8Nljplbfxe', quantity: 2 },
        { price: 'price_1ODedhBgaT0Vkd8NCpP0HvAG', quantity: 2 }
      ],
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
        // const data = await axios.get(`${urlBack}/config`)
        const url = `${process.env.BACKEND_URL}/config`
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
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
        // const data = await axios.post(`${urlBack}/payment`, {
        //  carrito: getStore().carrito
        // })
        const url = `${process.env.BACKEND_URL}/payment`
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getStore().token}`
          },
          body: JSON.stringify({ carrito: getStore().carrito })
        }
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();

          console.log(data);
          console.log(stripe.redirectToCheckout({ sessionId: data.sessionId }));
        } else {
          console.log('Error:', response.status, response.statusText);
        }
      }
    }
  };
};


export default getState;
