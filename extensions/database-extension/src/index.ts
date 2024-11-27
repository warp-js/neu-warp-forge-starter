/**
 * This TypeScript code defines an application that uses the `thorino-ipc` library and the `nedb`
 * database to insert data into a database.
 * @returns The code is returning an object with a single method called `insert`.
 */
import { Extension , IExtension } from '@warp-js/ipc-server';
import NeDb from 'nedb';

import { Page } from '@warp-js/page-types'; 

import { 
  createPage , 
  findPage ,
  findAllPages , 
  updatePage,
  deletePage
} from './pages';

const Application = () => {

  console.log('Application');

  const Database = new NeDb({ filename: 'datafile.db', autoload: true });

  return {
    /* The `insert` function is a method that takes in two parameters: `req` and `res`. */
    insert : ( req , res ) => {
      let { chanel , data } = req;
      Database.insert( data , (err,result) => { res.send( ( err ? err : result ) ) })
    },
    find : ( req , res ) => {
      let { chanel , data } = req;
      Database.find( data , (err,result) => { res.send( ( err ? err : result ) ) })
    },
    update : (req , res ) => {
      let { chanel , data } = req;
      let { search , insert } = data;

      updatePage( search , insert )
      .then(( result ) => res.send(result))
      .catch(( error ) => res.send(error));

    },
    'find-page' : ( { chanel , data } , res ) => {

      if(process.debugPort)console.debug( 'find-page' , { chanel , data } );

      findPage( data )
      .then( (result) => res.send( result ) )
      .catch( (error) => res.send( error ) )

    },
    'find-all-pages' : ( { chanel , data } , res ) => {

      if(process.debugPort)console.debug( 'find-all-page' , { chanel , data } );

      findAllPages( )
      .then( (result) => res.send( result ) )
      .catch( (error) => res.send( error ) )

    },
    'create-page' : ( req , res ) => {

      let { chanel , data } = req;
      createPage( data as Page )
      .then( (result) => res.send( result ) )
      .catch( (error) => res.send( error ) )

    },
    'update-page' : ( req , res ) => {

      let { chanel , data : { query , page } } = req;

      updatePage( query , page as Page )
      .then( (result) => res.send( result ) )
      .catch( (error) => res.send( error ) )

    },
    'delete-page' : ( req , res ) => {

      let { chanel , data : { search : page } } = req;

      deletePage( page as Page )
      .then( (result) => res.send( result ) )
      .catch( (error) => res.send( error ) )

    }
  }
  
}

export default Extension( Application() ) as IExtension;