const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: {},
      author: {},
      member: {},
      advisor: {},
      message: null,
      demo: [{title: "FIRST", background: "white",initial: "white"},
             {title: "SECOND",background: "white",initial: "white"}]
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
      uploadFile: async fileToUpload => {
        let data = new FormData();
        data.append("image", fileToUpload);
        const url = process.env.BACKEND_URL + '/api/upload';
        const options = {
          method: "POST",
          body: data,
          headers: {
            Authorization: `Basic ${process.env.API_KEY}:${process.env.API_SECRET}`
          }
        };
        console.log(options)
        const response = await fetch(url, options)
        if (response.ok) {
          const data = await response.json();
          console.log(data)
        } else {
          console.log('error', response.status, response.text)
        }
      }
    }
  };
};


export default getState;
