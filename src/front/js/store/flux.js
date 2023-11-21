import { loadStripe } from '@stripe/stripe-js';

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: {},
      author: {},
      member: {},
      advisor: {},
      isLogged: false,
      token: '',
      authorsList: [],
      postsList: [],
      postsByAuthor: [],
      authorIdNumber: 0,
      selectedAuthor: [],
      postIdNumber: 0,
      selectedPost: [],
      cart: {},
      bill: { total_amount: 0 },
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
      setAuthorIdNumber: (idNumber) => {
        setStore({ authorIdNumber: idNumber });
      },
      setPostIdNumber: (postId) => {
        setStore({ postIdNumber: postId });
      },
      handleLogin: (data) => {
        console.log("recibimos:", data);
        const activeToken = data.token;
        const activeUser = data.results;
        setStore({
          user: activeUser.user, advisor: activeUser.advisor, member: activeUser.member,
          author: activeUser.author, isLogged: true, token: activeToken, authorIdNumber: activeUser.author.id
        });
        const store = getStore();
        console.log("isLogged es", store.isLogged);
      },
      getAuthors: async () => {
        const url = `${process.env.BACKEND_URL}/api/authors`
        const options = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setStore({ authorsList: data.results });
          const store = getStore()
          console.log(store.authorsList);
          return true
        } else {
          console.log('Error:', response.status, response.statusText);
          return false
        }
      },
      selectAuthor: () => {
        const store = getStore();
        const oneAuthor = store.authorsList.filter((author) => author.id == store.authorIdNumber)
        setStore({ selectedAuthor: oneAuthor })
      },
      getPosts: async () => {
        const url = `${process.env.BACKEND_URL}/api/posts`
        const options = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setStore({ postsList: data.results });
          const store = getStore()
          console.log(store.postsList);
          return true
        } else {
          console.log('Error:', response.status, response.statusText);
          return false
        }
      },
      selectPost: () => {
        const store = getStore();
        const onePost = store.PostsList.filter((post) => post.id == store.postIdNumber)
        console.log(onePost);
        setStore({ selectedPost: onePost })
      },
      getPostsByAuthors: async () => {
        const store = getStore();
        const url = `${process.env.BACKEND_URL}/api/authors/${store.authorIdNumber}/posts`
        const options = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setStore({ postsByAuthor: data.results });
          const store = getStore();
          console.log(store.postsByAuthor)
          return true
        } else {
          console.log('Error:', response.status, response.statusText);
          return false
        }
      },
      logout: () => {
        const newObj = {};
        setStore({
          user: newObj, advisor: newObj, member: newObj,
          author: newObj, isLogged: false, token: ''
        });
        const store = getStore();
        console.log("sesión cerrada correctamente", store.loggedButton, store.isLogged);
      },
      editProfile: async (nAlias, nBirthDate, nCity, nCountry, nQuote) => {
        const store = getStore();
        const url = `${process.env.BACKEND_URL}/api/authors/${store.author.id}`
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.token}`
          },
          body: JSON.stringify({
            "alias": nAlias, "birth_date": nBirthDate, "city": nCity,
            "country": nCountry, "quote": nQuote, "about_me": store.author.about_me, "is_active": true
          })
        }
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          stripe.redirectToCheckout({ sessionId: data.sessionId });
        } else {
          console.log('Error:', response.status, response.statusText);
        }
      },
      editAboutMe: async (nAboutMe) => {
        const store = getStore();
        const url = `${process.env.BACKEND_URL}/api/authors/${store.author.id}`
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.token}`
          },
          body: JSON.stringify({
            "alias": store.author.alias, "birth_date": store.author.birth_date, "city": store.author.city,
            "country": store.author.country, "quote": store.author.quote, "about_me": nAboutMe, "is_active": true
          })
        }
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          stripe.redirectToCheckout({ sessionId: data.sessionId });
        } else {
          console.log('Error:', response.status, response.statusText);
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
        const url = `${process.env.BACKEND_URL}/stripe-key`
        const options = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
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
