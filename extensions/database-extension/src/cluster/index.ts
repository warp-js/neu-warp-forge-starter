import Datastore from 'nedb';

import * as Fs from 'fs';
import * as Path from 'path';

export type DataStoreOptions = Datastore.DataStoreOptions;

export { Datastore };

export class Cluster extends Datastore{

  static create( collectionOptions:Datastore.DataStoreOptions ):Cluster{

    let ensureDirExist = ( path ) => {

      console.log(path);
      let pSplit = path.split('/').filter( x => x ) as string[];
      let fragment = '';
      let result = Array.from( pSplit , ( p , i ) => {
        
        fragment = Path.join( fragment , p );

        let isFile = ( Path.extname( fragment ) ? true : false );

        let isDirExistResult = Fs.existsSync( fragment );
        if(!isDirExistResult && !isFile){
          Fs.mkdirSync( fragment );
          isDirExistResult = true;
        }
        else if(!isDirExistResult && isFile){
          Fs.writeFileSync( fragment , '' , 'utf-8' );
          isDirExistResult = true;
        }

        return isDirExistResult;

      }) as boolean[];

      return !result.includes(false);

    }

    let isExist = ensureDirExist( collectionOptions.filename );

    return new (Cluster as any)(collectionOptions);
  }

  static delete(){

  }

  static load(){

  }

}