//import { loadStripe } from '@stripe/stripe-js';
import moment, { isMoment } from 'moment/moment';

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
      relationPostAuthor: () => {
        const store = getStore();
        let obj = {}
        if (store.postsList.length > 0) {
          store.postsList.map((post) => { obj[post.id] = post.author_id })

          console.log(obj)
        }
        //store.authorsList
      },
      setAuthorIdNumber: (idNumber) => {
        setStore({ authorIdNumber: idNumber });
      },
      setPostIdNumber: (postId) => {
        setStore({ postIdNumber: postId });
        const store = getStore();
        console.log("el id del post seleccionado es", store.postIdNumber);
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
          console.log("authorsList es", store.authorsList);
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
          method: 'GET'
        }
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setStore({ postsList: data.results });
          const stored = getStore()
          console.log(stored.postsList);
          return true
        } else {
          console.log('Error:', response.status, response.statusText);
          return false
        }
      },
      selectPost: () => {
        const store = getStore();
        const onePost = store.postsList.filter((post) => post.id == store.postIdNumber)
        console.log("el post seleccionado es", onePost);
        setStore({ selectedPost: onePost })
      },
      getPostsByAuthors: async () => {
        const store = getStore();
        if (store.postsList.length == 0) getActions().getPosts()
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
      createPost: async (nTitle, nTag, nText) => {
        const store = getStore();
        const url = `${process.env.BACKEND_URL}/api/posts`
       // const ahora = moment().format('MMMM Do YYYY, h:mm:ss a')
        
        console.log(url)
        //console.log(ahora)
        
        const options = {
          method: 'POST',
          body: JSON.stringify({
            "title": nTitle, "abstract": "", "tag": nTag,
            "text": nText, "created_date": "", "update_date": 
            "", "is_published": true, "is_active": true,
            author_id: store.author.id
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.token}`
          },          
        }
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.log('Error:', response.status, response.statusText);
        }
      },



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
    uploadFile: async (fileToUpload) => {
      const data = new FormData();
      data.append("image", fileToUpload);
      const url = process.env.BACKEND_URL + '/api/upload';
      const options = {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Basic ${process.env.API_KEY}:${process.env.API_SECRET}`
        }
      };
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json();
        console.log(data)  // data contiene la url de la imagen
        return data;
      } else {
        console.log('error', response.status, response.text)
        return "No image url"
      }
    }
    /*,
    
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
    */
  }
};



export default getState;
