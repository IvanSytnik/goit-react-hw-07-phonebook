import React, { useState, useEffect } from "react";
import { Hearts  } from 'react-loader-spinner';
import { nanoid } from 'nanoid';
import SubmitContacts from '../SubmitContacts/SubmitContacts'
import Filter from '../Filter/Filter'
import { STATUS } from "components/Status/status";
import RenderContacts from '../RenderContacts/RenderContacts'
import { useDispatch, useSelector } from 'react-redux';
import { addNewContacts, getFilteredContacts, isLoadingContacts } from "../../redux/contacts/selectors";
import { getContacts,addContacts,deleteContacts } from "../../redux/contacts/operations.api";
import { filterContactsAction } from "redux/contacts/filter.slice";

export default function Contacts() {
    const dispatch = useDispatch();
    let [name, setName] = useState('')
    let [number, setNumber] = useState('')
    const items = useSelector(addNewContacts);
    const isLoading = useSelector(isLoadingContacts);
    const filter = useSelector(getFilteredContacts);


  
  
    const handleName = event => {
      setName(name = event.target.value )
   }
  
    const handleNumber = event => {
      setNumber(number = event.target.value)
     }

     useEffect(() => {
      dispatch(getContacts())
    },[dispatch])
//   useEffect( ()=> {
//   window.localStorage.setItem('contacts', JSON.stringify(contacts))
//   }, [contacts])

  const handleSubmit= e => {
      e.preventDefault();
      const contact = {id: nanoid(), name: name, phone: number}
      if(items.find(contact => contact.name === name)){
          alert(`${name} is already in contacts`)
      }
      else {
        dispatch(addContacts(contact))
        setName(name = "" )
        setNumber(number = "")


      console.log(items)
      }
      
  }

  const contactsDelete = contactsID => {
    dispatch(deleteContacts(contactsID))
  }
  
  const chooseFilterContact = (evt) => {
    dispatch(filterContactsAction(evt.target.value ));
}

const filterContacts = () => {
  const normalizedFilter = filter.toLowerCase();
  return items.filter(contact=>
     contact.name.toLowerCase().includes(normalizedFilter))
}


  return (
      <>
      
      
      <SubmitContacts name={name} number={number} handleSubmit={handleSubmit} handleName={handleName} handleNumber={handleNumber}></SubmitContacts>
      {isLoading === STATUS.loading || isLoading === STATUS.idle ? <Hearts 
            height="80"
            width="80"
            color="red"
            ariaLabel="hearts-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          /> :""}
      <Filter value={filter} onChange={chooseFilterContact}></Filter>
      {items.length >0 ? (<RenderContacts items={filterContacts()} contactsDelete={contactsDelete}></RenderContacts>) : (<div>Nema</div>)}

     </>
     
    
      )
}
   