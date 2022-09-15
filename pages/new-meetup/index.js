import { useRouter } from 'next/router';
import React from 'react'
import Head from 'next/head'
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetup() {
  const router = useRouter();
 async function addMeetupHandler  (enteredMeetupData){
 const  response =await fetch('/api/new-meetup',{
  method:'POST',
  body:JSON.stringify(enteredMeetupData),
  headers:{
    'Content-type' : 'application/json'
  }
 });
 //generally we use external api for fetch data but here we use internal api and we  set path of internal api 
const data = await response.json();
console.log(data);

router.replace('/')
}

  return (<>
    <Head>
        <title>Add New Meetup</title>
        <meta
        name='description'
        content='Add your  Meetups'
        />
    </Head>
    <NewMeetupForm onAddMeetup={addMeetupHandler}/></>
)
}

export default NewMeetup;
