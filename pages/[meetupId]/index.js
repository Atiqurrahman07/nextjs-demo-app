import { useRouter } from "next/router";
import {MongoClient,ObjectId} from 'mongodb'
import React from "react";
import Head from 'next/head'
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  const router = useRouter();
  return (<>
   <Head>
        <title>{props.meetupData.title}</title>
        <meta
        name={props.meetupData.description}
        content='Visit your meetup list'
        />
    </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    /></>
  );
}

export async function getStaticPaths() {
   const client = await MongoClient.connect(
      "mongodb+srv://ATIQURRAHMAN:XNhMbWoCDRgtYdcD@cluster0.ceo0cji.mongodb.net/meetups?retryWrites=true&w=majority");
    // mongoclint is use for connect data with database
    
    const db = client.db();
    const meetupCollection = db.collection("ateeq"); 

    const meetups = await meetupCollection.find({},{_id:1}).toArray();

    client.close();

  return {
   fallback:"blocking",
    paths:meetups.map( meetup =>({
      params:{meetupId: meetup._id.toString()}
    })),
    
    
  };
}

export async function getStaticProps(context) {

  //fetch data for single meetup
  const meetupId = context.params.meetupId;
//   console.log(meetupId);
  const client = await MongoClient.connect(
   "mongodb+srv://ATIQURRAHMAN:XNhMbWoCDRgtYdcD@cluster0.ceo0cji.mongodb.net/meetups?retryWrites=true&w=majority");
 // mongoclint is use for connect data with database
 
 const db = client.db();
 const meetupCollection = db.collection("ateeq"); 


 const selelectedMeetup =await meetupCollection.findOne({_id:ObjectId(meetupId)});

 client.close();
  return {
    props: {
      meetupData:{
         id:selelectedMeetup._id.toString(),
         title:selelectedMeetup.title,
         address:selelectedMeetup.address,
         image:selelectedMeetup.image,
         description:selelectedMeetup.description,
      }
    },
  };
}

export default MeetupDetails;
