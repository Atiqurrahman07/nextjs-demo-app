import {MongoClient} from 'mongodb';
import Head from 'next/head'
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
 
  return (<Fragment>
    <Head>
        <title>React Next Meetup</title>
        <meta
        name='description'
        content='Browse a huge list of highly active React Meetup'
        />
    </Head>
  <MeetupList meetups={props.meetups} />
  </Fragment>
  )
 
}

   export async function getStaticProps(){
        // fetch data from api
        const client = await MongoClient.connect(
            "mongodb+srv://ATIQURRAHMAN:XNhMbWoCDRgtYdcD@cluster0.ceo0cji.mongodb.net/meetups?retryWrites=true&w=majority");
          // mongoclint is use for connect data with database

          const db = client.db();
          const meetupCollection = db.collection("ateeq"); 
          const meetups = await meetupCollection.find().toArray();
        
        return{
            props:{
                meetups:meetups.map((meetup)=>({
                    title:meetup.title,
                    address:meetup.address,
                    image:meetup.image,
                    id:meetup._id.toString(),

                }))
            },
            revalidate: 1
        }
        
    }
export default HomePage;





// export async function getServerSideProps(context){
//     const req =context.req;
//     const res = context.res;
//     return{
//         props:{
//             meetups:DUMMY
//         }
//     }
// }
