// This file is for handling with Local Storage
// CRUD Functions
const Storage = {
    // Function to  create item in localstorage
    getItem: (key) => {
      return JSON.parse(localStorage.getItem(key)) || [];
    },
    // Function to  update item in localstorage
    updateItem: (key, newItem) => {
      localStorage.removeItem(key);
      localStorage.setItem(key, newItem);
    },
    // Function to  remove item from localstorage
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
    // Function to create new element in item in localstorage
    create: (key, element) => {
      const oldData = Storage.getItem(key);
      const newData = [...oldData, { ...element }];
      localStorage.setItem(key, JSON.stringify(newData));
    },
    // Function to delete element from item in localstorage
    delete: (key, index) => {
      const oldData = Storage.getItem(key);
      if (oldData !== null) {
        const newData = [...oldData].filter((ele) => {
          return ele.id != index;
        });
        Storage.updateItem(key, JSON.stringify(newData));
      }
    },
  };
  
  export default Storage;
  